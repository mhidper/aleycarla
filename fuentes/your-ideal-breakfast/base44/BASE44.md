# Pasar «Your Ideal Breakfast» a Base44

Esta guía sirve para construir en Base44 la misma app que ya funciona en
`https://mhidper.github.io/aleycarla/ale/proyectos/your-ideal-breakfast/`.

La app de referencia está hecha con lo mismo que usa Base44 por dentro (React,
Tailwind y componentes shadcn/ui), así que el resultado debería parecerse mucho.

## Qué hay en esta carpeta

| Archivo | Para qué sirve |
|---|---|
| `recetas.json` | Las 25 recetas en español e inglés, con el formato exacto de la entidad `Recipe` |
| `recetas.csv` | Las mismas recetas en CSV, por si Base44 permite importarlas desde el panel de datos |
| `ingredientes.json`, `ingredientes.csv` | Los 55 ingredientes de la lista de la compra, con su sección del súper |
| `logo.png`, `icono-512.png` | Logo redondo con fondo transparente e icono de la app |
| `primavera.png`, `verano.png`, `otono.png`, `invierno.png` | Los cuatro amaneceres del fondo de la pantalla Hoy |
| `estaciones-720.mp4` | Vídeo en bucle de las cuatro estaciones (25,7 s, sin audio, 2,3 MB) para el fondo de Hoy |
| `estaciones-1080.mp4` | El mismo vídeo en alta calidad, para la presentación |
| `capturas/` | Capturas de cada pantalla para pegarlas en el chat de Base44 como referencia |

## Cómo trabajar

- Pega los prompts **de uno en uno** y en orden. Comprueba que cada paso funciona antes de seguir.
- Cuando un prompt hable de una pantalla, **adjunta su captura** de la carpeta `capturas/`.
- Si algo sale distinto, usa los prompts de corrección del final.

---

## Paso 1. Crear la app y el estilo

```
Crea una app móvil llamada "Your Ideal Breakfast". Su eslogan es "Una app que te regala mañanas".
La app propone cada día un desayuno sano según la estación del año y los festivos, muestra la receta
paso a paso y tiene un registro de alergias para no proponer nunca algo que el usuario no pueda comer.

Estilo visual:
- Colores: naranja principal #ED9940, mandarina #F29731, naranja tostado #E37634, crema #F9F0E2,
  chocolate #332522 (texto) y blanco.
- Fondo general crema #F9F0E2. La parte superior de las pantallas principales es naranja #ED9940 con texto blanco.
- Tipografías de Google Fonts: "Lilita One" para títulos y "Nunito" para el resto del texto.
- Botones redondeados tipo píldora. Botón principal chocolate #332522 con texto crema.
- Diseño pensado para móvil, columna centrada de ancho máximo 448 px.

Por ahora crea solo la estructura vacía con cuatro pestañas en una barra inferior fija:
"Hoy" (icono de amanecer), "Semana" (icono de calendario), "Recetas" (icono de libro) y
"Alergias" (icono de escudo con check).
Arriba, una barra naranja con el logo redondo a la izquierda y el nombre "Your Ideal Breakfast" en Lilita One, en dos líneas.
```
Sube `logo.png` cuando Base44 pida el logo, o adjúntalo a este primer mensaje.

## Paso 2. Selector de idioma con banderas

```
Toda la app debe estar en español y en inglés. Añade arriba a la derecha, en la barra naranja,
un selector de idioma en forma de píldora con dos opciones: bandera de España + "ES" y bandera
del Reino Unido + "EN". La opción activa va sobre fondo blanco. Dibuja las banderas como imágenes
SVG, no como emojis, porque los emojis de bandera no se ven en Windows.
Al cambiar de idioma cambian todos los textos de la app al momento, y el idioma elegido se recuerda.
```

## Paso 3. La entidad de recetas

```
Crea una entidad llamada Recipe con estos campos:
- id (texto, identificador corto, por ejemplo "batido-fresas-menta")
- emoji (texto, un emoji que representa el desayuno)
- season (texto: spring, summer, autumn o winter)
- holiday (texto opcional: christmas, kings, valentine, easter o halloween; vacío si no es de un festivo)
- time_minutes (número), servings (número), difficulty (texto: easy o medium)
- allergens (lista de textos, valores posibles: gluten, milk, egg, nuts, peanut, soy, sesame)
- name_es, name_en, description_es, description_en, tip_es, tip_en (textos)
- ingredients_es, ingredients_en, steps_es, steps_en (listas de textos)
- shopping_items (lista de textos con los id de la entidad Ingredient que hay que comprar para esta receta)

Crea también una entidad Ingredient con los campos id, name_es, name_en y aisle
(sección del súper: produce, dairy, bakery o pantry).
Los textos _es se muestran cuando la app está en español y los _en cuando está en inglés.
```

