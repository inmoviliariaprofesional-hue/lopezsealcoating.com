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
