# Guía paso a paso: aparecer en Google (Search Console + Analytics)

**Para:** Lopez Sealcoating LLC
**Objetivo:** que el sitio `https://lopezsealcoating.com` sea encontrado por Google.

> **Antes de empezar — muy importante:**
> Haz todo esto con **una sola cuenta de Google**, de preferencia la **cuenta del negocio** (la misma con la que se administra el Perfil de Empresa de Google y Google Analytics). Si usas cuentas distintas, la verificación rápida no funcionará.
>
> **Nota:** Google cambia seguido los nombres de los botones y el diseño de sus pantallas. Si algo no se ve **idéntico** a lo aquí descrito, busca palabras parecidas; el orden general es el mismo.

---

## Resumen de lo que vamos a hacer

1. Dar de alta el sitio en **Google Search Console** y **verificarlo** (usando Google Analytics, que ya está instalado).
2. **Enviar el sitemap** y **pedir la indexación** de la página principal.
3. Confirmar y usar **Google Analytics** y enlazarlo con Search Console.
4. **Enlazar el sitio** en el Perfil de Empresa de Google y en las redes.
5. (Opcional) Registrar el sitio en **Bing**.
6. **Comprobar** que ya aparece.

Tiempo aproximado: 20–30 minutos. Después, Google puede tardar de **unos días a 2–4 semanas** en mostrar el sitio.

---

# PARTE 1 — Google Search Console

Search Console es la herramienta gratuita de Google para decirle "aquí está mi sitio, indéxalo" y para ver cómo te encuentra la gente.

## Paso 1. Entrar

1. Ve a **https://search.google.com/search-console**
2. Inicia sesión con la **cuenta de Google del negocio**.
3. Si es tu primera vez, verás un botón **"Empezar ahora" / "Start now"**.

## Paso 2. Agregar la propiedad (elige "Prefijo de la URL")

Google te ofrece dos tipos de propiedad:

- **Dominio** (cubre todo, pero **obliga** a verificar por DNS).
- **Prefijo de la URL** (más flexible para verificar). **← usaremos esta.**

Pasos:

1. En el recuadro **"Prefijo de la URL" / "URL prefix"**, escribe exactamente:
   ```
   https://lopezsealcoating.com
   ```
2. Haz clic en **"Continuar" / "Continue"**.

> ¿Por qué "Prefijo de la URL"? Porque permite verificar con **Google Analytics**, que ya está puesto en tu sitio. Es el camino más rápido y sin tocar código.

## Paso 3. Verificar la propiedad (método Google Analytics)

1. En la ventana de métodos de verificación, busca y abre **"Google Analytics"**.
2. Requisitos (ya se cumplen en tu caso):
   - El código de Google Analytics (GA4, ID **G-RV5L2W8YXZ**) ya está instalado en el sitio.
   - Estás con una cuenta de Google que tiene permiso de **edición** en esa propiedad de Analytics.
3. Haz clic en **"Verificar" / "Verify"**.
4. Debe salir **"Se verificó la propiedad" / "Ownership verified"**. ¡Listo!

**Si la verificación por Analytics falla** (por ejemplo, porque la cuenta no tiene permisos), usa uno de estos métodos alternativos:

- **Registro DNS (TXT) en Cloudflare** — pídeme el valor exacto y te lo doy; se pega en Cloudflare → DNS → Add record (Type: TXT).
- **Archivo HTML** — yo puedo agregar al sitio el archivo que Google te pida (lo subo en un cambio pequeño) y luego tú das "Verificar".

## Paso 4. Enviar el sitemap

El sitemap es la lista de todas tus páginas. Ya está generado automáticamente.

1. En el menú de la izquierda, entra a **"Sitemaps"**.
2. En **"Agregar un sitemap nuevo"**, escribe:
   ```
   sitemap-index.xml
   ```
   (el sitio ya lo tiene en `https://lopezsealcoating.com/sitemap-index.xml`)
3. Haz clic en **"Enviar" / "Submit"**.
4. Puede aparecer "Correcto/Success" o, al principio, "No se pudo obtener". Si sale eso, espera unas horas y vuelve a revisar; es normal en sitios nuevos.

## Paso 5. Pedir la indexación de la página principal

1. Arriba, en la barra de búsqueda de Search Console (dice **"Inspeccionar cualquier URL"**), pega:
   ```
   https://lopezsealcoating.com/
   ```
   y presiona Enter.
2. Google la analizará. Haz clic en **"Solicitar indexación" / "Request indexing"**.
3. Repite lo mismo con la versión en español y las páginas importantes:
   - `https://lopezsealcoating.com/es/`
   - `https://lopezsealcoating.com/services/driveway-sealcoating/`
   - `https://lopezsealcoating.com/services/parking-lot-striping/`

> Esto no garantiza aparecer de inmediato, pero acelera mucho el descubrimiento.

## Paso 6. Qué revisar los días siguientes

