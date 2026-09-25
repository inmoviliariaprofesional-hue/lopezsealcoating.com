#!/usr/bin/env python3
"""Generador genérico de PDF a partir de un Markdown de la carpeta guias/.
Uso: python3 generar_pdf_guia.py <entrada.md> <salida.pdf> ["Titulo del documento"]
Requiere: reportlab. Saneo de caracteres fuera de Latin-1 (emojis/flechas) para
que las fuentes base (Helvetica/Courier) rendericen bien en cualquier impresora.
"""
import os
import re
import sys
import html
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)

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
                      fontSize=9, textColor=ASPHALT, leading=12)

# Emojis usados -> equivalente limpio (lo no mapeado se descarta con latin-1 ignore).
EMOJI = {
    "\u2705": "-",  # check verde
    "\u2b50": "*",  # estrella
    "\U0001F342": "", "\U0001F4C5": "", "\U0001F4DE": "", "\U0001F517": "",
    "\U0001F7E1": "", "\U0001F535": "", "\U0001F680": "", "\U0001F4AA": "",
    "\U0001F389": "", "\U0001F4E3": "", "\U0001F3A8": "",
    "\u2192": "->", "\u2194": "<->", "\u2190": "<-",
    "\u2014": "-", "\u2013": "-", "\u2026": "...",
    "\u201c": '"', "\u201d": '"', "\u2018": "'", "\u2019": "'",
}


def sanitize(s: str) -> str:
    for k, v in EMOJI.items():
        s = s.replace(k, v)
    return s.encode("latin-1", "ignore").decode("latin-1")


def inline(text: str) -> str:
    text = sanitize(text).strip()
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+?)`", r'<font face="Courier" size=9>\1</font>', text)
    return text


def rule():
    return HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E2E1DB"),
                      spaceBefore=8, spaceAfter=8)


def code_block(lines):
    txt = "<br/>".join(html.escape(sanitize(ln), quote=False) for ln in lines)
    p = Paragraph(txt or "&nbsp;", CODE)
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


def build(md_path, out_path, title):
    with open(md_path, encoding="utf-8") as f:
        lines = f.read().split("\n")

    story = []
    in_code = False
    code_lines = []
    for raw in lines:
        line = raw.rstrip("\n")
        if line.strip().startswith("```"):
            if not in_code:
                in_code, code_lines = True, []
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

    doc = SimpleDocTemplate(out_path, pagesize=LETTER, topMargin=18 * mm,
                            bottomMargin=16 * mm, leftMargin=18 * mm, rightMargin=18 * mm,
                            title=title)
    doc.build(story)
    print("PDF generado:", out_path)


if __name__ == "__main__":
    md_in = sys.argv[1]
    pdf_out = sys.argv[2]
    doc_title = sys.argv[3] if len(sys.argv) > 3 else os.path.basename(pdf_out)
    build(md_in, pdf_out, doc_title)
