/**
 * Qué se puede editar en /admin. Esta lista es la única fuente de verdad: con ella se dibujan los formularios del
 * panel, se leen y validan los datos que llegan del formulario y se combinan los datos guardados con los valores
 * por defecto (src/lib/content.ts). Para hacer editable algo nuevo: agrega el campo aquí, su valor por defecto en
 * content.ts y úsalo en la plantilla.
 *
 * Las rutas ("hero.title") son relativas al objeto Content; dentro de una lista, relativas a cada elemento.
 */

export type Field =
  /** Casilla sí/no. */
  | { kind: "bool"; key: string; label: string; help?: string }
  /** Texto en inglés y español, lado a lado. */
  | { kind: "text"; key: string; label: string; max: number; multiline?: boolean; required?: boolean; help?: string }
  /** Un solo valor sin idioma (teléfono, correo, enlaces). */
  | { kind: "plain"; key: string; label: string; max: number; format: "tel" | "email" | "url" | "href" | "digits"; help?: string; placeholder?: string }
  /** Foto: se sube desde el panel (se reduce y se convierte a WebP en el navegador) o se queda la actual. */
  | { kind: "image"; key: string; label: string; help?: string }
  /** Lista de textos bilingües (viñetas, mensajes). */
  | { kind: "textlist"; key: string; label: string; max: number; itemMax: number; addLabel: string; help?: string }
  /** Lista de elementos con varios campos (fotos de la galería, preguntas frecuentes). */
  | { kind: "list"; key: string; label: string; max: number; itemLabel: string; addLabel: string; fixed?: boolean; fields: Field[]; help?: string }
  /** Lista simple, un elemento por línea (ciudades). */
  | { kind: "lines"; key: string; label: string; max: number; itemMax: number; help?: string };

export interface Section {
  id: string;
  title: string;
  summary: string;
  /** Dónde se ve en el sitio (ancla del inicio). */
  anchor: string;
  fields: Field[];
}

