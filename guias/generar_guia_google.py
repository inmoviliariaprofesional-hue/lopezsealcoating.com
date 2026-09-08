#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera la guia imprimible (PDF): Perfil de Empresa en Google para Lopez Sealcoating LLC.
Preparado por Aimarktech. Ejecutar: python3 generar_guia_google.py
Salida: Guia_Perfil_Google_Lopez_Sealcoating.pdf
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    ListFlowable, ListItem, HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

# ---- Paleta de marca ----
ASPHALT = HexColor("#151515")
SIGNAL = HexColor("#F8C900")
GRAY = HexColor("#555555")
LIGHT = HexColor("#F3F2ED")
WHITE = HexColor("#FFFFFF")

styles = getSampleStyleSheet()
H = ParagraphStyle("H", parent=styles["Normal"], fontName="Helvetica-Bold",
                   fontSize=13, textColor=WHITE, leading=16)
SUB = ParagraphStyle("SUB", parent=styles["Normal"], fontName="Helvetica-Bold",
                     fontSize=11.5, textColor=ASPHALT, spaceBefore=8, spaceAfter=3, leading=14)
BODY = ParagraphStyle("BODY", parent=styles["Normal"], fontName="Helvetica",
                      fontSize=10, textColor=ASPHALT, leading=14, spaceAfter=4)
BODYI = ParagraphStyle("BODYI", parent=BODY, fontName="Helvetica-Oblique", textColor=GRAY, fontSize=9.5)
BUL = ParagraphStyle("BUL", parent=BODY, leftIndent=4, spaceAfter=2)
TITLE = ParagraphStyle("TITLE", parent=styles["Normal"], fontName="Helvetica-Bold",
                       fontSize=22, textColor=WHITE, alignment=TA_CENTER, leading=25)
SUBTITLE = ParagraphStyle("SUBTITLE", parent=styles["Normal"], fontName="Helvetica-Bold",
                          fontSize=12, textColor=SIGNAL, alignment=TA_CENTER, leading=15)
SMALLC = ParagraphStyle("SMALLC", parent=styles["Normal"], fontName="Helvetica",
                        fontSize=9, textColor=GRAY, alignment=TA_CENTER)


def bar(text):
    """Encabezado de seccion tipo barra asfalto."""
    t = Table([[Paragraph(text, H)]], colWidths=[17 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ASPHALT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def bullets(items):
    lis = []
    for it in items:
        lis.append(ListItem(Paragraph(it, BUL), value="•", bulletColor=SIGNAL))
    return ListFlowable(lis, bulletType="bullet", start="•", leftIndent=12,
                        bulletFontName="Helvetica-Bold", bulletColor=SIGNAL)


def numbered(items):
    lis = [ListItem(Paragraph(it, BUL)) for it in items]
    return ListFlowable(lis, bulletType="1", leftIndent=14,
                        bulletFontName="Helvetica-Bold", bulletColor=ASPHALT)


story = []

# ---- Portada / encabezado ----
cover = Table([[Paragraph("PERFIL DE EMPRESA EN GOOGLE", TITLE)],
               [Paragraph("Guia paso a paso &nbsp;·&nbsp; Lopez Sealcoating LLC", SUBTITLE)]],
              colWidths=[17 * cm])
cover.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), ASPHALT),
    ("TOPPADDING", (0, 0), (-1, 0), 16),
    ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
    ("TOPPADDING", (0, 1), (-1, 1), 0),
    ("BOTTOMPADDING", (0, 1), (-1, 1), 16),
]))
story += [cover, Spacer(1, 4)]
story += [Paragraph("Preparado por <b>Aimarktech</b> &nbsp;·&nbsp; soyaimarktech.com &nbsp;·&nbsp; Chicagoland, Illinois", SMALLC)]
story += [Spacer(1, 10)]
story += [Paragraph(
    "El orden importa: primero se crea y se <b>verifica</b> el perfil (la verificacion puede tardar "
    "unos dias), y de ahi se libera todo lo demas, incluidas las resenas.", BODYI)]
story += [Spacer(1, 8)]

# ---- 1. Checklist ----
story += [bar("1. Que tener a la mano (antes de empezar)")]
story += [Spacer(1, 6)]
story += [bullets([
    "<b>Nombre legal exacto:</b> Lopez Sealcoating LLC.",
    "<b>Cuenta de Google del negocio</b> (de preferencia dedicada, no la personal).",
    "<b>Lista de ciudades</b> objetivo dentro de ~40 millas (zona de servicio y resenas).",
    "<b>Telefono:</b> (331) 236-9387 &nbsp;·&nbsp; <b>Sitio web:</b> https://lopezsealcoating.com",
    "<b>Horario</b> a mostrar (la temporada mayo&ndash;octubre se aclara en la descripcion).",
    "<b>Fotos reales</b> (trabajos, camion, equipo) y el <b>logo</b>.",
    "Estar listo para la <b>verificacion por video</b>: camion/tanque, herramienta y playera de la marca.",
])]
story += [Spacer(1, 8)]

