// Configuración central del sitio. Ajustar aquí cuando Demetrio confirme datos definitivos.

// Ciudades de servicio (base: Hanover Park, IL; radio aproximado de 40 millas).
// Se usan en los datos estructurados (JSON-LD) y en la sección "Zona de servicio".
export const serviceCities = [
  "Hanover Park", "Streamwood", "Bartlett", "Schaumburg", "Hoffman Estates",
  "Roselle", "Bloomingdale", "Carol Stream", "Glendale Heights", "Addison",
  "Elgin", "West Chicago", "Wheaton", "St. Charles", "Naperville", "Aurora",
] as const;

export const site = {
  businessName: "Lopez Sealcoating",
  legalName: "Lopez Sealcoating LLC",
  // Teléfono tomado del volante actual. Formato E.164 para enlaces.
  phoneDisplay: "(331) 236-9387",
  phoneE164: "+13312369387",
  // Correo profesional (Cloudflare Email Routing reenvía al Gmail del negocio).
  email: "info@lopezsealcoating.com",
  whatsapp: "13312369387",
  facebook: "https://www.facebook.com/", // TODO: URL real de la página de Facebook
  // TODO: enlace directo para dejar reseña en Google cuando exista el Perfil de Empresa.
  googleReviewUrl: "",
  // TODO: activar cuando exista el Perfil de Empresa (para "Ver reseñas").
  googleProfileUrl: "",
  serviceRadiusMiles: 40,
  // Datos de licencia/seguro: solo mostrar sellos si son verdaderos.
  insured: false, // TODO: cambiar a true cuando se confirme el seguro.
  // URL pública del sitio (para canonical, sitemap y datos estructurados).
  url: "https://lopezsealcoating.com",
  // Cobertura: base en Hanover Park, IL; radio aproximado de 40 millas (ver serviceCities).
  areaServed: serviceCities.map((c) => `${c}, IL`),
  // Servicios (para datos estructurados y SEO).
  services: [
    "Driveway Sealcoating",
    "Asphalt Sealcoating",
    "Parking Lot Line Striping",
    "Pavement Marking",
  ],
} as const;

export type Lang = "en" | "es";
