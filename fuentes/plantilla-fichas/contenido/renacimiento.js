/*META {
 "out": "ale/ham/renacimiento/index.html",
 "title": "Renacimiento musical",
 "h1": "Renacimiento", "h1span": "musical",
 "intro": "Tema 2 de Música: los albores del siglo XV, el Renacimiento pleno, la música religiosa, profana, instrumental y la danza, y los compositores españoles. Mira el esquema, repasa con las fichas animadas, juega y haz la prueba.",
 "back": "../../../#ale/ham", "backtxt": "Arte y Música de Ale",
 "acc": "#c0127e", "accsoft": "#fbe4f1", "accdark": "#ff5fb9", "accdarksoft": "#3a1a33"
} META*/

const C={alb:'#8a3b12',ple:'#1e5fb4',rel:'#7b2a8c',pro:'#b0302a',ins:'#17734a',dan:'#b8860b',com:'#c0127e'};

/* ---------- dibujos propios del tema ---------- */
const coins=(x,y)=>`<g>${[0,1,2].map(k=>`<ellipse cx="${x}" cy="${y-k*6}" rx="14" ry="5" fill="#f2c230" stroke="#8a6500" stroke-width="1.2"/>`).join('')}</g>`;
const blind=(x,y,s=1)=>`<rect x="${x-13*s}" y="${y-3*s}" width="${26*s}" height="${6*s}" rx="${3*s}" fill="#222"/>`;
const dolphin=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 6 Q-10 -14 14 -6 Q22 -2 26 4 Q18 4 14 8 Q0 12 -14 8 L-24 16 L-20 6Z" fill="#4b82d9" stroke="#1e4f94" stroke-width="1.5"/><path d="M0 -8 L4 -18 L8 -8" fill="#4b82d9" stroke="#1e4f94"/><circle cx="16" cy="-1" r="1.5" fill="#fff"/></g>`;
const voiceLine=(y,c,lbl,d)=>`<g class="mv" data-dx="${d}"><path d="M84 ${y} C120 ${y-14} 160 ${y+14} 210 ${y} S300 ${y-12} 360 ${y}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>${note(150,y+4,c,.8)}${note(260,y+2,c,.8)}${T(78,y+5,lbl,{size:13,w:800,c,a:'end'})}</g>`;