## Paso 4. Cargar las 25 recetas

Primero prueba a importar `recetas.csv` desde el panel de datos de la entidad Recipe.
Las columnas de listas vienen escritas como listas JSON (`["gluten","milk"]`).
Haz lo mismo con `ingredientes.csv` en la entidad Ingredient.
Si no hay opción de importar, adjunta `recetas.json` e `ingredientes.json` en el chat con este prompt:

```
Te adjunto recetas.json (25 recetas) e ingredientes.json (55 ingredientes). Crea un registro de la
entidad Recipe por cada receta y uno de la entidad Ingredient por cada ingrediente, copiando todos
los campos tal cual, sin cambiar ni resumir los textos.
Cuando termines, dime cuántas recetas hay de cada estación y de cada festivo, y cuántos ingredientes.
```
Debe responder: 5 de primavera, 5 de verano, 5 de otoño, 5 de invierno y 1 de cada festivo
(Navidad, Reyes, San Valentín, Semana Santa y Halloween).

## Paso 5. Preferencias del usuario (alergias)

```
Crea una entidad UserPreferences con los campos allergies (lista de textos con los mismos valores
que Recipe.allergens) y language (texto: es o en). Cada usuario tiene sus propias preferencias.

Pantalla "Alergias" (adjunto captura 4-alergias.png):
- Título "Mis alergias" / "My allergies" y debajo: "Lo que marques aquí se guarda. La app nunca te
  propondrá un desayuno con estos ingredientes."
- Lista de 7 alérgenos, cada uno con un icono redondo, su nombre, una pista en gris y un interruptor a la derecha:
  Gluten (Pan, avena, harina) · Leche y lácteos (Yogur, queso, leche) · Huevo (Tortillas, tortitas) ·
  Frutos secos (Nueces, almendras) · Cacahuete (Crema de cacahuete) · Soja (Bebida y yogur de soja) ·
  Sésamo (Semillas, hummus). En inglés: Gluten, Milk and dairy, Egg, Tree nuts, Peanut, Soy, Sesame.
- Cuando un interruptor está activo, el círculo del icono se pone naranja tostado #E37634.
- Debajo, una frase que cuenta cuántas alergias hay marcadas.
- En la pestaña "Alergias" de la barra inferior, un círculo naranja con el número de alergias marcadas.
```

## Paso 6. La lógica del desayuno de hoy

```
Así se elige el desayuno de cada día (es la parte más importante de la app):

1. Estación según la fecha (hemisferio norte):
   primavera del 20 de marzo al 20 de junio, verano del 21 de junio al 22 de septiembre,
   otoño del 23 de septiembre al 20 de diciembre, invierno del 21 de diciembre al 19 de marzo.
2. Festivos: Navidad del 20 de diciembre al 2 de enero; Reyes el 5 y 6 de enero; San Valentín el
   14 de febrero; Halloween el 31 de octubre; Semana Santa del Jueves Santo al Domingo de
   Resurrección (calcula el Domingo de Pascua de cada año).
3. Se descartan las recetas que contengan alguno de los alérgenos del usuario.
4. Si hoy es festivo y hay receta de ese festivo apta, se propone esa.
5. Si no, se toman las recetas aptas de la estación actual que no sean de festivo, y se elige una
   según el día del año (número de día dividido entre el número de recetas, y se usa el resto),
   para que cada día salga una distinta pero el mismo día salga siempre la misma.
6. El botón "Otra idea" pasa a la siguiente receta de esa lista.
7. Si no queda ninguna receta apta de la estación, se elige entre las aptas de todo el año y se
   avisa: "No hay recetas de esta estación sin tus alérgenos, así que te proponemos una de otra época."
```

## Paso 7. Pantalla "Hoy"

