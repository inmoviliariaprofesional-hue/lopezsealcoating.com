import type { Lang } from "../data/site";

export interface Copy {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  langSwitchLabel: string;
  langSwitchHref: string;
  language: {
    badge: string;
    prompt: string;
    action: string;
    footerPrompt: string;
    aria: string;
  };
  navAria: string;
  nav: { services: string; process: string; work: string; area: string; reviews: string; contact: string };
  cta: { call: string; quote: string; whatsapp: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    bullets: string[];
    visualEyebrow: string;
    visualTitle: string;
    visualSteps: string[];
    visualEstimate: string;
  };
  trust: { free: string; spanish: string; local: string; insured: string };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { number: string; tag: string; name: string; desc: string }[];
  };
  languageBanner: { title: string; body: string; action: string };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { number: string; name: string; desc: string }[];
  };
  work: { eyebrow: string; title: string; subtitle: string; note: string; placeholder: string; labels: string[] };
  video: { eyebrow: string; title: string; subtitle: string; labels: string[] };
  beforeAfter: { eyebrow: string; title: string; subtitle: string; beforeLabel: string; afterLabel: string };
  area: { eyebrow: string; title: string; body: string; note: string; radiusLabel: string; coverageLabel: string; coverageTypes: string[]; citiesLabel: string; citiesNote: string };
  reviews: { eyebrow: string; title: string; body: string; button: string; pending: string };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    projectLabel: string;
    projectTitle: string;
    projectDesc: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    responseTime: string;
    city: string;
    directTitle: string;
    directBody: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    serviceOptions: { value: string; label: string }[];
    message: string;
    send: string;
    or: string;
    disclaimer: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: { rights: string; season: string; tagline: string };
}

