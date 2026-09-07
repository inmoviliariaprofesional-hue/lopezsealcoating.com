// Configuración central del sitio. Ajustar aquí cuando Demetrio confirme datos definitivos.
export const site = {
  businessName: "Lopez Sealcoating",
  legalName: "Lopez Sealcoating LLC",
  // Teléfono tomado del volante actual. Formato E.164 para enlaces.
  phoneDisplay: "(331) 236-9387",
  phoneE164: "+13312369387",
  // TODO: reemplazar por correo profesional (ej. info@lopezsealcoating.com) cuando se cree el dominio.
  email: "lopezsealcoating24@gmail.com",
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
  // Cobertura confirmada: área general de Chicagoland (radio aproximado de 40 millas).
  // Agregar ciudades específicas solo después de confirmarlas con Demetrio.
  areaServed: ["Chicagoland Area, IL"],
  // Servicios (para datos estructurados y SEO).
  services: [
    "Driveway Sealcoating",
    "Asphalt Sealcoating",
    "Parking Lot Line Striping",
    "Pavement Marking",
  ],
} as const;

export type Lang = "en" | "es";
