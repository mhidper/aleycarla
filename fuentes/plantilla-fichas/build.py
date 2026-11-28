#!/usr/bin/env python3
"""Genera las apps de estudio con el estilo de «Mediterráneo y España».

Uso:  python3 fuentes/plantilla-fichas/build.py            (todas)
      python3 fuentes/plantilla-fichas/build.py renacimiento (una)

Cada app es contenido/<nombre>.js. Empieza con un bloque /*META {...} META*/ en JSON:
  out      ruta del index.html que se genera (desde la raíz del repo)
  title, h1, h1span, intro, back, backtxt
  acc, accsoft, accdark, accdarksoft   color de acento (claro y oscuro)
  linkapp  (opcional) [texto, ruta] de un enlace a otra app
y después define window.APP (ver README.md de esta carpeta).
"""
import json, re, sys, pathlib, html

AQUI = pathlib.Path(__file__).parent
RAIZ = AQUI.parent.parent

def build(js_path):
    src = js_path.read_text(encoding='utf-8')
    m = re.search(r'/\*META(.*?)META\*/', src, re.S)
    meta = json.loads(m.group(1))
    css = (AQUI / 'estilo.css').read_text(encoding='utf-8')
    for k in ('acc', 'accsoft', 'accdark', 'accdarksoft'):
        css = css.replace('{{%s}}' % k.upper(), meta[k])
    link = ''
    if meta.get('linkapp'):
        t, r = meta['linkapp']
        link = f'<a class="link-app" href="{r}">{html.escape(t)}</a>'
    out = (AQUI / 'shell.html').read_text(encoding='utf-8')
    rep = {
        'TITLE': html.escape(meta['title']), 'H1': meta['h1'], 'H1SPAN': meta['h1span'],
        'INTRO': meta['intro'], 'BACK': meta['back'], 'BACKTXT': meta['backtxt'], 'LINKAPP': link,
        'CSS': css, 'LIB': (AQUI / 'lib.js').read_text(encoding='utf-8'),
        'CONTENT': src, 'MOTOR': (AQUI / 'motor.js').read_text(encoding='utf-8'),
    }
    for k, v in rep.items():
        out = out.replace('{{%s}}' % k, v)
    dest = RAIZ / meta['out']
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding='utf-8')
    print('✓', dest.relative_to(RAIZ))

if __name__ == '__main__':
    names = sys.argv[1:]
    files = [AQUI / 'contenido' / f'{n}.js' for n in names] if names else sorted((AQUI / 'contenido').glob('*.js'))
    for f in files:
        build(f)
