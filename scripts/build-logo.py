"""Genera los SVG del logo CANAVEX con la tipografía convertida a trazos.

Uso: python3 scripts/build-logo.py   (requiere: pip install fonttools brotli)
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parent.parent
FONT = ROOT / "assets/fonts/archivo-latin.woff2"
OUT = ROOT / "assets/logo"

INK = "#141714"
GREEN = "#0E6B45"
PAPER = "#F4F2EC"
SIGNAL = "#3DDC84"


def instance(wght, wdth):
    f = TTFont(FONT)
    return instantiateVariableFont(f, {"wght": wght, "wdth": wdth})


def text_paths(font, text, size, tracking=0.0, flip=None):
    """Devuelve [(path_d, x0, x1)] por letra y el ancho total. flip: índices a voltear verticalmente."""
    flip = flip or set()
    upm = font["head"].unitsPerEm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font["hmtx"]
    scale = size / upm
    cap = font["OS/2"].sCapHeight
    x = 0.0
    out = []
    for i, ch in enumerate(text):
        if ch == " ":
            x += hmtx[cmap[32]][0] * scale + tracking * size
            continue
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        if i in flip:
            # voltear sobre la mitad de la altura de mayúscula: V -> Λ
            tp = TransformPen(pen, (scale, 0, 0, scale, x, 0))
        else:
            tp = TransformPen(pen, (scale, 0, 0, -scale, x, 0))
        gs[name].draw(tp)
        d = pen.getCommands()
        adv = hmtx[name][0] * scale
        out.append((d, x, x + adv, i in flip))
        x += adv + tracking * size
    width = x - tracking * size
    return out, width, cap * scale


def word(font, text, size, tracking, colors, flip=None, y=0, x=0):
    """Devuelve SVG <g> con la palabra. Baseline en y (letras flip quedan en la misma caja)."""
    parts, w, capH = text_paths(font, text, size, tracking, flip)
    g = []
    k = 0
    for d, x0, x1, fl in parts:
        col = colors[k] if isinstance(colors, list) else colors
        k += 1
        if fl:
            # el glifo sin voltear queda con y hacia arriba (0..cap); al dibujar con escala +y queda 0..cap hacia abajo
            g.append(f'<path fill="{col}" transform="translate({x:.2f},{y - capH:.2f})" d="{d}"/>')
        else:
            g.append(f'<path fill="{col}" transform="translate({x:.2f},{y:.2f})" d="{d}"/>')
    return "\n".join(g), w, capH


# --- Símbolo: llave cuya hoja es la silueta de un auto; los pasos de rueda son los cortes ---
def symbol(head=INK, blade=GREEN, hole=PAPER, x=0, y=0, s=1.0):
    return f'''<g transform="translate({x},{y}) scale({s})">
  <path fill="{head}" fill-rule="evenodd" d="M28 12h40a28 28 0 0 1 28 28v40a28 28 0 0 1-28 28H28A28 28 0 0 1 0 80V40a28 28 0 0 1 28-28Z
    M48 38a13 13 0 0 0-7 24l-4 22h22l-4-22a13 13 0 0 0-7-24Z"/>
  <rect fill="{head}" x="94" y="48" width="22" height="26"/>
  <path fill="{blade}" d="M112 46 L136 44 C152 42 166 22 198 21 C226 20 244 30 262 44 L298 50 C311 52 318 59 318 68 V80 a6 6 0 0 1-6 6 H294 a16 16 0 0 0-32 0 H174 a16 16 0 0 0-32 0 H112 Z"/>
</g>'''

SYMBOL_W, SYMBOL_H = 318, 120


def svg(w, h, body, bg=None, title="CANAVEX Auto Keys"):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" role="img" aria-label="{title}"><title>{title}</title>{rect}{body}</svg>\n'


def main():
    black = instance(900, 125)
    bold = instance(700, 125)
    med = instance(560, 100)

    variants = {
        "color": dict(ink=INK, green=GREEN, hole=PAPER, sub=INK, bg=None),
        "inverse": dict(ink=PAPER, green=SIGNAL, hole=INK, sub=PAPER, bg=INK),
        "green": dict(ink=PAPER, green=INK, hole=GREEN, sub=PAPER, bg=GREEN),
        "mono": dict(ink=INK, green=INK, hole=PAPER, sub=INK, bg=None),
    }
    word_cols = lambda v: [v["ink"], v["ink"], v["ink"], v["green"], v["ink"], v["ink"], v["ink"]]

    for name, v in variants.items():
        # ---- Wordmark ----
        wm, w, capH = word(black, "CANVVEX", 200, 0.0, word_cols(v), flip={3}, y=200)
        pad = 40
        (OUT / f"wordmark-{name}.svg").write_text(svg(w + pad * 2, 200 + pad * 2 - (200 - capH),
            f'<g transform="translate({pad},{pad - (200 - capH)})">{wm}</g>', v["bg"]))

        # ---- Vertical (símbolo + wordmark + AUTO KEYS + bilingüe) ----
        wm, w, capH = word(black, "CANVVEX", 200, 0.0, word_cols(v), flip={3}, y=0)
        ak, akw, akH = word(bold, "AUTO KEYS", 64, 0.42, v["green"] if name != "green" else v["ink"], y=0)
        tg, tgw, tgH = word(med, "Cerrajería automotriz · Automotive Locksmith", 34, 0.04, v["sub"], y=0)
        W = max(w, tgw) + 160
        cx = W / 2
        sym_s = 1.6
        sy = 80
        sym = symbol(v["ink"], v["green"], v["hole"] if v["bg"] else PAPER, cx - SYMBOL_W * sym_s / 2, sy, sym_s)
        y1 = sy + SYMBOL_H * sym_s + 70 + capH
        y2 = y1 + 60 + akH
        y3 = y2 + 52 + tgH
        H = y3 + 80
        body = sym
        body += f'<g transform="translate({cx - w / 2:.2f},{y1:.2f})">{wm}</g>'
        body += f'<g transform="translate({cx - akw / 2:.2f},{y2:.2f})">{ak}</g>'
        rule = v["green"] if name != "green" else v["ink"]
        body += f'<rect x="{cx - w/2:.1f}" y="{y2 - akH/2 - 3:.1f}" width="{(w - akw)/2 - 36:.1f}" height="6" fill="{rule}"/>'
        body += f'<rect x="{cx + akw/2 + 36:.1f}" y="{y2 - akH/2 - 3:.1f}" width="{(w - akw)/2 - 36:.1f}" height="6" fill="{rule}"/>'
        body += f'<g transform="translate({cx - tgw / 2:.2f},{y3:.2f})">{tg}</g>'
        (OUT / f"logo-vertical-{name}.svg").write_text(svg(W, H, body, v["bg"]))

        # ---- Horizontal (símbolo a la izquierda) ----
        wm, w, capH = word(black, "CANVVEX", 140, 0.0, word_cols(v), flip={3}, y=0)
        ak, akw, akH = word(bold, "AUTO KEYS", 46, 0.62, v["green"] if name != "green" else v["ink"], y=0)
        s = 1.25
        symW, symH = SYMBOL_W * s, SYMBOL_H * s
        gap = 56
        blockH = capH + 34 + akH
        H = max(symH, blockH) + 120
        W = 60 + symW + gap + max(w, akw) + 60
        top = (H - blockH) / 2
        body = symbol(v["ink"], v["green"], v["hole"] if v["bg"] else PAPER, 60, (H - symH) / 2, s)
        tx = 60 + symW + gap
        body += f'<g transform="translate({tx:.2f},{top + capH:.2f})">{wm}</g>'
        body += f'<g transform="translate({tx:.2f},{top + capH + 34 + akH:.2f})">{ak}</g>'
        (OUT / f"logo-horizontal-{name}.svg").write_text(svg(W, H, body, v["bg"]))

        # ---- Símbolo solo ----
        (OUT / f"symbol-{name}.svg").write_text(svg(SYMBOL_W + 40, SYMBOL_H + 40,
            symbol(v["ink"], v["green"], v["hole"] if v["bg"] else PAPER, 20, 20, 1), v["bg"]))

    # ---- Avatar (perfil de redes): cabeza de llave + Λ ----
    lam, lw, lH = word(black, "V", 520, 0, PAPER, flip={0}, y=0)
    av = f'''<rect width="1080" height="1080" fill="{GREEN}"/>
<g transform="translate({540 - lw/2:.2f},{540 + lH/2 - 40:.2f})">{lam}</g>
<path fill="{INK}" d="M540 548a38 38 0 0 0-21 70l-13 74h68l-13-74a38 38 0 0 0-21-70Z"/>'''
    (OUT / "avatar.svg").write_text(svg(1080, 1080, av))

    # Glifo Λ suelto (para el sitio y los frames)
    lam, lw, lH = word(black, "V", 200, 0, "currentColor", flip={0}, y=0)
    (OUT / "lambda.svg").write_text(svg(lw, lH, f'<g transform="translate(0,{lH:.2f})">{lam}</g>'))
    print("ok", sorted(p.name for p in OUT.iterdir()))


if __name__ == "__main__":
    main()
