/**
 * Fotos subidas desde /admin. El navegador las reduce antes de subirlas (máx. 1600 px y otra de 640 px para
 * celular) y las convierte a WebP (o JPEG si el navegador no sabe generar WebP). Se guardan en R2 con un nombre
 * aleatorio que nunca cambia, así se pueden guardar en caché por un año.
 */
import { ensureSchema } from "./db";
import { referencedUploads } from "./content";

export const MAX_UPLOAD_BYTES = 6 * 1024 * 1024;
/** Una foto que se quitó del sitio se borra después de este tiempo (y si tampoco está en el historial). */
const ORPHAN_DAYS = 7;

const TYPES = { "image/webp": "webp", "image/jpeg": "jpg" } as const;
type Ext = (typeof TYPES)[keyof typeof TYPES];

/** Revisa los primeros bytes: no se confía en el tipo que manda el navegador. Solo WebP o JPEG. */
export async function sniffImage(file: Blob): Promise<Ext | null> {
  const h = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (h[0] === 0xff && h[1] === 0xd8 && h[2] === 0xff) return "jpg";
  const riff = h[0] === 0x52 && h[1] === 0x49 && h[2] === 0x46 && h[3] === 0x46;
  if (riff && h[8] === 0x57 && h[9] === 0x45 && h[10] === 0x42 && h[11] === 0x50) return "webp";
  return null;
}

export const contentTypeFor = (ext: string) => (ext === "jpg" ? "image/jpeg" : "image/webp");

/** Guarda la versión grande y la de 640 px. Devuelve la ruta pública de la grande. */
export async function storeUpload(db: D1Database, bucket: R2Bucket, full: Blob, small: Blob | null): Promise<{ src: string } | { error: string }> {
  if (full.size === 0 || full.size > MAX_UPLOAD_BYTES || (small && small.size > MAX_UPLOAD_BYTES)) {
    return { error: "La foto pesa demasiado (máximo 6 MB)." };
  }
  const ext = await sniffImage(full);
  if (!ext || (small && (await sniffImage(small)) !== ext)) return { error: "Solo se aceptan fotos JPG, PNG, WebP o HEIC." };
  await ensureSchema(db);
  const d = new Date();
  const key = `uploads/${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}`;
  const httpMetadata = { contentType: contentTypeFor(ext), cacheControl: "public, max-age=31536000, immutable" };
  await bucket.put(`${key}.${ext}`, full, { httpMetadata });
  if (small) await bucket.put(`${key}-640.${ext}`, small, { httpMetadata });
  await db
    .prepare("INSERT INTO media (key, ext, bytes, created_at) VALUES (?, ?, ?, ?)")
    .bind(key, ext, full.size + (small?.size ?? 0), Math.floor(Date.now() / 1000))
    .run();
  return { src: `/media/${key}.${ext}` };
}

/** Borra de R2 las fotos subidas hace más de 7 días que ya no se usan en el sitio ni en el historial. */
export async function cleanupOrphans(db: D1Database, bucket: R2Bucket | undefined): Promise<number> {
  if (!bucket) return 0;
  const limit = Math.floor(Date.now() / 1000) - ORPHAN_DAYS * 86400;
  const rows = await db.prepare("SELECT key, ext FROM media WHERE created_at < ?").bind(limit).all<{ key: string; ext: string }>();
  const used = await referencedUploads(db);
  let removed = 0;
  for (const row of rows.results ?? []) {
    if (used.has(row.key)) continue;
    await bucket.delete([`${row.key}.${row.ext}`, `${row.key}-640.${row.ext}`]);
    await db.prepare("DELETE FROM media WHERE key = ?").bind(row.key).run();
    removed++;
  }
  return removed;
}

/** Fotos del repositorio que tienen versión de 640 px (public/images/*-640.webp) y su ancho real. */
const STATIC_WIDTHS: Record<string, number> = {
  "/images/hero-driveway.webp": 1080,
  "/images/asphalt-lane.webp": 1000,
  "/images/circular-driveway-before.webp": 960,
  "/images/circular-driveway-after.webp": 960,
  "/images/work-1.webp": 900,
  "/images/work-2.webp": 900,
  "/images/work-3.webp": 900,
  "/images/work-4.webp": 900,
  "/images/work-5.webp": 900,
  "/images/work-6.webp": 900,
};

/** srcset para <img>: la versión de 640 px para celular y la grande para pantallas anchas. */
export function srcSetFor(src: string): string | undefined {
  const upload = src.match(/^(\/media\/uploads\/\d{6}\/[0-9a-f-]{36})\.(webp|jpg)$/);
  if (upload) return `${upload[1]}-640.${upload[2]} 640w, ${src} 1600w`;
  const w = STATIC_WIDTHS[src];
  return w ? `${src.replace(/\.webp$/, "-640.webp")} 640w, ${src} ${w}w` : undefined;
}