const en: Copy = {
  htmlLang: "en",
  metaTitle: "Lopez Sealcoating | Driveway Sealcoating & Line Striping in the Chicagoland Area",
  metaDescription:
    "Professional asphalt sealcoating and parking lot line striping in the Chicago area. Free estimates. Residential & commercial. Hablamos Español.",
  langSwitchLabel: "Español",
  langSwitchHref: "/es/",
  language: {
    badge: "ES",
    prompt: "¿Prefieres español?",
    action: "Ver sitio en español",
    footerPrompt: "Este sitio también está disponible en español.",
    aria: "Cambiar el sitio a español",
  },
  navAria: "Main navigation",
  nav: {
    services: "Services",
    process: "How it works",
    work: "Our Work",
    area: "Service Area",
    reviews: "Reviews",
    contact: "Free Estimate",
  },
  cta: { call: "Call Now", quote: "Get a Free Estimate", whatsapp: "WhatsApp" },
  hero: {
    eyebrow: "Chicagoland Area • Residential & Commercial",
    title: "Driveway sealcoating & line striping",
    accent: "in the Chicagoland Area.",
    subtitle:
      "Protect your asphalt and make a lasting first impression—clear estimates, careful work, and direct communication for homes and businesses.",
    bullets: ["Free on-site estimates", "Quality-focused work", "Hablamos Español"],
    visualEyebrow: "From worn to protected",
    visualTitle: "A cleaner, darker, better-defined surface.",
    visualSteps: ["Seal", "Protect", "Stripe"],
    visualEstimate: "Free estimate",
  },
  trust: {
    free: "Free on-site estimates",
    spanish: "English & Spanish",
    local: "Serving the Chicagoland Area",
    insured: "Licensed & Insured",
  },
  services: {
    eyebrow: "Built for pavement",
    title: "Two specialties. One reliable crew.",
    subtitle: "Focused services for homes, parking lots, and commercial properties.",
    items: [
      {
        number: "01",
        tag: "Residential",
        name: "Driveway Sealcoating",
        desc: "A protective coat that helps shield asphalt from sun, water, and daily wear—finished in a rich, even black.",
      },
      {
        number: "02",
        tag: "Commercial",
        name: "Parking Lot Line Striping",
        desc: "Clean, visible parking stalls, crosswalks, and pavement markings that make your property easier to navigate.",
      },
      {
        number: "03",
        tag: "Flexible scope",
        name: "Homes & Businesses",
        desc: "From one driveway to an entire commercial lot, every project is reviewed on-site and quoted by the square foot.",
      },
    ],
  },
  languageBanner: {
    title: "¿Hablas español? Estamos para ayudarte.",
    body: "Consulta todos los servicios y solicita tu cotización en español.",
    action: "Continuar en español",
  },
  process: {
    eyebrow: "Simple from the start",
    title: "Your estimate in three steps.",
    subtitle: "No complicated process—just a quick conversation, an on-site look, and a clear schedule.",
    steps: [
      { number: "01", name: "Tell us about the job", desc: "Call, text, or send the form with your address and the service you need." },
      { number: "02", name: "Get an on-site estimate", desc: "We visit the property, measure the area, and prepare a free estimate." },
      { number: "03", name: "Choose your date", desc: "Once approved, we schedule the work around weather and availability." },
    ],
  },
  work: {
    eyebrow: "The finish that sells",
    title: "Clean driveways. Crisp lines.",
    subtitle: "A look at the results that quality sealcoating and line striping bring to a property.",
    note: "",
    placeholder: "Reference image",
    labels: [
      "Residential driveway",
      "Commercial line striping",
      "Our bilingual crew",
      "A rich, even finish",
      "Parking lot markings",
      "Fresh curb appeal",
    ],
  },
  video: {
    eyebrow: "See it in action",
    title: "Real jobs, start to finish.",
    subtitle: "A few clips from recent driveways and parking lots around the Chicagoland area.",
    labels: ["Fresh driveway sealcoat", "Before & after", "Commercial parking lot"],
  },
  beforeAfter: {
    eyebrow: "The sealcoat difference",
    title: "From worn to protected.",
    subtitle: "Real driveways in the Chicagoland area—cleaned, sealed, and renewed to a rich, even black.",
    beforeLabel: "Before",
    afterLabel: "After",
  },
  area: {
    eyebrow: "Local service",
    title: "Across the greater Chicagoland area.",
    body: "Based in Hanover Park, we serve residential and commercial properties across the northwest and western Chicago suburbs—roughly a 40-mile radius, subject to project scope and availability.",
    note: "Not sure if your property is in range? Call us and we’ll confirm.",
    radiusLabel: "approximate service radius",
    coverageLabel: "Projects we evaluate",
    coverageTypes: ["Residential driveways", "Commercial lots", "On-site estimates"],
    citiesLabel: "Cities we serve",
    citiesNote: "…and nearby towns within about 40 miles. Don’t see yours? Call us—we’ll confirm.",
  },
  reviews: {
    eyebrow: "Reputation in progress",
    title: "Every finished job is a chance to earn trust.",
    body: "Our Google profile and review system are being prepared. Once active, customers will be able to share their feedback after service.",
    button: "View Google profile",
    pending: "Google reviews coming soon",
  },
  about: {
    eyebrow: "Owner-operated",
    title: "Meet Demetrio — the owner on every job.",
    body: "Lopez Sealcoating is a family business run by its owner, Demetrio López. He’s on-site for every project, works in English and Spanish, and treats every driveway and parking lot like his own.",
    points: [
      "The owner on every job",
      "English & Spanish",
      "Free on-site estimates",
      "Careful, quality-focused work",
    ],
    projectLabel: "The owner on site",
    projectTitle: "Demetrio, hands-on.",
    projectDesc: "You deal directly with Demetrio and his crew—no call centers, no runaround.",
  },
  contact: {
    eyebrow: "Start with an estimate",
    title: "Tell us about your driveway or lot.",
    subtitle: "Share a few details and we’ll follow up to arrange an on-site estimate.",
    responseTime: "We respond within 24 hours.",
    city: "City or ZIP code",
    directTitle: "Prefer to talk now?",
    directBody: "Call or send a WhatsApp message. We speak English and Spanish.",
    name: "Your name",
    phone: "Phone number",
    email: "Email (optional)",
    service: "Service needed",
    serviceOptions: [
      { value: "Driveway Sealcoating", label: "Driveway Sealcoating" },
      { value: "Line Striping", label: "Line Striping" },
      { value: "Both / Not sure", label: "Both / Not sure" },
    ],
    message: "Tell us about the job (address, size, details)",
    send: "Request Free Estimate",
    or: "or reach us directly",
    disclaimer: "By submitting, you agree to be contacted about your request.",
    sending: "Sending…",
    success: "Thank you! We received your request and will contact you shortly.",
    error: "Something went wrong. Please call or text us instead.",
  },
  footer: {
    rights: "All rights reserved.",
    season: "Season: May–October (weather permitting).",
    tagline: "Sealcoating & Line Striping — Chicagoland Area",
  },
};

