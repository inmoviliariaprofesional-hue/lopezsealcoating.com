import { defineMiddleware } from "astro:middleware";
import { loadContent, siteInfo } from "./lib/content";
import { isAdmin } from "./lib/auth";

// Antes vivían en public/_redirects, pero Cloudflare Pages no aplica ese archivo a las páginas que genera el Worker.
const SHORTCUTS: Record<string, string> = {
  "/contact": "/#contact",
  "/contacto": "/es/#contact",
  "/quote": "/#contact",
};

// Cabeceras de seguridad (public/_headers solo cubre los archivos estáticos, no las páginas generadas al momento).
const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const path = url.pathname;
  const env = context.locals.runtime?.env ?? ({} as Env);

  // www → dirección sin www (una sola versión del sitio para Google).
  if (url.hostname.startsWith("www.")) {
    const target = new URL(url);
    target.hostname = url.hostname.slice(4);
    return context.redirect(target.href, 301);
  }

  const method = context.request.method;
  if (method === "GET" || method === "HEAD") {
    const shortcut = SHORTCUTS[path.replace(/\/$/, "")];
    if (shortcut) return context.redirect(shortcut, 301);
    // Igual que cuando el sitio era estático: /es → /es/ y /services/x → /services/x/ (una sola dirección por página).
    const isPage = !path.startsWith("/api/") && !path.startsWith("/media/") && !path.startsWith("/admin") && !path.split("/").pop()!.includes(".");
    if (isPage && path !== "/" && !path.endsWith("/")) return context.redirect(path + "/" + url.search, 308);
  }

  // Fotos de R2 y el formulario no necesitan el contenido del sitio.
  // Las páginas arman sus textos con buildCopy(lang, Astro.locals.content).
  if (!path.startsWith("/media/") && !path.startsWith("/api/")) {
    const content = await loadContent(env.DB);
    context.locals.content = content;
    context.locals.site = siteInfo(content);
  }

  const isAdminPath = path === "/admin" || path.startsWith("/admin/");
  if (isAdminPath && path !== "/admin/entrar" && !(await isAdmin(env, context.cookies))) {
    if (path.startsWith("/admin/api/")) {
      return new Response(JSON.stringify({ error: "Tu sesión terminó. Vuelve a entrar al panel." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return context.redirect("/admin/entrar", 303);
  }

  let response = await next();
  const extra: Record<string, string> = { ...SECURITY_HEADERS };
  if (isAdminPath) Object.assign(extra, { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" });
  try {
    for (const [k, v] of Object.entries(extra)) if (isAdminPath || !response.headers.has(k)) response.headers.set(k, v);
  } catch {
    // Algunas respuestas (redirecciones) traen cabeceras inmutables: se copian a una respuesta nueva.
    response = new Response(response.body, response);
    for (const [k, v] of Object.entries(extra)) response.headers.set(k, v);
  }
  return response;
});