- **"Páginas" / "Indexación"**: verás cuántas páginas quedaron indexadas.
- **"Rendimiento" / "Performance"**: cuando empieces a salir en búsquedas, aquí verás impresiones y clics.
- Ten paciencia: es normal que tome de días a semanas.

---

# PARTE 2 — Google Analytics

No hay que instalar nada nuevo: **Analytics ya está funcionando** en el sitio (ID **G-RV5L2W8YXZ**). Aquí solo confirmamos que recibe datos y lo enlazamos con Search Console.

## Paso 1. Confirmar que recibe datos

1. Ve a **https://analytics.google.com** e inicia sesión.
2. Entra a la propiedad de Lopez Sealcoating.
3. En el menú, abre **"Informes" → "Tiempo real" / "Realtime"**.
4. En otra pestaña, abre `https://lopezsealcoating.com`. Deberías verte reflejado como 1 usuario activo. Eso confirma que la medición funciona.

## Paso 2. Enlazar Analytics con Search Console (recomendado)

Así puedes ver, dentro de Analytics, con qué palabras te encuentra la gente en Google.

1. En Analytics, abre **"Administrar" / "Admin"** (el engrane, abajo a la izquierda).
2. En la columna de la propiedad, busca **"Vínculos de Search Console" / "Search Console links"**.
3. Haz clic en **"Vincular" / "Link"**, elige tu propiedad de Search Console y confirma.

---

# PARTE 3 — Enlazar el sitio en tu Perfil de Empresa y redes

Esto ayuda a que Google descubra el sitio más rápido y a que aparezca junto a tu negocio.

## A. Perfil de Empresa de Google (Google Business Profile)

1. Con la cuenta del negocio, busca en Google **"mi empresa"** o **"Lopez Sealcoating"** para abrir tu panel de administración.
2. Entra a **"Editar perfil" → "Contacto"**.
3. En el campo **"Sitio web"**, pon:
   ```
   https://lopezsealcoating.com
   ```
4. Guarda. (Ahora, al buscar tu negocio, el panel lateral podrá mostrar tu sitio.)

## B. Facebook e Instagram

- **Facebook:** entra a tu página → "Editar información / Acerca de" → campo **"Sitio web"** → pon `https://lopezsealcoating.com`.
- **Instagram:** "Editar perfil" → campo **"Sitio web / Enlace"** → pon `https://lopezsealcoating.com`.

Estos enlaces (desde sitios que Google ya rastrea) ayudan a que encuentre el tuyo.

---

# PARTE 4 — (Opcional) Bing y otros buscadores

Bing es el buscador de Microsoft (y alimenta a otros). Es muy fácil:

1. Ve a **https://www.bing.com/webmasters** e inicia sesión.
2. Elige **"Importar desde Google Search Console"** (un clic) — trae tu sitio y el sitemap automáticamente.
3. Listo.

---

# PARTE 5 — Cómo comprobar si ya apareces

En Google, busca exactamente esto:

```
site:lopezsealcoating.com
```

- Si **no sale nada** → todavía no está indexado (normal las primeras semanas).
- Si **salen tus páginas** → ¡ya está indexado! 🎉

---

# Preguntas frecuentes

**¿Por qué salía mi Facebook y no mi sitio?**
Porque `facebook.com` es un sitio enorme que Google rastrea constantemente. Tu dominio es nuevo y aún no tiene "autoridad" ni enlaces; por eso hay que avisarle a Google (Search Console) y darle tiempo.

**¿Cuánto tarda en aparecer?**
De unos días a 2–4 semanas después de enviar el sitemap y pedir indexación. Las búsquedas de tu **nombre** ("Lopez Sealcoating") aparecen antes; posicionar por **servicio** ("sealcoating Hanover Park") toma más tiempo y depende de reseñas, contenido y enlaces.

**¿Tengo que volver a tocar el código del sitio?**
No. Todo lo técnico ya está listo (sitio indexable, robots.txt y sitemap correctos). Lo que falta se hace desde Search Console y tu cuenta de Google.

---

## Checklist rápido

- [ ] Entrar a Search Console con la cuenta del negocio
- [ ] Agregar propiedad "Prefijo de la URL": `https://lopezsealcoating.com`
- [ ] Verificar con **Google Analytics**
- [ ] Enviar sitemap `sitemap-index.xml`
- [ ] "Solicitar indexación" de la página principal (y /es/)
- [ ] Confirmar Analytics en "Tiempo real"
- [ ] Enlazar Analytics ↔ Search Console
- [ ] Poner el sitio en el Perfil de Empresa de Google
- [ ] Poner el sitio en Facebook e Instagram
- [ ] (Opcional) Importar el sitio a Bing Webmaster Tools
- [ ] A los días: buscar `site:lopezsealcoating.com`

¿Dudas en algún paso? Escríbeme y lo hacemos juntos. 💪