const es: Copy = {
  htmlLang: "es",
  metaTitle: "Lopez Sealcoating | Sellado de Asfalto y Pintura de Líneas en el Área de Chicagoland",
  metaDescription:
    "Sellado de asfalto (sealcoating) y pintura de líneas de estacionamiento en el área de Chicago. Cotizaciones gratis. Residencial y comercial. Hablamos Español.",
  langSwitchLabel: "English",
  langSwitchHref: "/",
  language: {
    badge: "EN",
    prompt: "Do you prefer English?",
    action: "View site in English",
    footerPrompt: "This website is also available in English.",
    aria: "Switch the website to English",
  },
  navAria: "Navegación principal",
  nav: {
    services: "Servicios",
    process: "Cómo funciona",
    work: "Trabajos",
    area: "Zona",
    reviews: "Reseñas",
    contact: "Cotización Gratis",
  },
  cta: { call: "Llámanos", quote: "Cotización Gratis", whatsapp: "WhatsApp" },
  hero: {
    eyebrow: "Área de Chicagoland • Residencial y Comercial",
    title: "Sellado de asfalto y pintura de líneas",
    accent: "en el Área de Chicagoland.",
    subtitle:
      "Protege tu asfalto y causa una gran primera impresión: cotizaciones claras, trabajo cuidadoso y comunicación directa, para hogares y negocios.",
    bullets: ["Cotización gratis en sitio", "Trabajo enfocado en calidad", "Atención en español"],
    visualEyebrow: "De desgastado a protegido",
    visualTitle: "Una superficie más limpia, oscura y bien definida.",
    visualSteps: ["Sellar", "Proteger", "Señalizar"],
    visualEstimate: "Cotización gratis",
  },
  trust: {
    free: "Cotización gratis en sitio",
    spanish: "Inglés y español",
    local: "Servicio en el Área de Chicagoland",
    insured: "Con Licencia y Seguro",
  },
  services: {
    eyebrow: "Especialistas en pavimento",
    title: "Dos especialidades. Un servicio confiable.",
    subtitle: "Soluciones enfocadas para hogares, estacionamientos y propiedades comerciales.",
    items: [
      {
        number: "01",
        tag: "Residencial",
        name: "Sellado de Asfalto (Sealcoating)",
        desc: "Una capa protectora contra el sol, el agua y el uso diario, con un acabado negro, uniforme y renovado.",
      },
      {
        number: "02",
        tag: "Comercial",
        name: "Pintura de Líneas de Estacionamiento",
        desc: "Cajones, cebras y marcas visibles que facilitan el tránsito y mejoran la presentación de la propiedad.",
      },
      {
        number: "03",
        tag: "Alcance flexible",
        name: "Hogares y Negocios",
        desc: "Desde una entrada residencial hasta un estacionamiento completo; revisamos el proyecto y cotizamos por pie cuadrado.",
      },
    ],
  },
  languageBanner: {
    title: "Would you rather continue in English?",
    body: "Review every service and request your estimate in English.",
    action: "Continue in English",
  },
  process: {
    eyebrow: "Fácil desde el inicio",
    title: "Tu cotización en tres pasos.",
    subtitle: "Sin procesos complicados: una conversación, una visita y una fecha clara.",
    steps: [
      { number: "01", name: "Cuéntanos del trabajo", desc: "Llama, envía mensaje o llena el formulario con tu dirección y el servicio que necesitas." },
      { number: "02", name: "Recibe una cotización en sitio", desc: "Visitamos la propiedad, medimos el área y preparamos una cotización gratuita." },
      { number: "03", name: "Elige tu fecha", desc: "Al aprobar, programamos el trabajo según el clima y la disponibilidad." },
    ],
  },
  work: {
    eyebrow: "El acabado que vende",
    title: "Entradas limpias. Líneas nítidas.",
    subtitle: "Un vistazo a los resultados que logran un buen sellado y una buena pintura de líneas.",
    note: "",
    placeholder: "Imagen de referencia",
    labels: [
      "Entrada residencial",
      "Pintura de líneas comercial",
      "Nuestro equipo bilingüe",
      "Acabado negro y uniforme",
      "Señalización de estacionamiento",
      "Fachada renovada",
    ],
  },
  video: {
    eyebrow: "Míralo en acción",
    title: "Trabajos reales, de principio a fin.",
    subtitle: "Algunos clips de entradas y estacionamientos recientes en el área de Chicagoland.",
    labels: ["Sellado de entrada", "Antes y después", "Estacionamiento comercial"],
  },
  beforeAfter: {
    eyebrow: "La diferencia del sellado",
    title: "De desgastado a protegido.",
    subtitle: "Entradas reales en el área de Chicagoland: limpiadas, selladas y renovadas a un negro intenso y uniforme.",
    beforeLabel: "Antes",
    afterLabel: "Después",
  },
  area: {
    eyebrow: "Servicio local",
    title: "En el área metropolitana de Chicago.",
    body: "Con base en Hanover Park, atendemos propiedades residenciales y comerciales en los suburbios del noroeste y oeste de Chicago, en un radio aproximado de 40 millas, según el alcance y la disponibilidad.",
    note: "¿No sabes si tu propiedad está dentro de la zona? Llámanos y lo confirmamos.",
    radiusLabel: "radio aproximado de servicio",
    coverageLabel: "Proyectos que evaluamos",
    coverageTypes: ["Entradas residenciales", "Estacionamientos comerciales", "Cotizaciones en sitio"],
    citiesLabel: "Ciudades que atendemos",
    citiesNote: "…y localidades cercanas en un radio de ~40 millas. ¿No ves la tuya? Llámanos y lo confirmamos.",
  },
  reviews: {
    eyebrow: "Reputación en construcción",
    title: "Cada trabajo terminado es una oportunidad para ganar confianza.",
    body: "Estamos preparando el Perfil de Empresa y el sistema de reseñas en Google. Al activarlo, los clientes podrán compartir su experiencia después del servicio.",
    button: "Ver perfil en Google",
    pending: "Reseñas de Google próximamente",
  },
  about: {
    eyebrow: "Atendido por el dueño",
    title: "Conoce a Demetrio, el dueño en cada trabajo.",
    body: "Lopez Sealcoating es un negocio familiar atendido por su dueño, Demetrio López. Está presente en cada proyecto, atiende en inglés y español, y trata cada entrada y estacionamiento como si fuera suyo.",
    points: [
      "El dueño en cada trabajo",
      "Inglés y español",
      "Cotizaciones gratis en sitio",
      "Trabajo cuidadoso y de calidad",
    ],
    projectLabel: "El dueño en obra",
    projectTitle: "Demetrio, con las manos en la obra.",
    projectDesc: "Tratas directo con Demetrio y su equipo, sin call centers ni vueltas.",
  },
  contact: {
    eyebrow: "Comienza con una cotización",
    title: "Cuéntanos sobre tu entrada o estacionamiento.",
    subtitle: "Comparte algunos detalles y te contactaremos para programar una cotización en sitio.",
    responseTime: "Respondemos en menos de 24 horas.",
    city: "Ciudad o código postal",
    directTitle: "¿Prefieres hablar ahora?",
    directBody: "Llama o manda un mensaje por WhatsApp. Atendemos en inglés y español.",
    name: "Tu nombre",
    phone: "Teléfono",
    email: "Correo (opcional)",
    service: "Servicio que necesitas",
    serviceOptions: [
      { value: "Driveway Sealcoating", label: "Sellado de Asfalto" },
      { value: "Line Striping", label: "Pintura de Líneas" },
      { value: "Both / Not sure", label: "Ambos / No estoy seguro" },
    ],
    message: "Cuéntanos del trabajo (dirección, tamaño, detalles)",
    send: "Solicitar Cotización Gratis",
    or: "o contáctanos directo",
    disclaimer: "Al enviar, aceptas que te contactemos sobre tu solicitud.",
    sending: "Enviando…",
    success: "¡Gracias! Recibimos tu solicitud y te contactaremos muy pronto.",
    error: "Algo salió mal. Por favor llámanos o mándanos mensaje.",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    season: "Temporada: mayo–octubre (según el clima).",
    tagline: "Sellado de Asfalto y Pintura de Líneas — Área de Chicagoland",
  },
};

export const translations: Record<Lang, Copy> = { en, es };
