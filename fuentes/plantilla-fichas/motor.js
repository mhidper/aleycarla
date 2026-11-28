/* ===== Motor común: esquema, fichas animadas, juegos y prueba =====
   Lee la configuración de window.APP (ver contenido/*.js).
   Clases en los dibujos de cada paso:
     .mv  llega desplazado (data-dx, data-dy)
     .dr  línea que se dibuja (las discontinuas aparecen)
     .fo  se apaga hasta quedar tenue
     .pop entra con rebote más marcado
*/
(function(){
const A=window.APP;
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS=typeof gsap!=='undefined'&&!RM;
const store={get(k,d){try{return JSON.parse(localStorage.getItem(A.store+'_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(A.store+'_'+k,JSON.stringify(v))}catch(e){}}};
const CAT=k=>A.cats[k]||{n:k,c:INK};

/* ---------- ESQUEMA ---------- */
const E=A.esquema;
$('#eKick').textContent=E.kicker;$('#eTtl').textContent=E.title;$('#mapHint').textContent=E.hint;
$('#mapa').setAttribute('viewBox',E.viewBox||'0 0 400 220');
function drawMap(sel){
  $('#mapa').innerHTML=E.draw(sel);
  document.querySelectorAll('#mapa .pin').forEach(g=>{
    g.setAttribute('tabindex','0');g.setAttribute('role','button');
    const go=()=>showNotes(g.dataset.k);
    g.addEventListener('click',go);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
  });
}
function showNotes(k){
  drawMap(k);
  const it=E.items[k],n=$('#notes');n.hidden=false;n.style.borderColor=it.c;
  n.innerHTML=`<h3 style="color:${it.c}">${it.t}</h3><ul>${it.notes.map(x=>`<li>${x}</li>`).join('')}</ul>${it.scene?`<div><button class="primary" id="toFicha">🎬 Ver la ficha animada</button></div>`:''}`;
  if(it.scene)$('#toFicha').onclick=()=>{openTab('fichas');loadScene(A.scenes.findIndex(s=>s.id===it.scene))};
  $('#mapHint').textContent='Toca otra parte del esquema para cambiar.';
  if(HAS)gsap.from(n.children,{opacity:0,y:8,stagger:.06,duration:.3});
}

/* ---------- FICHAS ---------- */
let cur=0,step=0,tl=null;
const done=new Set(store.get('done',[]));
function buildPick(){
  $('#fpick').innerHTML=A.scenes.map((s,i)=>`<button data-i="${i}" ${i===cur?'aria-current="true"':''} class="${done.has(s.id)?'done':''}" style="border-color:${CAT(s.cat).c}">${s.short||s.t}</button>`).join('');
  $('#fpick').querySelectorAll('button').forEach(b=>b.onclick=()=>loadScene(+b.dataset.i));
}
function loadScene(i){cur=Math.max(0,i);step=0;$('#fquiz').hidden=true;buildPick();render(true);window.scrollTo({top:$('#tab-fichas').offsetTop-60,behavior:'smooth'})}
function render(anim){
  const S=A.scenes[cur],c=CAT(S.cat);
  $('#kick').textContent=`Ficha ${cur+1} de ${A.scenes.length} · ${c.n}`;$('#kick').style.color=c.c;$('#ttl').textContent=S.t;
  let j=step;while(j>0&&!S.steps[j].clear)j--;
  let svg='';for(let k=j;k<=step;k++)svg+=`<g id="stp${k}">${S.steps[k].d}</g>`;
  if(tl)tl.kill();
  $('#stage').innerHTML=svg;
  $('#cap').innerHTML=S.steps[step].c;
  $('#dots').innerHTML=S.steps.map((_,k)=>`<i class="${k===step?'on':k<step?'past':''}"></i>`).join('');
  $('#bBack').disabled=step===0;
  $('#bNext').textContent=step===S.steps.length-1?'✓ Comprobar':'Siguiente →';
  if(anim&&HAS)animate($('#stp'+step));
}
function animate(g){
  tl=gsap.timeline();
  [...g.children].filter(c=>!(c.tagName==='rect'&&c.getAttribute('width')==='400')).forEach(el=>{
    if(el.classList.contains('dr')){
      const ps=el.tagName==='path'?[el]:[...el.querySelectorAll('path,line')];
      ps.forEach(p=>{if(p.getAttribute('stroke-dasharray')||!p.getTotalLength){tl.from(p,{opacity:0,duration:.6},'<.15');return}const L=p.getTotalLength();gsap.set(p,{strokeDasharray:L,strokeDashoffset:L});tl.to(p,{strokeDashoffset:0,duration:.8,ease:'power1.inOut'},'<.15')});
    }
    else if(el.classList.contains('mv'))tl.from(el,{x:+(el.dataset.dx||0),y:+(el.dataset.dy||0),opacity:0,duration:1.1,ease:'power2.out'},'<.2');
    else if(el.classList.contains('fo'))tl.to(el,{opacity:.15,duration:1.2,delay:.6},'<');
    else if(el.classList.contains('pop'))tl.from(el,{scale:0,transformOrigin:'50% 50%',duration:.5,ease:'back.out(2.5)'},'<.2');
    else tl.from(el,{opacity:0,y:8,scale:.96,transformOrigin:'50% 50%',duration:.4,ease:'back.out(1.6)'},'<.18');
  });
}
$('#bNext').onclick=()=>{const S=A.scenes[cur];if(step<S.steps.length-1){step++;render(true)}else showFQuiz()};
$('#bBack').onclick=()=>{if(step>0){step--;render(false)}};
$('#bAgain').onclick=()=>render(true);
function showFQuiz(){
  const S=A.scenes[cur],q=$('#fquiz');q.hidden=false;
  runQuiz(q,S.quiz,'¿Lo has entendido?',(ok,n)=>{
    if(ok===n){done.add(S.id);store.set('done',[...done]);buildPick()}
    const nx=document.createElement('div');nx.className='ctrl';
    nx.innerHTML=`<span class="stamp">${ok}/${n}${ok===n?' ¡Genial!':''}</span><span class="sp"></span><button class="primary">${cur<A.scenes.length-1?'Siguiente ficha →':'🎮 A jugar'}</button>`;
    nx.querySelector('button').onclick=()=>cur<A.scenes.length-1?loadScene(cur+1):openTab('juegos');
    q.appendChild(nx);
  });
  q.scrollIntoView({behavior:'smooth',block:'start'});
}
function runQuiz(box,qs,title,onEnd){
  let ok=0,ans=0;box.innerHTML=`<h3>${title}</h3>`;
  qs.forEach(Q=>{
    const d=document.createElement('div');d.className='qq';
    const opts=Q.vf?['Verdadero','Falso']:shuffle([Q.a,...Q.o]);
    d.innerHTML=`<p class="q">${Q.q}</p><div class="opts">${opts.map(o=>`<button class="opt">${o}</button>`).join('')}</div><p class="exp" hidden></p>`;
    d.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      const good=b.textContent===Q.a;if(good)ok++;ans++;
      d.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(x.textContent===Q.a)x.classList.add('right')});
      if(!good)b.classList.add('wrong');
      const e=d.querySelector('.exp');e.hidden=false;e.className='exp '+(good?'b':'m');e.innerHTML=(good?'✓ ¡Bien! ':'✗ Era: <b>'+Q.a+'</b>. ')+(Q.e||'');
      if(ans===qs.length)onEnd(ok,qs.length);
    });
    box.appendChild(d);
  });
}

/* ---------- JUEGOS ---------- */
let GID=0;
function gMenu(){
  GID++;const best=store.get('best',{});
  $('#gbox').innerHTML=`<p class="kicker">Juegos</p><h2 class="t">Elige un juego</h2><div class="games">${A.games.map(g=>`<button class="gcard" data-g="${g.id}"><b>${g.t}</b>${g.d}${best[g.id]!=null?`<div class="best">Récord: ${best[g.id]}</div>`:''}</button>`).join('')}</div>`;
  $('#gbox').querySelectorAll('.gcard').forEach(b=>b.onclick=()=>runGame(b.dataset.g));
}
const runGame=id=>{const g=A.games.find(x=>x.id===id);({clasifica:gClasifica,binario:gBinario,orden:gOrden,puntos:gPuntos})[g.type](g)};
function endGame(id,ok,n){
  const b=store.get('best',{}),bv=store.get('bestv',{});if(bv[id]==null||ok/n>bv[id]){bv[id]=ok/n;b[id]=`${ok}/${n}`;store.set('best',b);store.set('bestv',bv)}
  $('#gbox').innerHTML=`<div class="result"><p class="kicker">Fin del juego</p><span class="stamp">${ok}/${n}</span><p>${ok===n?'¡Perfecto! 🏆':ok>=n*.7?'¡Muy bien! Casi lo tienes.':'Repasa las fichas y vuelve a intentarlo.'}</p><div class="ctrl"><button class="ghost" id="gm">← Juegos</button><button class="primary" id="gr">↻ Otra vez</button></div></div>`;
  $('#gm').onclick=gMenu;$('#gr').onclick=()=>runGame(id);
}
const gHead=(t,i,n,ok)=>`<div class="score"><span>${t}</span><span>${i+1}/${n} · ✓ ${ok}</span></div>`;
function choiceRound(G,items,label,bins,keyOf,txtOf,wrongMsg){
  const my=++GID;let i=0,ok=0;
  const show=()=>{
    if(my!==GID)return;if(i===items.length)return endGame(G.id,ok,items.length);
    const it=items[i],k=keyOf(it),B=bins(it);
    $('#gbox').innerHTML=`${gHead(label(it),i,items.length,ok)}<div class="bigcard">${txtOf(it)}</div><div class="bins">${B.map(([bk,b])=>`<button class="bin" data-k="${bk}" style="border-left-color:${b.c}">${b.n}</button>`).join('')}</div><p class="fb" id="fb"></p>`;
    if(HAS)gsap.from('.bigcard',{scale:.8,opacity:0,duration:.3});
    $('#gbox').querySelectorAll('.bin').forEach(b=>b.onclick=()=>{
      const good=b.dataset.k===k;if(good)ok++;
      $('#gbox').querySelectorAll('.bin').forEach(x=>{x.disabled=true;if(x.dataset.k===k)x.classList.add('right')});
      if(!good)b.classList.add('wrong');
      $('#fb').className='fb '+(good?'ok':'ko');$('#fb').textContent=good?'✓ ¡Correcto!':'✗ '+wrongMsg(it,B.find(x=>x[0]===k)[1]);
      i++;setTimeout(show,good?800:1600);
    });
  };show();
}
function gClasifica(G){
  const bins=Object.entries(G.bins||A.cats);
  choiceRound(G,shuffle(G.cards).slice(0,G.deal||12),()=>G.t,()=>bins,it=>it[1],it=>it[0],(it,b)=>'Es: '+b.n);
}
function gBinario(G){
  const items=shuffle(G.sets.flatMap(S=>S.it.map(([t,s])=>({S,t,s}))));
  choiceRound(G,items,it=>it.S.t,it=>[['a',{n:it.S.a[0],c:it.S.a[1]}],['b',{n:it.S.b[0],c:it.S.b[1]}]],it=>it.s,it=>it.t,(it,b)=>'Es: '+b.n);
}
function gOrden(G){
  const my=++GID;let next=0,err=0;const sh=shuffle(G.items.map((t,k)=>({t,k})));
  $('#gbox').innerHTML=`<div class="score"><span>${G.t}</span><span id="oe">fallos: 0</span></div><p class="hint">${G.hint}</p><div class="order">${sh.map(o=>`<button data-k="${o.k}"><span class="n"></span>${o.t}</button>`).join('')}</div><p class="fb" id="fb"></p>`;
  $('#gbox').querySelectorAll('.order button').forEach(b=>b.onclick=()=>{
    if(b.classList.contains('placed'))return;
    if(+b.dataset.k===next){b.classList.add('placed');b.querySelector('.n').textContent=(next+1)+'.';next++;$('#fb').textContent='';
      if(next===G.items.length){const sc=Math.max(0,G.items.length-err);setTimeout(()=>{if(my===GID)endGame(G.id,sc,G.items.length)},900)}}
    else{err++;$('#oe').textContent='fallos: '+err;b.classList.add('shake');setTimeout(()=>b.classList.remove('shake'),500);$('#fb').className='fb ko';$('#fb').textContent='Ese todavía no. ¿Qué va antes?'}
  });
}
function gPuntos(G){
  const my=++GID;const qs=shuffle(G.ask?G.spots.filter(s=>G.ask.includes(s[0])):G.spots);let i=0,ok=0;
  const show=()=>{
    if(my!==GID)return;if(i===qs.length)return endGame(G.id,ok,qs.length);
    const Q=qs[i];
    $('#gbox').innerHTML=`${gHead(G.t,i,qs.length,ok)}<div class="bigcard" style="font-size:1.1rem">${G.prompt||'Toca:'} ${Q[1]}</div><div class="stage"><svg viewBox="${G.viewBox||'0 0 400 220'}" xmlns="http://www.w3.org/2000/svg">${G.base}${G.spots.map(s=>`<g class="mapdot" data-k="${s[0]}"><circle cx="${s[2]}" cy="${s[3]}" r="${G.r||18}" fill="transparent"/><circle class="v" cx="${s[2]}" cy="${s[3]}" r="7" fill="${ORG}" stroke="#fff" stroke-width="2"/></g>`).join('')}</svg></div><p class="fb" id="fb"></p>`;
    $('#gbox').querySelectorAll('.mapdot').forEach(g=>g.onclick=()=>{
      if(g.dataset.lock)return;$('#gbox').querySelectorAll('.mapdot').forEach(x=>x.dataset.lock=1);
      const good=g.dataset.k===Q[0];if(good)ok++;
      const r=$('#gbox').querySelector(`.mapdot[data-k="${Q[0]}"] .v`);r.setAttribute('fill','#17734a');r.setAttribute('r','10');
      if(!good)g.querySelector('.v').setAttribute('fill','#b0302a');
      $('#fb').className='fb '+(good?'ok':'ko');$('#fb').textContent=good?'✓ ¡Exacto!':'✗ Era el punto verde';
      i++;setTimeout(show,good?900:1700);
    });
  };show();
}

/* ---------- PRUEBA ---------- */
function pStart(){
  const N=A.nPrueba||15;
  $('#pbox').innerHTML=`<p class="kicker">Prueba final</p><h2 class="t">${N} preguntas de todo el tema</h2><p class="hint">Mejor nota: ${store.get('exam','—')}</p><div><button class="primary" id="pgo">Empezar</button></div>`;
  $('#pgo').onclick=()=>{
    const pool=[...A.scenes.flatMap(s=>s.quiz),...A.pool];
    const qs=shuffle(pool).slice(0,N);
    const box=document.createElement('div');box.className='quiz';$('#pbox').innerHTML='';$('#pbox').appendChild(box);
    runQuiz(box,qs,`Responde las ${N}`,(ok,n)=>{
      const nota=Math.round(ok/n*100)/10;if(nota>(parseFloat(store.get('exam','0'))||0))store.set('exam',String(nota));
      const r=document.createElement('div');r.className='result';
      r.innerHTML=`<span class="stamp">${nota} / 10</span><p>${ok} de ${n} bien. ${nota>=9?'¡Sobresaliente! 🏆':nota>=7?'¡Muy bien!':nota>=5?'Aprobado. Repasa los fallos.':'Vuelve a las fichas y repítela.'}</p><button class="primary">↻ Otra prueba</button>`;
      r.querySelector('button').onclick=pStart;box.appendChild(r);r.scrollIntoView({behavior:'smooth'});
    });
  };
}

/* ---------- PESTAÑAS ---------- */
function openTab(t){
  GID++;
  document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));
  ['esquema','fichas','juegos','prueba'].forEach(x=>$('#tab-'+x).hidden=x!==t);
  if(t==='fichas'&&!$('#stage').innerHTML)loadScene(0);
  if(t==='juegos')gMenu();
  if(t==='prueba')pStart();
}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>openTab(b.dataset.tab));
window.__app={openTab,loadScene,render,set:(c,s)=>{cur=c;step=s;render(false)},n:()=>A.scenes.length};
drawMap();
})();
