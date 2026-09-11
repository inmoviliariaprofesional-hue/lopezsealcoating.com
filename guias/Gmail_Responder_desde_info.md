# Responder desde `info@lopezsealcoating.com` en Gmail

Objetivo: que Demetrio, desde su Gmail (**lopezsealcoating24@gmail.com**), pueda **enviar y
responder** correos mostrando **`info@lopezsealcoating.com`** como remitente.

> Gmail usará el **SMTP de Brevo** para enviar. Como el dominio ya está autenticado en Brevo
> (DKIM), los correos salen firmados y con buena entregabilidad.

## Requisitos (ya listos)
- ✅ `info@lopezsealcoating.com` **recibe** correos (Cloudflare Email Routing → reenvía al Gmail).
- ✅ Dominio **autenticado en Brevo**.
- 🔑 Credenciales **SMTP de Brevo** (¡ojo! son distintas de la *clave API*):
  - **Servidor:** `smtp-relay.brevo.com`
  - **Puerto:** `587` (TLS)
  - **Usuario/Login:** el que muestra Brevo en **Configuración → SMTP y API → pestaña "SMTP"**
    (tiene formato **`xxxx@smtp-brevo.com`**). ⚠️ **No** es tu correo, **ni** `smtp-relay.brevo.com`.
  - **Contraseña:** una **clave SMTP** (genérala en esa misma pestaña "SMTP"). ⚠️ **No** es la clave API.

---

## Paso 1 — Consigue las credenciales SMTP en Brevo
1. En Brevo: **Configuración → SMTP y API → pestaña "SMTP"**.
2. Anota el **Login** (formato `xxxx@smtp-brevo.com`).
3. Genera/copia una **clave SMTP** (botón para generar una nueva). Guárdala.

## Paso 2 — Agrega la dirección en Gmail
1. En el Gmail **lopezsealcoating24@gmail.com**: **⚙️ (arriba a la derecha) → "Ver toda la configuración"**.
2. Pestaña **"Cuentas e importación"** → sección **"Enviar como (Send mail as)"** → **"Añadir otra dirección de correo electrónico"**.
3. En la ventana emergente:
   - **Nombre:** `Lopez Sealcoating`
   - **Dirección de correo:** `info@lopezsealcoating.com`
   - Deja marcado **"Tratar como un alias"** → **Siguiente paso**.

## Paso 3 — Configura el envío por SMTP de Brevo
En la siguiente pantalla, captura:
- **Servidor SMTP:** `smtp-relay.brevo.com`
- **Puerto:** `587`
- **Nombre de usuario:** el **Login** de Brevo (`xxxx@smtp-brevo.com`)
- **Contraseña:** la **clave SMTP** de Brevo
- Selecciona **"Conexión segura mediante TLS"** → **"Añadir cuenta"**.

## Paso 4 — Verifica la propiedad
1. Gmail enviará un **código de confirmación** a `info@lopezsealcoating.com`.
2. Ese correo **llega al Gmail** (por el reenvío de Email Routing).
3. Abre el correo, copia el **código** y pégalo en la ventana → **Verificar**.

## Paso 5 — (Opcional) Ajustes recomendados
En **Cuentas e importación → "Enviar como"**:
- **"Responder desde la misma dirección a la que se envió el mensaje"**: actívalo, así las respuestas
  a correos dirigidos a `info@` salen automáticamente como `info@`.
- Si quieres que `info@` sea el remitente por defecto, márcalo como **"Predeterminada"**.

Al redactar o responder, en el campo **"De"** ya podrás elegir **`info@lopezsealcoating.com`**.

---

## Notas y solución de problemas
- **Límite:** el plan gratuito de Brevo permite ~**300 correos/día** (compartidos entre el formulario y estos envíos). Suficiente para responder clientes.
- **Error 535 / autenticación:** casi siempre es porque se usó como usuario el correo de la cuenta o `smtp-relay.brevo.com`. Debe ser el **Login `xxxx@smtp-brevo.com`**, y la contraseña una **clave SMTP** (no la API).
- **Aparece "vía smtp-brevo.com":** en general no aparece porque el dominio está autenticado (DKIM). Si llegara a mostrarse, no afecta la entrega.

_Aimarktech · soyaimarktech.com_
