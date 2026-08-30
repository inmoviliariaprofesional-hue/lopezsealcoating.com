// Cloudflare Pages Function: recibe el formulario "Free Estimate" del sitio
// y envía la solicitud por correo usando la API transaccional de Brevo.
//
// Variables de entorno (Cloudflare Pages > Settings > Environment variables):
//   BREVO_API_KEY      (obligatoria)  -> clave API de Brevo (v3)
//   LEAD_NOTIFY_TO     (recomendada)  -> correo donde se reciben los leads
//                                        (por ahora el Gmail de Demetrio)
//   BREVO_SENDER_EMAIL (recomendada)  -> remitente verificado en Brevo
//   BREVO_SENDER_NAME  (opcional)     -> nombre del remitente
//   BREVO_LIST_ID      (opcional)     -> si se define, agrega el lead a esa lista
//
// Nota: mientras no exista el dominio/correo profesional, LEAD_NOTIFY_TO y
// BREVO_SENDER_EMAIL pueden apuntar temporalmente a lopezsealcoating24@gmail.com,
// pero el remitente debe estar verificado en Brevo para poder enviar.

const DEFAULT_EMAIL = "lopezsealcoating24@gmail.com";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const esc = (s = "") =>
  String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: si "company" viene con texto, es spam. Respondemos ok sin enviar.
  if (data.company) return json({ ok: true });

  const name = (data.name || "").toString().trim();
  const phone = (data.phone || "").toString().trim();
  const email = (data.email || "").toString().trim();
  const service = (data.service || "").toString().trim();
  const message = (data.message || "").toString().trim();
  const lang = (data.lang || "").toString().trim();

  if (!name || !phone) {
    return json({ ok: false, error: "missing_fields" }, 422);
  }

  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    // Sin clave configurada no podemos enviar; avisamos para que el front muestre error.
    return json({ ok: false, error: "email_not_configured" }, 500);
  }

  const notifyTo = env.LEAD_NOTIFY_TO || DEFAULT_EMAIL;
  const senderEmail = env.BREVO_SENDER_EMAIL || DEFAULT_EMAIL;
  const senderName = env.BREVO_SENDER_NAME || "Lopez Sealcoating Web";

  const htmlContent = `
    <h2>Nueva solicitud de cotización (Free Estimate)</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif">
      <tr><td><b>Nombre</b></td><td>${esc(name)}</td></tr>
      <tr><td><b>Teléfono</b></td><td>${esc(phone)}</td></tr>
      <tr><td><b>Correo</b></td><td>${esc(email) || "—"}</td></tr>
      <tr><td><b>Servicio</b></td><td>${esc(service) || "—"}</td></tr>
      <tr><td><b>Idioma</b></td><td>${esc(lang) || "—"}</td></tr>
      <tr><td valign="top"><b>Mensaje</b></td><td>${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
    </table>
    <p style="color:#777;font-size:12px">Enviado desde el sitio web de Lopez Sealcoating.</p>
  `;

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: notifyTo }],
    subject: `Nueva cotización – ${name}${service ? " (" + service + ")" : ""}`,
    htmlContent,
  };
  // Si el cliente dejó su correo, permitimos responderle directo.
  if (email) payload.replyTo = { email, name };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      return json({ ok: false, error: "send_failed", detail }, 502);
    }
  } catch (err) {
    return json({ ok: false, error: "network", detail: String(err) }, 502);
  }

  // Opcional: agregar el lead a una lista de Brevo (best-effort, no bloquea la respuesta).
  if (env.BREVO_LIST_ID && email) {
    try {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: { NOMBRE: name, SMS: phone, SERVICIO: service },
          listIds: [Number(env.BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      });
    } catch {
      /* no-op */
    }
  }

  return json({ ok: true });
}

// GET u otros métodos: no permitido.
export async function onRequestGet() {
  return json({ ok: false, error: "method_not_allowed" }, 405);
}