# ---- 2. Crear ----
story += [bar("2. Crear el perfil")]
story += [Spacer(1, 6)]
story += [numbered([
    "Entrar a <b>google.com/business</b> con la cuenta del negocio &rarr; \"Administrar ahora / Agregar tu negocio\".",
    "<b>Nombre:</b> Lopez Sealcoating LLC.",
    "<b>Categoria principal:</b> \"Paving contractor\" (Contratista de pavimentos). Despues se agregan secundarias.",
    "<b>&iquest;Los clientes te visitan en una direccion?</b> &rarr; <b>No</b>. Se configura como negocio de area de servicio (SAB): se oculta la direccion y solo se muestran las ciudades.",
    "<b>Zona de servicio:</b> agregar las ciudades de Chicagoland (la lista del punto 1).",
    "<b>Telefono</b> y <b>sitio web</b>.",
])]
story += [Spacer(1, 8)]

# ---- 3. Verificacion ----
story += [bar("3. Verificacion")]
story += [Spacer(1, 6)]
story += [bullets([
    "Google casi siempre pide <b>verificacion por video</b> para negocios nuevos de servicio.",
    "Se graba un video mostrando la herramienta/camion, la zona y que es un negocio real (seguir las instrucciones en pantalla).",
    "<b>Puede tardar unos dias</b> en aprobarse. Por eso conviene arrancarlo cuanto antes.",
])]
story += [Spacer(1, 8)]

# ---- 4. Optimizacion ----
story += [bar("4. Optimizacion (una vez verificado)")]
story += [Spacer(1, 6)]
story += [bullets([
    "<b>Descripcion bilingue</b> con palabras clave: sealcoating, driveway sealcoating, parking lot line striping, Chicagoland.",
    "<b>Servicios:</b> Driveway Sealcoating, Asphalt Sealcoating, Parking Lot Line Striping, Crack Filling, etc.",
    "<b>Fotos:</b> logo, foto de portada y las fotos reales de trabajos (subir 10+), camion y equipo.",
    "<b>Atributos:</b> \"Online estimates\", \"Onsite services\" y, si se desea, \"Identifies as Latino-owned\".",
    "Conectar el <b>sitio web</b> y activar <b>mensajes</b> (opcional).",
])]
story += [Spacer(1, 8)]

# ---- 5. Resenas ----
story += [bar("5. Sistema de resenas (justo despues de verificar)")]
story += [Spacer(1, 6)]
story += [Paragraph(
    "El <b>enlace de resena</b> (y por lo tanto el <b>QR</b>) <b>solo se genera cuando el perfil ya esta "
    "verificado y en vivo</b>. En cuanto Google verifique, Aimarktech entrega el enlace + QR + guion.", BODY)]
story += [Spacer(1, 4)]
story += [Paragraph("Guion para pedir la resena:", SUB)]
guion = Table([
    [Paragraph("<b>Espanol</b>", BODY),
     Paragraph("\"&iexcl;Gracias por confiar en Lopez Sealcoating! Nos ayudaria muchisimo una resena de 5 estrellas en Google. Toma 30 segundos: [enlace]. &iexcl;Gracias!\"", BODY)],
    [Paragraph("<b>English</b>", BODY),
     Paragraph("\"Thanks for choosing Lopez Sealcoating! A quick 5-star Google review would mean a lot. It takes 30 seconds: [link]. Thank you!\"", BODY)],
], colWidths=[3 * cm, 14 * cm])
guion.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, -1), LIGHT),
    ("BOX", (0, 0), (-1, -1), 0.5, GRAY),
    ("INNERGRID", (0, 0), (-1, -1), 0.5, GRAY),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ("TOPPADDING", (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
]))
story += [guion, Spacer(1, 4)]
story += [Paragraph("Idea: pedir la resena el mismo dia que termina el trabajo, mostrando el QR o enviando el enlace por WhatsApp.", BODYI)]
story += [Spacer(1, 8)]

# ---- 6. Resumen ----
story += [bar("6. Resumen para la reunion")]
story += [Spacer(1, 6)]
story += [numbered([
    "Crear el <b>Perfil de Google</b> (nombre LLC, categoria \"Paving contractor\", area de servicio, verificacion por video). &larr; lo urgente.",
    "Que Demetrio llegue con: <b>lista de ciudades</b>, <b>cuenta de Google del negocio</b> y listo para <b>grabar la verificacion</b>.",
    "<b>Resenas = justo despues</b> de verificar (Aimarktech prepara enlace + QR + guion).",
])]
story += [Spacer(1, 10)]
story += [HRFlowable(width="100%", thickness=1, color=SIGNAL)]
story += [Spacer(1, 4)]
story += [Paragraph("AIMARKTECH &nbsp;·&nbsp; Marketing · Tecnologia · Presencia Digital &nbsp;·&nbsp; soyaimarktech.com", SMALLC)]


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(20 * cm, 1.1 * cm, "Lopez Sealcoating LLC · Guia Perfil de Google · Aimarktech")
    canvas.drawString(2 * cm, 1.1 * cm, "Pagina %d" % doc.page)
    canvas.restoreState()


doc = BaseDocTemplate("Guia_Perfil_Google_Lopez_Sealcoating.pdf", pagesize=LETTER,
                      leftMargin=2 * cm, rightMargin=2 * cm, topMargin=1.6 * cm, bottomMargin=1.8 * cm,
                      title="Guia Perfil de Google - Lopez Sealcoating LLC", author="Aimarktech")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
doc.build(story)
print("OK -> Guia_Perfil_Google_Lopez_Sealcoating.pdf")
