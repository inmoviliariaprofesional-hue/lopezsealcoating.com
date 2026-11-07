# Lopez Sealcoating — Sitio web (Astro + Tailwind + Cloudflare Pages)

Sitio bilingüe (EN/ES) de conversión para Lopez Sealcoating LLC, con formulario de cotización (Brevo), SEO local y
**panel `/admin`** para que Demetrio cambie textos, fotos y la franja superior sin tocar el código (mismo modelo que
metalesinfinity.com).

## Stack

- [Astro](https://astro.build) 5 con páginas generadas al momento (`output: "server"`) y el adaptador
  `@astrojs/cloudflare` (Cloudflare Pages, modo avanzado `_worker.js`).
- Tailwind CSS v4 (`@tailwindcss/vite`).
- **D1** (vínculo `DB`): textos y ajustes editables, historial de cambios, fotos subidas e intentos de acceso.
- **R2** (vínculo `MEDIA`): fotos subidas desde el panel, servidas en `/media/...`.
- `@astrojs/sitemap` (lista de páginas en `astro.config.mjs`).
- Formulario: `src/pages/api/quote.ts` con la API transaccional de **Brevo**.
- Tipografías Inter y Manrope (licencia OFL) servidas desde `public/fonts/`.

## Estructura

```
web/
├── astro.config.mjs          # Adaptador, sitemap (lista PUBLIC_PAGES)
├── wrangler.dev.jsonc        # SOLO desarrollo local (D1/R2 simulados). En producción todo se configura en el panel de Cloudflare.
├── public/
│   ├── images/               # Fotos del sitio: .webp + versión -640.webp para celular (las .jpg originales se conservan)
│   ├── brand/                # Emblema circular del encabezado (Kit de identidad v2)
│   ├── fonts/                # Inter y Manrope (woff2, subconjunto latino) + licencias
│   ├── _headers / _redirects # Solo aplican a archivos estáticos; las páginas usan src/middleware.ts
│   └── robots.txt
└── src/
    ├── middleware.ts         # www → sin www, barra final, cabeceras de seguridad, carga del contenido, acceso a /admin
    ├── data/site.ts          # Datos fijos del negocio (nombre legal, GA4, servicios) y valores iniciales de contacto
    ├── i18n/index.ts         # Textos en inglés y español (valores por defecto)
    ├── lib/
    │   ├── schema.ts         # QUÉ se puede editar en /admin (secciones y campos). Fuente única de formularios y validación
    │   ├── content.ts        # Contenido por defecto, combinación con D1, validación, historial, buildCopy() y siteInfo()
    │   ├── media.ts          # Subida a R2, limpieza de fotos sin uso, srcset
    │   ├── auth.ts           # Contraseña única, cookie firmada, límite de intentos
    │   └── db.ts             # Tablas de D1 (se crean solas)
    ├── components/
    │   ├── Landing.astro     # Inicio (EN y ES)
    │   ├── PromoBanner.astro # Franja superior animada (se enciende en /admin)
    │   ├── BrandMark.astro   # Emblema + nombre del encabezado
    │   ├── BuiltBy.astro     # "Sitio desarrollado por Aimarktech"
    │   └── admin/            # Campos y script del panel
    └── pages/
        ├── index.astro, es/index.astro, services/*, es/servicios/*, privacy, terms, ...
        ├── api/quote.ts      # Formulario de cotización (antes functions/api/quote.js)
        ├── media/[...key].ts # Fotos de R2
        └── admin/            # Panel: entrar, secciones, historial, subir fotos, salir
```

## Panel `/admin`

- **Dirección:** https://lopezsealcoating.com/admin (una sola contraseña, `ADMIN_PASSWORD`; la sesión dura 12 horas).
- **Secciones:** franja superior (encender/apagar y mensajes), portada (textos y foto), franja de confianza, servicios,
  fotos de trabajos (agregar, quitar y ordenar), antes y después, sobre nosotros, preguntas frecuentes, contacto y
  redes (teléfono, WhatsApp, correo, Facebook, Instagram, reseñas y ciudades).
- Cada texto tiene inglés y español. Si uno se deja vacío, se usa el otro.
- Las fotos se reducen en el navegador (máx. 1600 px + versión de 640 px) y se convierten a WebP antes de subir.
- **Historial:** cada guardado conserva la versión anterior (últimas 30) y se puede restaurar.
- Las fotos quitadas se borran de R2 a los 7 días si tampoco están en el historial.
- No se editan en el panel: videos, páginas de cada servicio, textos legales, títulos para Google y GA4.
- **Si D1 no está conectada**, el sitio público se ve con los valores por defecto (los de este repositorio) y el panel
  avisa qué falta. Nunca se cae el sitio por eso.

Para hacer editable algo nuevo: agrega el campo en `src/lib/schema.ts`, su valor por defecto en `DEFAULT_CONTENT`
(`src/lib/content.ts`) y úsalo en la plantilla.

## Configuración en Cloudflare (una sola vez)

El proyecto de **Cloudflare Pages** está conectado a este repositorio:

| Ajuste | Valor |
|---|---|
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | `web` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Para el panel (hacerlo **antes** de publicar el cambio del panel, o volver a desplegar después):

1. **Base de datos:** *Storage & databases* → *D1 SQL Database* → *Create* → nombre `lopez-sealcoating`. Las tablas se
   crean solas en la primera visita.
2. **Fotos:** *R2 Object Storage* → *Create bucket* → `lopez-sealcoating-media` (ubicación automática).
3. **Vínculos:** *Workers & Pages* → proyecto del sitio → *Settings* → *Bindings* → *Add* (entorno **Production**):
   - *D1 database* → nombre de la variable **`DB`** → base `lopez-sealcoating`.
   - *R2 bucket* → nombre de la variable **`MEDIA`** → bucket `lopez-sealcoating-media`.
4. **Secretos:** *Settings* → *Variables and Secrets* → *Add* → tipo *Secret* (entorno **Production**):
   - `ADMIN_PASSWORD`: contraseña larga del panel (se la das a Demetrio).
   - `SESSION_SECRET`: cadena aleatoria de 32 caracteres o más (nadie la necesita saber).
5. **Volver a desplegar** si el cambio ya estaba publicado: *Deployments* → el último → *Retry deployment*
   (los vínculos y secretos nuevos se aplican en el siguiente despliegue).

No se usa un `wrangler.toml`/`wrangler.jsonc` para Pages a propósito: si existiera, Cloudflare tomaría ese archivo como
configuración y dejaría de aceptar las variables y vínculos del panel.

### Variables del formulario (ya configuradas)

| Variable | Obligatoria | Valor |
|---|---|---|
| `BREVO_API_KEY` | Sí | Clave API v3 de Brevo |
| `LEAD_NOTIFY_TO` | Recomendada | Correo que recibe los leads (`info@lopezsealcoating.com`) |
| `BREVO_SENDER_EMAIL` | Recomendada | Remitente **verificado** en Brevo |
| `BREVO_SENDER_NAME` | Opcional | Ej. `Lopez Sealcoating Web` |
| `BREVO_LIST_ID` | Opcional | Si se quiere guardar el lead en una lista de Brevo |

## Desarrollo local

```bash
cd web
npm install
npm run dev      # http://localhost:4321  (D1 y R2 simulados con wrangler.dev.jsonc; contraseña: prueba-local-1234)
npm run build    # genera dist/ (dist/_worker.js es el Worker de Pages)
npx astro check  # revisión de tipos
```

## Pendientes

- [x] Dominio lopezsealcoating.com + www con SSL. _(www redirige a la dirección sin www desde `src/middleware.ts`.)_
- [x] Correo profesional `info@lopezsealcoating.com` (Email Routing + Brevo autenticado; formulario operativo).
- [x] `insured: false` (Demetrio no cuenta con seguro; no se muestra "Licensed & Insured"). Sí se muestra "LLC".
- [x] Ciudades reales (base Hanover Park; 16 ciudades). Ahora se editan en el panel.
- [x] Fotos y videos reales; comparación de la misma entrada circular (ver `guias/correccion-medios-2026-09-15.md`).
- [x] Google Analytics 4 (`gaMeasurementId`) con eventos de lead, llamada y WhatsApp.
- [x] Fotos en WebP con versión de 640 px para celular (nov. 2026).
- [x] `og-image.png` del kit de marca.
- [x] Logo: emblema circular en el encabezado (aprobado por Demetrio, nov. 2026) y logo principal en el pie.
- [x] Panel `/admin` (nov. 2026). Falta la configuración en Cloudflare descrita arriba.
- [ ] Enlace directo de reseñas de Google (`g.page/r/.../review`) en el panel → Contacto y redes, cuando Demetrio lo tenga.
