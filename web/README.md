# Lopez Sealcoating — Sitio web (Astro + Tailwind)

Sitio bilingüe (EN/ES) de conversión para Lopez Sealcoating LLC, con formulario de
cotización funcional (Cloudflare Pages Function) y SEO local.

## Stack

- [Astro](https://astro.build) 5 (salida estática)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `@astrojs/sitemap` (sitemap automático)
- Backend del formulario: **Cloudflare Pages Functions** (`functions/api/quote.js`)
- Envío de correo: **API transaccional de Brevo**

## Estructura

```
web/
├── functions/
│   └── api/quote.js         # Recibe el formulario y envía el lead por correo (Brevo)
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── _headers             # Cabeceras de seguridad y caché (Cloudflare)
│   └── _redirects           # Redirecciones (Cloudflare)
├── src/
│   ├── data/site.ts         # Datos de contacto, marca, ciudades, servicios (EDITAR AQUÍ)
│   ├── i18n/index.ts        # Textos en inglés y español
│   ├── layouts/Base.astro   # <head>, canonical, hreflang, Open Graph, JSON-LD
│   ├── components/Landing.astro  # Todas las secciones + envío del formulario
│   └── pages/
│       ├── index.astro      # Inglés  ->  /
│       └── es/index.astro   # Español ->  /es/
└── astro.config.mjs
```

## Desarrollo local

```bash
cd web
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

> Nota: el formulario (`/api/quote`) es una Cloudflare Pages Function; en `npm run dev`
> no se ejecuta. Para probarlo localmente usa `npx wrangler pages dev dist` después de `npm run build`,
> o simplemente pruébalo ya desplegado en Cloudflare.

## Despliegue en Cloudflare Pages (paso a paso)

1. En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Elige el repositorio `inmoviliariaprofesional-hue/lopezsealcoating.com`.
3. Configura el build:

   | Ajuste | Valor |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Root directory | `web` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. **Variables de entorno** (Settings → Environment variables → Production):

   | Variable | Obligatoria | Valor |
   |---|---|---|
   | `BREVO_API_KEY` | Sí | Clave API v3 de Brevo |
   | `LEAD_NOTIFY_TO` | Recomendada | Correo que recibe los leads (por ahora el Gmail de Demetrio) |
   | `BREVO_SENDER_EMAIL` | Recomendada | Remitente **verificado** en Brevo |
   | `BREVO_SENDER_NAME` | Opcional | Ej. `Lopez Sealcoating Web` |
   | `BREVO_LIST_ID` | Opcional | Si se quiere guardar el lead en una lista de Brevo |

5. **Deploy**. Cloudflare construye y publica en `*.pages.dev`.
6. Cuando exista el dominio, agrégalo en **Custom domains**.

## Cómo probar el formulario

1. Configura `BREVO_API_KEY` y `LEAD_NOTIFY_TO` en Cloudflare.
2. En el sitio publicado, llena y envía el formulario.
3. Debe llegar un correo a `LEAD_NOTIFY_TO` con los datos.
   - Si falta la clave, el sitio muestra el mensaje de error y el visitante puede
     llamar o mandar WhatsApp (siempre funcionan).

## Pendientes (TODO) antes de publicar

- [x] Registrar el dominio (Cloudflare Registrar) y conectarlo. _(lopezsealcoating.com + www, activo con SSL.)_
- [x] Reemplazar el Gmail por el correo profesional (`info@lopezsealcoating.com`) en `src/data/site.ts` y en las variables. _(Email Routing + Brevo autenticado; formulario operativo.)_
- [ ] Poner la URL real de Facebook y el enlace del Perfil de Empresa de Google en `site.ts`.
- [x] `insured`: se mantiene en `false` (Demetrio confirmó que no cuenta con seguro; no se muestra "Licensed & Insured"). Sí se muestra "LLC".
- [x] Confirmar las ciudades reales de `areaServed` en `site.ts`. _(base Hanover Park; 16 ciudades del NO/O de Chicago en `serviceCities`.)_
- [x] Subir fotos y videos reales de trabajos a `public/` y conectarlos en "Nuestros Trabajos". _(6 fotos + 3 videos + antes/después reales; hero y sección de zona con fotos reales.)_
- [x] Google Analytics 4 conectado (`gaMeasurementId` en `site.ts`) con eventos de lead, llamada y WhatsApp.
- [ ] Optimización de imágenes a WebP/AVIF (pendiente, mejora de rendimiento).
- [x] Agregar `public/og-image.png` (imagen para compartir en redes). _(imagen social del kit de marca, 1200×630.)_
- [x] Reemplazar el nombre de texto por el logo original. _(emblema en el header, logo completo en el pie; favicons del kit. Emblema y favicon LS son propuestas por validar con Demetrio.)_
- [ ] Configurar `BREVO_API_KEY` y correos en Cloudflare.
