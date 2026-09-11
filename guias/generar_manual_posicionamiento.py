#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera el manual imprimible (PDF): Cómo posicionar Lopez Sealcoating en el Top de Google (Chicago).
Preparado por Aimarktech. Ejecutar: python3 generar_manual_posicionamiento.py
Salida: Manual_Posicionamiento_Google.pdf
"""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    ListFlowable, ListItem, HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

ASPHALT = HexColor("#151515")
SIGNAL = HexColor("#F8C900")
GRAY = HexColor("#555555")
LIGHT = HexColor("#F3F2ED")
WHITE = HexColor("#FFFFFF")

styles = getSampleStyleSheet()
H = ParagraphStyle("H", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=13, textColor=WHITE, leading=16)
SUB = ParagraphStyle("SUB", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=11.5, textColor=ASPHALT, spaceBefore=8, spaceAfter=3, leading=14)
BODY = ParagraphStyle("BODY", parent=styles["Normal"], fontName="Helvetica", fontSize=10, textColor=ASPHALT, leading=14, spaceAfter=4)
BODYI = ParagraphStyle("BODYI", parent=BODY, fontName="Helvetica-Oblique", textColor=GRAY, fontSize=9.5)
BUL = ParagraphStyle("BUL", parent=BODY, leftIndent=4, spaceAfter=2)
TITLE = ParagraphStyle("TITLE", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=20, textColor=WHITE, alignment=TA_CENTER, leading=24)
SUBTITLE = ParagraphStyle("SUBTITLE", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=12, textColor=SIGNAL, alignment=TA_CENTER, leading=15)
SMALLC = ParagraphStyle("SMALLC", parent=styles["Normal"], fontName="Helvetica", fontSize=9, textColor=GRAY, alignment=TA_CENTER)


def bar(text):
    t = Table([[Paragraph(text, H)]], colWidths=[17 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ASPHALT),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def bullets(items):
    return ListFlowable([ListItem(Paragraph(i, BUL), value="•", bulletColor=SIGNAL) for i in items],
                        bulletType="bullet", start="•", leftIndent=12, bulletColor=SIGNAL, bulletFontName="Helvetica-Bold")


def numbered(items):
    return ListFlowable([ListItem(Paragraph(i, BUL)) for i in items], bulletType="1", leftIndent=14, bulletColor=ASPHALT, bulletFontName="Helvetica-Bold")


story = []
cover = Table([[Paragraph("POSICIONAR EN EL TOP DE GOOGLE", TITLE)],
               [Paragraph("Manual paso a paso &nbsp;·&nbsp; Lopez Sealcoating LLC &nbsp;·&nbsp; Chicago", SUBTITLE)]], colWidths=[17 * cm])
cover.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), ASPHALT),
                           ("TOPPADDING", (0, 0), (-1, 0), 16), ("BOTTOMPADDING", (0, 1), (-1, 1), 16)]))
story += [cover, Spacer(1, 6)]
story += [Paragraph("Preparado por <b>Aimarktech</b> &nbsp;·&nbsp; soyaimarktech.com", SMALLC), Spacer(1, 10)]
story += [Paragraph(
    "Meta: entrar al <b>\u201cMap Pack\u201d</b> (los 3 negocios del mapa) para b\u00fasquedas como "
    "\u201csealcoating near me\u201d o \u201cdriveway sealcoating [ciudad]\u201d en el \u00e1rea de Chicago (base: Hanover Park).", BODY)]
story += [Paragraph(
    "Google ordena los negocios locales por <b>Relevancia</b>, <b>Distancia</b> y <b>Prominencia</b>. "
    "Relevancia y Prominencia s\u00ed las controlamos; la Distancia se trabaja con la zona de servicio y el contenido local. "
    "Nota honesta: el #1 no se puede garantizar, pero la competencia local casi no cuida esto.", BODYI)]
story += [Spacer(1, 8)]

# Paso 1
story += [bar("Paso 1 \u2014 Perfil de Empresa en Google (lo m\u00e1s importante)")]
story += [Spacer(1, 5)]
story += [numbered([
    "Crear el perfil en <b>google.com/business</b> con la cuenta del negocio.",
    "Categor\u00eda principal: <b>Paving contractor</b>; agregar secundarias relacionadas.",
    "Configurar como <b>negocio de \u00e1rea de servicio</b>: ocultar direcci\u00f3n y listar las ciudades (las 16 definidas).",
    "<b>Verificar</b> (normalmente por video). Puede tardar unos d\u00edas: arrancar cuanto antes.",
    "Completar TODO: servicios con descripci\u00f3n, horario de temporada, tel\u00e9fono, sitio web, <b>fotos reales (10+)</b> y logo.",
    "Publicar <b>\u201cPosts\u201d</b> cada 1\u20132 semanas (trabajos, ofertas de temporada).",
])]
story += [Paragraph("Un perfil completo es el requisito para aparecer en el mapa. Sin \u00e9l, no hay Top 3.", BODYI)]
story += [Spacer(1, 8)]

# Paso 2
story += [bar("Paso 2 \u2014 Rese\u00f1as (el mayor diferenciador)")]
story += [Spacer(1, 5)]
story += [numbered([
    "Pedir una rese\u00f1a <b>despu\u00e9s de CADA trabajo</b> (enlace + QR + guion, ya preparados).",
    "<b>Ritmo constante</b>: 2\u20134 por semana en temporada (no 20 de golpe: riesgo de suspensi\u00f3n).",
    "<b>Responder TODAS</b> (buenas y malas) con profesionalismo.",
    "Pedir que la rese\u00f1a mencione <b>servicio + ciudad</b> (el texto tambi\u00e9n cuenta para relevancia).",
])]
story += [Paragraph("Meta a 90 d\u00edas: <b>20+ rese\u00f1as</b> y <b>4.7\u2605+</b>.", BODY)]
story += [Paragraph("Guion (pedir la rese\u00f1a):", SUB)]
guion = Table([
    [Paragraph("<b>ES</b>", BODY), Paragraph("\u201c\u00a1Gracias por confiar en Lopez Sealcoating! Una rese\u00f1a de 5 estrellas en Google nos ayuda much\u00edsimo. Toma 30 segundos: [enlace]\u201d", BODY)],
    [Paragraph("<b>EN</b>", BODY), Paragraph("\u201cThanks for choosing Lopez Sealcoating! A quick 5-star Google review helps a lot. It takes 30 seconds: [link]\u201d", BODY)],
], colWidths=[1.5 * cm, 15.5 * cm])
guion.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), LIGHT), ("BOX", (0, 0), (-1, -1), 0.5, GRAY),
                           ("INNERGRID", (0, 0), (-1, -1), 0.5, GRAY), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                           ("LEFTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story += [guion, Spacer(1, 8)]

# Paso 3
story += [bar("Paso 3 \u2014 NAP consistente + directorios")]
story += [Spacer(1, 5)]
story += [Paragraph("<b>NAP</b> = mismo <b>N</b>ombre, <b>A</b>direcci\u00f3n/zona y <b>P</b> tel\u00e9fono en todos lados:", BODY)]
story += [bullets([
    "Nombre: <b>Lopez Sealcoating LLC</b> \u00b7 Tel: <b>(331) 236-9387</b> \u00b7 Web: <b>lopezsealcoating.com</b>",
    "Alta en directorios con el MISMO texto: Bing Places, Apple Maps, Yelp, Nextdoor, Angi, BBB, Facebook.",
    "La consistencia ayuda a Google a \u201cconectar\u201d todas las menciones y sube la confianza.",
])]
story += [Spacer(1, 8)]

# Paso 4
story += [bar("Paso 4 \u2014 Contenido del sitio (relevancia)")]
story += [Spacer(1, 5)]
story += [bullets([
    "<b>P\u00e1ginas por servicio</b> (Sellado / Pintura de l\u00edneas): alcance, preparaci\u00f3n, factores de precio, cuidados.",
    "<b>Preguntas frecuentes</b> + datos estructurados FAQ (ayuda a Google y a respuestas de IA).",
    "Contenido local real (proyectos con ciudad/servicio/resultado). <b>Evitar</b> p\u00e1ginas \u201cclon\u201d por ciudad.",
    "T\u00edtulos y descripciones con palabra clave + ciudad; sitio r\u00e1pido y en m\u00f3vil (ya lo est\u00e1).",
])]
story += [Spacer(1, 8)]

# Paso 5
story += [bar("Paso 5 \u2014 Autoridad y enlaces locales")]
story += [Spacer(1, 5)]
story += [bullets([
    "Enlaces desde negocios/proveedores locales, c\u00e1maras de comercio y patrocinios.",
    "Colaboraciones (paisajismo, bienes ra\u00edces, administradores de propiedades) que enlacen al sitio.",
])]
story += [Spacer(1, 8)]

# Paso 6
story += [bar("Paso 6 \u2014 Medir y ajustar")]
story += [Spacer(1, 5)]
story += [bullets([
    "<b>Google Search Console</b>: verificar dominio, enviar sitemap, revisar indexaci\u00f3n y b\u00fasquedas.",
    "<b>Google Analytics 4</b>: llamadas, WhatsApp y cotizaciones (el sitio ya est\u00e1 listo).",
    "<b>Panel del Perfil de Google</b>: llamadas, rutas y clics al sitio.",
    "Revisi\u00f3n <b>mensual</b>; duplicar lo que funciona.",
])]
story += [Spacer(1, 6)]
kpi = Table([
    ["Indicador", "Meta (90 d\u00edas)"],
    ["Rese\u00f1as en Google", "20+"],
    ["Calificaci\u00f3n promedio", "4.7\u2605+"],
    ["Posici\u00f3n en el Map Pack (palabra clave principal)", "Top 3"],
    ["Llamadas/mensajes por mes", "30+"],
    ["Cotizaciones por mes", "15+"],
], colWidths=[12 * cm, 5 * cm])
kpi.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), ASPHALT), ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"), ("FONTSIZE", (0, 0), (-1, -1), 9.5),
    ("GRID", (0, 0), (-1, -1), 0.5, GRAY), ("ALIGN", (1, 0), (1, -1), "CENTER"),
    ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4), ("LEFTPADDING", (0, 0), (-1, -1), 6),
]))
story += [kpi, Spacer(1, 8)]

# Errores
story += [bar("Errores a evitar")]
story += [Spacer(1, 5)]
story += [bullets([
    "Perfil incompleto o categor\u00eda equivocada.",
    "Rese\u00f1as compradas o todas de golpe.",
    "NAP inconsistente entre sitios.",
    "P\u00e1ginas por ciudad vac\u00edas/duplicadas.",
    "Prometer tiempos que no se cumplen (el sitio dice: respuesta en menos de 24 h).",
])]
story += [Spacer(1, 10)]
story += [HRFlowable(width="100%", thickness=1, color=SIGNAL), Spacer(1, 4)]
story += [Paragraph("AIMARKTECH &nbsp;·&nbsp; Marketing \u00b7 Tecnolog\u00eda \u00b7 Presencia Digital &nbsp;·&nbsp; soyaimarktech.com", SMALLC)]


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(20 * cm, 1.1 * cm, "Lopez Sealcoating LLC \u00b7 Manual de Posicionamiento \u00b7 Aimarktech")
    canvas.drawString(2 * cm, 1.1 * cm, "P\u00e1gina %d" % doc.page)
    canvas.restoreState()


doc = BaseDocTemplate("Manual_Posicionamiento_Google.pdf", pagesize=LETTER,
                      leftMargin=2 * cm, rightMargin=2 * cm, topMargin=1.6 * cm, bottomMargin=1.8 * cm,
                      title="Manual de Posicionamiento en Google - Lopez Sealcoating LLC", author="Aimarktech")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
doc.build(story)
print("OK -> Manual_Posicionamiento_Google.pdf")
