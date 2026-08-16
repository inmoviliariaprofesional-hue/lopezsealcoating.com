#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador del entregable Word: Plan Estratégico de Posicionamiento Digital
para Lopez Sealcoating LLC. Preparado por Aimarktech (Antonio Aguilar, CEO).
Ejecutar: python3 generar_plan_estrategico.py
Salida: Plan_Estrategico_Lopez_Sealcoating.docx
"""

from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# ---------------- Paleta de marca ----------------
ASFALTO = RGBColor(0x1A, 0x1A, 0x1A)
AMARILLO = RGBColor(0xF5, 0xC4, 0x00)
GRIS = RGBColor(0x55, 0x55, 0x55)
BLANCO = RGBColor(0xFF, 0xFF, 0xFF)
VERDE = RGBColor(0x1E, 0x7D, 0x32)
AMARILLO_HEX = "F5C400"
ASFALTO_HEX = "1A1A1A"
GRIS_CLARO_HEX = "EDEDED"
VERDE_HEX = "E3F1E4"
ROJO_HEX = "FBE3E3"

doc = Document()
for section in doc.sections:
    section.top_margin = Cm(2.2)
    section.bottom_margin = Cm(2.2)
    section.left_margin = Cm(2.3)
    section.right_margin = Cm(2.3)

normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)
normal.font.color.rgb = ASFALTO


def shade_cell(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    tcPr.append(shd)


def set_cell_text(cell, text, bold=False, color=ASFALTO, size=10.5, align=None, white=False):
    cell.text = ""
    p = cell.paragraphs[0]
    if align:
        p.alignment = align
    run = p.add_run(text)
    run.bold = bold
    run.font.size = Pt(size)
    run.font.color.rgb = BLANCO if white else color
    return p


def add_bar_heading(text, fill_hex=ASFALTO_HEX):
    tbl = doc.add_table(rows=1, cols=1)
    cell = tbl.rows[0].cells[0]
    shade_cell(cell, fill_hex)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run("  " + text)
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = BLANCO
    doc.add_paragraph()


def add_sub(text, color=ASFALTO, size=12):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return p


def add_body(text, size=11, space_after=6, italic=False, bold=False, color=ASFALTO):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.italic = italic
    run.bold = bold
    run.font.color.rgb = color
    return p


def add_bullet(text, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(2)
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.bold = True
        r.font.size = Pt(11)
    r2 = p.add_run(text)
    r2.font.size = Pt(11)
    return p


# ============================================================
# PORTADA
# ============================================================
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("AIMARKTECH")
r.bold = True
r.font.size = Pt(22)
p2 = doc.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
r2 = p2.add_run("Marketing · Tecnología · Presencia Digital")
r2.font.size = Pt(11)
r2.italic = True
r2.font.color.rgb = GRIS

doc.add_paragraph()
doc.add_paragraph()

tbl = doc.add_table(rows=1, cols=1)
cell = tbl.rows[0].cells[0]
shade_cell(cell, ASFALTO_HEX)
pc = cell.paragraphs[0]
pc.alignment = WD_ALIGN_PARAGRAPH.CENTER
pc.paragraph_format.space_before = Pt(14)
pc.paragraph_format.space_after = Pt(6)
r = pc.add_run("PLAN ESTRATÉGICO DE POSICIONAMIENTO DIGITAL")
r.bold = True
r.font.size = Pt(19)
r.font.color.rgb = BLANCO
pc2 = cell.add_paragraph()
pc2.alignment = WD_ALIGN_PARAGRAPH.CENTER
pc2.paragraph_format.space_after = Pt(14)
r = pc2.add_run("El camino al Top de Google en Chicagoland")
r.font.size = Pt(13)
r.font.color.rgb = AMARILLO
r.bold = True

doc.add_paragraph()
for txt, sz, col, bold in [
    ("Preparado para:", 11, GRIS, False),
    ("LOPEZ SEALCOATING LLC", 16, ASFALTO, True),
    ("Atención: Demetrio López  ·  Chicagoland, Illinois (EE. UU.)", 11, GRIS, False),
]:
    pp = doc.add_paragraph()
    pp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rr = pp.add_run(txt)
    rr.font.size = Pt(sz)
    rr.bold = bold
    rr.font.color.rgb = col

doc.add_paragraph()
data = [
    ("Elaborado por", "Antonio Aguilar — CEO, Aimarktech"),
    ("Sitio web", "www.soyaimarktech.com"),
    ("Fecha", "Agosto de 2026"),
    ("Documento", "Complemento a la Propuesta de Presencia Digital"),
]
meta = doc.add_table(rows=len(data), cols=2)
meta.alignment = WD_TABLE_ALIGNMENT.CENTER
for i, (k, v) in enumerate(data):
    set_cell_text(meta.rows[i].cells[0], k, bold=True, size=10.5)
    set_cell_text(meta.rows[i].cells[1], v, size=10.5)
    shade_cell(meta.rows[i].cells[0], GRIS_CLARO_HEX)

doc.add_page_break()

# ============================================================
# 1. RESUMEN EJECUTIVO
# ============================================================
add_bar_heading("1. Resumen ejecutivo")
add_body(
    "El reto de Lopez Sealcoating es claro y medible: pasar de ser prácticamente invisible en internet "
    "a aparecer entre los primeros resultados de Google cuando alguien en Chicagoland busca sellado de "
    "asfalto (sealcoating) o pintura de líneas de estacionamiento."
)
add_body(
    "Google ordena los negocios locales con tres factores: Relevancia, Distancia y Prominencia. La "
    "buena noticia es que dos de los tres (Relevancia y Prominencia) dependen del trabajo que sí "
    "podemos controlar. Este plan se concentra justo ahí, con metas y semáforos para medir el avance.",
    bold=True,
)
add_body(
    "Nuestra mayor ventaja competitiva de arranque: casi ningún competidor local está trabajando bien "
    "las reseñas y el perfil de Google. Ese vacío es nuestra oportunidad para escalar rápido.",
    italic=True,
)

# ============================================================
# 2. FODA
# ============================================================
add_bar_heading("2. Análisis FODA")
add_body("Diagnóstico rápido de dónde estamos parados antes de ejecutar.")

foda = doc.add_table(rows=2, cols=2)
foda.style = "Table Grid"
foda.alignment = WD_TABLE_ALIGNMENT.CENTER


def fill_foda(cell, title, items, fill_hex):
    shade_cell(cell, fill_hex)
    cell.text = ""
    p = cell.paragraphs[0]
    r = p.add_run(title)
    r.bold = True
    r.font.size = Pt(11.5)
    for it in items:
        pi = cell.add_paragraph()
        pi.paragraph_format.space_after = Pt(1)
        ri = pi.add_run("• " + it)
        ri.font.size = Pt(9.5)


fill_foda(
    foda.rows[0].cells[0], "FORTALEZAS",
    [
        "Buen servicio y clientes satisfechos por recomendación.",
        "Atención bilingüe (inglés y español).",
        "Negocio formal (LLC) y al corriente de impuestos.",
        "Fotos y videos propios de trabajos.",
        "Doble servicio: sealcoating + pintura de líneas.",
    ],
    VERDE_HEX,
)
fill_foda(
    foda.rows[0].cells[1], "OPORTUNIDADES",
    [
        "Competencia local con poca o nula gestión de reseñas.",
        "Alta demanda estacional (mayo–octubre).",
        "Clientes comerciales (striping) recurrentes y rentables.",
        "Público hispano desatendido en su idioma.",
        "Terreno fértil: empezar reseñas desde cero.",
    ],
    AMARILLO_HEX,
)
fill_foda(
    foda.rows[1].cells[0], "DEBILIDADES",
    [
        "Cero reseñas y sin Perfil de Empresa en Google.",
        "Sin sitio web, dominio ni correo profesional.",
        "Logo copiado de internet (riesgo legal).",
        "Marketing solo por cambaceo/recomendación.",
        "Trabaja solo: tiempo limitado para responder.",
    ],
    ROJO_HEX,
)
fill_foda(
    foda.rows[1].cells[1], "AMENAZAS",
    [
        "Competidores con más años y más reseñas.",
        "Estacionalidad: solo ~5 meses de trabajo.",
        "Dependencia del clima (65°F+).",
        "Competidores que ya pagan anuncios en Google.",
    ],
    GRIS_CLARO_HEX,
)

doc.add_paragraph()

# ============================================================
# 3. EL RETO: POSICIONAMIENTO EN GOOGLE
# ============================================================
add_bar_heading("3. El reto central: posicionar a Lopez Sealcoating en el Top de Google")

add_sub("3.1 Cómo decide Google a quién mostrar primero")
add_body(
    "Según la documentación oficial de Google sobre resultados locales, el orden se define con tres "
    "factores. Todo lo demás son tácticas para mover uno de estos tres:"
)
add_bullet(
    "how tan bien tu categoría, servicios y contenido coinciden con lo que busca la persona. "
    "Ejemplo: la categoría \u201cPavement contractor / Sealcoating\u201d nos hace relevantes para "
    "\u201csealcoating near me\u201d.",
    bold_prefix="Relevancia: ",
)
add_bullet(
    "qué tan cerca estás de quien busca. Es el factor que no controlamos directamente; se trabaja "
    "definiendo bien la zona de servicio y, más adelante, creando páginas por ciudad.",
    bold_prefix="Distancia: ",
)
add_bullet(
    "qué tan conocido y confiable eres: sobre todo VOLUMEN y calificación de reseñas, además de "
    "menciones, enlaces y directorios. Aquí es donde ganamos o perdemos la carrera.",
    bold_prefix="Prominencia: ",
)
add_body(
    "En pocas palabras: Relevancia y Prominencia SÍ las controlamos; la Distancia es fija, por eso la "
    "estrategia inteligente es ampliar el área donde ya aparecemos, no pelear por un solo punto.",
    bold=True,
)

add_sub("3.2 El objetivo: el \u201cMap Pack\u201d (los 3 del mapa)")
add_body(
    "Cuando alguien busca un servicio local, Google muestra un bloque con un mapa y SOLO tres negocios "
    "arriba de los resultados normales. Ese bloque (el \u201cMap Pack\u201d o Local 3-Pack) se lleva la "
    "mayoría de las llamadas. Nuestra meta es meter a Lopez Sealcoating en esos tres lugares para sus "
    "búsquedas y ciudades clave."
)

add_sub("3.3 Qué haremos para subir en cada factor")
add_body("Relevancia", bold=True, space_after=2)
add_bullet("Categoría principal correcta y categorías secundarias (striping).")
add_bullet("Lista completa de servicios con nombres que la gente busca.")
add_bullet("Descripción del perfil y textos del sitio con palabras clave (bilingües).")
add_bullet("Pedir que las reseñas mencionen el servicio y la ciudad (el texto de la reseña también cuenta).")
add_body("Prominencia (nuestra prioridad #1)", bold=True, space_after=2)
add_bullet("Sistema para pedir reseñas después de CADA trabajo (enlace + QR + guion bilingüe).")
add_bullet("Meta de ritmo constante de reseñas nuevas (no todas de golpe).")
add_bullet("Responder TODAS las reseñas (buenas y malas) de forma profesional.")
add_bullet("Registrar el negocio en directorios (NAP consistente: mismo Nombre, Zona y Teléfono en todos lados).")
add_bullet("Enlaces locales (proveedores, cámaras/negocios de la zona) y autoridad del sitio.")
add_body("Distancia / cobertura", bold=True, space_after=2)
add_bullet("Definir la zona de servicio por ciudades reales de Chicagoland (radio ~40 millas).")
add_bullet("A futuro: páginas por ciudad en el sitio para aparecer en más zonas.")

add_sub("3.4 Palabras clave objetivo (ejemplos)")
kw = doc.add_table(rows=1, cols=2)
kw.style = "Table Grid"
kw.alignment = WD_TABLE_ALIGNMENT.CENTER
set_cell_text(kw.rows[0].cells[0], "En inglés", bold=True, white=True, size=11)
set_cell_text(kw.rows[0].cells[1], "En español", bold=True, white=True, size=11)
for c in kw.rows[0].cells:
    shade_cell(c, ASFALTO_HEX)
kw_rows = [
    ("sealcoating near me", "sellado de asfalto cerca de mí"),
    ("driveway sealcoating [ciudad]", "sellado de entradas [ciudad]"),
    ("asphalt sealcoating Chicago", "sellado de asfalto Chicago"),
    ("parking lot line striping [ciudad]", "pintura de líneas de estacionamiento [ciudad]"),
    ("parking lot striping company", "pintar cajones de estacionamiento"),
]
for en, es in kw_rows:
    row = kw.add_row().cells
    set_cell_text(row[0], en, size=10.5)
    set_cell_text(row[1], es, size=10.5)

doc.add_paragraph()
add_body(
    "Nota: las reseñas influyen en DOS de los tres factores — en la Prominencia (por el volumen y la "
    "calificación) y en la Relevancia (por las palabras que los clientes escriben en ellas). Por eso son "
    "el corazón de este plan.",
    italic=True, size=10, color=GRIS,
)

# ============================================================
# 4. TABLERO DE KPIs (SEMÁFOROS)
# ============================================================
add_bar_heading("4. Tablero de indicadores (semáforos)")
add_body(
    "Así mediremos el avance. Cada mes revisamos el tablero: 🔴 requiere atención, 🟡 en progreso, "
    "🟢 en meta. Objetivos orientados a los primeros 90 días."
)
kpi = doc.add_table(rows=1, cols=3)
kpi.style = "Table Grid"
kpi.alignment = WD_TABLE_ALIGNMENT.CENTER
set_cell_text(kpi.rows[0].cells[0], "Indicador", bold=True, white=True, size=10.5)
set_cell_text(kpi.rows[0].cells[1], "Meta (90 días)", bold=True, white=True, size=10.5, align=WD_ALIGN_PARAGRAPH.CENTER)
set_cell_text(kpi.rows[0].cells[2], "Criterio de semáforo", bold=True, white=True, size=10.5)
for c in kpi.rows[0].cells:
    shade_cell(c, ASFALTO_HEX)
kpi_rows = [
    ("Reseñas en Google", "20+", "🔴 0–4  ·  🟡 5–19  ·  🟢 20+"),
    ("Calificación promedio", "4.7★+", "🔴 <4.0  ·  🟡 4.0–4.4  ·  🟢 4.5+"),
    ("Posición en Map Pack (palabra clave principal)", "Top 3", "🔴 no aparece  ·  🟡 top 10  ·  🟢 top 3"),
    ("Llamadas/mensajes por mes desde Google", "30+", "🔴 <10  ·  🟡 10–29  ·  🟢 30+"),
    ("Cotizaciones (estimates) solicitadas/mes", "15+", "🔴 <5  ·  🟡 5–14  ·  🟢 15+"),
    ("Tiempo de respuesta a un nuevo contacto", "< 1 hora", "🔴 >24 h  ·  🟡 1–24 h  ·  🟢 <1 h"),
    ("Visitas al sitio web por mes", "300+", "🔴 <100  ·  🟡 100–299  ·  🟢 300+"),
]
for ind, meta_v, crit in kpi_rows:
    row = kpi.add_row().cells
    set_cell_text(row[0], ind, size=10)
    set_cell_text(row[1], meta_v, size=10, align=WD_ALIGN_PARAGRAPH.CENTER)
    set_cell_text(row[2], crit, size=10)

doc.add_paragraph()
add_body(
    "Los números meta son iniciales y se ajustan con los datos reales del primer mes y la capacidad de "
    "Demetrio (recordando que trabaja por su cuenta).",
    size=10, color=GRIS,
)

# ============================================================
# 5. ROADMAP
# ============================================================
add_bar_heading("5. Roadmap de ejecución")
rm = doc.add_table(rows=1, cols=3)
rm.style = "Table Grid"
rm.alignment = WD_TABLE_ALIGNMENT.CENTER
set_cell_text(rm.rows[0].cells[0], "Etapa", bold=True, white=True, size=10.5)
set_cell_text(rm.rows[0].cells[1], "Tiempo", bold=True, white=True, size=10.5, align=WD_ALIGN_PARAGRAPH.CENTER)
set_cell_text(rm.rows[0].cells[2], "Acciones clave", bold=True, white=True, size=10.5)
for c in rm.rows[0].cells:
    shade_cell(c, ASFALTO_HEX)
rm_rows = [
    ("Fase 0 — Cimientos", "Semana 1–2",
     "Dominio + correo; logo original; crear y verificar el Perfil de Empresa en Google; instalar el sistema de reseñas; pedir las primeras 10 reseñas a clientes satisfechos."),
    ("Fase 1 — Conversión", "Semana 2–3",
     "Publicar el sitio bilingüe; conectar el formulario de cotización; registrar el negocio en directorios (NAP consistente); enlazar el sitio con el Perfil de Google."),
    ("Operación / crecimiento", "Semana 4 en adelante",
     "Ritmo constante de reseñas; publicaciones semanales en el Perfil de Google; medición mensual de KPIs con semáforos; ajustes."),
    ("Fase 2 — Publicidad (opcional)", "Según temporada",
     "Google Local Services Ads / Search Ads cuando ya haya perfil, reseñas y sitio listos, para acelerar la llegada de clientes."),
]
for etapa, tiempo, acciones in rm_rows:
    row = rm.add_row().cells
    set_cell_text(row[0], etapa, bold=True, size=10)
    set_cell_text(row[1], tiempo, size=10, align=WD_ALIGN_PARAGRAPH.CENTER)
    set_cell_text(row[2], acciones, size=10)

doc.add_paragraph()
add_body(
    "Nota de temporada: como el trabajo va de mayo a octubre, aprovechamos lo que resta de esta "
    "temporada para arrancar reseñas y llegar posicionados al pico de mayo del próximo año.",
    italic=True,
)

# ============================================================
# 6. RIESGOS Y MITIGACIÓN
# ============================================================
add_bar_heading("6. Riesgos y cómo los manejamos")
add_bullet("Concentramos reseñas y contenido durante la temporada activa y dejamos el perfil trabajando todo el año.", bold_prefix="Estacionalidad: ")
add_bullet("Priorizamos respuesta rápida y agenda; no invertimos fuerte en anuncios hasta tener flujo estable.", bold_prefix="Trabaja solo (capacidad): ")
add_bullet("Respondemos toda reseña con profesionalismo y cuidamos la calidad para sostener 4.5★+.", bold_prefix="Reseñas negativas: ")
add_bullet("Nos diferenciamos con atención bilingüe y velocidad de respuesta, no solo con precio.", bold_prefix="Competencia: ")

# ============================================================
# 7. CÓMO MEDIREMOS EL "TOP DE GOOGLE"
# ============================================================
add_bar_heading("7. Cómo comprobaremos que subimos en Google")
add_bullet("Seguimiento de posición local por ciudad (búsquedas geolocalizadas) para las palabras clave objetivo.")
add_bullet("Panel del Perfil de Empresa de Google: llamadas, solicitudes de ruta, clics al sitio.")
add_bullet("Reporte mensual con el tablero de semáforos, para decisiones claras.")

# ============================================================
# 8. SIGUIENTE PASO + FIRMA
# ============================================================
add_bar_heading("8. Siguiente paso")
add_body(
    "Aprobar el paquete Fase 0 + Fase 1 de la propuesta y arrancar la Fase 0 de este plan. La primera "
    "meta concreta: Perfil de Empresa en Google activo y las primeras 10 reseñas en las próximas 2 semanas."
)

add_body("Atentamente,", space_after=10)
for txt, sz, col, bold in [
    ("Antonio Aguilar", 12.5, ASFALTO, True),
    ("CEO · Aimarktech", 11, GRIS, False),
    ("https://soyaimarktech.com", 11, ASFALTO, True),
]:
    pp = doc.add_paragraph()
    pp.paragraph_format.space_after = Pt(0)
    rr = pp.add_run(txt)
    rr.font.size = Pt(sz)
    rr.bold = bold
    rr.font.color.rgb = col

doc.add_paragraph()
tbl = doc.add_table(rows=1, cols=1)
cell = tbl.rows[0].cells[0]
shade_cell(cell, ASFALTO_HEX)
p = cell.paragraphs[0]
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_before = Pt(8)
p.paragraph_format.space_after = Pt(2)
r = p.add_run("AIMARKTECH")
r.bold = True
r.font.size = Pt(14)
r.font.color.rgb = AMARILLO
p2 = cell.add_paragraph()
p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
p2.paragraph_format.space_after = Pt(8)
r = p2.add_run("www.soyaimarktech.com")
r.font.size = Pt(10.5)
r.bold = True
r.font.color.rgb = BLANCO

out = "Plan_Estrategico_Lopez_Sealcoating.docx"
doc.save(out)
print("OK ->", out)