```
Pantalla "Hoy" (adjunto capturas 1-hoy.png y 1b-hoy-abajo.png). Parte superior naranja #ED9940, todo centrado:
- Saludo y fecha: "Buenos días. Jueves, 29 de octubre" (en inglés "Good morning. Thursday 29 October").
- Si es festivo, en Lilita One color chocolate: "¡Hoy es un día especial! Halloween".
- Un "plato": círculo crema grande (unos 208 px) con un borde blanco semitransparente grueso,
  y el emoji de la receta muy grande en el centro. Al cambiar de receta, el emoji entra con una
  pequeña animación, como si lo sirvieran.
- "Tu desayuno de hoy", debajo el nombre de la receta muy grande en Lilita One blanco, y la descripción.
- Una fila en color chocolate con: icono y nombre de la estación (o del festivo), minutos, personas y dificultad.
- Dos botones del mismo ancho: "Ver receta" (chocolate) y "Otra idea" (borde blanco, icono de barajar).
Debajo, sobre fondo crema con las esquinas superiores redondeadas, tarjetas blancas:
- Si el usuario tiene alergias: escudo naranja + "Sin ninguno de tus alérgenos".
  Si no tiene: "Marca tus alergias y no te propondremos nada que no puedas comer." y un botón "Marcar alergias".
- "Por qué es buena idea", con icono de bombilla, y el consejo (tip) de la receta.
- Al final, el eslogan en Lilita One naranja tostado.
```

## Paso 8. Pantalla "Recetas"

```
Pantalla "Recetas" (adjunto captura 2-recetario.png):
- Título "Recetario" / "Recipe book" y "Desayunos sanos para cada época del año."
- Filtros en píldoras con scroll horizontal: Todas, Primavera (icono flor), Verano (sol),
  Otoño (hoja), Invierno (copo de nieve) y Fiestas (confeti). Al abrir, está seleccionada la estación actual.
  La píldora activa es chocolate con texto crema.
- Lista dentro de una tarjeta blanca, una fila por receta: emoji en un circulito crema, nombre en
  Lilita One, y debajo estación y minutos en gris.
- Si una receta contiene alguno de los alérgenos del usuario, la fila sale atenuada y con un aviso
  naranja: "Contiene: gluten, leche y lácteos".
- Al tocar una fila se abre la receta.
```

## Paso 9. Pantalla de receta

```
Pantalla de detalle de receta (adjunto capturas 3-receta.png y 3b-receta-pasos.png):
- Parte superior naranja con botón "Volver", el plato con el emoji, el nombre grande y la fila de
  estación, minutos, personas y dificultad.
- Si contiene alérgenos del usuario, una tarjeta naranja tostado con "Contiene: …".
- Etiquetas blancas con todos los alérgenos de la receta (las que coinciden con los del usuario, en naranja).
  Si no tiene ninguno: "Sin alérgenos frecuentes".
- Tarjeta "Ingredientes": cada ingrediente con una casilla que se puede marcar (queda tachado).
- Tarjeta "Paso a paso": pasos numerados en círculos naranjas; al tocar un paso se marca como hecho
  (el número cambia a un check). Arriba, "2 de 5 pasos hechos", y al terminar "¡Listo! Que aproveche."
- Tarjeta chocolate con "Consejo" y el tip de la receta.
```

## Paso 10. Probar otra fecha (para la presentación)

```
En la pantalla "Alergias", al final, añade una tarjeta con borde discontinuo llamada "Probar otra fecha":
"Para la presentación: elige un día y mira qué desayuno propone la app en esa estación o festivo."
Con un selector de fecha. Si se elige una fecha, toda la app funciona como si hoy fuera ese día, y en la
pantalla "Hoy" aparece una etiqueta "Fecha de prueba: 31/10/2026". Un botón "Volver a hoy" la quita.
Esta fecha no se guarda: al recargar, vuelve el día real.
```

## Paso 11. Pestaña "Semana": plan de desayunos

