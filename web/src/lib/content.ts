/**
 * Contenido editable del sitio (lo que Demetrio cambia en /admin).
 *
 * - Valores por defecto: los textos de src/i18n y los datos de src/data/site.ts. Si la base de datos está vacía o
 *   no está conectada, el sitio se ve exactamente con estos valores.
 * - Lo guardado en D1 (tabla content, clave "site") se combina con los valores por defecto campo por campo,
 *   siguiendo SECTIONS (src/lib/schema.ts). Un dato inválido o faltante nunca rompe la página: se usa el de defecto.
 */
import { site as baseSite, serviceCities, type Lang } from "../data/site";
import { translations, type Copy } from "../i18n";
import { SECTIONS, sectionById, type Field } from "./schema";
import { ensureSchema } from "./db";

export type L = { en: string; es: string };

export interface Content {
  topStrip: { enabled: boolean; tag: L; messages: L[]; cta: L; href: string };
  trust: L[];
  hero: {
    eyebrow: L;
    title: L;
    accent: L;
    subtitle: L;
    bullets: L[];
    image: string;
    cardEyebrow: L;
    cardTitle: L;
    cardSteps: L[];
  };
  services: { tag: L; name: L; desc: L }[];
  gallery: { src: string; label: L; alt: L }[];
  comparison: { before: string; after: string; beforeAlt: L; afterAlt: L };
  about: { title: L; body: L; points: L[] };
  faq: { q: L; a: L }[];
  cities: string[];
  contact: { phone: string; whatsapp: string; email: string; facebook: string; instagram: string; reviewUrl: string };
}

const en = translations.en;
const es = translations.es;
const both = (pick: (c: Copy) => string): L => ({ en: pick(en), es: pick(es) });
const zip = (a: string[], b: string[]): L[] => a.map((v, i) => ({ en: v, es: b[i] ?? v }));

/** Contenido por defecto: el que estaba publicado antes del panel (oct. 2026), sin la promoción vencida. */
export const DEFAULT_CONTENT: Content = {
  topStrip: {
    enabled: false,
    tag: { en: "", es: "" },
    messages: [
      { en: en.trust.free, es: es.trust.free },
      { en: "Hablamos Español", es: "Atención en inglés y español" },
      { en: en.trust.local, es: es.trust.local },
    ],
    cta: { en: "Get your free estimate", es: "Pide tu cotización gratis" },
    href: "#contact",
  },
  trust: [both((c) => c.trust.free), both((c) => c.trust.spanish), both((c) => c.trust.local)],
  hero: {
    eyebrow: both((c) => c.hero.eyebrow),
    title: both((c) => c.hero.title),
    accent: both((c) => c.hero.accent),
    subtitle: both((c) => c.hero.subtitle),
    bullets: zip(en.hero.bullets, es.hero.bullets),
    image: "/images/hero-driveway.webp",
    cardEyebrow: both((c) => c.hero.visualEyebrow),
    cardTitle: both((c) => c.hero.visualTitle),
    cardSteps: zip(en.hero.visualSteps, es.hero.visualSteps),
  },
  services: en.services.items.map((item, i) => ({
    tag: { en: item.tag, es: es.services.items[i].tag },
    name: { en: item.name, es: es.services.items[i].name },
    desc: { en: item.desc, es: es.services.items[i].desc },
  })),
  gallery: ["/images/work-1.webp", "/images/work-2.webp", "/images/work-4.webp", "/images/work-5.webp"].map((src, i) => ({
    src,
    label: { en: en.work.labels[i], es: es.work.labels[i] },
    alt: { en: en.work.imageAlts[i], es: es.work.imageAlts[i] },
  })),
  comparison: {
    before: "/images/circular-driveway-before.webp",
    after: "/images/circular-driveway-after.webp",
    beforeAlt: both((c) => c.projectComparison.beforeAlt),
    afterAlt: both((c) => c.projectComparison.afterAlt),
  },
  about: {
    title: both((c) => c.about.title),
    body: both((c) => c.about.body),
    points: zip(en.about.points, es.about.points),
  },
  faq: en.faq.items.map((item, i) => ({ q: { en: item.q, es: es.faq.items[i].q }, a: { en: item.a, es: es.faq.items[i].a } })),
  cities: [...serviceCities],
  contact: {
    phone: baseSite.phoneDisplay,
    whatsapp: baseSite.whatsapp,
    email: baseSite.email,
    facebook: baseSite.facebook,
    instagram: baseSite.instagram,
    reviewUrl: baseSite.googleReviewUrl,
  },
};