export const SECTIONS: Section[] = [
  {
    id: "franja-superior",
    title: "Franja superior",
    summary: "La barra amarilla animada de arriba, para promociones o avisos. Apagada por defecto.",
    anchor: "#top",
    fields: [
      {
        kind: "bool",
        key: "topStrip.enabled",
        label: "Mostrar la franja superior",
        help: "Al apagarla desaparece de todas las páginas. Los textos se guardan para la próxima vez.",
      },
      { kind: "text", key: "topStrip.tag", label: "Etiqueta (opcional)", max: 30, help: 'Recuadro oscuro al inicio, por ejemplo "Spring Savings" / "Oferta de primavera".' },
      {
        kind: "textlist",
        key: "topStrip.messages",
        label: "Mensajes",
        max: 4,
        itemMax: 90,
        addLabel: "Agregar mensaje",
        help: "Se muestran uno tras otro. Si es una promoción, incluye las fechas en que es válida.",
      },
      { kind: "text", key: "topStrip.cta", label: "Texto del enlace (opcional)", max: 40, help: 'Por ejemplo "Get your free estimate" / "Pide tu cotización gratis".' },
      {
        kind: "plain",
        key: "topStrip.href",
        label: "A dónde lleva al tocarla",
        max: 300,
        format: "href",
        placeholder: "#contact",
        help: "#contact lleva al formulario de cotización. También puede ser una dirección que empiece con https://",
      },
    ],
  },
  {
    id: "portada",
    title: "Portada",
    summary: "Lo primero que se ve: título, texto, viñetas y la foto grande.",
    anchor: "#top",
    fields: [
      { kind: "text", key: "hero.eyebrow", label: "Etiqueta superior", max: 70 },
      { kind: "text", key: "hero.title", label: "Título (parte blanca)", max: 80, required: true },
      { kind: "text", key: "hero.accent", label: "Título (parte amarilla)", max: 60 },
      { kind: "text", key: "hero.subtitle", label: "Texto debajo del título", max: 260, multiline: true },
      { kind: "textlist", key: "hero.bullets", label: "Viñetas", max: 4, itemMax: 40, addLabel: "Agregar viñeta" },
      { kind: "image", key: "hero.image", label: "Foto de la portada", help: "Mejor vertical u horizontal con la entrada de asfalto al centro." },
      { kind: "text", key: "hero.cardEyebrow", label: "Etiqueta sobre la foto", max: 40 },
      { kind: "text", key: "hero.cardTitle", label: "Frase sobre la foto", max: 70, required: true, help: "También se usa como descripción de la foto para Google." },
      { kind: "textlist", key: "hero.cardSteps", label: "Pasos sobre la foto", max: 3, itemMax: 16, addLabel: "Agregar paso" },
    ],
  },
  {
    id: "franja-confianza",
    title: "Franja de confianza",
    summary: "La franja blanca debajo de la portada con los puntos fuertes del negocio.",
    anchor: "#services",
    fields: [
      {
        kind: "textlist",
        key: "trust",
        label: "Puntos",
        max: 4,
        itemMax: 40,
        addLabel: "Agregar punto",
        help: 'Solo datos verdaderos. No poner "Licensed & Insured" mientras no haya seguro.',
      },
    ],
  },
  {
    id: "servicios",
    title: "Servicios",
    summary: "Las 3 tarjetas de servicios del inicio.",
    anchor: "#services",
    fields: [
      {
        kind: "list",
        key: "services",
        label: "Tarjetas",
        max: 3,
        fixed: true,
        itemLabel: "Tarjeta",
        addLabel: "",
        help: "Las dos primeras llevan a su página de servicio y la tercera al formulario.",
        fields: [
          { kind: "text", key: "tag", label: "Etiqueta", max: 30 },
          { kind: "text", key: "name", label: "Nombre", max: 50, required: true },
          { kind: "text", key: "desc", label: "Descripción", max: 220, multiline: true },
        ],
      },
    ],
  },
  {
    id: "galeria",
    title: "Fotos de trabajos",
    summary: 'La galería "Otros proyectos": agrega, quita u ordena fotos.',
    anchor: "#work",
    fields: [
      {
        kind: "list",
        key: "gallery",
        label: "Fotos",
        max: 12,
        itemLabel: "Foto",
        addLabel: "Agregar foto",
        help: "Cada foto debe ser un trabajo distinto y real. Se ven de 4 en 4 en computadora.",
        fields: [
          { kind: "image", key: "src", label: "Foto" },
          { kind: "text", key: "label", label: "Título corto", max: 50, required: true, help: 'Por ejemplo "Residential driveway" / "Entrada residencial".' },
          { kind: "text", key: "alt", label: "Descripción para Google y lectores de pantalla", max: 200, multiline: true, help: "Qué se ve en la foto, en una frase." },
        ],
      },
    ],
  },
  {
    id: "antes-despues",
    title: "Antes y después",
    summary: "El par de fotos de la misma entrada antes y después del sellado.",
    anchor: "#work",
    fields: [
      {
        kind: "image",
        key: "comparison.before",
        label: "Foto de antes",
        help: "Las dos fotos deben ser de la MISMA propiedad y con un encuadre parecido. Sin filtros ni retoques.",
      },
      { kind: "text", key: "comparison.beforeAlt", label: "Descripción de la foto de antes", max: 220, multiline: true },
      { kind: "image", key: "comparison.after", label: "Foto de después" },
      { kind: "text", key: "comparison.afterAlt", label: "Descripción de la foto de después", max: 220, multiline: true },
    ],
  },
  {
    id: "nosotros",
    title: "Sobre nosotros",
    summary: "El texto junto al video del propietario.",
    anchor: "#about",
    fields: [
      { kind: "text", key: "about.title", label: "Título", max: 80, required: true },
      { kind: "text", key: "about.body", label: "Texto", max: 500, multiline: true },
      { kind: "textlist", key: "about.points", label: "Puntos", max: 6, itemMax: 50, addLabel: "Agregar punto" },
    ],
  },
  {
    id: "preguntas",
    title: "Preguntas frecuentes",
    summary: "Preguntas y respuestas. Google también las lee.",
    anchor: "#faq",
    fields: [
      {
        kind: "list",
        key: "faq",
        label: "Preguntas",
        max: 15,
        itemLabel: "Pregunta",
        addLabel: "Agregar pregunta",
        help: "Solo respuestas que sean ciertas para el negocio hoy.",
        fields: [
          { kind: "text", key: "q", label: "Pregunta", max: 140, required: true },
          { kind: "text", key: "a", label: "Respuesta", max: 700, multiline: true, required: true },
        ],
      },
    ],
  },
  {
    id: "contacto",
    title: "Contacto y redes",
    summary: "Teléfono, correo, WhatsApp, redes sociales, reseñas y ciudades.",
    anchor: "#contact",
    fields: [
      { kind: "plain", key: "contact.phone", label: "Teléfono", max: 30, format: "tel", placeholder: "(331) 236-9387", help: "Número de EE. UU. de 10 dígitos." },
      { kind: "plain", key: "contact.whatsapp", label: "WhatsApp (opcional)", max: 20, format: "digits", placeholder: "13312369387", help: "Con código de país (1 para EE. UU.). Si lo dejas vacío, se usa el teléfono." },
      { kind: "plain", key: "contact.email", label: "Correo", max: 120, format: "email" },
      { kind: "plain", key: "contact.facebook", label: "Facebook (opcional)", max: 300, format: "url", placeholder: "https://www.facebook.com/…" },
      { kind: "plain", key: "contact.instagram", label: "Instagram (opcional)", max: 300, format: "url", placeholder: "https://www.instagram.com/…" },
      { kind: "plain", key: "contact.reviewUrl", label: "Enlace para dejar reseña en Google (opcional)", max: 300, format: "url" },
      {
        kind: "lines",
        key: "cities",
        label: "Ciudades de servicio",
        max: 40,
        itemMax: 40,
        help: "Una por renglón. Se muestran en la sección Zona de servicio y ayudan a salir en Google en esas ciudades.",
      },
    ],
  },
];

export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id);
