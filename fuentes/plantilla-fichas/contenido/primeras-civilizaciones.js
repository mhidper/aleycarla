/*META {
 "out": "ale/ham/primeras-civilizaciones/index.html",
 "title": "Arte de las primeras civilizaciones",
 "h1": "Primeras civilizaciones", "h1span": "arte",
 "intro": "Tema 3 de Arte: Mesopotamia (el arco, el zigurat, la Puerta de Ishtar, la escultura y el Código de Hammurabi) y Egipto (tumbas, templos, escultura y pintura). Mira el mapa, repasa con las fichas animadas, juega y haz la prueba.",
 "back": "../../../#ale/ham", "backtxt": "Arte y Música de Ale",
 "acc": "#c0127e", "accsoft": "#fbe4f1", "accdark": "#ff5fb9", "accdarksoft": "#3a1a33"
} META*/

const M='#1e4f94',G='#b8860b',SAND='#efe0b9',BRICK='#c49a68',STONE='#e0c27a';

/* ---------- dibujos propios ---------- */
const ARCH=(cx,by,r=60,w=22)=>{let s='';const n=7;for(let i=0;i<n;i++){const a=Math.PI-(i+.5)*Math.PI/n,x=cx+Math.cos(a)*r,y=by-Math.sin(a)*r,rot=90-a*180/Math.PI,key=i===3;s+=`<rect class="${key?'':'dv'}" x="${x-w/2}" y="${y-9}" width="${w}" height="18" rx="2" transform="rotate(${rot} ${x} ${y})" fill="${key?'#c0127e':'#d9b17d'}" stroke="#7a5528" stroke-width="1.5"/>`}return s};
const zig=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><polygon points="-130,0 130,0 114,-40 -114,-40" fill="#bfa075" stroke="#5a3d1b" stroke-width="2"/><polygon points="-96,-40 96,-40 82,-76 -82,-76" fill="#cca97d" stroke="#5a3d1b" stroke-width="2"/><polygon points="-62,-76 62,-76 54,-104 -54,-104" fill="#dcba8c" stroke="#5a3d1b" stroke-width="2"/><line x1="0" y1="0" x2="0" y2="-104" stroke="#7a5528" stroke-width="6"/></g>`;
const lion=(x,y,c='#f2c230',s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-22 0 Q-24 -14 -10 -14 H12 Q22 -22 26 -12 Q30 -4 22 -2 L22 8 M-18 0 V8 M-8 0 V8 M12 0 V8 M-22 -6 Q-32 -10 -30 -18" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="20" cy="-14" r="7" fill="${c}"/></g>`;
const pyr=(x,by,w,c=STONE)=>`<path d="M${x-w/2} ${by} L${x} ${by-w*.62} L${x+w/2} ${by}Z" fill="${c}" stroke="#a07c32" stroke-width="2"/><path d="M${x} ${by-w*.62} L${x+w/2} ${by} L${x+w*.12} ${by}Z" fill="#000" opacity=".1"/>`;
const pharaoh=(x,y,s=1,c='#2a6cbf')=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 -6 L-16 22 L16 22 L10 -6Z" fill="#f2c230" stroke="#8a6500"/><path d="M-12 -6 Q0 -22 12 -6 L14 12 L8 4 L-8 4 L-14 12Z" fill="${c}" stroke="#123"/><circle cx="0" cy="-2" r="7" fill="#b9814f"/><rect x="-10" y="22" width="20" height="36" fill="#b9814f"/><rect x="-12" y="40" width="24" height="16" fill="#fff" stroke="#999"/><rect x="-8" y="58" width="6" height="30" fill="#b9814f"/><rect x="2" y="58" width="6" height="30" fill="#b9814f"/></g>`;
const egFig=(x,y,s=1,c='#b9814f',dress='#fff')=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="2" cy="-30" rx="7" ry="8" fill="${c}"/><path d="M-4 -38 Q6 -42 10 -32 L8 -24 L-6 -26Z" fill="#111"/><ellipse cx="5" cy="-31" rx="2.5" ry="1.5" fill="#fff"/><circle cx="5" cy="-31" r="1" fill="#111"/><path d="M-12 -20 H14 L10 6 H-8Z" fill="${c}"/><path d="M-8 6 H10 L14 30 H-10Z" fill="${dress}" stroke="#aaa"/><path d="M-6 30 L-14 52 M6 30 L16 52" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M-12 -18 L-22 0 M14 -18 L24 -2" stroke="${c}" stroke-width="4" stroke-linecap="round"/></g>`;
const lamassu=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-50" y="-30" width="80" height="34" rx="10" fill="#d8c3a0" stroke="#6e5530" stroke-width="2"/>${[-40,-24,10,24].map(a=>`<rect x="${a}" y="4" width="10" height="26" fill="#d8c3a0" stroke="#6e5530" stroke-width="1.5"/>`).join('')}<path d="M-30 -30 Q-10 -80 30 -64 Q10 -50 0 -30Z" fill="#c9b08a" stroke="#6e5530" stroke-width="2"/>${[0,1,2].map(k=>`<path d="M${-22+k*10} ${-38-k*6} Q${-8+k*10} ${-56-k*4} ${14+k*6} ${-58+k*2}" stroke="#6e5530" fill="none"/>`).join('')}<rect x="28" y="-48" width="22" height="30" rx="6" fill="#d8c3a0" stroke="#6e5530" stroke-width="2"/><path d="M28 -48 H50 L48 -56 H30Z" fill="#6e5530"/><path d="M34 -24 Q40 -12 48 -24" fill="#6e5530"/></g>`;
const stele=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-34 100 L-34 -60 Q0 -84 34 -60 L34 100Z" fill="#3b3b44" stroke="#111" stroke-width="2"/><g>${person(-12,-58,'#bfa',1)}${person(14,-60,'#f2c230',1.1)}</g>${[0,1,2,3,4,5,6,7,8].map(k=>`<path d="M-26 ${-10+k*12} h52" stroke="#9a9aa8" stroke-width="2" stroke-dasharray="3 2"/>`).join('')}</g>`;
const NILE='M118 260 C128 210 104 170 116 128 C122 98 108 80 112 66';
const NEMAP=()=>`<rect width="400" height="260" fill="${SAND}"/><path d="M0 0 H215 L208 26 Q160 48 112 58 L0 66Z" fill="${SEA}"/>${T(60,30,'Mar Mediterráneo',{size:11,c:'#3d7ab0',it:1})}<path d="M150 112 L166 108 L232 260 L206 260Z" fill="${SEA}"/>${T(214,214,'Mar Rojo',{size:10,c:'#3d7ab0',it:1})}<path d="M318 206 Q352 206 400 236 V260 H330Z" fill="${SEA}"/>${T(382,252,'golfo Pérsico',{size:10,c:'#3d7ab0',it:1})}<path d="M${NILE.slice(1)}" stroke="#3d8fd6" stroke-width="5" fill="none"/><path d="M96 58 L112 70 L128 58" stroke="#3d8fd6" stroke-width="3" fill="none"/>${T(100,200,'Nilo',{size:11,c:'#3d7ab0',it:1,a:'end'})}<path d="M290 10 C300 70 318 140 336 200" stroke="#3d8fd6" stroke-width="4" fill="none"/><path d="M238 24 C240 90 290 150 330 202" stroke="#3d8fd6" stroke-width="4" fill="none"/>${T(318,60,'Tigris',{size:11,c:'#3d7ab0',it:1,a:'start'})}${T(232,80,'Éufrates',{size:11,c:'#3d7ab0',it:1,a:'end'})}`;

