// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

const SITE = "https://lopezsealcoating.com";

// Las páginas se generan al momento (on-demand) para leer los textos y fotos que Demetrio edita en /admin
// (base de datos D1 + fotos en R2, mismo modelo que metalesinfinity.com). Por eso el sitemap no se puede
// descubrir solo: aquí va la lista de páginas públicas. Al agregar una página, súmala también aquí.
const PUBLIC_PAGES = [
  "/",
  "/es/",
  "/services/driveway-sealcoating/",
  "/services/parking-lot-striping/",
  "/es/servicios/sellado-de-asfalto/",
  "/es/servicios/pintura-de-lineas/",
  "/privacy/",
  "/terms/",
  "/es/privacidad/",
  "/es/terminos/",
];

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "server",
  adapter: cloudflare({
    // Desarrollo local: D1 y R2 simulados con la configuración de wrangler.dev.jsonc.
    // El nombre no es "wrangler.jsonc" a propósito: así Cloudflare Pages no lo toma como su configuración y
    // las variables y vínculos del proyecto se siguen administrando desde el panel de Cloudflare.
    platformProxy: { enabled: true, configPath: "wrangler.dev.jsonc", persist: true },
    // Sin servicio de imágenes de Cloudflare: las fotos ya llegan optimizadas (WebP) desde /admin.
    imageService: "passthrough",
  }),
  integrations: [
    sitemap({
      customPages: PUBLIC_PAGES.map((p) => SITE + p),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", es: "es" },
      },
    }),
  ],
  vite: {
    // @ts-ignore: @tailwindcss/vite trae Vite 8 y Astro 5 usa Vite 6; solo choca el tipo, el build funciona.
    plugins: [tailwindcss()],
  },
});