window.APP={
store:'ham_renac',
cats:{
 alb:{n:'Siglo XV: los albores',c:C.alb},ple:{n:'Siglo XVI: Renacimiento pleno',c:C.ple},rel:{n:'Música religiosa',c:C.rel},
 pro:{n:'Música profana',c:C.pro},ins:{n:'Música instrumental',c:C.ins},dan:{n:'La danza',c:C.dan},com:{n:'Compositores',c:C.com}
},

/* ================= ESQUEMA ================= */
esquema:{
 kicker:'El esquema del tema',title:'Renacimiento musical de un vistazo',hint:'Toca cada parte del esquema para ver las ideas clave.',viewBox:'0 0 400 260',
 nodes:{
  alb:[92,30,'Albores · s. XV'],ple:[308,30,'Pleno · s. XVI'],rel:[70,96,'Religiosa'],pro:[330,96,'Profana'],
  ins:[70,164,'Instrumental'],dan:[330,164,'La danza'],voz:[90,232,'Poetas y cantores'],tec:[200,240,'Tecla y vihuela'],vic:[318,232,'Victoria']
 },
 draw(sel){
  let s=`<rect width="400" height="260" fill="#fbf3e3"/>`;
  for(const[k,[x,y]]of Object.entries(this.nodes))s+=`<path d="M200 130 L${x} ${y}" stroke="${this.items[k].c}" stroke-width="2.4" stroke-dasharray="4 4"/>`;
  s+=`<g transform="translate(200 130)"><polygon points="-70,-16 -56,-30 56,-30 70,-16 70,16 56,30 -56,30 -70,16" fill="#fff" stroke="#c0127e" stroke-width="3"/>${T(0,-4,'Renacimiento',{size:15,w:800,ff:'var(--f-display)'})}${T(0,14,'musical',{size:15,w:800,c:'#c0127e',ff:'var(--f-display)'})}</g>`;
  s+=`<g opacity=".5">${notes2(150,92,'#c0127e',.8)}${note(255,88,'#c0127e',.8)}${note(150,186,'#c0127e',.7)}${notes2(240,190,'#c0127e',.7)}</g>`;
  for(const[k,[x,y,l]]of Object.entries(this.nodes)){const c=this.items[k].c,on=sel===k,w=tw(l,13);
   s+=`<g class="pin" data-k="${k}" style="cursor:pointer"><rect x="${x-w/2}" y="${y-13}" width="${w}" height="26" rx="7" fill="${on?c:'#fff'}" stroke="${c}" stroke-width="2.2"/>${T(x,y+5,l,{size:13,w:800,c:on?'#fff':c})}</g>`}
  return s;
 },
 items:{
  alb:{t:'Los albores (siglo XV)',c:C.alb,scene:'albores',notes:['Nobles y príncipes mantienen <b>músicos permanentes</b> para fiestas y viajes: nacen las <b>capillas privadas</b>','Para los oficios religiosos, unos <b>15 cantores</b> y <b>4 o 5 instrumentistas</b>','Predomina la <b>música franco-flamenca</b>, extendida por Europa','Gana importancia la <b>música profana</b>','Los <b>instrumentos</b> ganan peso propio transcribiendo la música vocal']},
  ple:{t:'Renacimiento pleno (siglo XVI)',c:C.ple,scene:'pleno',notes:['1. <b>Culminación de la polifonía</b>','2. La voz cantada se <b>sustituye por instrumentos</b>','3. El músico trabaja bajo la protección de un <b>mecenas</b> y empieza a ser <b>valorado</b>']},
  rel:{t:'Música religiosa',c:C.rel,scene:'religiosa',notes:['<b>Música coral</b> leída en grandes libros sobre un atril giratorio: el <b>facistol</b>','Formas: el <b>motete</b> y la <b>misa</b> (a cuatro o cinco voces)','El <b>Concilio de Trento</b> quiso una música religiosa «<b>entendible</b>» y llamó a la polifonía anterior (Ars Nova) «<b>ruido infernal</b>»']},
  pro:{t:'Música profana',c:C.pro,scene:'profana',notes:['<b>Madrigal italiano</b>: sobre un poema libre de gran calidad literaria, en <b>estilo recitativo</b>. Lo canta un <b>solista</b> y se pueden añadir instrumentos. Gran figura: <b>Claudio Monteverdi</b>','<b>Villancico</b>: basado en la <b>repetición de un estribillo</b>']},
  ins:{t:'Música instrumental',c:C.ins,scene:'instrumental',notes:['Formas: la <b>tocata</b> y la <b>fantasía</b>, de carácter libre: importa la <b>imaginación</b> o la <b>improvisación</b> del compositor','Instrumentos: el <b>órgano</b>, los de tecla como el <b>clavicordio</b> (antecedente del piano), el <b>arpa</b> y, algo menos, el <b>laúd</b>']},
  dan:{t:'La danza',c:C.dan,scene:'danza',notes:['Actividad social muy apreciada','<b>Pavana</b>: movimientos solemnes y elegantes','<b>Gallarda</b>: más rápida','Las acompañaban <b>flautas, cornetas, trombones, violas, laúdes y arpas</b>']},
  voz:{t:'Poetas y cantores',c:C.com,scene:'voz',notes:['<b>Juan del Encina</b>: poeta, músico y dramaturgo. 68 piezas en el <b>Cancionero musical de Barbieri</b>; escribió el tratado «<b>Arte de la poesía castellana</b>»','<b>Mateo Flecha</b>: catalán, famoso por sus «<b>ensaladas</b>» a 4 o 5 voces que mezclan lenguas para divertir a los cortesanos','<b>Gutierre de Cetina</b>: poeta sevillano, soldado en Italia, apodado «<b>Vandalio</b>». Su famoso <b>madrigal</b> está dedicado a Laura Gonzaga']},
  tec:{t:'Tecla y vihuela',c:C.com,scene:'tecla',notes:['<b>Antonio de Cabezón</b>: organista <b>ciego</b> de Carlos I y Felipe II; autor de las <b>primeras variaciones</b> de la música española','<b>Alonso Mudarra</b>: uno de los <b>siete vihuelistas</b> españoles; «Fantasía que contrahaze el arpa», «Claros y frescos ríos», «Guárdame las vacas»','<b>Luis de Narváez</b>: vihuelista; «<b>Los seis libros del Delphín</b>», música en cifra para tañer vihuela']},
  vic:{t:'Tomás Luis de Victoria',c:C.com,scene:'victoria',notes:['Nace en <b>Ávila</b> (1548) y muere en <b>Madrid</b> (1611). Niño de coro en Ávila','En <b>1565</b> viaja a <b>Roma</b>; recibe lecciones de <b>Palestrina</b>; en 1575 se ordena sacerdote','En <b>1587</b> vuelve a España: capellán y maestro de capilla de las <b>Descalzas Reales</b>, al servicio de la emperatriz María','Su estilo, con <b>equilibrio y pureza</b>, ya anuncia la expresividad barroca']}
 }
},

/* ================= FICHAS ================= */
scenes:[
{id:'albores',cat:'alb',short:'Albores (s. XV)',t:'Los albores: el siglo XV',steps:[
 {clear:1,d:`${bg('#eef3f7')}<path d="M0 205 H400 V250 H0Z" fill="#d8c79c"/>${palace(110,205,1.1)}${church(300,205,1)}
  <g class="mv" data-dx="-80">${person(195,150,C.alb,1.5)}${lute(226,182,.6)}</g>
  ${tag(200,26,'Capillas privadas',C.alb,16)}${chip(110,104,'nobles y príncipes',ORG,12)}${chip(200,232,'músicos permanentes',C.alb,13)}${chip(300,82,'fiestas y viajes',ORG,12)}`,
  c:'En el <b>siglo XV</b>, los <b>nobles y príncipes</b> querían música en sus fiestas y viajes. Para tenerla siempre, contrataban <b>músicos permanentes</b>: así nacieron las <b>capillas privadas</b>.'},
 {clear:1,d:`${bg()}${tag(200,24,'Una capilla para la misa',C.alb,15)}
  <g>${[0,1,2,3,4].map(c=>[0,1,2].map(r=>singer(60+c*26,86+r*36,['#7b2a8c','#1e5fb4','#b0302a'][r],.75)).join('')).join('')}</g>
  ${chip(112,212,'unos 15 cantores',C.alb,13)}
  <g class="mv" data-dx="80">${flute(240,120,.8)}${viola(280,118,.7)}${trombone(320,96,.6)}${lute(350,130,.6)}</g>
  ${chip(300,212,'4 o 5 instrumentistas',C.alb,13)}`,
  c:'Para los <b>oficios religiosos</b> la capilla tenía, de media, unos <b>15 cantores</b> y solo <b>4 o 5 instrumentistas</b>: mandaba la voz.'},
 {clear:1,d:`${bg(SEA)}<path d="M0 250 L0 120 Q60 90 120 110 L150 60 Q200 40 260 60 L330 40 L400 70 V250Z" fill="${LAND}" stroke="#b49a62" stroke-width="2"/>
  <g class="pop"><ellipse cx="190" cy="80" rx="58" ry="26" fill="${C.alb}"/>${T(190,76,'música',{size:12,w:700,c:'#fff'})}${T(190,92,'franco-flamenca',{size:12,w:700,c:'#fff'})}</g>
  ${curve('M170 96 Q120 150 80 190',C.alb)}${curve('M200 104 Q230 170 240 210',C.alb)}${curve('M216 72 Q280 70 340 100',C.alb)}
  ${chip(80,210,'España',C.alb,12)}${chip(250,228,'Italia',C.alb,12)}${chip(350,120,'Alemania',C.alb,12)}${tag(200,24,'Se extiende por Europa',C.alb,15)}`,
  c:'En ese siglo predominaba la <b>música franco-flamenca</b> (de Francia y Flandes), que se extendió por toda Europa.'},
 {clear:1,d:`${bg()}${tag(200,24,'Cambios que llegan',C.alb,15)}
  <g>${palace(95,140,.8)}${chip(95,170,'gana la música profana',ORG,12)}${notes2(130,70,C.pro,.9)}</g>
  <g>${book(270,100,80,50)}${curve('M270 130 Q270 150 300 160',C.ins)}${lute(320,175,.7)}${chip(268,226,'los instrumentos copian la música vocal',C.ins,11)}</g>`,
  c:'Además, la <b>música profana</b> (no religiosa) ganó importancia, y los <b>instrumentos</b> empezaron a tener peso propio <b>transcribiendo</b> (copiando para tocar) la música vocal.'}
],quiz:[
 {q:'¿Qué eran las capillas privadas del siglo XV?',a:'Grupos de músicos permanentes de nobles y príncipes',o:['Iglesias pequeñas sin música','Escuelas de baile','Libros de partituras'],e:'Los tenían para sus fiestas, viajes y oficios.'},
 {q:'¿Cómo era una capilla para los oficios religiosos?',a:'Unos 15 cantores y 4 o 5 instrumentistas',o:['Solo instrumentistas','Un único cantante','100 músicos de orquesta'],e:'Mandaba la voz.'},
 {q:'¿Qué música predominaba en el siglo XV?',a:'La franco-flamenca',o:['La barroca','La egipcia','El flamenco andaluz'],e:'Se extendió por toda Europa.'}
]},

{id:'pleno',cat:'ple',short:'Pleno (s. XVI)',t:'Renacimiento pleno: el siglo XVI',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'1 · Culminación de la polifonía',C.ple,15)}
  ${voiceLine(70,'#7b2a8c','Soprano',200)}${voiceLine(110,'#b0302a','Contralto',-200)}${voiceLine(150,'#17734a','Tenor',200)}${voiceLine(190,'#1e5fb4','Bajo',-200)}
  ${chip(200,232,'varias voces a la vez, cada una con su melodía',ORG,12)}`,
  c:'El siglo XVI tiene tres rasgos. El primero: la <b>polifonía</b> (varias voces, cada una con su propia melodía) llega a su <b>punto más alto</b>.'},
 {clear:1,d:`${bg()}${tag(200,24,'2 · Los instrumentos sustituyen la voz',C.ple,15)}
  <g class="fo">${singer(110,100,'#7b2a8c',1.6)}${notes2(150,90,'#7b2a8c',.9)}</g>
  ${arrow(170,140,230,140,C.ple)}
  <g class="pop">${viola(290,130,1.1)}${notes2(320,80,C.ins,.9)}</g>${chip(110,200,'voz cantada',C.rel,13)}${chip(290,210,'instrumento',C.ins,13)}`,
  c:'El segundo: la voz cantada empieza a <b>sustituirse por instrumentos</b>, que tocan la misma melodía.'},
 {clear:1,d:`${bg()}${tag(200,24,'3 · El mecenas',C.ple,15)}
  <g>${person(110,110,'#7b2a8c',1.6)}${crown(110,103)}${chip(110,190,'mecenas',C.ple,14)}</g>
  <g class="mv" data-dx="-90">${coins(200,150)}</g>
  <g>${person(290,110,C.com,1.6)}${lute(318,150,.6)}${chip(290,190,'músico',C.com,14)}</g>
  ${chip(200,228,'el músico empieza a ser valorado',ORG,13)}`,
  c:'El tercero: el músico trabaja bajo la protección de un <b>mecenas</b> (un noble rico que le paga) y empieza a ser <b>valorado</b> como artista.'}
],quiz:[
 {q:'¿Qué le pasa a la polifonía en el siglo XVI?',a:'Llega a su culminación',o:['Desaparece','Se inventa por primera vez','Se prohíbe en las iglesias'],e:'Es su momento de máximo esplendor.'},
 {q:'¿Qué es un mecenas?',a:'Alguien rico que protege y paga al músico',o:['Un instrumento de tecla','Un tipo de danza','Un libro de coro'],e:'Gracias a él, el músico empieza a ser valorado.'},
 {q:'¿Qué sustituye a la voz cantada en el Renacimiento pleno?',a:'Los instrumentos',o:['El silencio','Los aplausos','Los coros de niños'],e:'Tocan la misma melodía.'}
]},

{id:'religiosa',cat:'rel',short:'Religiosa',t:'La música religiosa',steps:[
 {clear:1,d:`${bg('#f1ece4')}<path d="M0 0 H400 V250 H0Z" fill="none"/>${tag(200,24,'Música coral',C.rel,16)}
  ${facistol(200,110,1.05)}
  <g class="mv" data-dx="-60">${singer(110,130,'#7b2a8c',1.1)}${singer(80,140,'#1e5fb4',1.1)}</g><g class="mv" data-dx="60">${singer(290,130,'#b0302a',1.1)}${singer(320,140,'#17734a',1.1)}</g>
  ${chip(320,70,'facistol',ORG,14)}${chip(85,70,'grandes libros',C.rel,12)}${T(200,240,'atril giratorio',{size:12,c:MUT,it:1})}`,
  c:'Era <b>música coral</b>: todos los cantores leían de <b>grandes libros</b> colocados sobre un atril que gira, el <b>facistol</b>.'},
 {clear:1,d:`${bg()}<line x1="200" y1="45" x2="200" y2="235" stroke="${MUT}" stroke-dasharray="5 5" stroke-width="2"/>
  ${tag(100,26,'Motete',C.rel,16)}${book(100,105,90,56,C.rel)}${chip(100,170,'obra religiosa breve',ORG,12)}
  ${tag(300,26,'Misa',C.rel,16)}<g>${[0,1,2,3,4].map(k=>singer(250+k*25,85,['#7b2a8c','#b0302a','#17734a','#1e5fb4','#8a3b12'][k],.85)).join('')}</g>${chip(300,150,'4 o 5 voces',ORG,14)}`,
  c:'Sus dos formas principales son el <b>motete</b>, una obra religiosa breve, y la <b>misa</b>, compuesta para <b>cuatro o cinco voces</b>.'},
 {clear:1,d:`${bg()}${tag(200,24,'Concilio de Trento',C.rel,16)}
  <g class="fo"><path d="M40 70 C80 140 120 60 160 150 S120 200 60 120 S150 90 170 200" stroke="#8a3b12" stroke-width="3" fill="none"/><path d="M50 190 C100 60 140 200 170 80" stroke="#b0302a" stroke-width="3" fill="none"/></g>
  ${chip(105,225,'Ars Nova: «ruido infernal»',C.pro,12)}
  ${arrow(185,140,225,140,C.rel)}
  <g class="dr"><path d="M240 90 H370" stroke="#7b2a8c" stroke-width="4"/><path d="M240 120 H370" stroke="#1e5fb4" stroke-width="4"/><path d="M240 150 H370" stroke="#17734a" stroke-width="4"/></g>
  ${chip(305,195,'música «entendible»',C.ins,13)}`,
  c:'El <b>Concilio de Trento</b> quiso una música religiosa en la que se entendiera bien el texto. A la polifonía anterior (<b>Ars Nova</b>) llegó a llamarla «<b>ruido infernal</b>».'}
],quiz:[
 {q:'¿Qué es el facistol?',a:'Un atril giratorio para los grandes libros de coro',o:['Un instrumento de viento','Una danza lenta','Un tipo de misa'],e:'Todos los cantores leían del mismo libro.'},
 {q:'¿Para cuántas voces se componía la misa?',a:'Para cuatro o cinco voces',o:['Para una sola voz','Para veinte voces','Solo para órgano'],e:''},
 {q:'¿Qué pidió el Concilio de Trento?',a:'Una música religiosa «entendible»',o:['Más instrumentos de percusión','Prohibir la misa','Cantar solo en francés'],e:'A la polifonía anterior la llamó «ruido infernal».'}
]},

{id:'profana',cat:'pro',short:'Profana',t:'La música profana',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'Madrigal italiano',C.pro,16)}
  ${scroll(90,110,90,60)}${chip(90,160,'poema libre',C.pro,12)}${chip(90,186,'gran calidad literaria',C.pro,11)}
  ${arrow(145,110,185,110,C.pro)}
  <g class="pop">${singer(220,90,C.pro,1.4)}</g>${chip(220,165,'solista',ORG,13)}
  <g class="mv" data-dx="80">${lute(300,105,.7)}${viola(345,100,.6)}</g>${chip(325,165,'+ instrumentos',ORG,12)}
  ${chip(200,226,'Claudio Monteverdi',C.pro,14)}`,
  c:'El <b>madrigal italiano</b> parte de un <b>poema libre</b> de gran calidad. Se canta en <b>estilo recitativo</b> (casi hablado) por un <b>solista</b>, y se pueden añadir instrumentos. Su gran figura: <b>Claudio Monteverdi</b>.'},
 {clear:1,d:`${bg()}${tag(200,24,'Villancico',C.pro,16)}
  ${[['Estribillo',1],['Copla',0],['Estribillo',1],['Copla',0],['Estribillo',1]].map(([l,e],k)=>`<g class="pop"><rect x="${22+k*74}" y="${e?90:110}" width="64" height="${e?60:40}" rx="8" fill="${e?C.pro:'#fff'}" stroke="${C.pro}" stroke-width="2"/>${T(54+k*74,e?125:135,l,{size:12,w:700,c:e?'#fff':C.pro})}</g>`).join('')}
  ${curve('M86 160 Q130 200 196 160',ORG)}${curve('M234 160 Q278 200 344 160',ORG)}
  ${chip(200,226,'se repite el estribillo',ORG,14)}`,
  c:'El <b>villancico</b> se basa en la <b>repetición de un estribillo</b>: entre estrofa y estrofa vuelve siempre la misma parte.'}
],quiz:[
 {q:'¿En qué se basa el madrigal italiano?',a:'En un poema libre de gran calidad literaria',o:['En una oración en latín','En una danza rápida','En el sonido del órgano'],e:'Se canta en estilo recitativo.'},
 {q:'¿Quién es un gran representante del madrigal?',a:'Claudio Monteverdi',o:['Tomás Luis de Victoria','Antonio de Cabezón','Juan del Encina'],e:''},
 {q:'¿Qué caracteriza al villancico?',a:'La repetición de un estribillo',o:['Que solo lo toca el órgano','Que no tiene letra','Que dura más de una hora'],e:''}
]},

