/**
 * Acceso al panel /admin con una sola contraseña (mismo esquema que metalesinfinity.com):
 * cookie firmada con HMAC (SESSION_SECRET), válida 12 horas, solo para /admin, HttpOnly y SameSite=Strict.
 * Máximo 8 intentos fallidos por IP cada 15 minutos.
 */
import type { AstroCookies } from "astro";
import { ensureSchema } from "./db";

const COOKIE = "ls_admin";
const SESSION_HOURS = 12;
const MAX_ATTEMPTS = 8;
const WINDOW_SECONDS = 15 * 60;

const enc = new TextEncoder();

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Comparación en tiempo constante (compara los HMAC de ambos textos para no filtrar la longitud). */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const k = "comparacion";
  const [x, y] = await Promise.all([hmac(k, a), hmac(k, b)]);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
  return diff === 0;
}

export function adminConfigured(env: Env): boolean {
  return Boolean(env.ADMIN_PASSWORD && env.SESSION_SECRET && env.SESSION_SECRET.length >= 32);
}

export async function isAdmin(env: Env, cookies: AstroCookies): Promise<boolean> {
  if (!adminConfigured(env)) return false;
  const value = cookies.get(COOKIE)?.value;
  if (!value) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(await hmac(env.SESSION_SECRET!, `admin.${exp}`), sig);
}

export async function startSession(env: Env, cookies: AstroCookies, secure: boolean): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600;
  const sig = await hmac(env.SESSION_SECRET!, `admin.${exp}`);
  cookies.set(COOKIE, `${exp}.${sig}`, { httpOnly: true, secure, sameSite: "strict", path: "/admin", maxAge: SESSION_HOURS * 3600 });
}

export function endSession(cookies: AstroCookies): void {
  cookies.delete(COOKIE, { path: "/admin" });
}

export function checkPassword(env: Env, password: string): Promise<boolean> {
  return safeEqual(password, env.ADMIN_PASSWORD ?? "\u0000sin-contraseña");
}

export async function tooManyAttempts(db: D1Database, ip: string): Promise<boolean> {
  await ensureSchema(db);
  const since = Math.floor(Date.now() / 1000) - WINDOW_SECONDS;
  const row = await db.prepare("SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND created_at > ?").bind(ip, since).first<{ n: number }>();
  return (row?.n ?? 0) >= MAX_ATTEMPTS;
}

export async function recordFailedAttempt(db: D1Database, ip: string): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  await db.batch([
    db.prepare("INSERT INTO login_attempts (ip, created_at) VALUES (?, ?)").bind(ip, now),
    db.prepare("DELETE FROM login_attempts WHERE created_at < ?").bind(now - 24 * 3600),
  ]);
}
