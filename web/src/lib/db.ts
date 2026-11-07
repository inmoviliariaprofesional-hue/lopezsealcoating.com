/**
 * Tablas de D1. Se crean solas la primera vez (CREATE TABLE IF NOT EXISTS), así no hace falta correr migraciones
 * desde el build de Cloudflare Pages. Si agregas una tabla o columna, súmala aquí sin borrar las existentes.
 */
const SCHEMA = [
  // Contenido editable: una fila "site" con todo el JSON (ver src/lib/content.ts).
  "CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL)",
  // Versiones anteriores, para "Historial" → "Restaurar" en el panel (se guardan las últimas 30).
  "CREATE TABLE IF NOT EXISTS content_history (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT NOT NULL, section TEXT NOT NULL, saved_at INTEGER NOT NULL)",
  // Fotos subidas a R2 desde el panel.
  "CREATE TABLE IF NOT EXISTS media (key TEXT PRIMARY KEY, ext TEXT NOT NULL, bytes INTEGER NOT NULL, created_at INTEGER NOT NULL)",
  // Intentos fallidos de acceso al panel (límite por IP).
  "CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT NOT NULL, created_at INTEGER NOT NULL)",
  "CREATE INDEX IF NOT EXISTS idx_login_attempts ON login_attempts (ip, created_at)",
];

let ready: Promise<void> | null = null;

export function ensureSchema(db: D1Database): Promise<void> {
  ready ??= db
    .batch(SCHEMA.map((sql) => db.prepare(sql)))
    .then(() => undefined)
    .catch((err) => {
      ready = null; // reintenta en la siguiente petición
      throw err;
    });
  return ready;
}
