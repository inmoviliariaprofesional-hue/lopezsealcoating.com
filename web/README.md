# Lopez Sealcoating — Sitio web (Astro + Tailwind)

Sitio bilingüe (EN/ES) de conversión para Lopez Sealcoating LLC.

## Stack

- [Astro](https://astro.build) (salida estática)
- Tailwind CSS v4 (vía `@tailwindcss/vite`)
- Desplegable en **Cloudflare Pages**

## Estructura

```
web/
├── src/
│   ├── data/site.ts        # Datos de contacto y marca (EDITAR AQUÍ)
│   ├── i18n/index.ts        # Textos en inglés y español
│   ├── layouts/Base.astro   # <head>, SEO, JSON-LD
│   ├── components/Landing.astro  # Todas las secciones de la landing
│   └── pages/
│       ├── index.astro      # Inglés  ->  /
│       └── es/index.astro   # Español ->  /es/
└── public/                  # favicon y (próximamente) fotos
```

## Desarrollo local

```bash
cd web
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Despliegue en Cloudflare Pages

| Ajuste | Valor |
|---|---|
| Framework preset | Astro |
| Root directory | `web` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` (después de fusionar) |

## Pendientes (TODO) antes de publicar

- [ ] Reemplazar el correo Gmail por el profesional en `src/data/site.ts`.
- [ ] Poner la URL real de Facebook y el enlace del Perfil de Empresa de Google.
- [ ] Cambiar `insured` a `true` en `site.ts` solo si se confirma el seguro (para mostrar "Licensed & Insured").
- [ ] Subir fotos reales de trabajos a `public/` y conectarlas en la sección "Nuestros Trabajos".
- [ ] Conectar el formulario a un endpoint (Cloudflare Pages Function, Formspree o Brevo).
- [ ] Reemplazar el nombre de texto por el logo original cuando esté listo.
