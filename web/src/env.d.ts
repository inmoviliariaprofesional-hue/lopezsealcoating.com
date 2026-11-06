/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

/** Vínculos y secretos del proyecto en Cloudflare Pages (Settings → Bindings / Variables and Secrets). */
interface Env {
  /** Base de datos D1 con los textos y fotos que se editan en /admin. */
  DB?: D1Database;
  /** Bucket R2 con las fotos subidas desde /admin. */
  MEDIA?: R2Bucket;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  BREVO_API_KEY?: string;
  LEAD_NOTIFY_TO?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  BREVO_LIST_ID?: string;
}

declare namespace App {
  interface Locals extends Runtime {
    /** Contenido editable (textos, fotos, franja superior), ya combinado con los valores por defecto. */
    content: import("./lib/content").Content;
    /** Datos del negocio para plantillas y JSON-LD (contacto y ciudades vienen del panel). */
    site: import("./lib/content").SiteInfo;
  }
}
