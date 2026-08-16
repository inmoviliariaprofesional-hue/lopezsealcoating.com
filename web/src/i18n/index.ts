import type { Lang } from "../data/site";

export interface Copy {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  langSwitchLabel: string;
  langSwitchHref: string;
  nav: { services: string; work: string; area: string; reviews: string; contact: string };
  cta: { call: string; quote: string; whatsapp: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bullets: string[];
  };
  trust: { free: string; spanish: string; local: string; insured: string };
  services: {
    title: string;
    subtitle: string;
    items: { name: string; desc: string }[];
  };
  work: { title: string; subtitle: string; note: string };
  area: { title: string; body: string; note: string };
  reviews: { title: string; body: string; button: string };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    serviceOptions: string[];
    message: string;
    send: string;
    or: string;
    disclaimer: string;
  };
  footer: { rights: string; season: string; tagline: string };
}

const en: Copy = {
  htmlLang: "en",
  metaTitle: "Lopez Sealcoating | Driveway Sealcoating & Line Striping in Chicagoland",
  metaDescription:
    "Professional asphalt sealcoating and parking lot line striping in the Chicago area. Free estimates. Residential & commercial. Hablamos Español.",
  langSwitchLabel: "Español",
  langSwitchHref: "/es/",
  nav: { services: "Services", work: "Our Work", area: "Service Area", reviews: "Reviews", contact: "Free Estimate" },
  cta: { call: "Call Now", quote: "Get a Free Estimate", whatsapp: "WhatsApp" },
  hero: {
    eyebrow: "Chicagoland • Residential & Commercial",
    title: "Protect Your Driveway. Boost Your Curb Appeal.",
    subtitle:
      "Professional asphalt sealcoating and parking lot line striping across the Chicago area. Free estimates, quality work, and we speak your language.",
    bullets: ["Free Estimates", "Licensed work", "Hablamos Español"],
  },
  trust: {
    free: "Free Estimates",
    spanish: "Hablamos Español",
    local: "Local, Chicagoland",
    insured: "Licensed & Insured",
  },
  services: {
    title: "What We Do",
    subtitle: "Two core services to protect and mark your asphalt.",
    items: [
      {
        name: "Driveway Sealcoating",
        desc: "We seal and protect asphalt driveways from water, sun, and cracks — giving them a clean, black, like-new finish that lasts.",
      },
      {
        name: "Parking Lot Line Striping",
        desc: "Sharp, clear striping for parking stalls, crosswalks, and markings — for businesses, lots, and commercial properties.",
      },
      {
        name: "Residential & Commercial",
        desc: "From a single home driveway to a full commercial lot, we scale the job to fit — quoted by the square foot, on-site.",
      },
    ],
  },
  work: {
    title: "Our Work",
    subtitle: "Recent driveways and lots we've sealed and striped.",
    note: "Photos coming soon — add your real project photos here.",
  },
  area: {
    title: "Service Area",
    body: "We proudly serve the greater Chicagoland area within roughly a 40-mile radius — residential and commercial.",
    note: "Not sure if we cover your area? Just call and ask.",
  },
  reviews: {
    title: "What Customers Say",
    body: "People choose the business with the most stars on Google — for good reason. See our reviews or leave one after your job.",
    button: "See us on Google",
  },
  contact: {
    title: "Get Your Free Estimate",
    subtitle: "Tell us about your driveway or lot and we'll get right back to you.",
    name: "Your name",
    phone: "Phone number",
    email: "Email (optional)",
    service: "Service needed",
    serviceOptions: ["Driveway Sealcoating", "Line Striping", "Both / Not sure"],
    message: "Tell us about the job (address, size, details)",
    send: "Request Free Estimate",
    or: "or reach us directly",
    disclaimer: "By submitting, you agree to be contacted about your request.",
  },
  footer: {
    rights: "All rights reserved.",
    season: "Season: May–October (weather permitting).",
    tagline: "Sealcoating & Line Striping — Chicagoland",
  },
};

