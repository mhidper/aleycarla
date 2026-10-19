# Ale y Carla

Apps de estudio para Ale (1º ESO) y Carla (3º ESO). Cada app es una página HTML autónoma, sin dependencias ni instalación.

## Estructura

```
index.html            Web principal: elegir niña → asignatura → app
catalogo.js           Lista de niñas, asignaturas y apps (lo único que hay que editar)
ale/
  matematicas/
    tema1-repaso/     Repaso de Matemáticas (potencias, divisibilidad, fracciones, porcentajes, reglas de tres, problemas)
  ham/
    temas-1-2/        Historia del Arte y de la Música, temas 1 y 2 (Paleolítico, megalitismo, Edad Media, Barroco)
    tema2-animado/    Fichas animadas del Tema 2 (megalitismo y Barroco), hechas con GSAP
    audiciones/       Audiciones de los temas 1 y 2. Los MP3 NO están en el repo: se cargan desde el dispositivo
  geografia-historia/
    temas-1-2/        Expedición Historia: La Prehistoria y La Tierra y el Universo
carla/
```

Para añadir una app:
1. Crear `<persona>/<asignatura>/<nombre-app>/index.html`.
2. Añadirla en `catalogo.js`, dentro de `apps` de esa asignatura (título, descripción y ruta).

Las asignaturas también se añaden, quitan o renombran en `catalogo.js`.

## Publicación

Con GitHub Pages activado (Settings → Pages → Deploy from a branch → `main`, carpeta `/ (root)`), la web queda en `https://mhidper.github.io/aleycarla/`.
