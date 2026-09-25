# Guía: entrar y usar Google Analytics (Lopez Sealcoating)

**Para:** Lopez Sealcoating LLC
**Situación:** el sitio ya tiene Google Analytics instalado y funcionando. Solo falta que entres a la cuenta correcta para verlo.

> **Tu "huella" para identificar la cuenta correcta:**
> El **ID de medición** de tu sitio es **`G-RV5L2W8YXZ`**.
> La propiedad de Analytics que tenga ese ID es la buena. Con esto identificamos, sin dudas, en cuál de tus cuentas está.
>
> **Nota:** Google cambia seguido los nombres de los botones y el diseño. Si algo no se ve idéntico, busca palabras parecidas; el orden general es el mismo.

---

## PARTE 0 — Encontrar en cuál de tus cuentas está

Como tienes varias cuentas de Google, hay que probar cuál tiene la propiedad. Es rápido:

1. Ve a **https://analytics.google.com**
2. Inicia sesión con **una** de tus cuentas.
3. ¿Qué ves?
   - Si arriba a la izquierda aparece un **selector de propiedad** con algo como **"Lopez Sealcoating"** → **¡esa cuenta es!** Pasa a la Parte 2 para confirmar por el ID.
   - Si dice **"Empezar a medir" / "Start measuring"** o no hay ninguna propiedad → esa cuenta **no** es; prueba otra.
4. Para **cambiar de cuenta**: haz clic en tu **foto/inicial (arriba a la derecha)** y elige otra cuenta; o cierra sesión y entra con otro correo.
5. Repite hasta encontrar la cuenta que muestra la propiedad de Lopez Sealcoating.

> **Pista:** suele ser el correo con el que se **creó** Analytics (puede ser el del negocio, el tuyo personal, o el de quien lo configuró). Prueba primero los más probables.
>
> **Truco rápido:** si tienes muchas cuentas, usa una **ventana de incógnito** para probar de una en una sin enredarte.

---

## PARTE 1 — Entrar y abrir la propiedad

1. En **https://analytics.google.com**, ya con la cuenta correcta.
2. Arriba a la izquierda, abre el **selector de propiedad** (dice el nombre de la cuenta/propiedad con una flechita ▾).
3. Elige **"Lopez Sealcoating"**.

---

## PARTE 2 — Confirmar que es la propiedad correcta (por el ID)

Así te aseguras al 100% de que es la buena:

1. Abajo a la izquierda, haz clic en **"Administrar" / "Admin"** (el **engrane ⚙️**).
2. En la columna de la **Propiedad**, entra a **"Flujos de datos" / "Data streams"**.
3. Haz clic en el flujo de datos del sitio web (aparecerá `lopezsealcoating.com`).
4. Busca el **"ID de medición" / "Measurement ID"** (arriba a la derecha del panel): debe decir **`G-RV5L2W8YXZ`**.
   - ✅ Si coincide → es la cuenta y la propiedad correctas.
   - ❌ Si no coincide o no hay flujo → prueba con otra cuenta (Parte 0).

---

## PARTE 3 — Comprobar que está midiendo (Tiempo real)

1. En el menú de la izquierda: **"Informes" → "Tiempo real" / "Realtime"**.
2. En otra pestaña del navegador, abre **https://lopezsealcoating.com**
3. Regresa a Analytics: en unos segundos deberías verte como **1 usuario activo**.
   - Eso confirma que la medición está viva y funcionando. 🎉

---

## PARTE 4 — Enlazar Analytics con Search Console (recomendado)

Así podrás ver, dentro de Analytics, **con qué palabras te encuentra la gente** en Google.

1. Abajo a la izquierda, **"Administrar" / "Admin"** (⚙️).
2. En la columna de la **Propiedad**, busca **"Vínculos con Search Console" / "Search Console links"**.
3. Haz clic en **"Vincular" / "Link"**.
4. Elige la propiedad de Search Console de **lopezsealcoating.com** y **confirma**.

---

## PARTE 5 — Qué puedes ver (lo útil para el negocio)

- **Tiempo real:** cuánta gente está ahora en el sitio.
- **Informes → Adquisición:** de dónde llegan las visitas (Google, Facebook, Instagram, directo).
- **Eventos:** ya dejamos configurados estos, que son "contactos":
  - `call_click` — clics en el teléfono
  - `whatsapp_click` — clics en WhatsApp
  - `generate_lead` — envíos del formulario de cotización

  Con eso sabrás **cuántas personas te contactaron** desde el sitio.

---

## Si de plano no encuentras la cuenta

No hay problema. Dos caminos:

1. Sigue probando cuentas: el **ID `G-RV5L2W8YXZ`** en "Flujos de datos" es la prueba definitiva.
2. Si no aparece en **ninguna** de tus cuentas: podemos **crear una propiedad nueva** de Analytics con la **cuenta del negocio** (la que tú quieras usar de aquí en adelante), y yo **cambio el ID en el sitio** (es una sola línea). Así medirás todo desde tu propia cuenta. Solo avísame y lo hacemos.

---

## Checklist rápido

- [ ] Probar cada cuenta en `analytics.google.com`
- [ ] Encontrar y seleccionar la propiedad "Lopez Sealcoating"
- [ ] Confirmar el ID `G-RV5L2W8YXZ` en "Flujos de datos"
- [ ] Ver "Tiempo real" con el sitio abierto (verte como usuario activo)
- [ ] Vincular Analytics con Search Console

¿Dudas en algún paso? Escríbeme y lo hacemos juntos. 💪
