# Plantilla de apps con esquema, fichas, juegos y prueba

El modelo es la app «Mediterráneo y España» de Historia. Todas las apps hechas con esta plantilla
comparten el mismo estilo: cuatro pestañas (Esquema, Fichas, Juegos, Prueba), fichas animadas
con las palabras clave dentro del dibujo y textos cortos debajo.

## Generar
```
python3 fuentes/plantilla-fichas/build.py                 # todas
python3 fuentes/plantilla-fichas/build.py renacimiento    # una
```
El resultado es un `index.html` autónomo en la ruta `out` de cada contenido. No edites ese HTML:
edita `contenido/<app>.js` y vuelve a generar.

## Piezas
- `shell.html`, `estilo.css`: página y estilo comunes (el color de acento va en el META).
- `lib.js`: dibujos reutilizables (`T`, `chip`, `tag`, `arrow`, `curve`, `person`, `singer`, `book`,
  instrumentos, edificios…). Lienzo de las fichas: 400 × 250.
- `motor.js`: esquema, fichas, cuatro tipos de juego y prueba.
- `contenido/*.js`: un archivo por app.

## Reglas de estilo para las fichas
1. Una idea por paso. `clear:1` empieza un dibujo nuevo; sin él, el paso se suma al anterior.
2. Cada dibujo lleva un `tag` con el concepto principal y `chip` con las palabras clave pegadas
   al elemento que nombran (no en una tira aparte).
3. Texto de abajo (`c`): 1-2 frases, unas 25-35 palabras, conceptos en `<b>`.
4. Movimiento en cada paso: `.mv` (llega desde `data-dx`/`data-dy`), `.dr` (línea que se dibuja),
   `.pop` (aparece con rebote), `.fo` (se apaga).
5. Tres preguntas de comprobación por ficha; la prueba mezcla esas con `pool`.

## Tipos de juego (`games`)
- `clasifica`: `cards:[[texto, clave]]` y `bins` (por defecto, las categorías `cats`).
- `binario`: `sets:[{t, a:[nombre,color], b:[nombre,color], it:[[texto,'a'|'b']]}]`.
- `orden`: `items` en el orden correcto.
- `puntos`: dibujo `base` y `spots:[[clave, nombre, x, y]]` para tocar en el mapa o la imagen.
