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
      { id: 'lengua', nombre: 'Lengua y Literatura', tono: 0, apps: [] },
      { id: 'ingles', nombre: 'Inglés', tono: 265, apps: [] },
      { id: 'geografia-historia', nombre: 'Geografía e Historia', tono: 30, apps: [] },
      { id: 'biologia', nombre: 'Biología y Geología', tono: 140, apps: [] },
      { id: 'frances', nombre: 'Francés', tono: 190, apps: [] }
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
