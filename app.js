// ===== Состояние и серия (streak)
const $=s=>document.querySelector(s);
const T=n=>new Date(Date.now()-n*864e5).toLocaleDateString('en-CA');
let S;try{S=JSON.parse(localStorage.getItem('cb'))}catch(e){}
S=S||{xp:0,streak:0,best:0,last:'',done:{},hist:{},sec:0,gem:0,fz:0,gold:{},jmp:{}};
// пропустил день (последний урок не сегодня и не вчера) — серия сбрасывается
S.gem=S.gem||0;S.fz=S.fz||0;S.gold=S.gold||{};S.jmp=S.jmp||{};S.since=S.since||T(0);
let note='';
if(S.last&&S.last!==T(0)&&S.streak>0){
 const miss=Math.round((new Date(T(0))-new Date(S.last))/864e5)-1;
 if(miss>0){if(S.fz>=miss){S.fz-=miss;S.last=T(1);note='❄️ Заморозка спасла твой ударный режим!'}else S.streak=0}
}
const Q=()=>{if(!S.q||S.q.d!==T(0))S.q={d:T(0),xp:0,les:0,ok:0,c:0};return S.q};
const QS=[['Пройди 2 урока','les',2],['Набери 40 XP','xp',40],['Ответь верно на 15 вопросов','ok',15]];
const CH=[['#b9732f','#7a4720','Деревянный'],['#cfd8e0','#8d9aa6','Серебряный'],['#ffc800','#e5a800','Золотой']];
const LVN=['Начинаем','Основы','Уверенный уровень','Продвинутый','Знаток','Мастер'];
const lv=n=>{const m=17*U.filter(u=>u.s==n).length,t=[...new Set([5,10,20,Math.round(m*.4),Math.round(m*.7),m])].filter(x=>x<=m).sort((a,b)=>a-b);return t.map((x,k)=>[x,LVN[Math.min(k,5)]])};
try{const m={name:'ХимБио',short_name:'ХимБио',display:'standalone',start_url:location.href,background_color:'#131f24',theme_color:'#58cc02',icons:[]};const l=document.createElement('link');l.rel='manifest';l.href=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:'application/json'}));document.head.appendChild(l)}catch(e){}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window.dp=e});
const save=()=>{try{localStorage.setItem('cb',JSON.stringify(S))}catch(e){}};
const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const isC=q=>q[0]!='m'&&Array.isArray(q[1]);
let L;