```
Crea una entidad WeeklyPlan, propia de cada usuario, con: start_date (fecha), days (lista de
objetos con date, recipe_id y accepted sí/no), missing_items (lista de id de Ingredient) y
step (número: 0, 1 o 2).

Pantalla "Semana" (adjunto capturas 6-semana.png y 7-semana-cambiar.png). Parte superior naranja con
el título "Tu semana", el rango de fechas ("Del viernes 30 de octubre al jueves 5 de noviembre") y
un indicador de tres pasos: 1 Desayunos, 2 Ingredientes, 3 Compra. El paso activo va en blanco y los
terminados llevan un check.

Paso 1, Desayunos:
- Se planifican los 7 días siguientes, empezando mañana. Para cada día se elige un desayuno con la
  misma lógica que la pantalla Hoy (festivos primero, luego la estación, sin alérgenos del usuario),
  pero sin repetir ninguna receta en la semana.
- Una tarjeta por día: día de la semana abreviado y número a la izquierda, emoji en un circulito,
  nombre de la receta (enlace a su detalle) y estación o festivo.
- Dos botones: "OK" (chocolate) y "Cambiar". Al dar OK, la tarjeta queda con borde naranja y un
  check redondo a la derecha, y aparece un enlace pequeño "Cambiar" por si se arrepiente.
- Al pulsar "Cambiar" se abre dentro de la tarjeta "Elige otro desayuno para este día" con 4 opciones
  (emoji, nombre, minutos y estación): primero las de la estación de ese día, sin alérgenos del usuario
  y sin repetir las que ya están en la semana. Debajo, "Más opciones" muestra las 4 siguientes y
  "Cancelar" cierra. Al elegir una opción, ese día queda con la nueva receta y con OK.
- Si una receta del plan contiene un alérgeno del usuario, se avisa en naranja y no se puede dar OK.
- Barra fija abajo, encima de las pestañas: "3 de 7 días con OK", un botón "OK a todos" y el botón
  "Aceptar la semana", que solo se activa con los 7 días en OK y lleva al paso 2.
```

## Paso 12. Ingredientes que faltan

```
Paso 2 de la pestaña Semana (adjunto captura 8-ingredientes.png):
- Título "¿Qué te falta en casa?" y "Estos son los ingredientes para tus 7 desayunos. Marca los que no tienes."
- Se juntan los shopping_items de las 7 recetas sin repetir y se agrupan por sección del súper, en este
  orden: Fruta y verdura (produce), Lácteos, huevos y frescos (dairy), Pan y cereales (bakery) y
  Despensa (pantry). En inglés: Fruit and vegetables, Dairy, eggs and chilled, Bread and cereals, Pantry.
- Cada ingrediente con una casilla, su nombre y a la derecha en gris "para 3 desayunos" (cuántas
  recetas de la semana lo usan). Botones pequeños "Marcar todos" y "Desmarcar todos".
- Barra fija abajo: botón con flecha para volver al paso 1 y "Crear lista de la compra (5)", con el
  número de ingredientes marcados. Desactivado si no hay ninguno marcado.
```

## Paso 13. Lista de la compra en PDF

```
Paso 3 de la pestaña Semana (adjunto captura 9-lista-compra.png):
- Título "Lista de la compra" y "5 productos para comprar."
- Los ingredientes marcados, agrupados por sección, con una casilla vacía delante de cada uno.
- Botón grande "Descargar PDF". Debajo, "Cambiar ingredientes" (vuelve al paso 2) y "Empezar de nuevo".

El PDF se genera en el navegador con la librería jsPDF y se descarga con el nombre
lista-de-la-compra-AAAA-MM-DD.pdf. Formato A4:
- Banda naranja #ED9940 arriba con el logo, el título "Lista de la compra" en blanco y debajo
  "Your Ideal Breakfast | " seguido del rango de fechas.
- Cada sección con su título en naranja tostado #E37634 y una línea debajo; cada ingrediente con una
  casilla vacía para tachar, el nombre y a la derecha "para N desayunos".
- Al final, un recuadro crema con "Desayunos de la semana": cada día y su receta.
- Abajo del todo, centrado, el eslogan en naranja tostado.
Todo en el idioma que tenga elegida la app.
```

Añade también en la pantalla Hoy, antes del eslogan, una tarjeta chocolate con un icono de cesta:
«Planifica tu semana. Elige los desayunos de los próximos 7 días y saca la lista de la compra.»
y un botón "Planificar" que abre la pestaña Semana.

## Paso 14. El amanecer de cada estación en la pantalla Hoy

Sube las cuatro imágenes (`primavera.png`, `verano.png`, `otono.png`, `invierno.png`) y pega:

```
En la pantalla Hoy, cambia el fondo naranja de la parte superior por la imagen del amanecer de la
estación del día (primavera, verano, otoño o invierno; en un festivo, la de su estación).
- La imagen ocupa todo el ancho en una caja de proporción 2:3, alineada abajo, de modo que se
  recorta solo la parte alta del cielo, que está vacía.
- El sol tiene que verse entero. El plato con el emoji (unos 144 px, con una sombra suave) va debajo,
  apoyado sobre la colina: centrado en horizontal y a un 62 % de la altura de la caja.
- El texto (Tu desayuno de hoy, nombre, descripción, datos y botones) empieza justo debajo del
  plato, en blanco.
- Encima de la imagen, un degradado: chocolate #332522 al 25 % arriba, transparente en el centro y
  chocolate al 45 % abajo, para que el texto blanco se lea. Debajo de la imagen, el fondo continúa
  con este color sólido según la estación: primavera #374028, verano #6F481F, otoño #542816,
  invierno #5B566A, para que no se note dónde acaba la imagen.
- Partículas que caen despacio por todo el fondo: pétalos rosas en primavera, destellos dorados que
  suben en verano, hojas naranjas en otoño y copos de nieve blancos en invierno. Unas 16, con
  distintos tamaños y velocidades. Si el usuario tiene activado "reducir movimiento", no se muestran.
- El botón "Ver receta" pasa a ser crema con texto chocolate, para que destaque sobre el fondo oscuro.
```

## Paso 15. El vídeo de las estaciones de fondo

Sube `estaciones-720.mp4` (2,3 MB, la que usa la app de referencia; `estaciones-1080.mp4` es para proyectar) y pega:

```
En la parte superior de la pantalla Hoy, pon de fondo el vídeo que te adjunto en lugar de la imagen
fija, ocupando el mismo espacio (caja 2:3 a todo el ancho, vídeo alineado abajo, como la imagen).
- El vídeo se reproduce solo, sin sonido, en bucle y sin controles (autoplay, muted, loop, playsInline).
- Mientras carga se ve la imagen de la estación del día (como poster).
- Si el usuario tiene activado "reducir movimiento" o el ahorro de datos, no se carga el vídeo y se
  queda la imagen fija con las partículas.
- Con el vídeo puesto no se muestran las partículas, porque el vídeo ya tiene pétalos, hojas y nieve.
- El degradado de encima pasa a ser: chocolate al 25 % arriba, transparente del 25 % al 55 % de la
  altura, chocolate al 55 % a la altura del 72 % y chocolate #332522 sólido abajo del todo. Debajo
  del vídeo, el fondo es chocolate #332522, para que no se note el corte en ninguna estación.
- El sol sigue viéndose entero, con el plato debajo sobre la colina, y los textos siguen en blanco.
```

---

## Comprobaciones finales

Con "Probar otra fecha", la app debería proponer:

| Fecha | Desayuno |
|---|---|
| 31/10/2026 | Tortitas de calabaza con telaraña (Halloween) |
| 25/12/2026 | Tortitas navideñas de canela y miel |
| 06/01/2027 | Bol de Reyes con joyas de fruta |
| 14/02/2027 | Tostada de corazón con fresas |
| 26/03/2027 | Torrijas al horno (Semana Santa) |

Y si marcas Gluten y Leche en otoño, debe salir el aviso de otra época y proponer la Macedonia de cítricos con dátiles.

En la pestaña Semana, con la fecha real del 29 de octubre de 2026, el sábado 31 debe salir la receta de Halloween,
ninguna receta debe repetirse y el PDF debe descargarse con las secciones y los desayunos de la semana.

## Prompts de corrección

- **Los colores no coinciden:** «Usa exactamente estos colores y ningún otro: #ED9940, #F29731, #E37634, #F9F0E2, #332522 y blanco.»
- **Mezcla idiomas:** «Revisa todas las pantallas: con el idioma en inglés no debe quedar ningún texto en español, y al revés.»
- **No respeta las alergias:** «Si el usuario marca un alérgeno, ninguna receta que lo contenga puede salir en la pantalla Hoy. Revisa la lógica del paso 6.»
- **Cambia el texto de las recetas:** «No reescribas las recetas: muestra los textos exactamente como están en la entidad Recipe.»
- **El plan repite recetas:** «En el plan semanal no puede haber dos días con la misma receta.»
- **El PDF sale con símbolos raros:** «No pongas emojis en el PDF, solo texto.»
- **Se parece poco a la captura:** adjunta la captura otra vez y escribe «Haz que esta pantalla se parezca lo más posible a la imagen adjunta.»