// ---------------------------------------------------------------------------------------------------------------
// Rutas dentro del objeto ("hero.title")

function getPath(obj: unknown, path: string): unknown {
  if (!path) return obj;
  return path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), obj);
}

function setPath(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let o: Record<string, unknown> = obj;
  keys.slice(0, -1).forEach((k) => {
    if (!o[k] || typeof o[k] !== "object") o[k] = {};
    o = o[k] as Record<string, unknown>;
  });
  o[keys[keys.length - 1]] = value;
}

/** Objetos con llaves 0, 1, 2… (como llegan del formulario) o arreglos → arreglo en orden. */
function asArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") {
    return Object.entries(v as Record<string, unknown>)
      .filter(([k]) => /^\d+$/.test(k))
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([, val]) => val);
  }
  return [];
}

// ---------------------------------------------------------------------------------------------------------------
// Limpieza y validación de cada tipo de campo

/** Quita caracteres de control y espacios sobrantes. Los textos de varias líneas conservan los saltos de línea. */
export function cleanText(v: unknown, max: number, multiline = false): string {
  if (typeof v !== "string") return "";
  let s = v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  s = multiline ? s.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : s.replace(/\s+/g, " ");
  return s.trim().slice(0, max);
}

const IMAGE_SRC = /^\/(images\/[a-z0-9-]+\.(?:webp|jpg|png)|media\/uploads\/\d{6}\/[0-9a-f-]{36}\.(?:webp|jpg))$/;
export const isImageSrc = (s: unknown): s is string => typeof s === "string" && IMAGE_SRC.test(s);

const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i;

