# Corrección de fotografías y video — 15 septiembre 2026

## Problema y solución

La comparación publicada usaba `before.jpg` (una casa de dos pisos con portón blanco) junto a `after.jpg` (una entrada circular frente a otra casa). Además, `owner-demetrio.jpg` era una captura de baja resolución presentada como retrato, que terminaba cortando al trabajador.

Se mantiene la comparación con un par de fotografías de la misma entrada circular. El par se identifica por la fachada, los portones, la franja transversal clara, la isla de vegetación, las rocas y la curva del acceso. Las fotos se muestran completas; no se fuerza un recorte horizontal ni se aplica un filtro para simular el resultado.

La sección de Demetrio incorpora el reel facilitado por Antonio, con música y voz originales, controles visibles, reproducción voluntaria y formato vertical completo. El texto de la tarjeta describe el trabajo del negocio; no presenta una captura como retrato. En español se indica que la narración está en inglés.

## Procedencia exacta

Carpeta facilitada por Antonio: https://drive.google.com/drive/folders/1fWFeinRcRRt70thusl4hzc6y6rp6GpiG

| Uso | Original en Drive | ID | Archivo web |
|---|---|---|---|
| Antes | `1788733053902.jpg` | `1umQcZX1UdIIP6aHYdh1QFUbO8iuezh9x` | `web/public/images/circular-driveway-before.webp` |
| Después | `1788733053889.jpg` | `12x5hBSsCWLCzKTcpwE6qfolFmLjV3LGB` | `web/public/images/circular-driveway-after.webp` |
| Video | `Lopez-Sealcoating-Reel-EN-1080x1920.mp4` | `1pLKOCAH0IEi0kQ0sLRLK7ZyqoEM9XvH4` | `web/public/videos/lopez-sealcoating-introduction.mp4` |

Las imágenes originales miden 1200 × 1600 px; se exportaron a WebP de 960 × 1280 px conservando todo el encuadre. El video mantiene exactamente los bytes del archivo de Drive: H.264/AAC, 1080 × 1920, 26.4 segundos, 12,305,632 bytes. El póster se extrajo del segundo 1, a 540 × 960 px.

No volver a asociar los antiguos `before.jpg` y `after.jpg`. Se mantienen en el repositorio para no eliminar material histórico; ya no se referencian desde la portada.

## Cambios en la página

- Comparación de la misma entrada, con rótulos Antes / Después y textos alternativos específicos.
- Galería adicional separada bajo “Otros proyectos” / “More projects”, con fotos completas y títulos fuera de las imágenes.
- Se elimina “Antes y después” del segundo clip, que muestra aplicación de sellador.
- Reel integrado junto al texto de Demetrio, con `controls`, `playsinline`, `preload="none"` y `object-contain`; sin reproducción automática ni silenciamiento forzado.
- Textos coherentes en inglés y español. El audio del reel permanece en inglés.

## Validación realizada

- `npm ci --no-audit --no-fund` completado con el lockfile existente.
- `npm run build` completado: 11 rutas estáticas.
- Comprobación de los HTML de `/` y `/es/`: rutas de medios existentes, referencias antiguas eliminadas, dimensiones declaradas iguales a las reales y configuración del video correcta.
- SHA-256 del video integrado idéntico al original descargado.
- `git diff --check` sin errores.
- TypeScript completo detecta el mismo TS2322 en `astro.config.mjs` antes y después del cambio (tipos de Vite/Tailwind). No hay diagnósticos nuevos. No se modificaron dependencias ni configuración para esta corrección de medios.

## Estado y revisión antes de publicar

Cambios preparados en la rama `fix/project-photos-and-owner-media`, basada en `160a5fc`. No se han enviado a GitHub ni publicado en Cloudflare: esta sesión no dispone de autenticación para escribir en el repositorio.

La política del navegador de esta sesión bloqueó la vista previa local. Queda pendiente revisar la vista previa de Cloudflare en escritorio y a 360/390 px de ancho, comprobar que se vean ambas fotos completas y reproducir/pausar el reel con sonido. No se afirma haber realizado esa validación visual.

Crear un PR con estos cambios, revisar su vista previa y después integrar en `main`, que es la rama de producción indicada por Antonio. No requiere cambios de DNS, formularios ni variables de entorno.