window.APP={
store:'ham_civ',
cats:{mes:{n:'Mesopotamia',c:M},egi:{n:'Egipto',c:G}},

esquema:{
 kicker:'El mapa del tema',title:'¿Dónde está cada obra?',hint:'Toca un punto del mapa para ver sus ideas clave.',viewBox:'0 0 400 260',
 pins:{
  arco:[276,104,236,42,'Mesopotamia','middle'],zigurat:[338,198,296,234,'Ur: zigurat','middle'],ishtar:[300,130,244,124,'Babilonia','middle'],escultura:[318,166,236,170,'Lagash: Gudea','middle'],
  tumbas:[110,74,30,92,'Giza','start'],canon:[116,128,30,132,'Tell Amarna','start'],pintura:[120,170,30,172,'Valle de las Reinas','start'],abu:[122,236,30,236,'Abu Simbel','start']
 },
 draw(sel){
  let s=NEMAP();
  s+=`<g opacity=".18"><ellipse cx="295" cy="120" rx="60" ry="80" fill="${M}"/><ellipse cx="116" cy="160" rx="28" ry="100" fill="${G}"/></g>`;
  for(const[k,[x,y,lx,ly,l,a]]of Object.entries(this.pins)){
   const c=this.items[k].c,on=sel===k,w=tw(l,12),x0=a==='start'?lx:a==='end'?lx-w:lx-w/2;
   s+=`<g class="pin" data-k="${k}" style="cursor:pointer"><line x1="${x}" y1="${y}" x2="${x0+w/2}" y2="${ly}" stroke="${c}" stroke-width="1.6" stroke-dasharray="3 3"/><circle cx="${x}" cy="${y}" r="13" fill="${c}" opacity="${on?.35:.12}"/><circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="#fff" stroke-width="2"/><rect x="${x0}" y="${ly-11}" width="${w}" height="22" rx="6" fill="${on?c:'#fff'}" stroke="${c}" stroke-width="2"/>${T(x0+w/2,ly+4,l,{size:12,w:800,c:on?'#fff':c})}</g>`;
  }
  return s;
 },
 items:{
  arco:{t:'Mesopotamia: el arco y la bóveda',c:M,scene:'arco',notes:['Entre el <b>Tigris</b> y el <b>Éufrates</b>; sin piedra, construían con <b>ladrillo</b> y <b>adobe</b>','Por eso quedan <b>pocos restos</b>','Gran invento: el <b>arco</b> (dovelas + <b>clave</b>, que reparte el peso)','Muchos arcos seguidos forman la <b>bóveda de cañón</b>']},
  zigurat:{t:'El zigurat de Ur',c:M,scene:'zigurat',notes:['Torre <b>escalonada</b> de los templos, creada por los <b>sumerios</b>: «puente entre el cielo y la tierra»','El de <b>Ur</b> lo mandó el rey <b>Ur-Nammu</b>: tres plantas y terrazas','Solo subían los <b>sacerdotes</b>','Arriba, santuario de <b>Nanna</b> (la luna); también <b>observatorio</b> astronómico']},
  ishtar:{t:'Babilonia y la Puerta de Ishtar',c:M,scene:'ishtar',notes:['Los <b>palacios</b> mostraban el poder del rey','<b>Nabucodonosor II</b> rehízo Babilonia (s. VI a. C.): doble muralla y ocho puertas','<b>Puerta de Ishtar</b>: ladrillo vidriado <b>azul</b> con <b>leones</b> y dragones','Hoy está en el <b>Museo de Pérgamo</b> de Berlín']},
  escultura:{t:'La escultura mesopotámica',c:M,scene:'escultura',notes:['Dos tipos: <b>exenta</b> (de bulto redondo) y <b>relieve</b>','<b>Gudea de Lagash</b>: manos juntas (orante), falda larga, ojos grandes','Relieves: <b>toros alados</b> (lamassu) y escenas de caza (<b>Leona herida</b>)','<b>Código de Hammurabi</b>: estela de basalto con <b>282 leyes</b> en cuneiforme']},
  tumbas:{t:'Egipto: las tumbas',c:G,scene:'tumbas',notes:['Arte al servicio del <b>faraón</b> y de la vida tras la muerte','Arquitectura <b>colosal</b> y <b>adintelada</b> (sin arcos)','Evolución: <b>mastaba</b> → <b>pirámide escalonada</b> → pirámides de <b>Giza</b> (Keops, Kefren, Mikerinos) → <b>hipogeo</b> (Valle de los Reyes)']},
  abu:{t:'Abu Simbel',c:G,scene:'abu',notes:['Templos al aire libre (<b>Karnak</b>, <b>Luxor</b>) y <b>speos</b>: excavados en la roca','<b>Abu Simbel</b>, de <b>Ramsés II</b>: cuatro estatuas sentadas de <b>22 m</b>','Dos días al año (<b>21 de febrero</b> y <b>19 de octubre</b>) el sol ilumina el fondo; <b>Ptah</b> queda en la sombra']},
  canon:{t:'Escultura: el canon y Amarna',c:G,scene:'canon',notes:['Faraón siempre joven, rígido y mirando al frente: <b>ley de la frontalidad</b>','<b>Canon de 18 puños</b>','<b>Akhenaton</b> impone al dios <b>Atón</b>: arte de <b>Tell Amarna</b>, más realista','Ejemplo: el <b>busto de Nefertiti</b>']},
  pintura:{t:'La pintura egipcia',c:G,scene:'pintura',notes:['Decora templos y tumbas (tumba de <b>Nefertari</b>)','Técnica <b>al fresco</b>, con colores de minerales','Cabeza y piernas de <b>perfil</b>; ojo y hombros de <b>frente</b>; figuras planas','<b>Perspectiva jerárquica</b>: lo más importante, más grande']}
 }
},

scenes:[
{id:'arco',cat:'mes',short:'El arco',t:'Mesopotamia: el arco y la bóveda',steps:[
 {clear:1,d:`${bg('#f4ead2')}<path class="dr" d="M70 20 C100 100 80 160 120 240" stroke="#3d8fd6" stroke-width="10" fill="none" stroke-linecap="round"/><path class="dr" d="M170 20 C190 100 170 170 220 240" stroke="#3d8fd6" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${chip(70,130,'Tigris','#21528c',12)}${chip(206,150,'Éufrates','#21528c',12)}${tag(317,34,'tierra entre ríos',M,13)}
  <g class="mv" data-dx="80"><rect x="262" y="70" width="110" height="44" rx="4" fill="${BRICK}" stroke="#7a5528" stroke-width="2"/>${T(317,98,'ladrillo',{size:15,w:800,c:'#fff'})}</g>
  <g class="mv" data-dx="80"><rect x="262" y="134" width="110" height="44" rx="4" fill="#d8b27c" stroke="#8a6330" stroke-width="2"/>${[0,1,2,3,4,5].map(k=>`<line x1="${276+k*16}" y1="144" x2="${272+k*16}" y2="168" stroke="#684a20" stroke-width="1.5"/>`).join('')}${T(317,162,'adobe',{size:15,w:800})}</g>
  ${chip(317,212,'no tenían piedra',ORG,12)}`,
  c:'<b>Mesopotamia</b> significa «tierra entre ríos»: el <b>Tigris</b> y el <b>Éufrates</b>. No tenían piedra, así que construían con <b>ladrillo</b> y <b>adobe</b> (barro con paja). Por eso quedan <b>pocos restos</b>.'},
 {clear:1,d:`${bg()}<rect x="60" y="214" width="280" height="12" fill="#7a5528"/><rect x="118" y="134" width="26" height="80" fill="${BRICK}" stroke="#7a5528" stroke-width="2"/><rect x="256" y="134" width="26" height="80" fill="${BRICK}" stroke="#7a5528" stroke-width="2"/>
  <g class="pop">${ARCH(200,140,70)}</g>${tag(330,30,'El arco',M,16)}
  ${chip(78,100,'dovelas',ORG,13)}${chip(200,38,'clave',ORG,14)}`,
  c:'Su gran invento fue el <b>arco</b>: piezas en cuña (<b>dovelas</b>) colocadas en curva. La pieza de arriba, la <b>clave</b>, las encaja todas.'},
 {d:`<path class="dr" d="M190 72 Q130 80 132 130" stroke="#c0127e" stroke-width="3" fill="none" marker-end="url(#${mk('#c0127e')})"/><path class="dr" d="M210 72 Q270 80 268 130" stroke="#c0127e" stroke-width="3" fill="none" marker-end="url(#${mk('#c0127e')})"/>${chip(200,170,'reparte el peso a los lados','#c0127e',12)}`,
  c:'Gracias a la clave, el peso <b>se reparte hacia los lados</b> y baja por los pilares. Así se cubren espacios grandes con piezas pequeñas.'},
 {clear:1,d:`${bg()}${tag(200,26,'Bóveda de cañón',M,16)}
  ${[4,3,2,1,0].map(k=>`<g class="mv" data-dx="${-30-k*10}" data-dy="${20+k*8}"><path d="M${80+k*18} ${205-k*14} Q${170+k*18} ${75-k*14} ${260+k*18} ${205-k*14}" fill="none" stroke="${k?'#b08453':'#7a5528'}" stroke-width="${k?8:10}"/></g>`).join('')}
  ${chip(200,230,'muchos arcos seguidos',ORG,13)}`,
  c:'Si ponemos muchos arcos seguidos, uno detrás de otro, se forma una <b>bóveda de cañón</b>: un techo curvo y resistente.'}
],quiz:[
 {q:'¿Con qué construían los mesopotámicos?',a:'Con ladrillo y adobe',o:['Con grandes bloques de piedra','Con madera y cristal','Con mármol blanco'],e:'No tenían piedra.'},
 {q:'¿Cómo se llama la pieza de arriba que cierra el arco?',a:'La clave',o:['La dovela','El dintel','El pilar'],e:'Reparte el peso hacia los lados.'},
 {q:'¿Qué es una bóveda de cañón?',a:'Muchos arcos seguidos',o:['Una pirámide','Un tipo de muralla','Una torre escalonada'],e:''}
]},

{id:'zigurat',cat:'mes',short:'El zigurat',t:'El zigurat de Ur',steps:[
 {clear:1,d:`${bg('#eef3f7')}<path d="M0 214 H400 V250 H0Z" fill="#ebd8ab"/><g class="mv" data-dy="60">${zig(200,214,1.1)}</g>
  ${tag(200,26,'Zigurat',M,16)}${chip(84,70,'torre escalonada',ORG,12)}${chip(318,70,'cielo ↔ tierra',ORG,12)}${chip(200,238,'creado por los sumerios',M,12)}`,
  c:'El <b>zigurat</b> era la torre <b>escalonada</b> de los templos, creada por los <b>sumerios</b>. Se veía como un <b>puente entre el cielo y la tierra</b>.'},
 {d:`${person(140,170,'#7a3818',1)}${person(260,170,'#7a3818',1)}<g>${crown(60,150)}${person(60,156,'#1e4f94',1.1)}${chip(60,214,'Ur-Nammu',M,12)}</g>${chip(330,130,'3 plantas',ORG,12)}${chip(330,158,'solo sacerdotes',ORG,12)}`,
  c:'El de <b>Ur</b> lo mandó levantar el rey <b>Ur-Nammu</b>: tres plantas con terrazas. Por sus escaleras solo subían los <b>sacerdotes</b>.'},
 {clear:1,d:`${bg('#1d2550')}<path d="M0 214 H400 V250 H0Z" fill="#8a7650"/>${zig(200,214,1.1)}${[[40,30],[90,60],[150,24],[260,40],[380,80],[60,120],[350,140]].map(([x,y])=>`<circle class="pop" cx="${x}" cy="${y}" r="2.5" fill="#fff"/>`).join('')}<rect class="pop" x="183" y="70" width="34" height="22" fill="#ffe29b" stroke="#7a5528" stroke-width="2"/><g class="pop"><path d="M330 30 A16 16 0 1 0 346 46 A12 12 0 1 1 330 30Z" fill="#ffd23f"/></g>${chip(200,52,'santuario de Nanna',ORG,12)}${chip(330,84,'la luna',M,12)}${chip(80,90,'observatorio',M,12)}${chip(80,118,'de las estrellas',M,11)}`,
  c:'Arriba estaba el <b>santuario</b> del dios de la luna, <b>Nanna</b>. Desde allí también observaban el cielo: era un <b>observatorio astronómico</b>.'}
],quiz:[
 {q:'¿Qué es un zigurat?',a:'Una torre escalonada de los templos mesopotámicos',o:['Una tumba egipcia','Una puerta de Babilonia','Una estela con leyes'],e:''},
 {q:'¿Quién mandó construir el zigurat de Ur?',a:'Ur-Nammu',o:['Ramsés II','Nabucodonosor II','Hammurabi'],e:''},
 {q:'¿A qué dios estaba dedicado el santuario de arriba?',a:'A Nanna, la luna',o:['A Ra, el sol','A Ishtar','A Atón'],e:''}
]},

{id:'ishtar',cat:'mes',short:'Puerta de Ishtar',t:'Babilonia y la Puerta de Ishtar',steps:[
 {clear:1,d:`${bg('#f4ead2')}${tag(200,26,'Babilonia',M,16)}
  <rect x="30" y="70" width="340" height="140" fill="none" stroke="#8a6330" stroke-width="8"/><rect class="mv" data-dx="-20" x="44" y="84" width="312" height="112" fill="none" stroke="#a7814a" stroke-width="6"/>
  ${[0,1,2,3,4,5,6,7].map(k=>`<rect class="pop" x="${[60,150,240,330,60,150,240,330][k]}" y="${k<4?62:202}" width="20" height="16" fill="${M}"/>`).join('')}
  ${crown(200,118)}${person(200,124,M,1.2)}${chip(200,180,'Nabucodonosor II',M,13)}${chip(100,234,'doble muralla',ORG,12)}${chip(300,234,'ocho puertas',ORG,12)}`,
  c:'En los <b>palacios</b> los reyes mostraban su poder. <b>Nabucodonosor II</b> reconstruyó <b>Babilonia</b> en el siglo VI a. C., con <b>doble muralla</b> y <b>ocho puertas</b>.'},
 {clear:1,d:`${bg('#eef3f7')}<g class="mv" data-dy="40"><rect x="90" y="60" width="220" height="170" fill="${M}" stroke="#0f2c57" stroke-width="3"/><rect x="80" y="40" width="50" height="190" fill="#24599f" stroke="#0f2c57" stroke-width="3"/><rect x="270" y="40" width="50" height="190" fill="#24599f" stroke="#0f2c57" stroke-width="3"/><path d="M160 230 V160 Q200 120 240 160 V230Z" fill="#f4ead2" stroke="#d9a400" stroke-width="3"/>${[0,1,2,3].map(k=>`<rect x="${80+k*14}" y="30" width="8" height="10" fill="#24599f"/><rect x="${270+k*14}" y="30" width="8" height="10" fill="#24599f"/>`).join('')}</g>
  <g class="pop">${lion(110,140,'#f2c230',.8)}${lion(290,140,'#f2c230',.8)}${lion(110,205,'#fff',.7)}${lion(290,205,'#fff',.7)}</g>
  ${tag(200,22,'Puerta de Ishtar',M,15)}${chip(200,96,'ladrillo vidriado azul',ORG,12)}${chip(355,140,'leones',ORG,12)}${chip(45,140,'dragones',ORG,12)}`,
  c:'La más bella era la <b>Puerta de Ishtar</b>: de <b>ladrillo vidriado azul</b> brillante, decorada con <b>leones</b> y dragones amarillos y blancos.'},
 {clear:1,d:`${bg()}<g opacity=".9"><rect x="40" y="90" width="100" height="80" fill="${M}"/>${lion(90,135,'#f2c230',.7)}</g>${curve('M150 130 Q200 90 250 130',ORG)}<g class="pop">${palace(310,190,1)}</g>${chip(310,210,'Museo de Pérgamo',M,13)}${T(310,240,'Berlín',{size:13,w:700})}${tag(200,30,'¿Dónde está hoy?',M,15)}`,
  c:'En el siglo XX la excavaron arqueólogos alemanes y la <b>reconstruyeron</b> en el <b>Museo de Pérgamo</b> de <b>Berlín</b>.'}
],quiz:[
 {q:'¿Quién reconstruyó Babilonia en el siglo VI a. C.?',a:'Nabucodonosor II',o:['Ur-Nammu','Ramsés II','Akhenaton'],e:''},
 {q:'¿Cómo era la Puerta de Ishtar?',a:'De ladrillo vidriado azul con leones y dragones',o:['De piedra blanca sin decoración','De oro macizo','De madera pintada'],e:''},
 {q:'¿Dónde está hoy la Puerta de Ishtar?',a:'En el Museo de Pérgamo de Berlín',o:['En el Louvre de París','En El Cairo','Sigue en Babilonia'],e:''}
]},

{id:'escultura',cat:'mes',short:'Escultura',t:'La escultura mesopotámica',steps:[
 {clear:1,d:`${bg()}<line x1="200" y1="44" x2="200" y2="236" stroke="${MUT}" stroke-dasharray="5 5" stroke-width="2"/>${tag(100,26,'Exenta',M,15)}${tag(300,26,'Relieve',M,15)}
  <g class="pop"><path d="M76 210 L82 120 Q100 106 118 120 L124 210Z" fill="#6b6f80" stroke="#333" stroke-width="2"/><circle cx="100" cy="100" r="16" fill="#7b7f90" stroke="#333" stroke-width="2"/><path d="M84 92 Q100 80 116 92" stroke="#333" stroke-width="5" fill="none"/><circle cx="94" cy="100" r="3.5" fill="#fff"/><circle cx="106" cy="100" r="3.5" fill="#fff"/><path d="M92 140 Q100 150 108 140" stroke="#333" stroke-width="3" fill="none"/></g>
  ${chip(100,228,'Gudea de Lagash',M,12)}${chip(165,100,'ojos grandes',ORG,11)}${chip(165,146,'manos juntas',ORG,11)}
  <rect x="226" y="60" width="150" height="150" fill="#d8c3a0" stroke="#6e5530" stroke-width="2"/><g class="mv" data-dx="40">${lamassu(300,150,.9)}</g>${chip(300,228,'toro alado (lamassu)',M,11)}`,
  c:'Hay dos tipos: la escultura <b>exenta</b>, que se puede rodear, como <b>Gudea de Lagash</b> (manos juntas rezando, ojos grandes), y el <b>relieve</b>, pegado al muro, como los <b>toros alados</b> que protegían las puertas.'},
 {clear:1,d:`${bg()}<g class="pop">${stele(110,130,1)}</g>${tag(270,30,'Código de Hammurabi',M,15)}
  ${chip(270,76,'el dios Shamash le da las leyes',ORG,11)}${chip(270,110,'282 leyes',M,15)}${chip(270,144,'escritura cuneiforme',ORG,12)}${chip(270,178,'estela de basalto (2,25 m)',ORG,11)}${T(270,214,'para unificar el reino',{size:12,c:MUT,it:1})}`,
  c:'El <b>Código de Hammurabi</b> es una <b>estela</b> de basalto: arriba, el dios del sol <b>Shamash</b> entrega las leyes al rey; debajo, <b>282 leyes</b> en escritura <b>cuneiforme</b>.'}
],quiz:[
 {q:'¿Qué es una escultura exenta?',a:'La que se puede rodear (de bulto redondo)',o:['La que está pegada a un muro','Una pintura al fresco','Una tumba'],e:'Como Gudea de Lagash.'},
 {q:'¿Qué eran los lamassu?',a:'Toros alados con cabeza humana que protegían las puertas',o:['Reyes de Egipto','Leones de la Puerta de Ishtar','Sacerdotes del zigurat'],e:''},
 {q:'¿Cuántas leyes tiene el Código de Hammurabi?',a:'282',o:['10','22','1000'],e:'Escritas en cuneiforme.'}
]},

{id:'tumbas',cat:'egi',short:'Las tumbas',t:'Egipto: de la mastaba al hipogeo',steps:[
 {clear:1,d:`${bg('#f6e4b6')}<path d="M0 200 Q200 190 400 205 V250 H0Z" fill="#e3c88a"/>${tag(200,26,'Mastaba',G,16)}
  <g class="pop"><path d="M100 196 L128 140 H272 L300 196Z" fill="${STONE}" stroke="#a07c32" stroke-width="2"/><rect x="150" y="160" width="30" height="24" fill="#8a6b3c"/></g>
  <path class="dr" d="M230 196 V224" stroke="#5a3d1b" stroke-width="6"/><rect x="214" y="224" width="40" height="16" fill="#5a3d1b"/>${chip(110,120,'sala de ofrendas',ORG,12)}${chip(330,228,'pozo y sarcófago',ORG,12)}${chip(300,100,'pirámide cortada',G,12)}`,
  c:'El arte egipcio servía al <b>faraón</b> y a la vida tras la muerte. La primera tumba fue la <b>mastaba</b>: una pirámide cortada con sala de ofrendas y un <b>pozo</b> hasta el sarcófago.'},
 {clear:1,d:`${bg('#eef3f7')}<path d="M0 210 Q200 200 400 214 V250 H0Z" fill="#ebd8ab"/>
  <g class="mv" data-dy="50"><path d="M40 210 L50 190 H110 L120 210Z M54 190 L62 172 H98 L106 190Z M66 172 L72 156 H88 L94 172Z" fill="${STONE}" stroke="#a07c32" stroke-width="2"/></g>${chip(80,232,'escalonada',G,12)}
  <g class="mv" data-dy="80">${pyr(200,210,120)}${pyr(290,210,100)}${pyr(360,210,60)}</g>
  ${tag(270,40,'Giza',G,15)}${chip(200,232,'Keops',ORG,11)}${chip(290,232,'Kefren',ORG,11)}${chip(358,232,'Mikerinos',ORG,10)}`,
  c:'Apilando mastabas nació la <b>pirámide escalonada</b>, y después las tres de <b>Giza</b>: <b>Keops, Kefren y Mikerinos</b>, con pasillos para despistar a los ladrones.'},
 {clear:1,d:`${bg('#f6e4b6')}<path d="M0 60 L120 40 L220 70 L330 30 L400 50 V250 H0Z" fill="#d9b86a" stroke="#a07c32" stroke-width="2"/>
  <path class="dr" d="M150 120 H230 V180 H300" stroke="#5a3d1b" stroke-width="10" fill="none"/><rect class="pop" x="292" y="166" width="40" height="26" fill="#5a3d1b"/>
  ${tag(200,22,'Hipogeo',G,16)}${chip(310,140,'tumba secreta',ORG,12)}${chip(110,100,'dentro de la montaña',G,11)}${chip(200,226,'Valle de los Reyes · Tutankamón',ORG,12)}`,
  c:'Como saqueaban las pirámides, en el Imperio Nuevo crearon el <b>hipogeo</b>: tumbas secretas excavadas <b>dentro de la montaña</b>, en el <b>Valle de los Reyes</b> (como la de Tutankamón).'}
],quiz:[
 {q:'¿Cuál fue la primera tumba egipcia?',a:'La mastaba',o:['El hipogeo','La pirámide de Keops','El zigurat'],e:''},
 {q:'¿Qué pirámides están en Giza?',a:'Keops, Kefren y Mikerinos',o:['Ur, Lagash y Babilonia','Luxor, Karnak y Abu Simbel','Tiro, Sidón y Biblos'],e:''},
 {q:'¿Qué es un hipogeo?',a:'Una tumba excavada dentro de la montaña',o:['Una torre escalonada','Una pirámide cortada','Un templo al aire libre'],e:'Como la de Tutankamón.'}
]},

{id:'abu',cat:'egi',short:'Abu Simbel',t:'Abu Simbel y el milagro del sol',steps:[
 {clear:1,d:`${bg('#f6e4b6')}<path d="M0 30 L400 30 V250 H0Z" fill="#d9b86a"/>
  <g class="mv" data-dy="40">${[70,150,250,330].map(x=>`<g><rect x="${x-24}" y="110" width="48" height="90" fill="#c9a35c" stroke="#8a6b3c"/><circle cx="${x}" cy="88" r="18" fill="#c9a35c" stroke="#8a6b3c"/><path d="M${x-18} 80 L${x} 66 L${x+18} 80" fill="#e0c27a" stroke="#8a6b3c"/></g>`).join('')}</g>
  <rect x="184" y="150" width="32" height="50" fill="#3a2a14"/>
  ${tag(200,22,'Abu Simbel · Ramsés II',G,15)}${chip(110,226,'speos: excavado en la roca',ORG,11)}${chip(310,226,'estatuas de 22 m',ORG,12)}`,
  c:'Además de templos al aire libre (<b>Karnak</b> y <b>Luxor</b>), hicieron <b>speos</b>: templos excavados en la roca. El más famoso es <b>Abu Simbel</b>, de <b>Ramsés II</b>, con cuatro estatuas sentadas de <b>22 metros</b>.'},
 {clear:1,d:`<rect width="400" height="250" fill="#3a2a14"/><path d="M0 0 H400 V250 H0Z" fill="none"/>
  <g class="pop"><circle cx="30" cy="125" r="22" fill="#ffd23f"/></g>
  <path class="dr" d="M52 125 H300" stroke="#ffd23f" stroke-width="16" stroke-opacity=".6"/>
  <g>${[300,330,360].map(x=>`<g><rect x="${x-9}" y="110" width="18" height="40" fill="#e0c27a"/><circle cx="${x}" cy="102" r="8" fill="#e0c27a"/></g>`).join('')}<g opacity=".35"><rect x="381" y="110" width="18" height="40" fill="#e0c27a"/><circle cx="390" cy="102" r="8" fill="#e0c27a"/></g></g>
  ${chip(150,60,'solo 2 días al año','#ffd23f',13)}${chip(330,190,'Amón, Ra y Ramsés','#ffd23f',11)}${chip(338,62,'Ptah, en sombra','#aaa',10)}${chip(160,210,'21 febrero · 19 octubre','#ffd23f',12)}`,
  c:'Dentro ocurre un prodigio: <b>dos días al año</b>, el sol entra hasta el fondo e ilumina a <b>Amón, Ra y Ramsés II</b>, mientras <b>Ptah</b>, dios del inframundo, queda en la sombra.'}
],quiz:[
 {q:'¿Qué es un speos?',a:'Un templo excavado en la roca',o:['Una pirámide escalonada','Un tipo de pintura','Una estela con leyes'],e:'Como Abu Simbel.'},
 {q:'¿Qué faraón mandó hacer Abu Simbel?',a:'Ramsés II',o:['Keops','Akhenaton','Tutankamón'],e:''},
 {q:'¿Qué dios queda siempre en la sombra?',a:'Ptah',o:['Ra','Amón','Ramsés II'],e:'Es el dios del inframundo.'}
]},

{id:'canon',cat:'egi',short:'Canon y Nefertiti',t:'Escultura: el canon y Amarna',steps:[
 {clear:1,d:`${bg()}${tag(200,22,'Ley de la frontalidad',G,15)}<g class="pop">${pharaoh(110,70,1.5)}</g>
  ${chip(292,80,'siempre joven y fuerte',ORG,12)}${chip(292,112,'rígido',ORG,12)}${chip(292,144,'mira al frente',ORG,12)}${chip(292,176,'brazos pegados al cuerpo',ORG,11)}`,
  c:'El faraón era sagrado: se le esculpía siempre <b>joven, fuerte y rígido</b>, mirando al frente con los brazos pegados al cuerpo. Es la <b>ley de la frontalidad</b>.'},
 {d:`<g>${[...Array(18)].map((_,k)=>`<rect class="pop" x="148" y="${63+k*7.7}" width="18" height="6.5" rx="2" fill="${k%2?'#f2c230':'#c0127e'}" opacity=".85"/>`).join('')}</g>${chip(330,214,'canon de 18 puños',G,13)}`,
  c:'Las proporciones seguían el <b>canon de 18 puños</b>: de la frente a los pies, el cuerpo medía 18 puños.'},
 {clear:1,d:`${bg()}${tag(200,22,'Tell Amarna',G,15)}<g class="pop"><circle cx="90" cy="80" r="26" fill="#ffd23f"/>${[0,1,2,3,4,5].map(k=>`<line x1="${90+Math.cos((k*30+30)*Math.PI/180)*30}" y1="${80+Math.sin((k*30+30)*Math.PI/180)*30}" x2="${90+Math.cos((k*30+30)*Math.PI/180)*60}" y2="${80+Math.sin((k*30+30)*Math.PI/180)*60}" stroke="#d9a400" stroke-width="3"/>`).join('')}</g>${chip(90,170,'dios único: Atón',ORG,12)}${chip(90,200,'Akhenaton',G,13)}
  <g class="mv" data-dx="60"><path d="M260 230 Q260 180 300 172 Q340 180 340 230Z" fill="#2a6cbf"/><path d="M286 172 L288 140 Q300 130 312 140 L314 172Z" fill="#b9814f"/><path d="M282 112 L284 60 Q300 46 318 60 L322 112Z" fill="#1e4f94"/><path d="M284 74 H320" stroke="#d9a400" stroke-width="5"/><ellipse cx="300" cy="118" rx="16" ry="22" fill="#b9814f"/><ellipse cx="294" cy="114" rx="3" ry="2" fill="#111"/><ellipse cx="306" cy="114" rx="3" ry="2" fill="#111"/></g>${chip(195,135,'más realista',ORG,12)}${chip(330,236,'busto de Nefertiti',G,12)}`,
  c:'El faraón <b>Amenofis IV</b> impuso un dios único, <b>Atón</b>, y se cambió el nombre a <b>Akhenaton</b>. Con él, el arte de <b>Tell Amarna</b> se volvió más <b>realista</b>, como el <b>busto de Nefertiti</b>.'}
],quiz:[
 {q:'¿Qué es la ley de la frontalidad?',a:'El faraón mira al frente, rígido y con los brazos pegados',o:['Pintar todo de perfil','Construir con arcos','Repetir un estribillo'],e:''},
 {q:'¿Cuántos puños medía la figura según el canon?',a:'18',o:['7','12','22'],e:'De la frente a los pies.'},
 {q:'¿Qué obra es el ejemplo del arte de Tell Amarna?',a:'El busto de Nefertiti',o:['La Puerta de Ishtar','Gudea de Lagash','El zigurat de Ur'],e:'Más realista y expresivo.'}
]},

{id:'pintura',cat:'egi',short:'Pintura',t:'La pintura egipcia',steps:[
 {clear:1,d:`${bg('#f3e6c6')}${tag(200,22,'Pintura al fresco',G,15)}<rect x="40" y="50" width="200" height="170" fill="#f7ecd2" stroke="#a07c32" stroke-width="3"/>
  <g class="mv" data-dx="-40">${egFig(140,150,1.3,'#b9814f')}</g>
  <g class="pop">${[['#c0392b',290],['#2a6cbf',320],['#17734a',350],['#d9a400',305],['#111',335]].map(([c,x],k)=>`<circle cx="${x}" cy="${k<3?100:130}" r="11" fill="${c}"/>`).join('')}</g>${chip(320,166,'colores de minerales',ORG,11)}${chip(320,198,'sobre cal húmeda',ORG,12)}${T(140,240,'tumba de Nefertari',{size:12,it:1,c:MUT})}`,
  c:'Decoraban templos y tumbas, como la de la reina <b>Nefertari</b>. Pintaban <b>al fresco</b>: sobre cal húmeda, con colores sacados de <b>minerales</b>.'},
 {clear:1,d:`${bg()}${tag(200,22,'Una regla muy estricta',G,15)}<g class="pop">${egFig(200,150,2.1,'#b9814f')}</g>
  ${chip(80,72,'cabeza de perfil',ORG,12)}${chip(330,72,'ojo de frente',ORG,12)}${chip(330,120,'hombros de frente',ORG,12)}${chip(80,210,'piernas de perfil',ORG,12)}${chip(330,214,'plana, sin sombras',G,12)}
  ${arrow(120,74,190,82,ORG)}${arrow(290,74,215,84,ORG)}`,
  c:'Seguían una regla fija: <b>cabeza y piernas de perfil</b>, pero <b>ojo y hombros de frente</b>. Las figuras eran <b>planas</b>, sin volumen ni sombras.'},
 {clear:1,d:`${bg()}${tag(200,22,'Perspectiva jerárquica',G,15)}<g class="pop">${egFig(110,140,2.4,'#b9814f','#f2c230')}${crown(110,52,'#2a6cbf')}</g>
  <g class="mv" data-dx="60">${egFig(250,190,1,'#8a5a3a')}${egFig(300,190,1,'#8a5a3a')}${egFig(350,190,1,'#8a5a3a')}</g>
  ${chip(110,236,'faraón: enorme',G,12)}${chip(300,236,'sirvientes: pequeños',ORG,12)}${chip(300,80,'tamaño = importancia',G,13)}`,
  c:'Usaban la <b>perspectiva jerárquica</b>: el <b>tamaño</b> dependía de la <b>importancia</b>. El faraón o los dioses eran gigantes frente a sirvientes o prisioneros.'}
],quiz:[
 {q:'¿Qué técnica usaban para pintar?',a:'Al fresco, sobre cal húmeda',o:['Óleo sobre lienzo','Acuarela sobre papel','Mosaico de vidrio'],e:''},
 {q:'¿Cómo se pintaba el ojo en una figura egipcia?',a:'De frente',o:['De perfil','Cerrado','No se pintaba'],e:'Aunque la cabeza va de perfil.'},
 {q:'¿Qué es la perspectiva jerárquica?',a:'Los más importantes se pintan más grandes',o:['Lo lejano se pinta pequeño','Todo se pinta del mismo tamaño','Se pinta con sombras'],e:''}
]}
],

games:[
 {id:'meseg',type:'binario',t:'¿Mesopotamia o Egipto?',d:'Cada obra o idea, a su civilización',sets:[
  {t:'¿Mesopotamia o Egipto?',a:['Mesopotamia',M],b:['Egipto',G],it:[['El arco y la bóveda','a'],['Zigurat de Ur','a'],['Puerta de Ishtar','a'],['Gudea de Lagash','a'],['Toros alados (lamassu)','a'],['Código de Hammurabi','a'],['Ladrillo y adobe','a'],['Arquitectura adintelada, sin arcos','b'],['Mastaba','b'],['Pirámides de Giza','b'],['Hipogeo','b'],['Abu Simbel','b'],['Canon de 18 puños','b'],['Busto de Nefertiti','b'],['Pintura de perfil y ojo de frente','b']]}]},
 {id:'obra',type:'clasifica',t:'¿Qué obra es?',d:'Cada pista, a su obra',deal:12,
  bins:{zig:{n:'Zigurat de Ur',c:M},ish:{n:'Puerta de Ishtar',c:'#24599f'},ham:{n:'Código de Hammurabi',c:'#3b3b44'},giz:{n:'Pirámides de Giza',c:G},abu:{n:'Abu Simbel',c:'#a07c32'},nef:{n:'Busto de Nefertiti',c:'#c0127e'}},
  cards:[['Ur-Nammu','zig'],['Tres plantas y terrazas','zig'],['Santuario de Nanna','zig'],['Ladrillo vidriado azul','ish'],['Leones y dragones','ish'],['Museo de Pérgamo','ish'],['Nabucodonosor II','ish'],['282 leyes','ham'],['Estela de basalto','ham'],['El dios Shamash','ham'],['Keops, Kefren y Mikerinos','giz'],['Pasillos para despistar a los ladrones','giz'],['Ramsés II','abu'],['Estatuas de 22 metros','abu'],['El sol entra dos días al año','abu'],['Tell Amarna','nef'],['Arte más realista','nef'],['Hallado en 1912','nef']]},
 {id:'tumbas',type:'orden',t:'Ordena las tumbas',d:'De la primera a la última',hint:'Toca las tumbas egipcias de la más antigua a la más moderna.',items:['Mastaba','Pirámide escalonada','Pirámides de Giza','Hipogeo del Valle de los Reyes']},
 {id:'mapa',type:'puntos',t:'Mapa: ¿dónde está?',d:'Encuentra cada lugar',prompt:'Toca:',viewBox:'0 0 400 260',base:NEMAP(),
  spots:[['ur','Ur (zigurat)',338,198],['bab','Babilonia (Puerta de Ishtar)',300,130],['lag','Lagash (Gudea)',318,166],['giz','Giza (pirámides)',110,74],['ama','Tell Amarna (Nefertiti)',116,128],['val','Tebas (Valle de los Reyes y de las Reinas)',120,170],['abu','Abu Simbel',122,236]]}
],

pool:[
 {q:'¿Por qué nos han llegado pocos restos de Mesopotamia?',a:'Porque construían con ladrillo y adobe, materiales frágiles',o:['Porque no construían nada','Porque todo era de oro y se robó','Porque estaba bajo el mar'],e:''},
 {q:'¿Quiénes crearon el zigurat?',a:'Los sumerios',o:['Los egipcios','Los fenicios','Los griegos'],e:''},
 {q:'¿Qué representan los relieves de la Leona herida?',a:'Escenas de caza',o:['Una boda real','Una batalla naval','Una misa'],e:''},
 {q:'¿Cómo era la arquitectura egipcia?',a:'Colosal y adintelada, sin arcos',o:['Pequeña y con muchos arcos','De madera','De ladrillo vidriado azul'],e:''},
 {q:'¿En qué valle están los hipogeos de los faraones?',a:'En el Valle de los Reyes',o:['En el valle del Éufrates','En Giza','En Babilonia'],e:''},
 {q:'¿Cómo se llamaba Akhenaton antes de cambiar de nombre?',a:'Amenofis IV',o:['Ramsés II','Keops','Nabucodonosor'],e:''},
 {q:'¿Qué templos egipcios estaban al aire libre?',a:'Karnak y Luxor',o:['Abu Simbel','Ur y Lagash','El Valle de los Reyes'],e:''},
 {vf:1,q:'Los egipcios usaban mucho el arco y la bóveda.',a:'Falso',e:'Su arquitectura era adintelada; el arco es mesopotámico.'},
 {vf:1,q:'Gudea de Lagash es una escultura exenta.',a:'Verdadero',e:''},
 {vf:1,q:'En la pintura egipcia las figuras tienen volumen y sombras.',a:'Falso',e:'Eran planas.'},
 {vf:1,q:'Solo los sacerdotes podían subir al zigurat.',a:'Verdadero',e:''},
 {vf:1,q:'La Puerta de Ishtar sigue hoy en Babilonia.',a:'Falso',e:'Está en el Museo de Pérgamo de Berlín.'}
]
};
