# Ale y Carla

Apps de estudio para Ale (1º ESO) y Carla (3º ESO). Cada app es una página HTML autónoma, sin dependencias ni instalación.

## Estructura

```
index.html            Portada
estilo.css            Estilo común de las portadas
ale/
  index.html          Asignaturas de Ale
  matematicas/
    tema1-repaso/     Repaso del Tema 1 (potencias, divisibilidad, fracciones, problemas)
carla/
  index.html          Asignaturas de Carla
```

Para añadir una app: crear `<persona>/<asignatura>/<nombre-app>/index.html` y enlazarla desde el `index.html` de esa persona.

## Publicación

Con GitHub Pages activado (Settings → Pages → Deploy from a branch → `main`, carpeta `/ (root)`), la web queda en `https://mhidper.github.io/aleycarla/`.
