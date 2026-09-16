#!/usr/bin/env python3
"""Genera el PDF imprimible de la guía de Google Analytics.
Uso: python3 generar_manual_analytics.py
Requiere: reportlab. Lee el .md hermano y lo renderiza a PDF.
Nota: se sanean caracteres fuera de Latin-1 (emojis, flechas) para que las
fuentes base de reportlab dibujen bien en cualquier impresora.
"""
import os
import re
import html
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)

HERE = os.path.dirname(os.path.abspath(__file__))
MD = os.path.join(HERE, "Manual_Google_Analytics.md")
OUT = os.path.join(HERE, "Manual_Google_Analytics.pdf")

ASPHALT = colors.HexColor("#151515")
GREY = colors.HexColor("#555555")
CODEBG = colors.HexColor("#F3F2ED")

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="Helvetica-Bold",
                    fontSize=19, textColor=ASPHALT, spaceBefore=6, spaceAfter=6, leading=23)
H2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="Helvetica-Bold",
                    fontSize=14, textColor=ASPHALT, spaceBefore=14, spaceAfter=5, leading=18)
H3 = ParagraphStyle("H3", parent=styles["Heading3"], fontName="Helvetica-Bold",
                    fontSize=11.5, textColor=ASPHALT, spaceBefore=9, spaceAfter=3, leading=15)
BODY = ParagraphStyle("BODY", parent=styles["Normal"], fontName="Helvetica",
                      fontSize=10.5, textColor=ASPHALT, spaceAfter=5, leading=15)
LI = ParagraphStyle("LI", parent=BODY, leftIndent=14, spaceAfter=3)
QUOTE = ParagraphStyle("QUOTE", parent=BODY, leftIndent=10, fontSize=10,
                       textColor=GREY, leading=14, spaceBefore=3, spaceAfter=6)
CODE = ParagraphStyle("CODE", parent=styles["Normal"], fontName="Courier",
                      fontSize=9.5, textColor=ASPHALT, leading=13)


def sanitize(s: str) -> str:
    repl = {
        "\u2192": "->", "\u2194": "<->", "\u2190": "<-",
        "\u2014": "-", "\u2013": "-", "\u2026": "...",
        "\u201c": '"', "\u201d": '"', "\u2018": "'", "\u2019": "'",
        "\u25b8": ">",
    }
    for k, v in repl.items():
        s = s.replace(k, v)
    return s.encode("latin-1", "ignore").decode("latin-1")


def inline(text: str) -> str:
    text = sanitize(text)
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+?)`", r'<font face="Courier" size=9>\1</font>', text)
    return text


def rule():
    return HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E2E1DB"),
                      spaceBefore=8, spaceAfter=8)


def code_block(lines):
    txt = "<br/>".join(html.escape(sanitize(ln), quote=False) for ln in lines)
    p = Paragraph(txt, CODE)
    tbl = Table([[p]], colWidths=[None])
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CODEBG),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#D9D8D1")),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return tbl


def build():
    with open(MD, encoding="utf-8") as f:
        lines = f.read().split("\n")

    story = []
    in_code = False
    code_lines = []
    for raw in lines:
        line = raw.rstrip("\n")
        if line.strip().startswith("```"):
            if not in_code:
                in_code = True
                code_lines = []
            else:
                in_code = False
                story.append(code_block(code_lines))
                story.append(Spacer(1, 3))
            continue
        if in_code:
            code_lines.append(line)
            continue

        s = line.strip()
        if not s:
            story.append(Spacer(1, 4))
        elif s == "---":
            story.append(rule())
        elif s.startswith("# "):
            story.append(Paragraph(inline(s[2:]), H1))
        elif s.startswith("## "):
            story.append(Paragraph(inline(s[3:]), H2))
        elif s.startswith("### "):
            story.append(Paragraph(inline(s[4:]), H3))
        elif s.startswith("> "):
            story.append(Paragraph(inline(s[2:]), QUOTE))
        elif re.match(r"^- \[[ x]\] ", s):
            box = "[X]" if s[3] == "x" else "[  ]"
            story.append(Paragraph(box + " " + inline(s[6:]), LI))
        elif s.startswith("- ") or s.startswith("* "):
            story.append(Paragraph("&bull; " + inline(s[2:]), LI))
        elif re.match(r"^\d+\. ", s):
            story.append(Paragraph(inline(s), LI))
        else:
            story.append(Paragraph(inline(s), BODY))

    doc = SimpleDocTemplate(OUT, pagesize=LETTER, topMargin=18 * mm,
                            bottomMargin=16 * mm, leftMargin=18 * mm, rightMargin=18 * mm,
                            title="Guia Google Analytics - Lopez Sealcoating LLC")
    doc.build(story)
    print("PDF generado:", OUT)


if __name__ == "__main__":
    build()