function isHttpsUrl(s: string): boolean {
  if (!/^https:\/\/[^\s<>"'`]+$/.test(s)) return false;
  try {
    return new URL(s).protocol === "https:";
  } catch {
    return false;
  }
}

/** Formato (331) 236-9387 a partir de 10 dígitos (o 11 empezando con 1). */
export function formatUsPhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return null;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function checkPlain(format: Extract<Field, { kind: "plain" }>["format"], value: string): { value: string } | { error: string } {
  switch (format) {
    case "tel": {
      const p = formatUsPhone(value);
      return p ? { value: p } : { error: "debe ser un número de EE. UU. de 10 dígitos" };
    }
    case "digits": {
      const d = value.replace(/\D/g, "");
      if (!d) return { value: "" };
      return d.length >= 10 && d.length <= 15 ? { value: d } : { error: "debe tener entre 10 y 15 dígitos, con código de país" };
    }
    case "email":
      return EMAIL.test(value) ? { value: value.toLowerCase() } : { error: "no es un correo válido" };
    case "url":
      if (!value) return { value: "" };
      return isHttpsUrl(value) ? { value } : { error: "debe empezar con https://" };
    case "href":
      if (!value) return { value: "#contact" };
      if (/^#[A-Za-z0-9_-]{1,40}$/.test(value)) return { value };
      if (/^\/(?!\/)[A-Za-z0-9/_\-.#?=&%]*$/.test(value)) return { value };
      return isHttpsUrl(value) ? { value } : { error: "usa #contact, una ruta que empiece con / o una dirección https://" };
  }
}

type Mode = "stored" | "form";

/**
 * Convierte un valor crudo al tipo del campo.
 * - mode "stored" (lo guardado en D1): si falta o es inválido, usa `fallback` sin avisar.
 * - mode "form" (lo que mandó el panel): un campo ausente cuenta como vacío y los errores se reportan.
 */
function coerce(field: Field, raw: unknown, fallback: unknown, mode: Mode, errors: string[], label: string): unknown {
  const missing = raw === undefined || raw === null;
  if (mode === "stored" && missing) return fallback;
  const name = `${label}${field.label}`;

  switch (field.kind) {
    case "bool":
      return raw === true || raw === "on" || raw === "true";

    case "text": {
      const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
      let vEn = cleanText(r.en, field.max, field.multiline);
      let vEs = cleanText(r.es, field.max, field.multiline);
      if (!vEn) vEn = vEs;
      if (!vEs) vEs = vEn;
      if (!vEn && field.required) {
        if (mode === "form") errors.push(`${name}: falta el texto.`);
        return fallback;
      }
      return { en: vEn, es: vEs };
    }

    case "plain": {
      const value = cleanText(raw, field.max);
      const res = checkPlain(field.format, value);
      if ("error" in res) {
        if (mode === "form") errors.push(`${name}: ${res.error}.`);
        return fallback;
      }
      return res.value;
    }

    case "image":
      if (isImageSrc(raw)) return raw;
      if (mode === "form") errors.push(`${name}: falta subir la foto.`);
      return fallback;

    case "textlist": {
      const out: L[] = [];
      for (const item of asArray(raw)) {
        const r = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
        let vEn = cleanText(r.en, field.itemMax);
        let vEs = cleanText(r.es, field.itemMax);
        if (!vEn) vEn = vEs;
        if (!vEs) vEs = vEn;
        if (vEn) out.push({ en: vEn, es: vEs });
      }
      return out.slice(0, field.max);
    }

    case "lines": {
      const items = typeof raw === "string" ? raw.split(/\n/) : asArray(raw);
      const seen = new Set<string>();
      const out: string[] = [];
      for (const item of items) {
        const v = cleanText(item, field.itemMax);
        if (v && !seen.has(v.toLowerCase())) {
          seen.add(v.toLowerCase());
          out.push(v);
        }
      }
      return out.slice(0, field.max);
    }

    case "list": {
      const fallbackItems = asArray(fallback);
      const out: unknown[] = [];
      asArray(raw).forEach((item, i) => {
        if (out.length >= field.max) return;
        const itemLabel = `${field.itemLabel} ${out.length + 1} · `;
        const itemErrors: string[] = [];
        const value: Record<string, unknown> = {};
        let hasContent = false;
        for (const sub of field.fields) {
          const subRaw = getPath(item, sub.key);
          // Una fila nueva del formulario que quedó totalmente vacía se ignora.
          if (hasValue(sub, subRaw)) hasContent = true;
          const subFallback = getPath(field.fixed ? fallbackItems[i] : undefined, sub.key) ?? emptyOf(sub);
          setPath(value, sub.key, coerce(sub, subRaw, subFallback, mode, itemErrors, itemLabel));
        }
        if (!hasContent && !field.fixed) return;
        errors.push(...itemErrors);
        out.push(value);
      });
      if (field.fixed) {
        // Listas de tamaño fijo (las 3 tarjetas): se completan con los valores anteriores.
        while (out.length < field.max && fallbackItems[out.length]) out.push(fallbackItems[out.length]);
      }
      return out;
    }
  }
}

/** ¿El usuario escribió o subió algo en este campo? */
function hasValue(field: Field, raw: unknown): boolean {
  switch (field.kind) {
    case "bool":
      return raw === true || raw === "on";
    case "text": {
      const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
      return Boolean(cleanText(r.en, 10) || cleanText(r.es, 10));
    }
    case "plain":
      return Boolean(cleanText(raw, 10));
    case "image":
      return isImageSrc(raw);
    case "lines":
      return typeof raw === "string" ? Boolean(raw.trim()) : asArray(raw).length > 0;
    default:
      return asArray(raw).length > 0;
  }
}

function emptyOf(field: Field): unknown {
  switch (field.kind) {
    case "bool":
      return false;
    case "text":
      return { en: "", es: "" };
    case "plain":
    case "image":
      return "";
    default:
      return [];
  }
}

/** Aplica los campos de una sección: lee `raw`, valida y escribe el resultado en `target`. */
function applySection(fields: Field[], raw: unknown, target: Content, fallback: Content, mode: Mode, errors: string[]) {
  for (const field of fields) {
    const value = coerce(field, getPath(raw, field.key), getPath(fallback, field.key), mode, errors, "");
    setPath(target as unknown as Record<string, unknown>, field.key, value);
  }
}

/** Combina lo guardado con los valores por defecto. Nunca lanza error. */
export function normalizeContent(stored: unknown): Content {
  const out = structuredClone(DEFAULT_CONTENT);
  if (!stored || typeof stored !== "object") return out;
  for (const section of SECTIONS) applySection(section.fields, stored, out, DEFAULT_CONTENT, "stored", []);
  return out;
}

/** Convierte FormData con nombres "f:hero.title.en", "f:gallery.0.src"… en un objeto anidado. */
export function formToObject(form: FormData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [name, value] of form.entries()) {
    if (!name.startsWith("f:") || typeof value !== "string") continue;
    const path = name.slice(2);
    if (!/^[A-Za-z0-9_.]+$/.test(path) || path.split(".").length > 6) continue;
    if (path.split(".").some((k) => k === "__proto__" || k === "constructor" || k === "prototype")) continue;
    setPath(out, path, value);
  }
  return out;
}

/** Lo que mandó el formulario, aplicado sin validar estrictamente: para volver a mostrarlo cuando hay errores. */
export function previewSection(current: Content, sectionId: string, raw: Record<string, unknown>): Content {
  const section = sectionById(sectionId);
  const next = structuredClone(current);
  if (!section) return next;
  for (const f of section.fields) if (f.kind === "bool" && getPath(raw, f.key) === undefined) setPath(raw, f.key, false);
  applySection(section.fields, raw, next, current, "stored", []);
  // Teléfono, correo y enlaces se muestran tal como los escribió, para que pueda corregirlos.
  for (const f of section.fields) if (f.kind === "plain") setPath(next as unknown as Record<string, unknown>, f.key, cleanText(getPath(raw, f.key), f.max));
  return next;
}

/** Valida una sección enviada desde el panel y devuelve el contenido completo actualizado, o los errores. */
export function updateSection(current: Content, sectionId: string, raw: unknown): { content: Content } | { errors: string[] } {
  const section = sectionById(sectionId);
  if (!section) return { errors: ["Sección desconocida."] };
  const errors: string[] = [];
  const next = structuredClone(current);
  applySection(section.fields, raw, next, current, "form", errors);
  return errors.length ? { errors } : { content: next };
}

// ---------------------------------------------------------------------------------------------------------------
// Base de datos

const CONTENT_KEY = "site";
const HISTORY_KEEP = 30;

export async function loadContent(db: D1Database | undefined): Promise<Content> {
  if (!db) return structuredClone(DEFAULT_CONTENT);
  try {
    await ensureSchema(db);
    const row = await db.prepare("SELECT value FROM content WHERE key = ?").bind(CONTENT_KEY).first<{ value: string }>();
    return normalizeContent(row ? JSON.parse(row.value) : null);
  } catch (err) {
    console.error("No se pudo leer el contenido de D1; se usan los valores por defecto.", err);
    return structuredClone(DEFAULT_CONTENT);
  }
}

/** Guarda el contenido y deja la versión anterior en el historial (para poder deshacer). */
export async function saveContent(db: D1Database, content: Content, section: string): Promise<void> {
  await ensureSchema(db);
  const now = Math.floor(Date.now() / 1000);
  const prev = await db.prepare("SELECT value FROM content WHERE key = ?").bind(CONTENT_KEY).first<{ value: string }>();
  // La primera vez, "lo anterior" es el sitio original (valores por defecto): así también se puede regresar a él.
  const before = prev?.value ?? JSON.stringify(DEFAULT_CONTENT);
  const stmts = [db.prepare("INSERT INTO content_history (value, section, saved_at) VALUES (?, ?, ?)").bind(before, section, now)];
  stmts.push(
    db
      .prepare("INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at")
      .bind(CONTENT_KEY, JSON.stringify(content), now),
    db.prepare("DELETE FROM content_history WHERE id NOT IN (SELECT id FROM content_history ORDER BY id DESC LIMIT ?)").bind(HISTORY_KEEP),
  );
  await db.batch(stmts);
}

export interface HistoryEntry {
  id: number;
  section: string;
  saved_at: number;
}

export async function listHistory(db: D1Database): Promise<HistoryEntry[]> {
  await ensureSchema(db);
  const res = await db.prepare("SELECT id, section, saved_at FROM content_history ORDER BY id DESC LIMIT ?").bind(HISTORY_KEEP).all<HistoryEntry>();
  return res.results ?? [];
}

export async function historyValue(db: D1Database, id: number): Promise<Content | null> {
  const row = await db.prepare("SELECT value FROM content_history WHERE id = ?").bind(id).first<{ value: string }>();
  return row ? normalizeContent(JSON.parse(row.value)) : null;
}

/** Fotos subidas que aparecen en el contenido actual o en el historial (no se pueden borrar). */
export async function referencedUploads(db: D1Database): Promise<Set<string>> {
  const rows = await db.batch([
    db.prepare("SELECT value FROM content"),
    db.prepare("SELECT value FROM content_history"),
  ]);
  const keys = new Set<string>();
  for (const r of rows) {
    for (const row of (r.results ?? []) as { value: string }[]) {
      for (const m of row.value.matchAll(/\/media\/(uploads\/\d{6}\/[0-9a-f-]{36})\.(?:webp|jpg)/g)) keys.add(m[1]);
    }
  }
  return keys;
}

// ---------------------------------------------------------------------------------------------------------------
// Para las plantillas

export const pick = (l: L, lang: Lang): string => (lang === "es" ? l.es || l.en : l.en || l.es);

/** Textos del idioma con lo editado en el panel encima de los textos fijos de src/i18n. */
export function buildCopy(lang: Lang, c: Content): Copy {
  const t = structuredClone(translations[lang]);
  const p = (l: L) => pick(l, lang);
  t.hero.eyebrow = p(c.hero.eyebrow);
  t.hero.title = p(c.hero.title);
  t.hero.accent = p(c.hero.accent);
  t.hero.subtitle = p(c.hero.subtitle);
  t.hero.bullets = c.hero.bullets.map(p);
  t.hero.visualEyebrow = p(c.hero.cardEyebrow);
  t.hero.visualTitle = p(c.hero.cardTitle);
  t.hero.visualSteps = c.hero.cardSteps.map(p);
  t.services.items = t.services.items.map((item, i) => {
    const s = c.services[i];
    return s ? { ...item, tag: p(s.tag), name: p(s.name), desc: p(s.desc) } : item;
  });
  t.projectComparison.beforeAlt = p(c.comparison.beforeAlt);
  t.projectComparison.afterAlt = p(c.comparison.afterAlt);
  t.about.title = p(c.about.title);
  t.about.body = p(c.about.body);
  t.about.points = c.about.points.map(p);
  t.faq.items = c.faq.map((f) => ({ q: p(f.q), a: p(f.a) }));
  return t;
}

export type SiteInfo = Omit<typeof baseSite, "phoneDisplay" | "phoneE164" | "whatsapp" | "email" | "facebook" | "instagram" | "googleReviewUrl" | "areaServed"> & {
  phoneDisplay: string;
  phoneE164: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  googleReviewUrl: string;
  serviceCities: string[];
  areaServed: string[];
};

/** Datos del negocio: los fijos de site.ts más contacto y ciudades del panel. */
export function siteInfo(c: Content): SiteInfo {
  const digits = c.contact.phone.replace(/\D/g, "").slice(-10);
  return {
    ...baseSite,
    phoneDisplay: c.contact.phone,
    phoneE164: `+1${digits}`,
    whatsapp: c.contact.whatsapp || `1${digits}`,
    email: c.contact.email,
    facebook: c.contact.facebook,
    instagram: c.contact.instagram,
    googleReviewUrl: c.contact.reviewUrl,
    serviceCities: c.cities,
    areaServed: c.cities.map((city) => `${city}, IL`),
  };
}