{id:'instrumental',cat:'ins',short:'Instrumental',t:'La música instrumental',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'Tocata y fantasía',C.ins,16)}
  ${person(110,120,C.ins,1.6)}${clavi(110,200,.9)}
  <g class="pop"><ellipse cx="270" cy="100" rx="90" ry="50" fill="#fff" stroke="${C.ins}" stroke-width="2"/><circle cx="185" cy="140" r="7" fill="#fff" stroke="${C.ins}" stroke-width="2"/><circle cx="170" cy="150" r="4" fill="#fff" stroke="${C.ins}" stroke-width="2"/>${notes2(240,100,C.ins,.9)}${note(300,96,ORG,.9)}${T(270,130,'¡a mi manera!',{size:12,it:1,c:MUT})}</g>
  ${chip(270,175,'carácter libre',ORG,13)}${chip(290,210,'imaginación e improvisación',C.ins,12)}`,
  c:'Aparecen la <b>tocata</b> y la <b>fantasía</b>, piezas de <b>carácter libre</b>: importan más la <b>imaginación</b> o la <b>improvisación</b> del compositor que una estructura fija.'},
 {clear:1,d:`${bg()}${tag(200,24,'Instrumentos destacados',C.ins,16)}
  <g>${organ(70,140,.9)}${T(70,200,'órgano',{size:13,w:700})}</g>
  <g>${clavi(170,140,.8)}${T(170,200,'clavicordio',{size:13,w:700})}${chip(170,226,'antecedente del piano',ORG,11)}</g>
  <g>${harp(270,130,.85)}${T(270,200,'arpa',{size:13,w:700})}</g>
  <g>${lute(345,130,.8)}${T(345,200,'laúd',{size:13,w:700})}${T(345,216,'(menos)',{size:11,c:MUT,it:1})}</g>`,
  c:'Además del <b>órgano</b>, gustan mucho los instrumentos de <b>tecla</b> como el <b>clavicordio</b> (antecedente del piano), el <b>arpa</b> y, algo menos, el <b>laúd</b>.'}
],quiz:[
 {q:'¿Qué importa más en una fantasía o una tocata?',a:'La imaginación o improvisación del compositor',o:['Repetir un estribillo','Que la cante un coro','Que se entienda el texto en latín'],e:'Son piezas de carácter libre.'},
 {q:'¿Qué instrumento es el antecedente del piano?',a:'El clavicordio',o:['El laúd','El arpa','La corneta'],e:''},
 {q:'La tocata y la fantasía son formas…',a:'Instrumentales',o:['Religiosas para coro','De danza','De villancico'],e:''}
]},

{id:'danza',cat:'dan',short:'La danza',t:'La danza',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'Actividad social muy apreciada',C.dan,15)}<line x1="200" y1="45" x2="200" y2="235" stroke="${MUT}" stroke-dasharray="5 5" stroke-width="2"/>
  ${tag(100,62,'Pavana',C.dan,15)}<g class="mv" data-dx="-30">${person(80,110,'#7b2a8c',1.4)}${person(120,110,'#1e5fb4',1.4)}</g>${chip(100,196,'solemne y elegante',ORG,12)}${T(100,222,'lenta…',{size:13,it:1,c:MUT})}
  ${tag(300,62,'Gallarda',C.dan,15)}<g class="mv" data-dy="-40">${person(280,100,'#b0302a',1.4)}${person(320,96,'#17734a',1.4)}</g>${chip(300,196,'más rápida',ORG,12)}${T(300,222,'¡con saltos!',{size:13,it:1,c:MUT})}`,
  c:'La danza era una actividad social muy apreciada. Destacaban la <b>pavana</b>, de movimientos <b>solemnes y elegantes</b>, y la <b>gallarda</b>, <b>más rápida</b>.'},
 {clear:1,d:`${bg()}${tag(200,24,'Las acompañaban…',C.dan,15)}
  <g>${flute(40,120,.8)}${T(40,190,'flautas',{size:12,w:700})}</g><g>${trombone(110,120,.55)}${T(105,190,'cornetas y',{size:11,w:700})}${T(105,204,'trombones',{size:11,w:700})}</g>
  <g>${viola(185,115,.8)}${T(185,190,'violas',{size:12,w:700})}</g><g>${lute(260,120,.8)}${T(260,190,'laúdes',{size:12,w:700})}</g><g>${harp(340,115,.8)}${T(340,190,'arpas',{size:12,w:700})}</g>`,
  c:'Las danzas se acompañaban con <b>flautas, cornetas, trombones, violas, laúdes y arpas</b>.'}
],quiz:[
 {q:'¿Cómo era la pavana?',a:'Solemne y elegante',o:['Muy rápida y con saltos','Sin música','Solo para coro religioso'],e:'La rápida es la gallarda.'},
 {q:'¿Qué danza era más rápida?',a:'La gallarda',o:['La pavana','La misa','El motete'],e:''},
 {q:'¿Cuál NO acompañaba a las danzas según los apuntes?',a:'El piano',o:['La flauta','El laúd','El trombón'],e:'El piano aún no existía: su antecedente era el clavicordio.'}
]},