function tab(i){document.body.classList.remove('les');document.querySelectorAll('.nav button').forEach((b,k)=>b.className=k==i?'on':'')}
const SYM=['⚗️','🧬'];
const av=(c)=>`<span class="av ${c||''}" style="background:${S.avc||'#ddf4ff'}">${S.av||'🧑‍🔬'}</span>`;
function hdr(){return `<div class="top"><span onclick="prof()">${av()}</span><span onclick="sw()">${SYM[S.sec]} ${score(S.sec)}</span><span class="fl ${S.last===T(0)?'on':''}" onclick="strk()">🔥 ${S.streak}</span><span onclick="shop()">💎 ${S.gem}</span></div>`}
function sw(){
 $('#pp').innerHTML=`<div class="ov" style="align-items:flex-start" onclick="cl()"><div class="sheet" style="border-radius:0 0 24px 24px;padding-top:calc(76px + env(safe-area-inset-top))" onclick="event.stopPropagation()"><b style="font-size:18px">Выбери курс</b><div style="display:flex;gap:12px;margin-top:12px">${SEC.map((n,i)=>`<button class="opt ${i==S.sec?'sel':''}" style="text-align:center" onclick="S.sec=${i};save();cl();home()"><div style="font-size:44px">${SYM[i]}</div>${n}<div style="font-size:13px;opacity:.7">Оценка: ${score(i)}</div></button>`).join('')}</div></div></div>`;
}
function cl(){$('#pp').innerHTML=''}
// ===== Главная: модули → разделы → уроки + экзамен раздела
// ===== Модули: курс → модули → разделы → уроки
const MODS=[
[['Основы химии',[0,1,4,5,10,11,16],'Я знаю, из чего состоят вещества.'],['Реакции и растворы',[6,7,12,17],'Я понимаю, как идут реакции.'],['Органика и расчёты',[8,9],'Я умею считать и знаю органику.']],
[['Клетка и наследственность',[2,3,14],'Я понимаю клетку и гены.'],['Обмен веществ и экология',[13,15],'Я знаю, как живут организмы и экосистемы.']]];
const ALL=s=>MODS[s].flatMap(m=>m[1].flatMap(ui=>[0,1,2,3].map(j=>ui+'-'+j)));
const modDone=(s,k)=>MODS[s][k][1].every(ui=>S.done[ui+'-3']);
const modOf=ui=>MODS[U[ui].s].findIndex(m=>m[1].includes(ui));
const usc=ui=>[0,1,2,3].reduce((a,j)=>{const id=ui+'-'+j;return a+(S.done[id]?(j==3?5:2):0)+(S.gold[id]?2:0)},0);
function curMod(s){const f=(S.sm||{})[s]||0;for(let k=f;k<MODS[s].length;k++)if(!modDone(s,k))return k;return MODS[s].length-1}
function home(){
 tab(0);S.chs=S.chs||{};S.vm=S.vm||{};S.sm=S.sm||{};
 const s=S.sec,all=ALL(s);
 if(S.sm[s]===undefined&&Object.keys(S.done).length)S.sm[s]=0;
 if(S.mdone){note=S.mdone;S.mdone=''}
 const k0=S.vm[s]!==undefined?S.vm[s]:curMod(s),M=MODS[s][k0],sk=all.indexOf(MODS[s][S.sm[s]||0][1][0]+'-0');
 const ids=M[1].flatMap(ui=>[0,1,2,3].map(j=>ui+'-'+j)),cur=ids.find(id=>!S.done[id]);
 let h=hdr()+'<div id="sb" class="ban sb" style="display:none"></div>';
 if(note){h+=`<div class="warn">${note}</div>`;note=''}
 if(S.streak>0&&S.last!==T(0))h+='<div class="warn">🔥 Ударный режим под угрозой! Пройди урок сегодня, иначе он сбросится.</div>';
 h+=`<div class="card qc" onclick="mods()" style="margin:14px 0 0"><div style="flex:1"><small style="color:var(--mut)">МОДУЛЬ ${k0+1} ИЗ ${MODS[s].length}</small><div style="font-size:18px">${M[0]}</div></div><span style="font-size:26px">📋</span></div>`;
 const off=[0,-46,0,46];
 ids.forEach(id=>{
  const [ui,j]=id.split('-').map(Number),u=U[ui],done=S.done[id],gd=S.gold[id],gk=all.indexOf(id),
   lock=j<3&&gk>0&&gk!==sk&&!S.done[all[gk-1]]&&!S.jmp[ui];
  if(j==0)h+=`<div class="ban" data-t="1" style="background:${u.c};box-shadow:0 4px 0 ${u.d}"><small>МОДУЛЬ ${k0+1}, РАЗДЕЛ ${M[1].indexOf(ui)+1}</small><h2>${u.n}</h2></div>`;
  const bg=gd?'#ffc800':u.c,sd=gd?'#e5a800':u.d;
  if(j==3){const k='p'+ui,d3=S.done[ui+'-2'],c2=S.chs[k];h+=`<button class="nd" style="background:none;box-shadow:none;left:-40px;${d3?'':'filter:grayscale(1);opacity:.55'}" onclick="${d3&&!c2?`ch('${k}')`:`pc(${ui})`}">${d3&&!c2?'<span class="go">ОТКРЫТЬ</span>':''}${chest(0,c2,64)}</button>`}
  h+=`<button data-id="${id}" class="nd ${lock?'lk':''} ${id===cur?'cur':''}" style="--rc:${u.c};background:${bg};box-shadow:0 6px 0 ${sd};left:${off[j]}px" onclick="${lock?`lt(${ui})`:done?`pop('${id}')`:j==3?`ex(${ui})`:`start('${id}')`}">${id===cur?'<span class="go">'+(j==3?'ЭКЗАМЕН':'НАЧАТЬ')+'</span>':''}${lock?'🔒':gd?'👑':j==3?'🎓':done?'★':'⭐'}</button>`;
 });
 if(!cur)h+=`<div class="card" style="text-align:center;margin-top:24px">🎉 Модуль пройден! ${k0+1<MODS[s].length?'Следующий модуль — в списке модулей 📋':'Проходи уроки на золото 👑'}</div>`;
 h+='<button id="jb" class="jb" onclick="jmpc()" style="display:none">↑</button>';
 $('#app').innerHTML=h;
 const tn=document.querySelector(`[data-id="${S.ln}"]`)||$('.cur');tn?tn.scrollIntoView({block:'center'}):scrollTo(0,0);
 document.documentElement.style.setProperty('--th',$('.top').offsetHeight+'px');setTimeout(sbUpd,60);
 if(S.sm[s]===undefined)lvAsk();
}
function jmpc(){const t=document.querySelector(`[data-id="${S.ln}"]`)||$('.cur');if(t)t.scrollIntoView({block:'center',behavior:'smooth'})}
function mods(){
 tab(0);const s=S.sec,cu=S.vm[s]!==undefined?S.vm[s]:curMod(s);let lo=1;
 $('#app').innerHTML=bar('Курс: '+SEC[s],['✕','home()'],['',''])+MODS[s].map((m,k)=>{
  const ids=m[1].flatMap(ui=>[0,1,2,3].map(j=>ui+'-'+j)),p=ids.filter(i=>S.done[i]).length/ids.length*100,sc=m[1].reduce((a,ui)=>a+usc(ui),0),hi=lo+17*m[1].length-1,r=lo+'–'+hi;lo=hi+1;
  return `<div class="card" style="padding:0;overflow:hidden"><div style="background:var(--bd);padding:16px;position:relative;min-height:96px"><div style="background:var(--bg);border-radius:16px;padding:12px;max-width:70%">${m[2]}</div><span style="position:absolute;right:14px;bottom:4px;font-size:56px">${SYM[s]}</span></div><div style="padding:14px 16px"><div style="display:flex;justify-content:space-between"><b style="font-size:22px">Модуль ${k+1}</b><span class="chip" style="font-size:14px;padding:4px 10px;margin:0">${SYM[s]} ${r}</span></div><div style="color:var(--mut);font-size:14px;margin:4px 0">${m[0]} · разделов: ${m[1].length} · оценка модуля: ${sc}</div><div class="pb"><i style="width:${p}%;background:var(--g)"></i></div>${k==cu?'':`<div style="color:var(--b);margin-top:10px" onclick="gm(${k})">ПЕРЕЙТИ СЮДА</div>`}</div></div>`}).join('');
}
function gm(k){S.vm[S.sec]=k;S.ln=MODS[S.sec][k][1][0]+'-0';save();home()}
function lvAsk(){
 $('#pp').innerHTML=`<div class="ov" style="align-items:center"><div class="ctr2" style="text-align:left"><b style="font-size:20px">Насколько хорошо ты знаешь ${S.sec?'биологию':'химию'}?</b><div style="color:var(--mut);margin:6px 0 10px;font-size:14px">Подберём стартовый модуль. Остальные открываются экзаменом раздела.</div>${['Я новичок','Знаю основы','Знаю хорошо','Я эксперт'].map((t,l)=>`<button class="opt" onclick="setLv(${l})">${t}</button>`).join('')}</div></div>`;
}
function setLv(l){const n=MODS[S.sec].length;S.sm[S.sec]=Math.min([0,1,2,n-1][l],n-1);delete S.vm[S.sec];S.ln=null;save();cl();home()}
function lt(){
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()"><b style="font-size:20px">🔒 Урок пока закрыт</b><div style="color:var(--mut);margin:8px 0">Проходи уроки по порядку. Или сдай экзамен 🎓 в конце раздела: он всегда открыт и может открыть раздел целиком.</div><button class="btn gh" onclick="cl()">Закрыть</button></div></div>`;
}
function ex(ui){
 if([0,1,2].every(j=>S.done[ui+'-'+j]))return start(ui+'-3');
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()"><b style="font-size:20px">🎓 Экзамен раздела «${U[ui].n}»</b><div style="color:var(--mut);margin:8px 0">Можно сдать сразу, не проходя уроки: до 10 вопросов, не больше 2 ошибок. Если сдашь, раздел откроется полностью, а все прошлые разделы засчитаются пройденными.</div><button class="btn" onclick="jump(${ui})">🚀 Испытать себя</button><button class="btn gh" onclick="cl()">Закрыть</button></div></div>`;
}
function jump(ui){
 cl();S.ln=ui+'-3';const t=U[ui].s,own=U[ui].q.map((q,i)=>({q,k:ui+'.'+i})),ord=MODS[t].flatMap(m=>m[1]);
 const old=ord.slice(0,ord.indexOf(ui)).filter(i=>!S.done[i+'-3']).flatMap(i=>U[i].q.map((q,n)=>({q,k:i+'.'+n})));
 begin('jmp-'+ui,sh([...sh(own).slice(0,old.length?6:8),...sh(old).slice(0,4)]),{ex:1,jmp:ui});
}
function pc(ui){
 const n=[0,1,2].filter(j=>!S.done[ui+'-'+j]).length;
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()"><b style="font-size:20px">${n?`Пройди ещё ${n} ${n==1?'урок':'урока'}, чтобы открыть этот сундук!`:'Сундук уже открыт 🎉'}</b><button class="btn gh" onclick="cl()">Закрыть</button></div></div>`;
}
function pop(id){
 const j=+id.split('-')[1];
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()"><b style="font-size:20px">${j==3?'Экзамен раздела':'Урок '+(j+1)} пройден ✓</b><button class="btn" onclick="start('${id}')">Повторить</button>${j<3?`<button class="btn gld" onclick="start('${id}',1)">👑 Золотой уровень · +25 XP ${S.gold[id]?'✓':''}</button><div style="color:var(--mut);font-size:13px">Золото: 8 заданий, больше ввода и сборки, 2 жизни, ошибки не повторяются.</div>`:''}<button class="btn gh" onclick="cl()">Отмена</button></div></div>`;
}
// ===== Урок: 1–2 урока — новый материал, 3-й — тест по теме; в уроки подмешиваются вопросы из прошлых тем
const ty=q=>q[0]=='m'?'m':q[0]=='b'?'b':Array.isArray(q[1])?'c':'i';
function start(id,g){
 cl();S.ln=id;S.vm=S.vm||{};{const u0=+id.split('-')[0];S.vm[U[u0].s]=modOf(u0)}save();
 const [ui,j]=id.split('-').map(Number),pool=U[ui].q.map((q,i)=>({q,k:ui+'.'+i}));
 let qs,o={};
 const ls=pool.length>=16?4:3;
 if(j==3){qs=[...pool.slice(ls*3),...sh(pool.slice(0,ls*3)).slice(0,2)];o={ex:1}}
 else if(g){qs=sh(pool).sort((a,b)=>(ty(a.q)=='c')-(ty(b.q)=='c')).slice(0,8);o={g:1}}
 else qs=pool.slice(j*ls,j*ls+ls);
 begin(id,sh(qs),o);
}
function snd(t){
 if(S.mute)return;
 try{ac=window.ac=window.ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state=='suspended')ac.resume();
 const q={ok:[[660,0,.12],[880,.1,.2]],no:[[220,0,.2],[150,.16,.28]],tap:[[520,0,.05]],win:[[523,0,.15],[659,.15,.15],[784,.3,.15],[1047,.45,.45]],chest:[[300,0,.1],[400,.1,.1],[500,.2,.1],[700,.3,.1],[1000,.4,.3]],coin:[[988,0,.08],[1319,.08,.35]]}[t];
 q.forEach(([f,d,l])=>{const o=ac.createOscillator(),g=ac.createGain(),a=ac.currentTime+d;o.type=t=='no'?'sawtooth':'sine';o.frequency.value=f;o.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.0001,a);g.gain.exponentialRampToValueAtTime(.2,a+.02);g.gain.exponentialRampToValueAtTime(.0001,a+l);o.start(a);o.stop(a+l+.05)})}catch(e){}
}
function begin(id,qs,o){o=o||{};L={id,qs,i:0,h:o.ex?3:o.g?2:99,n:qs.length,err:0,g:o.g,ex:o.ex,jmp:o.jmp};show()}
// работа над ошибками: вопросы, на которых ошибся, возвращаются, пока не ответишь верно
function practice(){
 const qs=sh(S.mis||[]).slice(0,6).map(k=>{const [u,n]=k.split('.');return {q:U[u].q[n],k,r:1}});
 if(qs.length)begin('mis',qs);
}
function bad(k){if(!k)return;S.mis=S.mis||[];if(!S.mis.includes(k))S.mis.push(k);save()}
function show(){
 if(L.i>=L.qs.length)return fin();
 document.body.classList.add('les');
 const x=L.qs[L.i],q=x.q,t=ty(q);L.sel=null;L.ck=0;let b;const fixl=(x.fix||L.id=='mis')?'<div style="color:#ff9600;margin-top:14px">🔁 ИСПРАВЛЯЕМ ОШИБКИ</div>':'';
 if(t=='m'){
  L.m={l:sh(q[1].map((p,i)=>[p[0],i])),r:sh(q[1].map((p,i)=>[p[1],i])),a:null,d:[],n:q[1].length,w:0};
  b='<div class="q">Соедини пары</div><div class="cols" id="mm"></div>';
 }else{
  b=`<div class="q">${t=='b'?q[1]:q[0]}</div>`;
  if(t=='c'){L.o=sh(q[1].map((t,i)=>({t,ok:i==q[2]})));b+=L.o.map((o,k)=>`<button class="opt" onclick="pick(${k})">${o.t}</button>`).join('')}
  else if(t=='b'){L.b={p:sh([...q[2],...q[3]]).map((s,i)=>({s,i})),a:[]};b+='<div class="ans" id="ba"></div><div id="bp"></div>'}
  else b+=`<input class="in" id="in" autocomplete="off" autocapitalize="off" placeholder="Введи ответ" oninput="$('#ck').disabled=!this.value.trim()" onkeydown="if(event.key=='Enter')check()">`;
 }
 $('#app').innerHTML=`<div class="lh"><button class="x" onclick="qx()">✕</button><div class="bar"><i style="width:${L.i/L.qs.length*100}%"></i></div><span>${L.ex||L.g?(L.ex?'🎓 ':'👑 ')+'❤️ '+L.h:''}</span></div>${fixl}${b}<div id="ft"><button class="btn" id="ck" disabled onclick="check()">Проверить</button></div>`;
 if(t=='m')rm();else if(t=='b')rb();else if(t=='i')setTimeout(()=>$('#in').focus(),50);
}
// собери из «кирпичиков»: формулы и последовательности
function rb(){
 const B=L.b,c=(o,f)=>`<button class="chip ${f&&B.a.includes(o)?'dn':''}" onclick="${f?'bt':'bu'}(${o.i})">${o.s}</button>`;
 $('#ba').innerHTML=B.a.map(o=>c(o,0)).join('');
 $('#bp').innerHTML=B.p.map(o=>c(o,1)).join('');
 $('#ck').disabled=!B.a.length;
}
function bt(i){if(L.ck)return;snd('tap');const o=L.b.p.find(o=>o.i==i);if(!L.b.a.includes(o))L.b.a.push(o);rb()}
function bu(i){if(L.ck)return;snd('tap');L.b.a=L.b.a.filter(o=>o.i!=i);rb()}
function rm(){
 const m=L.m,c=(a,t)=>a.map(([s,i])=>`<button class="opt ${m.d.includes(i)?'dn':''} ${t=='l'&&m.a===i?'sel':''}" onclick="m${t}(${i})">${s}</button>`).join('');
 $('#mm').innerHTML=`<div>${c(m.l,'l')}</div><div>${c(m.r,'r')}</div>`;
}
function ml(i){snd('tap');L.m.a=i;rm()}
function mr(i){
 const m=L.m;if(m.a===null)return;
 if(m.a===i){if(m.d.length+1<m.n)snd('ok');m.d.push(i);m.a=null;rm();if(m.d.length==m.n)res(true,'',m.w)}
 else{snd('no');m.w=1;bad(L.qs[L.i].k);m.a=null;rm();const e=$('#mm');e.classList.add('shk');setTimeout(()=>e.classList.remove('shk'),400)}
}
function pick(k){
 if(L.ck)return;snd('tap');L.sel=k;
 document.querySelectorAll('.opt').forEach((e,i)=>e.classList.toggle('sel',i==k));
 $('#ck').disabled=false;
}
function check(){
 if(L.ck)return;const q=L.qs[L.i].q,t=ty(q);
 if(t=='c')return res(L.o[L.sel].ok,q[1][q[2]]);
 if(t=='b')return res(L.b.a.map(o=>o.s).join('|')==q[2].join('|'),q[2].join(q[4]));
 const v=$('#in').value.trim().toLowerCase(),A=q[1].split('|');
 res(A.some(a=>a.toLowerCase()==v),A[0]);
}
function res(ok,ans,keep){
 L.ck=1;snd(ok?'ok':'no');L.run=ok?(L.run||0)+1:0;if(!ok&&!(S.off||{}).vib&&navigator.vibrate)navigator.vibrate(150);const it=L.qs[L.i],q0=it.q,e=q0[0]=='m'?q0[2]:q0[0]=='b'?q0[5]:Array.isArray(q0[1])?q0[3]:q0[2];
 if(!ok){L.h--;L.err++;if(!L.g&&!L.ex)L.qs.push({...it,fix:1});bad(it.k)} // ошибка — вопрос вернётся в конец урока и в «Работу над ошибками»
 else{Q().ok++;if(L.id=='mis'&&it.k&&!keep){S.fx=(S.fx||0)+1;S.mis=(S.mis||[]).filter(x=>x!=it.k);save()}}
 if(ty(it.q)=='c')document.querySelectorAll('.opt')[L.sel].classList.replace('sel',ok?'ok':'no');
 const f=$('#ft');f.className=ok?'g':'r';
 f.innerHTML=`<div style="max-width:488px;margin:auto"><b style="font-size:22px">${ok?'✅ Верно!':'❌ Неверно'}</b><div style="margin:6px 0 ${e?6:14}px">${ok?'':'Правильный ответ: '+ans}</div>${e?`<div style="font-size:15px;margin:0 0 14px;color:var(--tx)">💡 ${e}</div>`:''}${ok&&L.run>=3&&!(S.off||{}).hnt?`<div style="font-size:15px;margin:0 0 14px">🔥 Так держать! ${L.run} верных подряд</div>`:''}<button class="btn ${ok?'':'red'}" onclick="nx()">Продолжить</button></div>`;
}
function nx(){if(L.h<=0)return fail();L.i++;show()}
function fail(){
 $('#app').innerHTML=`<div class="ctr"><div class="big">💔</div><h1>${L.jmp!==undefined?'Испытание не пройдено':L.ex?'Экзамен не сдан':'Жизни закончились'}</h1><p>${L.ex?'Допустимо не больше 2 ошибок. Повтори раздел и приходи снова.':'Не страшно — повтори тему и попробуй ещё раз.'}</p></div><div id="ft"><button class="btn" onclick="${L.id=='mis'?'practice()':L.id=='mix'?'mix()':L.jmp!==undefined?`jump(${L.jmp})`:`start('${L.id}',${L.g?1:0})`}">Попробовать снова</button><button class="btn gh" onclick="home()">Выйти</button></div>`;
}
function fin(){
 snd('win');const mis=L.id=='mis'||L.id=='mix',xp=((L.id=='mix'?10:mis?5:L.ex?30:L.g?25:10)+(L.err==0?5:0))*(Date.now()<(S.bx||0)?2:1),gm=mis?0:L.ex?20:L.g?10:5;let inc=false;
 S.xp+=xp;S.wxp=(S.wxp||0)+xp;S.gem+=gm;S.hist[T(0)]=(S.hist[T(0)]||0)+xp;
 if(L.jmp!==undefined){const od=MODS[U[L.jmp].s].flatMap(m=>m[1]);od.slice(0,od.indexOf(L.jmp)+1).forEach(i=>{for(let j=0;j<4;j++)S.done[i+'-'+j]=1})}
 else if(!mis){if(L.g)S.gold[L.id]=1;else S.done[L.id]=1}
 if(!mis&&!L.g){const ui=L.jmp!==undefined?L.jmp:+L.id.split('-')[0],s=U[ui].s,k=modOf(ui);S.mc=S.mc||{};
  if(k>=0&&modDone(s,k)&&!S.mc[s+'-'+k]){S.mc[s+'-'+k]=1;S.vm=S.vm||{};delete S.vm[s];S.ln=null;S.mdone='🎉 Модуль '+(k+1)+' «'+MODS[s][k][0]+'» пройден!'+(k+1<MODS[s].length?' Открыт следующий модуль.':'')}}
 const q=Q();q.xp+=xp;q.les++;
 if(S.last!==T(0)){S.streak=S.last===T(1)?S.streak+1:1;S.last=T(0);inc=true}
 S.best=Math.max(S.best||0,S.streak);save();sync();
 const acc=Math.round(100*L.n/(L.n+L.err));
 $('#app').innerHTML=`<div class="ctr"><div class="big">${inc?'🔥':L.ex?'🎓':L.g?'👑':'🏆'}</div><h1>${inc?S.streak+' '+dn(S.streak)+' в ударном режиме!':L.jmp!==undefined?'Испытание пройдено!':L.ex?'Экзамен сдан!':L.g?'Золотой уровень!':'Урок пройден!'}</h1><p>${L.jmp!==undefined?'🚀 Раздел и все предыдущие открыты!':L.ex?'🎓 Следующий раздел открыт!':inc?'Занимайся каждый день, чтобы ударный режим рос.':''}</p><div class="st"><div>+${xp}<small>XP</small></div><div>+${gm}💎<small>АЛМАЗЫ</small></div><div>${acc}%<small>ТОЧНОСТЬ</small></div></div></div><div id="ft"><button class="btn" onclick="home()">Продолжить</button></div>`;
}
const dn=n=>n%10==1&&n%100!=11?'день':[2,3,4].includes(n%10)&&![12,13,14].includes(n%100)?'дня':'дней';

