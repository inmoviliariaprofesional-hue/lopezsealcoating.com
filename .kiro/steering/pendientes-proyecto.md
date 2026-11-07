---
inclusion: always
---

# Decisiones y pendientes del proyecto — Lopez Sealcoating

## Antes/Después: usar SIEMPRE fotografías de la misma propiedad

**Estado:** ✅ RESUELTO el 15 de septiembre de 2026.

### Regla permanente

Cualquier comparación "antes / después" en el sitio debe usar fotografías de la **misma propiedad y el mismo trabajo**, con encuadre comparable y fotos completas (sin recortes engañosos, sin filtros ni reconstrucciones con IA). **No** volver a colocar fotografías de propiedades distintas una junto a otra bajo un lenguaje de transformación: eso genera desconfianza.

### Cómo se resolvió

- Se reemplazó el par anterior (`before.jpg` = casa de dos pisos con portón blanco, junto a `after.jpg` = otra entrada circular) por un par **real y verificado de la misma entrada circular**:
  - `web/public/images/circular-driveway-before.webp` (asfalto desgastado)
  - `web/public/images/circular-driveway-after.webp` (recién sellado)
  - Coincidencia confirmada por fachada, garaje, franja de piedra, isla de jardín con rocas y curva del acceso.
- Se muestran completas, con los rótulos "Antes / Después" **fuera** de la imagen (`t.projectComparison`).
- Las demás fotos pasaron a una galería separada "Otros proyectos" / "More projects", presentadas como trabajos independientes.
- La sección del propietario dejó de usar la captura borrosa (`owner-demetrio.jpg`) como retrato; ahora usa el **reel real de la marca** (`web/public/videos/lopez-sealcoating-introduction.mp4`) con controles y sin reproducción automática.
- Los archivos antiguos (`before.jpg`, `after.jpg`, `owner-demetrio.jpg`) se conservan en el repositorio como histórico, pero **ya no se referencian** desde el sitio.

Procedencia y verificaciones detalladas: `guias/correccion-medios-2026-09-15.md`.

## Panel `/admin` y contenido editable (noviembre 2026)

- El sitio dejó de ser estático: Astro genera las páginas al momento (`@astrojs/cloudflare`, Cloudflare Pages) y lee de **D1** (`DB`) los textos y fotos que Demetrio edita en `/admin`. Las fotos subidas viven en **R2** (`MEDIA`). Mismo modelo que metalesinfinity.com. Detalles y pasos de configuración: `web/README.md`.
- **Qué es editable lo define `web/src/lib/schema.ts`** (formularios y validación) junto con `DEFAULT_CONTENT` en `web/src/lib/content.ts`. Los textos de `web/src/i18n` y los datos de `web/src/data/site.ts` son los valores por defecto: si cambias uno que también se edita en el panel, el sitio sigue mostrando lo que Demetrio guardó.
- **No crear `wrangler.toml` ni `wrangler.jsonc` en `web/`**: Cloudflare Pages lo tomaría como configuración y dejaría de usar las variables y vínculos del panel (incluidas las de Brevo). El archivo local se llama `wrangler.dev.jsonc` a propósito.
- La carpeta `functions/` ya no se usa (Pages la ignora con `_worker.js`). Rutas de servidor: `web/src/pages/api/` y `web/src/pages/admin/`. `public/_headers` y `public/_redirects` solo cubren archivos estáticos; las cabeceras y redirecciones de las páginas están en `web/src/middleware.ts`.
- Al agregar una página pública, súmala a `PUBLIC_PAGES` en `web/astro.config.mjs` (sitemap).
- Franja superior (antes `promoActive`): apagada por defecto; Demetrio la enciende en `/admin` → "Franja superior". Toda promoción debe decir sus fechas.
- Galería "Otros proyectos": marco vertical 3:4 con `object-contain` (las fotos horizontales se ven completas, sin recorte).
- Pie de página: "Website by / Sitio desarrollado por **Aimarktech**" (`BuiltBy.astro`), discreto, como en metalesinfinity.com.
- Encabezado: emblema circular + nombre en Manrope (`BrandMark.astro`). Demetrio aprobó el emblema circular y la firma horizontal (nov. 2026); la firma horizontal del kit tiene letras oscuras, por eso en el encabezado oscuro se arma con HTML.
- Fotos del sitio: `.webp` + versión `-640.webp` (registradas en `STATIC_WIDTHS`, `web/src/lib/media.ts`). Las `.jpg` originales se conservan.
- Flujo de PR: José Antonio autoriza cada fusión; preguntar antes de fusionar.