{id:'voz',cat:'com',short:'Encina, Flecha, Cetina',t:'Poetas y cantores',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'Juan del Encina',C.com,16)}
  ${bust(80,110,C.com,1.4)}${chip(80,190,'poeta, músico',C.com,12)}${chip(80,216,'y dramaturgo',C.com,12)}
  <g class="mv" data-dx="60">${book(195,100,90,56,C.com)}${chip(195,150,'Cancionero de Barbieri',ORG,11)}${T(195,174,'68 piezas',{size:13,w:700})}</g>
  <g class="mv" data-dx="60">${scroll(335,100,60,40)}${T(335,146,'«Arte de la',{size:11,w:700})}${T(335,160,'poesía castellana»',{size:11,w:700})}</g>
  ${T(260,215,'Salamanca · Roma · León',{size:12,c:MUT,it:1})}`,
  c:'<b>Juan del Encina</b> fue poeta, músico y dramaturgo. Se conservan <b>68 piezas</b> suyas en el <b>Cancionero musical de Barbieri</b>, y escribió el tratado «<b>Arte de la poesía castellana</b>».'},
 {clear:1,d:`${bg()}${tag(200,24,'Mateo Flecha',C.com,16)}${bust(70,110,C.com,1.3)}${chip(70,186,'catalán',C.com,12)}
  <path d="M170 140 Q250 230 330 140Z" fill="#f6e2b3" stroke="#8a6b3c" stroke-width="2.5"/>${T(250,200,'ensalada',{size:15,w:800,c:'#8a6b3c'})}
  ${[['castellano',190,120],['catalán',240,96],['italiano',300,118],['francés',205,70],['latín',285,72]].map(([l,x,y])=>`<g class="mv" data-dy="-50">${chip(x,y,l,ORG,11)}</g>`).join('')}
  ${chip(250,232,'a 4 o 5 voces, para divertir',C.com,12)}`,
  c:'<b>Mateo Flecha</b>, catalán, es famoso por sus «<b>ensaladas</b>»: obras a <b>4 o 5 voces</b> que mezclan lenguas (castellano, catalán, italiano, francés, latín) para divertir a los cortesanos.'},
 {clear:1,d:`${bg()}${tag(200,24,'Gutierre de Cetina',C.com,16)}${bust(80,110,C.com,1.3)}${chip(80,186,'poeta sevillano',C.com,12)}
  <g class="mv" data-dx="50">${person(205,88,'#5d5a7a',1.5)}<line x1="221" y1="104" x2="235" y2="78" stroke="#555" stroke-width="3"/>${chip(205,160,'soldado en Italia',ORG,11)}</g>
  <g class="pop"><path d="M310 120 C280 90 290 60 310 78 C330 60 340 90 310 120Z" fill="#e05a7a"/>${chip(310,150,'madrigal',C.com,13)}${T(310,174,'a Laura Gonzaga',{size:12,it:1,c:MUT})}</g>
  ${chip(200,226,'apodo: «Vandalio»',ORG,13)}`,
  c:'<b>Gutierre de Cetina</b>, poeta sevillano, fue soldado en Italia y adoptó el apodo de «<b>Vandalio</b>». Su <b>madrigal</b> más famoso está dedicado a Laura Gonzaga.'}
],quiz:[
 {q:'¿Qué son las «ensaladas» de Mateo Flecha?',a:'Obras que mezclan varias lenguas para divertir',o:['Recetas de cocina','Danzas lentas','Misas en latín'],e:'A 4 o 5 voces.'},
 {q:'¿Dónde se conservan 68 piezas de Juan del Encina?',a:'En el Cancionero musical de Barbieri',o:['En los seis libros del Delphín','En el Código de Hammurabi','En el Libro de cifra nueva'],e:''},
 {q:'¿Qué apodo pastoril adoptó Gutierre de Cetina?',a:'Vandalio',o:['Delphín','Antonio','Palestrina'],e:''}
]},

{id:'tecla',cat:'com',short:'Cabezón, Mudarra, Narváez',t:'Tecla y vihuela',steps:[
 {clear:1,d:`${bg()}${tag(200,24,'Antonio de Cabezón',C.com,16)}
  <g>${person(90,66,C.com,1.4)}${blind(90,66,1)}${organ(90,190,.9)}</g>${chip(90,224,'ciego desde niño',ORG,12)}
  ${chip(270,80,'organista de Carlos I',C.com,12)}${chip(270,108,'y de Felipe II',C.com,12)}
  <g class="pop">${chip(270,150,'primeras variaciones',ORG,13)}${T(270,176,'de la música española',{size:12,c:MUT})}</g>
  ${T(270,205,'su hijo Hernando publicó sus obras',{size:11,c:MUT,it:1})}`,
  c:'<b>Antonio de Cabezón</b> estudió música a pesar de quedarse <b>ciego</b>. Fue <b>organista de Carlos I y Felipe II</b> y autor de las <b>primeras variaciones</b> de la música española.'},
 {clear:1,d:`${bg()}${tag(200,24,'Alonso Mudarra',C.com,16)}
  ${vihuela(80,125,1.4)}${chip(80,210,'vihuelista',C.com,13)}
  <g class="mv" data-dx="60">${chip(265,74,'uno de los 7 vihuelistas',ORG,12)}${chip(265,110,'«Fantasía que contrahaze el arpa»',C.com,10)}${chip(265,140,'«Guárdame las vacas»',C.com,11)}${chip(265,170,'«Claros y frescos ríos»',C.com,11)}</g>
  ${T(265,210,'catedral de Sevilla',{size:12,it:1,c:MUT})}`,
  c:'<b>Alonso Mudarra</b> fue uno de los <b>siete vihuelistas</b> españoles. Obras célebres: «Fantasía que contrahaze el arpa», «Claros y frescos ríos» y «Guárdame las vacas». Dirigió la música de la catedral de Sevilla.'},
 {clear:1,d:`${bg()}${tag(200,24,'Luis de Narváez',C.com,16)}
  ${vihuela(70,125,1.2)}
  <g class="mv" data-dx="80">${book(250,110,140,80,'#1e4f94')}${dolphin(250,110,1.3)}</g>
  ${chip(250,172,'«Los seis libros del Delphín»',C.com,12)}${chip(250,204,'música en cifra para vihuela',ORG,11)}${T(250,230,'romances, villancicos y diferencias',{size:11,c:MUT,it:1})}`,
  c:'<b>Luis de Narváez</b>, vihuelista, escribió «<b>Los seis libros del Delphín</b>»: música en <b>cifra</b> para tocar la vihuela, con romances, villancicos y diferencias.'}
],quiz:[
 {q:'¿Quién fue el organista ciego de Carlos I y Felipe II?',a:'Antonio de Cabezón',o:['Alonso Mudarra','Mateo Flecha','Luis de Narváez'],e:'Autor de las primeras variaciones españolas.'},
 {q:'¿Qué obra escribió Luis de Narváez?',a:'Los seis libros del Delphín',o:['Arte de la poesía castellana','Guárdame las vacas','El Cancionero de Barbieri'],e:''},
 {q:'Alonso Mudarra tocaba…',a:'La vihuela',o:['El órgano','La trompeta','El clavicordio'],e:'Fue uno de los siete vihuelistas españoles.'}
]},

{id:'victoria',cat:'com',short:'Tomás Luis de Victoria',t:'Tomás Luis de Victoria',steps:[
 {clear:1,d:`${bg()}<path d="M30 200 H370" stroke="${MUT}" stroke-width="3"/>${tag(200,24,'Tomás Luis de Victoria',C.com,16)}
  <g>${church(70,170,.7)}<circle cx="70" cy="200" r="8" fill="${C.com}"/>${chip(70,226,'Ávila · 1548',C.com,12)}${chip(70,74,'niño de coro',ORG,12)}</g>`,
  c:'<b>Tomás Luis de Victoria</b> nació en <b>Ávila</b> en <b>1548</b>, donde se formó como <b>niño de coro</b>.'},
 {d:`<g class="mv" data-dx="-120"><circle cx="200" cy="200" r="8" fill="${C.com}"/>${chip(200,226,'Roma · 1565',C.com,12)}${bust(200,120,'#7b2a8c',.9)}${chip(200,74,'lecciones de Palestrina',ORG,11)}${T(200,180,'sacerdote en 1575',{size:11,c:MUT,it:1})}</g>`,
  c:'En <b>1565</b> viajó a <b>Roma</b>, donde recibió lecciones de <b>Palestrina</b>, el gran maestro de la polifonía. En 1575 se ordenó sacerdote.'},
 {d:`<g class="mv" data-dx="-120"><circle cx="330" cy="200" r="8" fill="${C.com}"/>${chip(330,226,'Madrid · 1587',C.com,12)}${palace(330,170,.55)}${chip(330,74,'Descalzas Reales',ORG,11)}${T(330,100,'emperatriz María',{size:11,c:MUT,it:1})}</g>`,
  c:'En <b>1587</b> volvió a España protegido por <b>Felipe II</b>: fue capellán y maestro de capilla de las <b>Descalzas Reales</b> (Madrid), al servicio de la emperatriz María. Murió en Madrid en 1611.'},
 {clear:1,d:`${bg()}${tag(200,24,'Su estilo',C.com,16)}
  <g class="dr"><path d="M50 120 H180" stroke="#7b2a8c" stroke-width="4"/><path d="M50 145 H180" stroke="#1e5fb4" stroke-width="4"/><path d="M50 170 H180" stroke="#17734a" stroke-width="4"/></g>
  ${chip(115,80,'equilibrio y pureza',C.com,13)}${arrow(200,145,240,145,ORG)}
  <g class="pop"><path d="M258 170 C278 110 298 190 318 130 S348 165 372 132" stroke="#b0302a" stroke-width="4" fill="none"/></g>${chip(315,80,'anuncia el Barroco',ORG,13)}${T(315,210,'más expresivo',{size:12,it:1,c:MUT})}`,
  c:'Su estilo, con <b>equilibrio y pureza</b>, va más allá del Renacimiento: ya <b>anuncia la expresividad barroca</b>.'}
],quiz:[
 {q:'¿Dónde nació Tomás Luis de Victoria?',a:'En Ávila',o:['En Roma','En Sevilla','En Lérida'],e:'En 1548.'},
 {q:'¿Con qué gran maestro aprendió en Roma?',a:'Con Palestrina',o:['Con Monteverdi','Con Cabezón','Con Bach'],e:''},
 {q:'¿Qué anuncia el estilo de Victoria?',a:'La expresividad barroca',o:['El jazz','La música franco-flamenca del s. XV','El fin de la polifonía religiosa'],e:''}
]}
],

/* ================= JUEGOS ================= */
games:[
 {id:'quien',type:'clasifica',t:'¿Quién es?',d:'Cada dato, a su compositor',deal:12,
  bins:{enc:{n:'Juan del Encina',c:'#8a3b12'},fle:{n:'Mateo Flecha',c:'#b8860b'},cet:{n:'Gutierre de Cetina',c:'#b0302a'},cab:{n:'Antonio de Cabezón',c:'#17734a'},mud:{n:'Alonso Mudarra',c:'#1e5fb4'},nar:{n:'Luis de Narváez',c:'#4b82d9'},vic:{n:'T. L. de Victoria',c:'#7b2a8c'}},
  cards:[['Poeta, músico y dramaturgo','enc'],['Cancionero musical de Barbieri','enc'],['«Arte de la poesía castellana»','enc'],['Capellán de la catedral de León','enc'],
   ['Las «ensaladas»','fle'],['Compositor catalán','fle'],['Mezcla castellano, catalán, italiano, francés y latín','fle'],['Monje en el monasterio de Poblet','fle'],
   ['Apodo «Vandalio»','cet'],['Madrigal dedicado a Laura Gonzaga','cet'],['Poeta sevillano y soldado en Italia','cet'],
   ['Organista ciego','cab'],['Organista de Carlos I y Felipe II','cab'],['Primeras variaciones de la música española','cab'],['Su hijo Hernando publicó sus obras','cab'],
   ['«Guárdame las vacas»','mud'],['«Fantasía que contrahaze el arpa»','mud'],['«Claros y frescos ríos»','mud'],['Dirigió la música de la catedral de Sevilla','mud'],
   ['«Los seis libros del Delphín»','nar'],['Música en cifra para vihuela','nar'],['Al servicio de Francisco de los Cobos','nar'],
   ['Nació en Ávila en 1548','vic'],['Aprendió con Palestrina en Roma','vic'],['Descalzas Reales de Madrid','vic'],['Anuncia la expresividad barroca','vic']]},
 {id:'esto',type:'binario',t:'Esto o aquello',d:'Religiosa o profana · s. XV o s. XVI · pavana o gallarda',sets:[
  {t:'¿Religiosa o profana?',a:['Religiosa',C.rel],b:['Profana',C.pro],it:[['Motete','a'],['Misa','a'],['Madrigal','b'],['Villancico','b'],['Se lee en el facistol','a'],['Concilio de Trento','a'],['Claudio Monteverdi','b'],['Repite un estribillo','b']]},
  {t:'¿Siglo XV o siglo XVI?',a:['Albores (s. XV)',C.alb],b:['Pleno (s. XVI)',C.ple],it:[['Nacen las capillas privadas','a'],['Predomina la música franco-flamenca','a'],['Culminación de la polifonía','b'],['El músico trabaja para un mecenas','b'],['Los instrumentos sustituyen la voz','b'],['15 cantores y 4 o 5 instrumentistas','a']]},
  {t:'¿Pavana o gallarda?',a:['Pavana',C.dan],b:['Gallarda',ORG],it:[['Solemne','a'],['Más rápida','b'],['Elegante','a']]}
 ]},
 {id:'orden',type:'orden',t:'La vida de Victoria',d:'De Ávila a las Descalzas Reales',hint:'Toca los hechos en orden, del primero al último.',
  items:['Nace en Ávila (1548)','Es niño de coro en Ávila','Viaja a Roma (1565)','Recibe lecciones de Palestrina','Se ordena sacerdote (1575)','Vuelve a España con Felipe II (1587)','Muere en Madrid (1611)']},
 {id:'inst',type:'puntos',t:'¿Qué instrumento es?',d:'Reconoce los instrumentos del tema',prompt:'Toca:',viewBox:'0 0 400 250',r:30,
  base:`${bg()}${organ(60,90,.8)}${clavi(170,80,.75)}${harp(270,75,.75)}${lute(355,80,.65)}${vihuela(55,195,.7)}${flute(140,195,.75)}${trombone(240,195,.6)}${viola(345,190,.7)}`,
  spots:[['org','el órgano',60,60],['cla','el clavicordio',170,80],['arp','el arpa',270,75],['lau','el laúd',355,80],['vih','la vihuela',55,190],['flu','la flauta',140,195],['tro','el trombón',240,190],['vio','la viola',345,195]]}
],

/* ================= PRUEBA (además de las preguntas de las fichas) ================= */
pool:[
 {q:'¿Qué tres características tiene el Renacimiento pleno?',a:'Culmina la polifonía, los instrumentos sustituyen la voz y aparece el mecenas',o:['Nacen las capillas, la ópera y el piano','Desaparecen la voz, el órgano y la danza','Solo hay música religiosa en latín'],e:''},
 {q:'¿Qué ganó importancia en el siglo XV?',a:'La música profana',o:['El jazz','La ópera bufa','El piano'],e:''},
 {q:'¿Cómo ganaron peso los instrumentos en el siglo XV?',a:'Transcribiendo la música vocal',o:['Sustituyendo al coro en las misas','Con las sinfonías','Con la ópera'],e:''},
 {q:'¿En qué estilo se canta el madrigal?',a:'En estilo recitativo',o:['A gritos','Sin letra','Solo con órgano'],e:''},
 {q:'¿Qué formas instrumentales aparecen en el Renacimiento?',a:'La tocata y la fantasía',o:['El motete y la misa','La sinfonía y el concierto','El villancico y el madrigal'],e:''},
 {q:'¿Con qué instrumentos se acompañaban las danzas?',a:'Flautas, cornetas, trombones, violas, laúdes y arpas',o:['Pianos y guitarras eléctricas','Solo tambores','Solo la voz'],e:''},
 {q:'¿Cómo llamó el Concilio de Trento a la polifonía anterior (Ars Nova)?',a:'«Ruido infernal»',o:['«Música celestial»','«Ensalada»','«Fantasía»'],e:''},
 {q:'¿Qué publicó Hernando, el hijo de Cabezón?',a:'«Obras de música para tecla, arpa y vihuela»',o:['«Los seis libros del Delphín»','«Arte de la poesía castellana»','El Cancionero de Barbieri'],e:''},
 {q:'¿Qué ciudad italiana es clave en la vida de Victoria?',a:'Roma',o:['Venecia','Milán','Nápoles'],e:''},
 {vf:1,q:'El madrigal italiano lo cantaba un solista y se le podían añadir instrumentos.',a:'Verdadero',e:''},
 {vf:1,q:'La pavana era una danza muy rápida y con saltos.',a:'Falso',e:'Era solemne y elegante; la rápida es la gallarda.'},
 {vf:1,q:'El clavicordio es un antecedente del piano actual.',a:'Verdadero',e:''},
 {vf:1,q:'Antonio de Cabezón era vihuelista y trabajó en Poblet.',a:'Falso',e:'Era organista ciego de Carlos I y Felipe II. Poblet es Mateo Flecha.'},
 {vf:1,q:'Mateo Flecha mezclaba varias lenguas en sus ensaladas.',a:'Verdadero',e:''},
 {vf:1,q:'En el siglo XV predominaba la música franco-flamenca.',a:'Verdadero',e:''}
]
};