// ===== Профиль: серия, неделя, статистика
const EM=['🧑‍🔬','👩‍🔬','🦊','🐼','🐙','🦉','🐸','🤖'],BG=['#ddf4ff','#ffe0e0','#e6ffd0','#f0dcff','#fff3c4'];
const MD=[3,7,14,30,100];
const AC=[['🔥','Ударник','Достигни ударного режима в {n} дн.',[3,7,14,30,100],()=>S.best||0],['⭐','Опытный','Набери {n} XP',[100,500,1000,3000,10000],()=>S.xp],['📘','Ученик','Пройди {n} уроков',[1,5,15,30,60],()=>Object.keys(S.done).length],['🔧','Техник','Исправь {n} ошибок',[5,15,50,100,250],()=>S.fx||0],['👑','Золотой','Пройди {n} уровней на золото',[1,3,8,15],()=>Object.keys(S.gold).length],['🎓','Отличник','Сдай {n} экзаменов',[1,3,6,10],()=>Object.keys(S.done).filter(k=>k.endsWith('-3')).length]];
const lvl=a=>a[3].filter(t=>a[4]()>=t).length;
const bar=(t,l,r)=>`<div class="lh" style="justify-content:space-between"><b style="min-width:70px;font-size:22px;color:var(--mut)" onclick="${l[1]}">${l[0]}</b><b style="font-size:18px;color:var(--mut)">${t}</b><b style="min-width:70px;text-align:right;color:var(--b)" onclick="${r[1]}">${r[0]}</b></div>`;
function prof(){
 tab(9);const b=S.best||0;S.ac=S.ac||{};
 $('#app').innerHTML=bar(S.name||(S.un?'@'+S.un:'Профиль'),['✕','home()'],['⚙️','sett()'])+`<div style="text-align:center;margin-top:8px"><span onclick="ren()">${av('big')}</span>${S.name?`<h2 style="margin:10px 0 0">${S.name}</h2>`:'<div style="color:var(--mut);margin-top:10px">Нажми на аватар, чтобы указать имя</div>'}<div style="color:var(--mut);font-size:13px">${S.un?'@'+S.un+' · ':''}В ХИМБИО С ${S.since}</div></div>
 <div class="mod">Персонаж</div><div style="margin-top:14px">${EM.concat(S.own||[]).map(e=>`<button class="chip" onclick="S.av='${e}';save();prof()">${e}</button>`).join('')}</div><div>${BG.map(c=>`<button class="dot" style="background:${c}" onclick="S.avc='${c}';save();prof()"></button>`).join('')}</div>
 <div class="mod">Друзья</div><div style="margin-top:14px"><span style="color:var(--mut)">${S.tok?'Ты вошёл как @'+S.un:'Войди в аккаунт, чтобы добавлять друзей по @юзернейму'}</span></div><button class="btn" style="margin-top:12px;background:var(--b);box-shadow:0 4px 0 #1899d6" onclick="frs()">👥 Друзья</button>
 <div class="mod">Обзор</div><div class="st" style="margin-top:14px"><div>🔥 ${S.streak}<small>УДАРНЫЙ РЕЖИМ</small></div><div>${b}<small>РЕКОРД</small></div><div>${S.xp}<small>XP</small></div></div><div class="st" style="margin-top:0"><div>${score(0)}<small>ХИМИЯ</small></div><div>${score(1)}<small>БИОЛОГИЯ</small></div><div>${Object.keys(S.done).length}<small>УРОКОВ</small></div></div>
 <div class="mod">Медали</div><div style="margin-top:14px">${MD.map(n=>`<span class="bd ${b>=n?'':'lk'}"><i>🔥</i>${n} дн.</span>`).join('')}</div>
 <div class="mod">Достижения</div><div style="margin-top:14px">${AC.map((a,i)=>{const L=lvl(a);return `<span class="bd ${L?'':'lk'}" onclick="ach(${i})"><i>${a[0]}</i>${a[1]}<br>ур. ${L}${L>(S.ac[i]||0)?' 🎁':''}</span>`}).join('')}</div>`;
}
function ach(i){
 const a=AC[i],v=a[4](),L=lvl(a),c=(S.ac||{})[i]||0,nx=a[3][L];let rw=0;for(let k=c+1;k<=L;k++)rw+=10*k;
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" style="text-align:center" onclick="event.stopPropagation()"><div style="font-size:70px">${a[0]}</div><h2 style="margin:4px 0">${a[1]} · уровень ${L}</h2><div style="color:var(--mut)">${a[2].replace('{n}',nx||a[3][a[3].length-1])}</div>${nx?`<div class="pb"><i style="width:${Math.min(100,v/nx*100)}%"></i></div><small style="color:var(--mut)">${v} / ${nx} · награда за уровень ${L+1}: 💎 ${10*(L+1)}</small>`:'<div style="margin:8px 0">🏆 Максимальный уровень!</div>'}${rw?`<button class="btn gld" style="margin-top:12px" onclick="claim(${i})">Получить награду 💎 ${rw}</button>`:''}<button class="btn gh" onclick="cl()">Закрыть</button></div></div>`;
}
function claim(i){
 const a=AC[i],L=lvl(a),c=(S.ac=S.ac||{})[i]||0;let g=0;for(let k=c+1;k<=L;k++)g+=10*k;
 S.gem+=g;S.ac[i]=L;save();snd('coin');cl();prof();
}
function ren(){ask('Как тебя зовут?',S.name||'',n=>{if(n){S.name=n.slice(0,16);save();prof()}})}
function addFr(){
 ask('Имя друга','',n=>{if(n){S.fr=(S.fr||[]).concat(n.slice(0,16));save();prof();if(navigator.share)navigator.share({title:'ХимБио',text:'Занимайся химией и биологией со мной в ХимБио!',url:location.href}).catch(()=>{})}});
}
// экран «Ударный режим»: календарь, заморозки, напоминания
function strk(){
 tab(9);const d=new Date(),y=d.getFullYear(),m=d.getMonth(),p=n=>String(n).padStart(2,'0'),f=(new Date(y,m,1).getDay()+6)%7,N=new Date(y,m+1,0).getDate();
 let c=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>`<span>${x}</span>`).join('')+'<span></span>'.repeat(f);
 for(let i=1;i<=N;i++){const k=`${y}-${p(m+1)}-${p(i)}`;c+=`<b class="${S.hist[k]?'on':''} ${k===T(0)?'td':''}">${i}</b>`}
 $('#app').innerHTML=`<div class="lh"><button class="x" onclick="home()">✕</button><b style="flex:1;text-align:center;font-size:18px">Ударный режим</b></div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin:14px 0"><div><div style="font-size:72px;line-height:1;color:${S.streak?'#ff9600':'var(--mut)'}">${S.streak}</div><div style="font-size:20px;color:var(--mut)">${dn(S.streak)} в ударе!</div></div><div style="font-size:90px">🔥</div></div>
 <div class="card">❄️ Заморозок: ${S.fz}/2<div style="color:var(--mut);font-size:14px;margin:4px 0 10px">Спасает ударный режим, если пропустишь день</div><button class="btn" onclick="buyFz()">Получить больше · 50 💎</button></div>
 <div class="mod" style="margin-top:22px">Календарь</div><div class="card"><div style="text-align:center;margin-bottom:10px">${d.toLocaleDateString('ru',{month:'long',year:'numeric'})}</div><div class="cal">${c}</div></div>
 <div class="mod" style="margin-top:22px">Напоминания</div><div class="card">Время тренировки <input type="time" id="rt" class="in" style="width:auto;margin-left:8px" value="${S.rt||'19:00'}" onchange="S.rt=this.value;save()"><button class="btn" style="margin-top:12px;background:var(--b);box-shadow:0 4px 0 #1899d6" onclick="addCal()">📅 Добавить в календарь Android</button><button class="btn ${S.notif?'red':''}" style="margin-top:12px" onclick="togNotif()">${S.notif?'🔕 Выключить уведомления':'🔔 Включить уведомления'}</button><div style="color:var(--mut);font-size:13px;margin-top:8px">Уведомления приходят, пока приложение открыто или работает в фоне. Для надёжных ежедневных напоминаний используй календарь.</div></div>`;
}
function addCal(){
 const t=($('#rt').value||'19:00').split(':'),p=n=>String(n).padStart(2,'0'),d=new Date(),e=+t[0]*60+ +t[1]+15;
 S.rt=t.join(':');save();
 const ds=d.getFullYear()+p(d.getMonth()+1)+p(d.getDate());
 const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//HimBio//RU','BEGIN:VEVENT','UID:himbio-daily@local','DTSTAMP:'+ds+'T000000Z','DTSTART:'+ds+'T'+t[0]+t[1]+'00','DTEND:'+ds+'T'+p(Math.floor(e/60)%24)+p(e%60)+'00','RRULE:FREQ=DAILY','SUMMARY:🔥 ХимБио: время тренировки','DESCRIPTION:Пройди урок и сохрани ударный режим!','BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:Пора заниматься','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='himbio.ics';document.body.appendChild(a);a.click();a.remove();
 alert('Открой скачанный файл himbio.ics, чтобы добавить ежедневное напоминание в календарь.');
}
function togNotif(){
 if(S.notif){S.notif=0;save();return strk()}
 if(!window.Notification)return alert('Уведомления не поддерживаются в этом браузере');
 Notification.requestPermission().then(r=>{if(r=='granted'){S.notif=1;S.rt=$('#rt').value||S.rt;save()}else alert('Разрешение на уведомления не выдано');strk()});
}
function chk(){
 if(!S.notif||!window.Notification||Notification.permission!='granted'||S.last===T(0)||S.nl===T(0))return;
 const n=new Date(),r=(S.rt||'19:00').split(':');
 if(n.getHours()*60+n.getMinutes()>=+r[0]*60+ +r[1]){S.nl=T(0);save();try{new Notification('🔥 Ударный режим',{body:'Пройди урок сегодня, чтобы не потерять ударный режим!'})}catch(e){}}
}
function buyFz(){if(S.fz>=2)return alert('Максимум 2 заморозки');if(S.gem<50)return alert('Не хватает алмазов');S.gem-=50;S.fz++;save();strk()}
function inst(){if(window.dp)dp.prompt();else alert('Открой меню браузера → «Добавить на главный экран».')}
function chest(t,o,w){const [c,d]=CH[t];return `<svg viewBox="0 0 120 100" width="${w||70}"><rect x="15" y="45" width="90" height="48" rx="8" fill="${c}" stroke="${d}" stroke-width="5"/>${o?'<ellipse cx="60" cy="47" rx="38" ry="9" fill="#fff6a8"/>':''}<g class="lid ${o?'op':''}"><path d="M15 45Q15 15 60 15Q105 15 105 45Z" fill="${c}" stroke="${d}" stroke-width="5"/></g><rect x="50" y="40" width="20" height="20" rx="4" fill="#fff" stroke="${d}" stroke-width="4"/></svg>`}
// задание дня → сундук: 3 тапа, каждый может улучшить сундук
const qi=()=>((new Date(T(0))/864e5)|0)%3;
let C;
function quests(){
 tab(1);const q=Q(),d=QS[qi()],v=Math.min(q[d[1]],d[2]),ok=v>=d[2];
 $('#app').innerHTML=hdr()+`<div class="qb"><h2>Задания</h2>Выполни задание дня и получи сундук!</div><div class="mod" style="margin-top:24px">Задание дня</div><div class="card qc"><div style="flex:1"><div style="font-size:18px">${d[0]}</div><div class="pb"><i style="width:${v/d[2]*100}%;background:var(--g)"></i></div><small style="color:var(--mut)">${v} / ${d[2]}</small></div><div class="cb" onclick="${ok&&!q.c?'ch()':''}">${chest(0,q.c)}${ok&&!q.c?'<span class="rd">ОТКРЫТЬ</span>':''}</div></div><p style="color:var(--mut);text-align:center">Новое задание каждый день. У сундука 3 попытки улучшить награду.</p>`;
}
function ch(k){C={k,t:0,left:3,done:0,msg:'Тапай по сундуку: он может стать лучше!'};cr()}
function cr(){
 $('#pp').innerHTML=`<div class="ov" style="align-items:center"><div class="ctr2"><div id="cs" class="${C.up?'pop':'shake'}" style="display:inline-block" onclick="op()">${chest(C.t,0,170)}</div><div id="cr" style="min-height:90px;font-size:20px;margin:10px 0">${C.msg}<div style="color:var(--mut);font-size:15px">${C.left?'Попыток: '+C.left:''}</div></div><button class="btn" id="cb2" style="display:none" onclick="cl();C.k?home():quests()">Забрать</button></div></div>`;
}
function op(){
 if(C.done||!C.left)return;
 C.left--;C.up=C.t<2&&Math.random()<.5;
 if(C.up){C.t++;snd('coin')}else snd('tap');
 C.msg=C.up?'⬆️ Сундук улучшен: '+CH[C.t][2]+'!':'Пока без улучшения…';
 cr();
 if(!C.left)setTimeout(()=>{
  C.done=1;const R=[[10,20,.15],[25,40,.3],[50,80,.6]][C.t];let t;
  if(Math.random()<R[2]&&S.fz<2){S.fz++;t='❄️ Заморозка!'}else{const g=R[0]+(Math.random()*(R[1]-R[0]+1)|0);S.gem+=g;t='💎 +'+g}
  if(C.k)S.chs[C.k]=1;else Q().c=1;save();snd('chest');const c=$('#cs');c.className='glow';c.querySelector('.lid').classList.add('op');
  setTimeout(()=>{snd('coin');$('#cr').innerHTML=`${CH[C.t][2]} сундук<br><span class="pop">${t}</span>`;$('#cb2').style.display='block'},550);
 },700);
}
// оценка знаний
function score(s){let p=0;U.forEach((u,i)=>{if(u.s==s)for(let j=0;j<4;j++){const id=i+'-'+j;if(S.done[id])p+=j==3?5:2;if(S.gold[id])p+=2}});return p}
function assess(){
 tab(5);
 $('#app').innerHTML=hdr()+SEC.map((n,s)=>{
  const LV=lv(s),p=score(s),nx=LV.find(l=>p<l[0]),pv=[...LV].reverse().find(l=>p>=l[0]);
  return `<div class="card"><div style="color:var(--mut);font-size:14px">ОЦЕНКА · ${n.toUpperCase()}</div><div style="font-size:56px">${p}</div><div>${pv?pv[1]:'Новичок'}</div>${nx?`<div class="pb"><i style="width:${p/nx[0]*100}%"></i></div><small style="color:var(--mut)">До «${nx[1]}»: ${nx[0]-p}</small>`:'<small>Максимальный уровень 🎉</small>'}<div style="margin-top:12px">${LV.map(l=>`<div style="opacity:${p>=l[0]?1:.4}">${p>=l[0]?'✅':'⚪'} ${l[0]} — ${l[1]}</div>`).join('')}</div></div>`}).join('')+'<p style="color:var(--mut);text-align:center">Урок +2 · золотой уровень +2 · экзамен раздела +5</p>';
}
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),3000)}
window.alert=toast;
let AQ;
function ask(t,v,cb){AQ=cb;$('#pp').innerHTML=`<div class="ov" style="align-items:center"><div class="ctr2" style="text-align:left"><b style="font-size:18px">${t}</b><input id="ai" class="in" style="margin:12px 0" value="${(v||'').replace(/"/g,'&quot;')}"><button class="btn" onclick="const v=$('#ai').value.trim();cl();AQ(v)">OK</button><button class="btn gh" onclick="cl()">Отмена</button></div></div>`;setTimeout(()=>$('#ai').focus(),60)}
function yn(t,d,l,js){$('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()"><b style="font-size:20px">${t}</b><div style="color:var(--mut);margin:8px 0">${d}</div><button class="btn" onclick="cl()">Остаться</button><button class="btn gh" style="color:var(--r)" onclick="cl();${js}">${l}</button></div></div>`}
const qx=()=>yn('Выйти из урока?','Прогресс этого урока не сохранится.','Выйти','home()');
function resetAll(){S={xp:0,streak:0,best:0,last:'',done:{},hist:{},sec:0,gem:0,fz:0,gold:{},jmp:{},since:T(0)};save();location.reload()}
// плашка текущего модуля и раздела: меняется при прокрутке
function sbUpd(){
 const sb=$('#sb');if(!sb)return;const th=$('.top').offsetHeight;let c=null;
 const jb=$('#jb'),t0=document.querySelector(`[data-id="${S.ln}"]`)||$('.cur');
 if(jb){if(t0){const r=t0.getBoundingClientRect();if(r.bottom<th){jb.textContent='↑';jb.style.display='block'}else if(r.top>innerHeight-90){jb.textContent='↓';jb.style.display='block'}else jb.style.display='none'}else jb.style.display='none'}
 document.querySelectorAll('.ban[data-t]').forEach(b=>{if(b.getBoundingClientRect().top<=th+6)c=b});
 if(c){sb.style.background=c.style.background;sb.style.boxShadow=c.style.boxShadow;sb.innerHTML=c.innerHTML;sb.style.display='block'}else sb.style.display='none';
}
addEventListener('scroll',sbUpd,{passive:true});
// ===== Аккаунт, друзья, онлайн-лиги (сервер на Val Town)
const API='https://eldarjzj--9f5321fcd84b11f1a5351607ee4eb77e.web.val.run';
const pwf=(id,ph)=>`<div class="pw"><input id="${id}" type="password" class="in" placeholder="${ph}" autocapitalize="off"><span onclick="eye('${id}')">👁</span></div>`;
const eye=id=>{const e=$('#'+id);e.type=e.type=='password'?'text':'password'};
function pe(){
 if(!S.tok)return acc();
 tab(9);
 $('#app').innerHTML=bar('Профиль',['←','sett()'],['',''])+`<div style="text-align:center;margin:10px">${av('big')}<div style="color:var(--b);margin-top:8px" onclick="prof()">ИЗМЕНИТЬ АВАТАР</div></div><div class="lst">${[['Имя пользователя','@'+S.un,'chUn()'],['Пароль','••••••••','pwScr()'],['Электронная почта',S.em||'—','']].map(r=>`<div class="rw" onclick="${r[2]}"><span>${r[0]}</span><span style="color:var(--mut)">${r[1]}</span></div>`).join('')}</div><div class="lst" style="margin-top:16px">${[['🔄 Синхронизировать',"syncNow().then(()=>toast('Синхронизировано'))"],['⬇️ Загрузить прогресс с сервера','pull()'],['👥 Друзья','frs()'],['ЭКСПОРТИРОВАТЬ ДАННЫЕ','exp_()']].map(r=>`<div class="rw" style="color:var(--b)" onclick="${r[1]}">${r[0]}</div>`).join('')}</div><div class="lst" style="margin-top:16px"><div class="rw" style="color:var(--r)" onclick="yn('Выйти из аккаунта?','Прогресс останется на сервере.','Выйти','S.tok=\\'\\';S.un=\\'\\';save();sett()')">ВЫЙТИ</div></div>`;
}
function chName(){ask('Новое имя',S.name||'',n=>{if(n){S.name=n.slice(0,16);save();syncNow();pe()}})}
function chUn(){
 if(!S.tok){toast('Сначала войди в аккаунт');return acc()}
 ask('Новый юзернейм (@…)','@'+S.un,async u=>{u=u.replace(/^@/,'').toLowerCase();if(!u||u==S.un)return;try{await api('/rename',{t:S.tok,u});S.un=u;save();toast('Юзернейм изменён');pe()}catch(e){toast(e.message)}});
}
function pwScr(){
 if(!S.tok){toast('Сначала войди в аккаунт');return acc()}
 tab(9);$('#app').innerHTML=bar('Пароль',['←','pe()'],['',''])+`<div class="card">${pwf('po','Текущий пароль')}<div style="height:10px"></div>${pwf('pn','Новый пароль (от 6 символов)')}<div style="height:10px"></div>${pwf('pc2','Повтори новый пароль')}<button class="btn" style="margin-top:14px" onclick="chPw()">Сохранить</button></div>`;
}
async function chPw(){
 const o=$('#po').value,n=$('#pn').value,c2=$('#pc2').value;
 if(n.length<6)return toast('Пароль не короче 6 символов');if(n!==c2)return toast('Пароли не совпадают');
 try{await api('/passwd',{t:S.tok,o,n});toast('Пароль изменён');pe()}catch(e){toast(e.message)}
}
async function api(p,b){
 let r;try{r=await fetch(API+p,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(b||{})})}catch(e){throw new Error('Нет связи с сервером. Проверь интернет или VPN')}
 const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.e||'Ошибка сервера ('+r.status+')');return j;
}
async function ping(){try{const r=await fetch(API+'/ping');toast(r.ok?'Сервер доступен ✅':'Сервер ответил: '+r.status)}catch(e){toast('Нет связи с сервером ❌')}}
let st;function sync(){if(!S.tok)return;clearTimeout(st);st=setTimeout(syncNow,3000)}
async function syncNow(){
 if(!S.tok)return;const b={...S};delete b.tok;
 try{await api('/sync',{t:S.tok,d:{xp:S.xp,streak:S.streak,best:S.best||0,wxp:S.wxp||0,wk:S.wk,lg:S.lg||0,av:S.av||'🧑‍🔬',avc:S.avc||'#ddf4ff',name:S.name||S.un},b:JSON.stringify(b)})}catch(e){}
}
let AM='in';
function un(el){if(AM=='up'){const v=el.value.replace(/@/g,'').toLowerCase();el.value=v?'@'+v:''}}
function acc(){
 tab(9);const B=bar('Аккаунт',['←','sett()'],['','']);
 $('#app').innerHTML=B+(S.tok?`<div class="card" style="text-align:center">${av('big')}<h2>@${S.un}</h2><button class="btn" onclick="syncNow().then(()=>toast('Синхронизировано'))">🔄 Синхронизировать</button><button class="btn" style="margin-top:10px;background:var(--b);box-shadow:0 4px 0 #1899d6" onclick="pull()">⬇️ Загрузить прогресс с сервера</button><button class="btn gh" style="color:var(--r)" onclick="S.tok='';S.un='';save();acc()">Выйти</button></div><div class="card" onclick="frs()">👥 Друзья</div>`:`<div class="tabs"><button class="${AM=='in'?'on':''}" onclick="AM='in';acc()">Вход</button><button class="${AM=='up'?'on':''}" onclick="AM='up';acc()">Регистрация</button></div><div class="card">${AM=='up'?'<input id="ae" class="in" type="email" placeholder="Почта" autocapitalize="off">':''}<input id="an" class="in" style="margin-top:10px" placeholder="${AM=='up'?'@юзернейм':'@юзернейм или почта'}" autocapitalize="off" oninput="un(this)"><div style="margin-top:10px">${pwf('ap','Пароль (от 6 символов)')}</div>${AM=='up'?`<div style="margin-top:10px">${pwf('ap2','Повтори пароль')}</div>`:''}<button class="btn" style="margin-top:12px" onclick="auth()">${AM=='up'?'Создать аккаунт':'Войти'}</button><div style="color:var(--mut);font-size:13px;margin-top:10px">Юзернейм уникален: по нему друзья найдут тебя. Если он занят, придумай другой.</div><button class="btn gh" onclick="ping()">Проверить связь с сервером</button></div>`);
}
async function auth(){
 const id=$('#an').value.trim().toLowerCase().replace(/^@/,''),p=$('#ap').value;
 if(AM=='up'&&p!==$('#ap2').value)return toast('Пароли не совпадают');
 try{const r=AM=='up'?await api('/register',{u:id,e:$('#ae').value.trim().toLowerCase(),p}):await api('/login',{id,p});
  S.tok=r.t;S.un=r.u;S.em=r.e||S.em;if(r.b){const o=JSON.parse(r.b);if((o.xp||0)>S.xp)S={...o,tok:S.tok,un:S.un}}
  save();await syncNow();toast('Готово!');pe();
 }catch(e){toast(e.message)}
}
async function pull(){
 try{const r=await api('/pull',{t:S.tok});if(!r.b)return toast('На сервере пока нет данных');S={...JSON.parse(r.b),api:S.api,tok:S.tok,un:S.un};save();toast('Прогресс загружен');home()}catch(e){toast(e.message)}
}
async function frs(){
 if(!S.tok){toast('Сначала войди в аккаунт (Настройки → Аккаунт)');return acc()}
 tab(9);const B=bar('Друзья',['←','prof()'],['➕','addF()']);$('#app').innerHTML=B+'<div class="card">Загрузка…</div>';
 try{await syncNow();const r=await api('/friends',{t:S.tok});
  $('#app').innerHTML=B+(r.in.length?'<h3>Заявки</h3>'+r.in.map(x=>`<div class="card qc"><span style="flex:1">${x.av} ${x.name||x.u} <small style="color:var(--mut)">@${x.u}</small></span><button class="btn" style="width:auto;padding:8px 14px" onclick="acf('${x.u}')">Принять</button></div>`).join(''):'')+'<h3>Друзья</h3>'+(r.f.map(x=>`<div class="card qc"><span style="font-size:30px">${x.av}</span><span style="flex:1"><b>${x.name||x.u}</b><br><small style="color:var(--mut)">@${x.u}</small></span><span>🔥 ${x.streak} · ${x.xp} XP</span></div>`).join('')||'<div class="card" style="color:var(--mut)">Пока никого. Нажми ➕ и введи ник друга.</div>');
 }catch(e){toast(e.message)}
}
function addF(){ask('Юзернейм друга (@…)','@',async u=>{u=u.replace(/^@/,'');if(!u)return;try{await api('/add',{t:S.tok,u});toast('Заявка отправлена');frs()}catch(e){toast(e.message)}})}
async function acf(u){try{await api('/accept',{t:S.tok,u});frs()}catch(e){toast(e.message)}}
async function lgNet(){
 const h=hdr();$('#app').innerHTML=h+'<h2 style="margin:16px 0">Лига</h2><div class="card">Загрузка…</div>';
 try{await syncNow();const r=await api('/league',{t:S.tok,lg:S.lg||0,wk:wk()}),i=r.l.findIndex(x=>x.me);S.lr=i<0?0:i+1;save();
  $('#app').innerHTML=h+`<h2 style="margin:16px 0 0">${LG[S.lg||0]} лига ${LI[S.lg||0]}</h2><div style="color:var(--mut)">⏱ до конца недели: ${7-dw()} дн. · игроки онлайн</div>`+r.l.map((x,k)=>`<div class="card" style="display:flex;gap:12px;margin:6px 0;padding:10px 14px;${x.me?'border-color:var(--b);background:rgba(28,176,246,.1)':''}"><b style="width:26px;color:${k<10?'var(--g)':'var(--mut)'}">${k+1}</b><span style="flex:1">${x.av} ${x.name||x.u}</span><span>${x.wxp} XP</span></div>`).join('');
 }catch(e){toast(e.message)}
}
setInterval(chk,30000);chk();
// ===== Лиги (соперники — симуляция без сервера)
const LG=['Бронзовая','Серебряная','Золотая','Сапфировая','Рубиновая','Изумрудная','Аметистовая','Жемчужная','Обсидиановая','Бриллиантовая'],LI=['🥉','🥈','🥇','🔷','♦️','💚','🔮','🦪','⚫','💎'];
const NM=['Айдар','Мария','Олег','Света','Тимур','Лена','Даниил','Аня','Руслан','Катя','Игорь','Ника','Артём','Зарина','Макс','Юля','Фаиль','Вика','Эмиль','Оля','Павел','Дина','Стас','Рита','Ильяс','Полина','Глеб','Лиза','Камиль'];
const wk=()=>Math.floor(new Date(T(0))/864e5/7),rd=x=>{x=Math.sin(x)*1e4;return x-Math.floor(x)},dw=()=>(new Date().getDay()+6)%7;
function board(w,full){const f=full?1:(dw()+1)/7;return NM.map((n,i)=>({n,x:Math.floor(rd(w*50+i+1)*(150+(S.lg||0)*60)*f)})).concat([{n:S.name||'Ты',x:S.wxp||0,me:1}]).sort((a,b)=>b.x-a.x)}
function league(){
 tab(2);if(S.tok)return lgNet();const L0=S.lg||0;
 $('#app').innerHTML=hdr()+`<h2 style="margin:16px 0 0">${LG[L0]} лига</h2><div style="color:var(--mut)">⏱ до конца недели: ${7-dw()} дн.</div><div style="margin:12px 0;text-align:center">${LI.map((x,i)=>i<L0-1||i>L0+2?'':`<span style="font-size:${i==L0?64:38}px;opacity:${i>L0?.35:1};margin:0 8px">${x}</span>`).join('')}</div>${S.wxp?'':'<div class="warn" style="background:rgba(28,176,246,.15);color:var(--b)">Пройди урок, чтобы войти в недельный рейтинг</div>'}<div style="color:var(--mut);font-size:13px">Топ-10 переходят в следующую лигу, последние 5 вылетают</div>`+board(wk()).map((x,i)=>`<div class="card" style="display:flex;gap:12px;margin:6px 0;padding:10px 14px;${x.me?'border-color:var(--b);background:rgba(28,176,246,.1)':''}"><b style="width:26px;color:${i<10?'var(--g)':i>=25?'var(--r)':'var(--mut)'}">${i+1}</b><span style="flex:1">${x.me?S.av||'🧑‍🔬':'👤'} ${x.n}</span><span>${x.x} XP</span></div>`).join('');
}
// ===== Лента новостей (случайные свежие события)
function feed(){
 tab(3);const dy=Math.floor(new Date(T(0))/864e5),SB=['химии','биологии'];
 const it=[...Array(12)].map((_,i)=>{const r=rd(dy*20+i),n=NM[(dy*7+i*5)%NM.length],v=5+(r*60|0),t=(i+dy)%5,u=U[(r*U.length)|0];
  return [['🏅',`достиг(ла) оценки ${v} по ${SB[(r*10|0)%2]}`],['📘',`прошёл(ла) раздел «${u.n}»`],['👑',`получил(а) золотой уровень в теме «${u.n}»`],['🎓',`сдал(а) экзамен раздела «${u.n}»`],['🔥',`держит ударный режим ${v} дн.`]][t].concat([n,i*2+1,'k'+dy+'-'+i,3+(r*20|0)])});
 S.lk=S.lk||{};
 $('#app').innerHTML=hdr()+'<h2 style="margin:16px 0">Лента новостей</h2>'+(S.streak?`<div class="card">${S.av||'🧑‍🔬'} <b>Ты</b> держишь ударный режим ${S.streak} дн. 🔥</div>`:'')+it.map(x=>`<div class="card"><div>${x[0]} <b>${x[2]}</b> <span style="color:var(--mut);font-size:13px">· ${x[3]} ч назад</span></div><div style="margin:6px 0">${x[1]}</div><button class="chip" style="font-size:15px;padding:6px 12px" onclick="S.lk['${x[4]}']=!S.lk['${x[4]}'];save();feed()">${S.lk[x[4]]?'❤️':'🤍'} ${x[5]+(S.lk[x[4]]?1:0)}</button></div>`).join('');
}
// ===== Магазин
const AV2=['👨‍🚀','🧙','🦄','🐉','🥷','🧛'];
function shop(){
 tab(4);const bx=(S.bx||0)>Date.now()?` · активно ещё ${Math.ceil((S.bx-Date.now())/6e4)} мин`:'';
 const row=(i,t,d,c,k)=>`<div class="card qc"><div style="font-size:42px">${i}</div><div style="flex:1"><b>${t}</b><div style="color:var(--mut);font-size:14px">${d}</div></div><button class="btn" style="width:auto;padding:10px 14px" onclick="buy('${k}',${c})">💎 ${c}</button></div>`;
 $('#app').innerHTML=hdr()+'<h2 style="margin:16px 0">Магазин</h2><div class="mod">Ударный режим</div>'+row('❄️','Заморозка',`Спасает от пропуска дня. У тебя: ${S.fz}/2`,50,'fz')+'<div class="mod" style="margin-top:18px">Усиления</div>'+row('⚗️','Бонусный опыт ×2','Двойной XP на 15 минут'+bx,40,'bx')+'<div class="mod" style="margin-top:18px">Костюмы персонажа</div>'+AV2.map(a=>(S.own||[]).includes(a)?`<div class="card">${a} Куплено</div>`:row(a,'Новый аватар','Появится в профиле',60,a)).join('')+'<div class="mod" style="margin-top:18px">Промокод</div><div class="card" onclick="promo()">🎟 Активировать промокод</div>';
}
function buy(k,c){
 if(S.gem<c)return alert('Не хватает алмазов 💎');
 if(k=='fz'){if(S.fz>=2)return alert('Максимум 2 заморозки');S.fz++}
 else if(k=='bx')S.bx=Math.max(Date.now(),S.bx||0)+9e5;
 else{S.own=(S.own||[]).concat(k);S.av=k}
 S.gem-=c;save();snd('coin');shop();
}
function promo(){
 ask('Промокод','',c=>{c=c.toUpperCase();const P={HIMBIO:50,CHEM:30,BIO:30};S.pc=S.pc||[];
  if(!P[c])return alert('Неверный промокод');if(S.pc.includes(c))return alert('Уже использован');
  S.pc.push(c);S.gem+=P[c];save();snd('coin');shop()});
}
// ===== «Ещё»: центр практики, таблица, настройки
function more(){
 tab(5);
 $('#pp').innerHTML=`<div class="ov" onclick="cl()"><div class="sheet" onclick="event.stopPropagation()">${[['🏋️','Центр практики','prac()'],['🧪','Таблица Менделеева','ptab()'],['📊','Оценка знаний','assess()']].map(r=>`<div class="card" style="margin:8px 0;font-size:18px" onclick="cl();${r[2]}">${r[0]} ${r[1]}</div>`).join('')}</div></div>`;
}
function prac(){
 tab(5);
 $('#app').innerHTML=hdr()+`<div class="qb" style="background:#1cb0f6"><h2>Тренировка</h2>Отрабатывай ошибки и закрепляй пройденное</div><div class="card" style="margin-top:16px">Смешанная тренировка<button class="btn" style="margin-top:10px;background:var(--b);box-shadow:0 4px 0 #1899d6" onclick="mix()">Начать: +10 XP</button></div><div class="mod" style="margin-top:20px">Отработка навыков</div><div class="card" style="margin-top:14px;font-size:18px" onclick="practice()">🔁 Ошибки <b style="float:right;color:#ff9600">${(S.mis||[]).length}</b></div><div class="card" style="font-size:18px" onclick="ptab()">🧪 Таблица Менделеева</div>`;
}
function mix(){
 const q=U.flatMap((u,i)=>u.s==S.sec&&[0,1,2].some(j=>S.done[i+'-'+j])?u.q.map((q,n)=>({q,k:i+'.'+n})):[]);
 if(!q.length)return alert('Сначала пройди хотя бы один урок');
 begin('mix',sh(q).slice(0,8));
}
const EL='H|Водород|1|1,008|н;He|Гелий|2|4,003|г;Li|Литий|3|6,94|м;Be|Бериллий|4|9,012|м;B|Бор|5|10,81|н;C|Углерод|6|12,01|н;N|Азот|7|14,01|н;O|Кислород|8|16,00|н;F|Фтор|9|19,00|н;Ne|Неон|10|20,18|г;Na|Натрий|11|22,99|м;Mg|Магний|12|24,31|м;Al|Алюминий|13|26,98|м;Si|Кремний|14|28,09|н;P|Фосфор|15|30,97|н;S|Сера|16|32,06|н;Cl|Хлор|17|35,45|н;Ar|Аргон|18|39,95|г;K|Калий|19|39,10|м;Ca|Кальций|20|40,08|м;Fe|Железо|26|55,85|м;Cu|Медь|29|63,55|м;Zn|Цинк|30|65,38|м;Br|Бром|35|79,90|н;Ag|Серебро|47|107,87|м;I|Иод|53|126,90|н;Au|Золото|79|196,97|м;Hg|Ртуть|80|200,59|м;Pb|Свинец|82|207,2|м;U|Уран|92|238,03|м'.split(';').map(x=>x.split('|'));
const CL={'м':'#1cb0f6','н':'#58cc02','г':'#ce82ff'};
function ptab(){
 tab(5);
 $('#app').innerHTML=hdr()+`<div class="lh"><button class="x" onclick="prac()">✕</button><b style="flex:1;text-align:center;font-size:18px">Таблица Менделеева</b></div><button class="btn" style="margin:6px 0 14px;background:var(--b);box-shadow:0 4px 0 #1899d6" onclick="fnd()">🎯 Найди элемент</button><div id="ed" class="card" style="min-height:76px">Нажми на элемент. <span style="color:#1cb0f6">■ металлы</span> <span style="color:#58cc02">■ неметаллы</span> <span style="color:#ce82ff">■ благородные газы</span></div><div class="el">${EL.map((e,i)=>`<button class="e" style="border-color:${CL[e[4]]}" onclick="ei(${i})"><small>${e[2]}</small><b>${e[0]}</b></button>`).join('')}</div>`;
}
function ei(i){const e=EL[i];snd('tap');$('#ed').innerHTML=`<b style="font-size:22px">${e[0]} · ${e[1]}</b><br>Порядковый номер: ${e[2]}<br>Атомная масса: ${e[3]}<br>${{'м':'Металл','н':'Неметалл','г':'Благородный газ'}[e[4]]}`}
let F;
function fnd(){F={n:0,ok:0};fq()}
function fq(){
 F.t=Math.random()*EL.length|0;
 $('#app').innerHTML=hdr()+`<div class="lh"><button class="x" onclick="ptab()">✕</button><div class="bar"><i style="width:${F.n*10}%"></i></div></div><div class="q">Найди: ${EL[F.t][1]} (${F.n+1}/10)</div><div class="el">${EL.map((e,i)=>`<button class="e" style="border-color:${CL[e[4]]}" onclick="fa(${i})"><b>${e[0]}</b></button>`).join('')}</div>`;
}
function fa(i){
 const ok=i==F.t;snd(ok?'ok':'no');F.n++;if(ok)F.ok++;
 if(F.n>=10){S.gem+=F.ok;S.xp+=F.ok*2;save();alert(`Верно: ${F.ok}/10 · +${F.ok} 💎`);return ptab()}
 fq();
}
function sett(){
 tab(9);
 $('#app').innerHTML=bar('Настройки',['',''],['ГОТОВО','prof()'])+`<h3>Аккаунт</h3><div class="lst">${[['Параметры','sp()'],['Профиль','pe()'],['Уровень знаний','lvAsk()'],['Уведомления','sn()'],['Оценка знаний','assess()'],['Экспорт прогресса','exp_()'],['Импорт прогресса','imp()'],['Установить как приложение','inst()']].map(r=>`<div class="rw" onclick="${r[1]}">${r[0]}<span>›</span></div>`).join('')}</div><h3>Поддержка</h3><div class="lst"><div class="rw" onclick="alert('Проходи уроки по порядку, сдавай экзамены разделов, открывай сундуки и держи ударный режим каждый день.')">Справочный центр<span>›</span></div><div class="rw" onclick="fb()">Отправить отзыв<span>›</span></div></div><button class="btn gh" style="margin-top:24px;color:var(--r)" onclick="yn('Сбросить прогресс?','Все данные будут стёрты.','Сбросить','resetAll()')">Сбросить прогресс</button>`;
}
function sp(){
 const on=k=>k=='mute'?!S.mute:!(S.off||{})[k];tab(9);
 $('#app').innerHTML=bar('Параметры',['←','sett()'],['',''])+'<h3>Учебный процесс</h3><div class="lst">'+[['Звуковые эффекты','mute'],['Вибрация','vib'],['Анимация','anm'],['Мотивирующие подсказки','hnt']].map(r=>`<div class="rw" onclick="tg('${r[1]}')">${r[0]}<span class="sw ${on(r[1])?'on':''}"></span></div>`).join('')+`<div class="rw" onclick="th()">Тема<span style="color:var(--mut)">${{a:'авто',l:'светлая',d:'тёмная'}[S.th||'a']}</span></div></div>`;
}
function tg(k){if(k=='mute')S.mute=!S.mute;else{S.off=S.off||{};S.off[k]=!S.off[k]}save();ath();snd('ok');sp()}
function sn(){strk();setTimeout(()=>$('#rt').scrollIntoView(),60)}
function fb(){ask('Что улучшить в приложении?','',t=>{if(t){S.fbk=(S.fbk||[]).concat(t);save();alert('Спасибо! Отзыв сохранён.')}})}
function th(){S.th={a:'l',l:'d',d:'a'}[S.th||'a'];save();ath();sp()}
function ath(){document.documentElement.dataset.th=S.th||'a';document.body.classList.toggle('noanim',!!(S.off||{}).anm)}
function exp_(){const c=btoa(unescape(encodeURIComponent(JSON.stringify(S))));navigator.clipboard?navigator.clipboard.writeText(c).then(()=>alert('Код скопирован. Сохрани его в заметках.'),()=>ask('Скопируй код',c,()=>{})):ask('Скопируй код',c,()=>{})}
function imp(){ask('Вставь код прогресса','',c=>{if(!c)return;try{S=JSON.parse(decodeURIComponent(escape(atob(c))));save();location.reload()}catch(e){alert('Неверный код')}})}
// смена недели: повышение/понижение в лиге
if(S.wk!==undefined&&S.wk!==wk()&&S.wxp>0){const r=S.tok&&S.lr?S.lr:board(S.wk,1).findIndex(x=>x.me)+1;if(r<=10)S.lg=Math.min(LG.length-1,(S.lg||0)+1);else if(r>=26)S.lg=Math.max(0,(S.lg||0)-1)}
if(S.wk!==wk()){S.wk=wk();S.wxp=0;save()}
ath();document.addEventListener('visibilitychange',()=>{save();sync()});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});

home();
