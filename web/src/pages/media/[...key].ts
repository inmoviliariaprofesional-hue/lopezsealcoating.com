// Entrega las fotos subidas desde /admin (bucket R2 "MEDIA"). Solo nombres generados por el panel.
import type { APIRoute } from "astro";
import { contentTypeFor } from "../../lib/media";

const KEY = /^uploads\/\d{6}\/[0-9a-f-]{36}(?:-640)?\.(webp|jpg)$/;

export const GET: APIRoute = async ({ params, locals, request }) => {
  const key = params.key ?? "";
  const match = key.match(KEY);
  const bucket = locals.runtime?.env?.MEDIA;
  if (!match || !bucket) return new Response("Not found", { status: 404 });

  const etag = request.headers.get("If-None-Match");
  const obj = await bucket.get(key, etag ? { onlyIf: { etagDoesNotMatch: etag.replace(/^W\/|"/g, "") } } : undefined);
  if (!obj) return new Response("Not found", { status: 404 });

  const headers = new Headers({
    "Content-Type": contentTypeFor(match[1]),
    "Cache-Control": "public, max-age=31536000, immutable",
    ETag: obj.httpEtag,
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; sandbox",
  });
  // R2 devuelve un objeto sin cuerpo cuando la condición If-None-Match coincide.
  if (!("body" in obj) || !obj.body) return new Response(null, { status: 304, headers });
  headers.set("Content-Length", String(obj.size));
  return new Response(obj.body, { headers });
};
