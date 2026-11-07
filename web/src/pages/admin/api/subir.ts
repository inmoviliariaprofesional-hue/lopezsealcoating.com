// Subida de fotos desde el panel (la sesión la revisa src/middleware.ts; Astro revisa el Origin del POST).
import type { APIRoute } from "astro";
import { storeUpload } from "../../../lib/media";

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? ({} as Env);
  if (!env.DB || !env.MEDIA) return json({ error: "Falta conectar la base de datos (DB) o el espacio de fotos (MEDIA) en Cloudflare." }, 503);
  const form = await request.formData().catch(() => null);
  const full = form?.get("full");
  const small = form?.get("small");
  // Blob y no File: según el entorno, las partes del formulario llegan como uno u otro.
  const isBlob = (v: unknown): v is Blob => typeof v === "object" && v !== null && typeof (v as Blob).arrayBuffer === "function" && typeof (v as Blob).size === "number";
  if (!isBlob(full)) return json({ error: "No llegó la foto. Inténtalo de nuevo." }, 400);
  const res = await storeUpload(env.DB, env.MEDIA, full, isBlob(small) && small.size > 0 ? small : null);
  return "error" in res ? json(res, 400) : json(res);
};