const es: Copy = {
  htmlLang: "es",
  metaTitle: "Lopez Sealcoating | Sellado de Asfalto y Pintura de Líneas en Chicagoland",
  metaDescription:
    "Sellado de asfalto (sealcoating) y pintura de líneas de estacionamiento en el área de Chicago. Cotizaciones gratis. Residencial y comercial. Hablamos Español.",
  langSwitchLabel: "English",
  langSwitchHref: "/",
  nav: { services: "Servicios", work: "Trabajos", area: "Zona", reviews: "Reseñas", contact: "Cotización Gratis" },
  cta: { call: "Llámanos", quote: "Cotización Gratis", whatsapp: "WhatsApp" },
  hero: {
    eyebrow: "Chicagoland • Residencial y Comercial",
    title: "Protege tu Entrada. Luce Como Nueva.",
    subtitle:
      "Sellado de asfalto y pintura de líneas de estacionamiento en el área de Chicago. Cotizaciones gratis, trabajo de calidad y hablamos tu idioma.",
    bullets: ["Cotizaciones Gratis", "Trabajo profesional", "Hablamos Español"],
  },
  trust: {
    free: "Cotizaciones Gratis",
    spanish: "Hablamos Español",
    local: "Local, Chicagoland",
    insured: "Con Licencia y Seguro",
  },
  services: {
    title: "Qué Hacemos",
    subtitle: "Dos servicios principales para proteger y marcar tu asfalto.",
    items: [
      {
        name: "Sellado de Asfalto (Sealcoating)",
        desc: "Sellamos y protegemos entradas de asfalto contra el agua, el sol y las grietas — con un acabado negro, limpio y como nuevo que dura.",
      },
      {
        name: "Pintura de Líneas de Estacionamiento",
        desc: "Líneas nítidas para cajones, cebras peatonales y señalización — para negocios, estacionamientos y propiedades comerciales.",
      },
      {
        name: "Residencial y Comercial",
        desc: "Desde la entrada de una casa hasta un estacionamiento comercial completo, ajustamos el trabajo — cotizado por pie cuadrado, en sitio.",
      },
    ],
  },
  work: {
    title: "Nuestros Trabajos",
    subtitle: "Entradas y estacionamientos que hemos sellado y pintado.",
    note: "Fotos próximamente — coloca aquí tus fotos reales de trabajos.",
  },
  area: {
    title: "Zona de Servicio",
    body: "Damos servicio en toda el área de Chicagoland, aproximadamente en un radio de 40 millas — residencial y comercial.",
    note: "¿No sabes si cubrimos tu zona? Solo llámanos y pregunta.",
  },
  reviews: {
    title: "Lo Que Dicen los Clientes",
    body: "La gente elige al negocio con más estrellas en Google — y con razón. Mira nuestras reseñas o déjanos una al terminar tu trabajo.",
    button: "Míranos en Google",
  },
  contact: {
    title: "Solicita tu Cotización Gratis",
    subtitle: "Cuéntanos sobre tu entrada o estacionamiento y te respondemos enseguida.",
    name: "Tu nombre",
    phone: "Teléfono",
    email: "Correo (opcional)",
    service: "Servicio que necesitas",
    serviceOptions: ["Sellado de Asfalto", "Pintura de Líneas", "Ambos / No estoy seguro"],
    message: "Cuéntanos del trabajo (dirección, tamaño, detalles)",
    send: "Solicitar Cotización Gratis",
    or: "o contáctanos directo",
    disclaimer: "Al enviar, aceptas que te contactemos sobre tu solicitud.",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    season: "Temporada: mayo–octubre (según el clima).",
    tagline: "Sellado de Asfalto y Pintura de Líneas — Chicagoland",
  },
};

export const translations: Record<Lang, Copy> = { en, es };
