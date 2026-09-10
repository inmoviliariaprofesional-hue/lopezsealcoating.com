# Correos y formulario — Lopez Sealcoating LLC

Guía de configuración para:
- **A) Correo profesional** `info@lopezsealcoating.com` con **Cloudflare Email Routing** (reenvío gratis al Gmail).
- **B) Brevo** para el envío del formulario "Free Estimate" (correo transaccional).
- **C) Variables de entorno** en Cloudflare Pages.

> Preparado por Aimarktech. Todo el trabajo se hace en los paneles de **Cloudflare** y **Brevo**; el sitio ya está listo para usarlo (`functions/api/quote.js`).

---

## ⚠️ Regla de oro del DNS (leer primero)

Un dominio **solo puede tener UN registro SPF** (`v=spf1 ...`). Cloudflare Email Routing
crea el suyo automáticamente. Si Brevo pide agregar SPF, **NO crees un segundo
registro**: **fusiona** ambos en uno solo. Ejemplo del registro final fusionado:

```
v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all
```

Lo mismo con **DMARC**: solo puede existir **un** registro DMARC.

---

## A) Cloudflare Email Routing — `info@lopezsealcoating.com`

Sirve para **recibir** correos en `info@` y **reenviarlos** al Gmail de Demetrio. Es gratis.

1. En Cloudflare, entra al dominio **lopezsealcoating.com** → menú **Email** → **Email Routing** → **Get started / Enable**.
2. Cloudflare **agrega solo** los registros necesarios (MX + un SPF). Acéptalos.
3. **Destination addresses** → agrega el **Gmail de Demetrio** como destino. Cloudflare le envía un correo de verificación; Demetrio debe **hacer clic para confirmar**.
4. **Routing rules → Custom addresses → Create address:**
   - Dirección: `info@lopezsealcoating.com`
   - Acción: **Send to** → el Gmail verificado.
5. (Opcional) Activa **Catch-all** para que cualquier `loquesea@lopezsealcoating.com` también llegue al Gmail.
6. **Prueba:** manda un correo a `info@lopezsealcoating.com` → debe llegar al Gmail.

> Nota: Email Routing **solo recibe/reenvía**. Para **responder mostrando** `info@…`
> se puede configurar "Enviar como" en Gmail usando el SMTP de Brevo (opcional, más abajo).

---

## B) Brevo — envío del formulario

El formulario del sitio manda los leads por correo usando la **API de Brevo**.

### B.1 Cuenta y autenticación del dominio (recomendado para que no caiga en spam)
1. Crea/entra a la cuenta de **Brevo** (el plan gratis sirve para empezar).
2. Ve a **Settings → Senders, Domains & Dedicated IPs → Domains → Add a domain** → `lopezsealcoating.com` → **Authenticate**.
3. Brevo te mostrará **los registros exactos** a publicar (suelen ser):
   - Un **TXT** con el *código Brevo* (verificación).
   - **Dos CNAME** de **DKIM** (`brevo1._domainkey`, `brevo2._domainkey`).
   - Un **TXT de DMARC** (si aún no tienes uno).
   - Posiblemente un **SPF** (`include:spf.brevo.com`).
4. Copia esos registros a **Cloudflare → DNS → Records**. Reglas:
   - Los registros de correo (TXT/CNAME) van **sin proxy** (DNS only / nube gris).
   - **SPF:** si ya existe el de Email Routing, **fusiónalo** (ver "Regla de oro" arriba). No dupliques.
   - **DMARC:** si ya existe uno, no crees otro; ajusta el que hay.
5. Vuelve a Brevo y pulsa **Verify / Authenticate** hasta que quede en verde.

### B.2 Remitente
- Con el dominio autenticado, puedes enviar **desde** `info@lopezsealcoating.com`.
- Alternativa rápida: **Senders → Add a sender** → `info@lopezsealcoating.com`. Brevo manda un
  código a ese correo (llega al Gmail vía Email Routing) → confirmar.

### B.3 Clave API (obligatoria para el formulario)
1. **Settings → SMTP & API → API Keys → Generate a new API key** (v3).
2. **Cópiala y guárdala** (solo se muestra una vez).

### B.4 (Opcional) Lista de contactos
- Si quieres guardar cada lead en una lista: **Contacts → Lists → New list** y anota su **ID** (para `BREVO_LIST_ID`).

---

## C) Variables de entorno en Cloudflare Pages

1. **Workers & Pages → (proyecto del sitio) → Settings → Variables and secrets** → entorno **Production**.
2. Agrega:

   | Variable | Valor sugerido | Notas |
   |---|---|---|
   | `BREVO_API_KEY` | *(la clave v3 de Brevo)* | Márcala como **Secret / Encrypt** |
   | `LEAD_NOTIFY_TO` | `info@lopezsealcoating.com` | A dónde llegan los leads (reenvía al Gmail) |
   | `BREVO_SENDER_EMAIL` | `info@lopezsealcoating.com` | **Debe estar autenticado/verificado en Brevo** |
   | `BREVO_SENDER_NAME` | `Lopez Sealcoating` | Nombre del remitente |
   | `BREVO_LIST_ID` | *(opcional)* | Solo si creaste una lista en B.4 |

3. **Importante:** las variables aplican **en el siguiente despliegue**. Ve a **Deployments** y usa **Retry deployment / Redeploy** (o haz un push) para que tomen efecto.
4. **Prueba:** en el sitio publicado, llena y envía el formulario "Free Estimate". Debe llegar un correo a `LEAD_NOTIFY_TO`.
   - Si falta `BREVO_API_KEY`, el sitio muestra el error y ofrece **llamar/WhatsApp** (siempre funcionan).

---

## Pendiente de código (lo hace Aimarktech tras activar lo anterior)
Cuando `info@lopezsealcoating.com` ya reciba correos y Brevo esté autenticado, se actualiza
en el sitio el correo visible (footer y datos de Google) de `lopezsealcoating24@gmail.com`
a `info@lopezsealcoating.com` (`web/src/data/site.ts` y el valor por defecto de `functions/api/quote.js`).

---

## Checklist rápido
- [ ] Email Routing activo y `info@` reenvía al Gmail (probado).
- [ ] Dominio autenticado en Brevo (DKIM/DMARC en verde), SPF **fusionado** en un solo registro.
- [ ] `BREVO_API_KEY` y demás variables en Cloudflare Pages (Production).
- [ ] Redeploy hecho.
- [ ] Formulario probado end-to-end (llega el lead).
- [ ] (Después) Cambiar el correo visible del sitio a `info@lopezsealcoating.com`.

---

_Aimarktech · soyaimarktech.com_
