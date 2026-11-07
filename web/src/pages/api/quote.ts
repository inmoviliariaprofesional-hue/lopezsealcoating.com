// Recibe el formulario "Free Estimate" y envía la solicitud por correo con la API transaccional de Brevo.
// Antes era functions/api/quote.js (Pages Function); con las páginas generadas por Astro, Cloudflare Pages ignora
// la carpeta functions/, así que vive aquí. Mismo comportamiento y mismas variables:
//   BREVO_API_KEY      (obligatoria)  -> clave API de Brevo (v3)
//   LEAD_NOTIFY_TO     (recomendada)  -> correo donde se reciben los leads (info@lopezsealcoating.com)
//   BREVO_SENDER_EMAIL (recomendada)  -> remitente verificado en Brevo
//   BREVO_SENDER_NAME  (opcional)     -> nombre del remitente
//   BREVO_LIST_ID      (opcional)     -> si se define, agrega el lead a esa lista
import type { APIRoute } from "astro";

const DEFAULT_EMAIL = "info@lopezsealcoating.com";

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

const esc = (s = "") => String(s).replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);
const field = (v: unknown, max: number) => (v ?? "").toString().trim().slice(0, max);

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env ?? ({} as Env);
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: si "company" viene con texto, es spam. Respondemos ok sin enviar.
  if (data.company) return json({ ok: true });

  const name = field(data.name, 120);
  const phone = field(data.phone, 40);
  const email = field(data.email, 200);
  const service = field(data.service, 80);
  const message = field(data.message, 4000);
  const city = field(data.city, 120);
  const lang = field(data.lang, 5);

  if (!name || !phone) return json({ ok: false, error: "missing_fields" }, 422);

  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) return json({ ok: false, error: "email_not_configured" }, 500);

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
      <tr><td><b>Ciudad/CP</b></td><td>${esc(city) || "—"}</td></tr>
      <tr><td><b>Idioma</b></td><td>${esc(lang) || "—"}</td></tr>
      <tr><td valign="top"><b>Mensaje</b></td><td>${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
    </table>
    <p style="color:#777;font-size:12px">Enviado desde el sitio web de Lopez Sealcoating.</p>
  `;

  const payload: Record<string, unknown> = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: notifyTo }],
    subject: `Nueva cotización – ${name}${service ? " (" + service + ")" : ""}`,
    htmlContent,
  };
  // Si el cliente dejó su correo, permitimos responderle directo.
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) payload.replyTo = { email, name };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Brevo rechazó el correo del formulario", res.status, await res.text());
      return json({ ok: false, error: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("No se pudo conectar con Brevo", err);
    return json({ ok: false, error: "network" }, 502);
  }

  // Opcional: agregar el lead a una lista de Brevo (best-effort, no bloquea la respuesta).
  if (env.BREVO_LIST_ID && email) {
    try {
      await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
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
};

export const GET: APIRoute = () => json({ ok: false, error: "method_not_allowed" }, 405);
