#!/usr/bin/env python3
"""Genera el PDF imprimible del manual de resenas de Google para Demetrio.
Uso: python3 generar_manual_resenas.py
Requiere: reportlab. El QR (QR_Resenas_Google.png) debe existir en esta carpeta.
Nota: se evitan emojis y caracteres fuera de Latin-1 para que las fuentes base
de reportlab (Helvetica) rendericen bien en cualquier impresora.
"""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, HRFlowable,
)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "Manual_Enlace_Resenas_Google.pdf")
QR = os.path.join(HERE, "QR_Resenas_Google.png")

ASPHALT = colors.HexColor("#151515")
SIGNAL = colors.HexColor("#F8C900")
GREY = colors.HexColor("#555555")

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold",
                    fontSize=20, textColor=ASPHALT, spaceAfter=4, leading=24)
SUB = ParagraphStyle("SUB", parent=styles["Normal"], fontName="Helvetica",
                     fontSize=10.5, textColor=GREY, spaceAfter=10, leading=15)
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold",
                    fontSize=13.5, textColor=ASPHALT, spaceBefore=14, spaceAfter=6, leading=17)
BODY = ParagraphStyle("BODY", parent=styles["Normal"], fontName="Helvetica",
                      fontSize=10.5, textColor=ASPHALT, spaceAfter=6, leading=15)
LI = ParagraphStyle("LI", parent=BODY, leftIndent=12, spaceAfter=3)
NOTE = ParagraphStyle("NOTE", parent=BODY, fontSize=10, textColor=GREY, leading=14)
MONO = ParagraphStyle("MONO", parent=styles["Normal"], fontName="Courier",
                      fontSize=9.5, textColor=ASPHALT, leading=13, spaceAfter=6)


def rule():
    return HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E2E1DB"),
                      spaceBefore=8, spaceAfter=8)


def build():
    doc = SimpleDocTemplate(OUT, pagesize=LETTER, topMargin=20 * mm,
                            bottomMargin=18 * mm, leftMargin=20 * mm, rightMargin=20 * mm,
                            title="Manual: enlace de resenas de Google - Lopez Sealcoating LLC")
    s = []
    s.append(Paragraph("Como obtener tu enlace de resenas de Google", H1))
    s.append(Paragraph("Para: Demetrio Lopez &mdash; Lopez Sealcoating LLC", SUB))
    s.append(rule())

    s.append(Paragraph("Por que es importante", H2))
    s.append(Paragraph(
        "Las resenas de Google son lo que mas ayuda a que tu negocio aparezca primero "
        "cuando alguien busca \"sealcoating cerca de mi\" en el area de Chicagoland. "
        "Entre mas resenas buenas tengas, mas confianza generas y mas trabajos consigues. "
        "El enlace directo hace que el cliente, con un solo toque, vea la ventana de "
        "estrellas para calificarte.", BODY))

    s.append(Paragraph(
        "<b>Ojo:</b> Google cambia seguido el diseno de sus pantallas. Si algo no se ve "
        "igual a lo aqui descrito, busca palabras parecidas: <b>Resenas</b>, "
        "<b>Pedir resenas</b>, <b>Obtener mas resenas</b> o <b>Compartir perfil</b>. "
        "Cualquiera de las tres rutas de abajo funciona.", NOTE))
    s.append(rule())

    s.append(Paragraph("Ruta A &mdash; Desde la Busqueda de Google (la mas facil)", H2))
    for t in [
        "1. Abre Google (app o navegador) con la sesion del negocio iniciada.",
        "2. En el buscador escribe: <b>mi empresa</b> o <b>Lopez Sealcoating</b>.",
        "3. Aparecera tu panel de administracion (recuadro con botones como Editar perfil, Promocionar, Leer resenas).",
        "4. Toca <b>\"Pedir resenas\"</b> (en ingles: Ask for reviews / Get more reviews).",
        "5. Google te mostrara tu enlace corto. Toca <b>\"Copiar\"</b>.",
    ]:
        s.append(Paragraph(t, LI))
    s.append(Paragraph("Ese es el enlace. Se ve parecido a:", BODY))
    s.append(Paragraph("https://g.page/r/XXXXXXXXXXXX/review", MONO))

    s.append(Paragraph("Ruta B &mdash; Desde la app de Google Maps", H2))
    for t in [
        "1. Abre la app de Google Maps en tu celular.",
        "2. Abajo a la derecha, toca tu foto de perfil.",
        "3. Entra a <b>\"Tu perfil de empresa\"</b> (Your Business Profile).",
        "4. Toca <b>\"Promocionar\"</b> y luego <b>\"Pedir resenas\"</b>.",
        "5. Copia el enlace o mandalo directo por WhatsApp.",
    ]:
        s.append(Paragraph(t, LI))

    s.append(Paragraph("Ruta C &mdash; Desde la seccion de Resenas", H2))
    for t in [
        "1. En tu panel del negocio, busca la pestana <b>\"Resenas\"</b> (Reviews).",
        "2. Arriba veras un boton como <b>\"Obtener mas resenas\"</b> (Get more reviews).",
        "3. Toca ahi y copia el enlace que te muestra.",
    ]:
        s.append(Paragraph(t, LI))
    s.append(rule())

    s.append(Paragraph("Que hago con el enlace", H2))
    for t in [
        "1. <b>Mandalo a Aimarktech</b> (WhatsApp o correo). Lo ponemos en el boton "
        "\"Dejanos tu resena\" de tu pagina para que sea de un solo clic.",
        "2. <b>Guardalo en tu celular</b> y mandalo a cada cliente satisfecho al terminar el trabajo.",
        "3. <b>Pidela en el momento correcto:</b> justo cuando terminas y el cliente ve el asfalto negro y limpio.",
    ]:
        s.append(Paragraph(t, LI))
    s.append(Paragraph(
        "<i>Mensaje sugerido:</i> \"Gracias por confiar en Lopez Sealcoating. Si quedo bien "
        "tu trabajo, nos ayudarias con una resena de 5 estrellas? Solo toca aqui: [tu enlace]. "
        "Se lo agradezco mucho!\"", NOTE))
    s.append(rule())

    # Bloque QR
    s.append(Paragraph("Codigo QR para imprimir", H2))
    intro_qr = Paragraph(
        "Este codigo QR apunta a tu ficha de Google. Pegalo en la camioneta, en un letrero "
        "o imprimelo en tus recibos y cotizaciones. El cliente lo escanea y deja su resena "
        "ahi mismo. Cuando tengamos tu enlace directo (Ruta A/B/C) generamos un QR nuevo "
        "que lleve directo a la ventana de estrellas.", BODY)
    if os.path.exists(QR):
        qr_img = Image(QR, width=34 * mm, height=34 * mm)
        tbl = Table([[qr_img, intro_qr]], colWidths=[38 * mm, None])
        tbl.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 6),
        ]))
        s.append(tbl)
    else:
        s.append(intro_qr)
    s.append(Paragraph("Ficha actual (referencia): https://www.google.com/maps?cid=9429981723223566481", MONO))

    doc.build(s)
    print("PDF generado:", OUT)


if __name__ == "__main__":
    build()
