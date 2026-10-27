/*
  Catálogo de la web. Para añadir una app:
  1. Crea la carpeta  <persona>/<asignatura>/<nombre-app>/index.html
  2. Añádela aquí en la lista "apps" de esa asignatura.
  "tono" es el color de la tapa del cuaderno (0-360).
*/
window.CATALOGO = {
  ale: {
    nombre: 'Ale', curso: '1º ESO',
    asignaturas: [
      { id: 'matematicas', nombre: 'Matemáticas', tono: 215, apps: [
        { titulo: 'Repaso de Matemáticas', descripcion: 'Potencias, divisibilidad, m.c.d. y m.c.m., fracciones, porcentajes, reglas de tres y problemas', ruta: 'ale/matematicas/tema1-repaso/' }
      ]},
      { id: 'ham', nombre: 'Historia del Arte y de la Música', tono: 300, apps: [
        { titulo: 'Arte y Música: Temas 1 y 2', descripcion: 'Arte del Paleolítico y megalitismo; música de la Edad Media y Barroco. Fichas ilustradas, preguntas y prueba', ruta: 'ale/ham/temas-1-2/' },
        { titulo: 'Fichas animadas: Tema 2', descripcion: 'Megalitismo y Barroco musical paso a paso, con animaciones y preguntas al final de cada ficha', ruta: 'ale/ham/tema2-animado/' },
        { titulo: 'Audiciones de Música', descripcion: 'Las 10 audiciones de los temas 1 y 2: fichas, juego de reconocer fragmentos y prueba', ruta: 'ale/ham/audiciones/' }
      ]},
      { id: 'lengua', nombre: 'Lengua', tono: 0, apps: [] },
      { id: 'literatura', nombre: 'Literatura', tono: 320, apps: [
        { titulo: 'Taller de Literatura: Temas 1 y 2', descripcion: 'Géneros literarios, narración, poesía y teatro; Homero, Esopo, la tragedia griega y Jenofonte. Fichas resumidas, 6 juegos y prueba', ruta: 'ale/literatura/temas-1-2/' },
        { titulo: 'Literatura animada', descripcion: 'Once fichas animadas paso a paso: géneros, narrador, fábula, poesía, la Ilíada y la Odisea, el teatro y la tragedia griega', ruta: 'ale/literatura/animado/' }
      ]},
      { id: 'ingles', nombre: 'Inglés', tono: 265, apps: [] },
      { id: 'geografia-historia', nombre: 'Historia', tono: 30, apps: [
        { titulo: 'Expedición Historia: Temas 1 y 2', descripcion: 'La Prehistoria y La Tierra y el Universo: estaciones con estrellas, juegos, tarjetas y prueba', ruta: 'ale/geografia-historia/temas-1-2/' }
      ]},
      { id: 'mapas-geografia', nombre: 'Mapas y Geografía', tono: 175, apps: [
        { titulo: 'Viaje por España: Tema 2', descripcion: 'Comunidades, provincias, pueblos, ríos, monumentos y personajes en un mapa interactivo, con juegos, prueba y pasaporte de sellos', ruta: 'ale/mapas-geografia/tema2/' },
        { titulo: 'Atlas de Geografía: Temas 1 y 2', descripcion: 'Coordenadas, proyecciones y escalas; relieve, ríos, costas, climas y paisajes de España. Fichas con mapa físico, 8 juegos y prueba', ruta: 'ale/mapas-geografia/temas-1-2/' }
      ]},
      { id: 'biologia', nombre: 'Biología y Geología', tono: 140, apps: [
        { titulo: 'Laboratorio de células', descripcion: 'Formados por células: el microscopio, partes de la célula, procariotas y eucariotas, célula animal y vegetal y tejidos. Fichas, 8 juegos y prueba', ruta: 'ale/biologia/celulas/' }
      ]},
      { id: 'fisica-quimica', nombre: 'Física y Química', tono: 330, apps: [
        { titulo: 'Laboratorio de Física y Química', descripcion: 'Densidad, cambio de unidades, clasificación de la materia, el átomo (Z y A) y la tabla periódica. Fichas, 7 juegos y prueba', ruta: 'ale/fisica-quimica/materia-atomo/' }
      ]},
      { id: 'aleman', nombre: 'Alemán', tono: 190, apps: [] }
    ]
  },
  carla: {
    nombre: 'Carla', curso: '3º ESO',
    asignaturas: [
      { id: 'matematicas', nombre: 'Matemáticas', tono: 215, apps: [] },
      { id: 'lengua', nombre: 'Lengua y Literatura', tono: 0, apps: [] },
      { id: 'ingles', nombre: 'Inglés', tono: 265, apps: [] },
      { id: 'geografia-historia', nombre: 'Geografía e Historia', tono: 30, apps: [] },
      { id: 'biologia', nombre: 'Biología y Geología', tono: 140, apps: [] },
      { id: 'fisica-quimica', nombre: 'Física y Química', tono: 330, apps: [] },
      { id: 'tecnologia', nombre: 'Tecnología y Digitalización', tono: 50, apps: [] },
      { id: 'frances', nombre: 'Francés', tono: 190, apps: [] }
    ]
  }
};
