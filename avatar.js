// ===== Nerdlingo: конструктор аватара (SVG) и профильный фон
(()=>{
const SK=['#6b3a37','#7b4a41','#8a4b24','#9a5242','#9b5d2e','#a5694c','#b86e45','#c5775c','#df8e72','#e59d65','#f2a07f','#fdb49e','#fdc4b4','#fecba3','#ffe0d6'];
const HC=['#2b2b2b','#4a3728','#6b4423','#a0622d','#d9a441','#f2d07a','#c0392b','#e8e8e8','#8e8e93','#8e44ad','#2e86de','#27ae60'];
const SC=['#f2c93b','#ff4b4b','#1cb0f6','#58cc02','#a560e8','#ff9600','#ff7eb6','#37464f','#ffffff','#2d6a4f','#8d5524','#1f2937'];
const BGS=['#ddf4ff','#ffe0e0','#e6ffd0','#f0dcff','#fff3c4','#ffd9a8','#c9f2ec','#ffd6ec','#ffffff','#1cb0f6','#58cc02','#ff9600','#a560e8','#ff4b4b','#37464f','#131f24'];
const KS=['sk','hd','ey','br','mo','hr','hc','gl','bd','ht','hk','sh','sc'];
const N={hd:4,ey:6,br:6,mo:6,hr:9,gl:5,bd:5,ht:7,sh:7};
const AD={sk:12,hd:0,ey:0,br:1,mo:0,hr:1,hc:1,gl:0,bd:0,ht:0,hk:2,sh:3,sc:2};
const LM={sk:SK.length,hc:HC.length,hk:SC.length,sc:SC.length,...N};
const I='#3c3c3c';
let AU=0,D={},ET=1,EC=0;

function shd(h,p){const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=p<0?0:255,t=Math.abs(p);r=Math.round((f-r)*t+r);g=Math.round((f-g)*t+g);b=Math.round((f-b)*t+b);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
function lum(h){const n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255}
const hex=s=>/^#[0-9a-f]{6}$/i.test(s||'');
const iv=(P,k)=>{const v=+P[k];return v>=0&&v<LM[k]?v|0:AD[k]};

// ---------- сам рисунок
function avSvg(P,o){
 o=o||{};P=P||{};
 const p={};KS.forEach(k=>p[k]=iv(P,k));
 const id='ac'+(++AU);
 const sk=SK[p.sk],sd=shd(sk,-.1),hc=HC[p.hc],hk=SC[p.hk],sc=SC[p.sc];
 const [x,t,w,h,r]=[[56,38,88,104,26],[54,40,92,102,46],[60,30,80,118,40],[48,48,104,92,34]][p.hd];
 const a=x,b=x+w,bt=t+h,ey=t+h*.47,my=t+h*.8,ny=t+h*.62;
 // волосы
 const S1=`M${a-3} ${t+36}C${a-8} ${t-14} ${b+8} ${t-14} ${b+3} ${t+36}C${b-6} ${t+14} ${b-20} ${t+10} 100 ${t+12}C${a+20} ${t+10} ${a+6} ${t+14} ${a-3} ${t+36}Z`;
 const F=d=>`<path d="${d}" fill="${hc}"/>`;
 let HB='',HF='';
 switch(p.hr){
  case 1:HF=F(S1);break;
  case 2:HF=`<path d="M${a+1} ${t+28}Q${a-1} ${t-2} 100 ${t-2}Q${b+1} ${t-2} ${b-1} ${t+28}Q100 ${t+6} ${a+1} ${t+28}Z" fill="${hc}" opacity=".8"/>`;break;
  case 3:HB=F(`M${a-8} ${t+34}Q${a-14} ${t-14} 100 ${t-12}Q${b+14} ${t-14} ${b+8} ${t+34}L${b+16} ${t+138}L${a-16} ${t+138}Z`);HF=F(S1);break;
  case 4:HB=`<circle cx="100" cy="${t-14}" r="17" fill="${hc}"/>`;HF=F(S1);break;
  case 5:{let c='';for(let i=0;i<7;i++)c+=`<circle cx="${a-6+i*(w+12)/6}" cy="${t+(i%2?4:-1)}" r="17" fill="${hc}"/>`;c+=`<circle cx="${a-5}" cy="${t+30}" r="13" fill="${hc}"/><circle cx="${b+5}" cy="${t+30}" r="13" fill="${hc}"/>`;HF=c;break}
  case 6:HF=F(`M88 ${t+8}Q90 ${t-34} 100 ${t-40}Q110 ${t-34} 112 ${t+8}Z`);break;
  case 7:HB=F(`M${a-6} ${t+30}Q${a-12} ${t-10} 100 ${t-10}Q${b+12} ${t-10} ${b+6} ${t+30}L${b+8} ${t+86}Q${b+8} ${t+96} ${b-4} ${t+94}L${a+4} ${t+94}Q${a-8} ${t+96} ${a-8} ${t+86}Z`);HF=F(`M${a-4} ${t+40}C${a-8} ${t-14} ${b+8} ${t-14} ${b+4} ${t+40}L${b+4} ${t+22}Q100 ${t+30} ${a-4} ${t+22}Z`);break;
  case 8:HF=F(`M${a-3} ${t+38}C${a-6} ${t-12} ${b+6} ${t-18} ${b+3} ${t+30}C${b-2} ${t+8} ${a+50} ${t+2} ${a+16} ${t+22}C${a+8} ${t+26} ${a+2} ${t+32} ${a-3} ${t+38}Z`);break;
 }
 // одежда
 const sp='M18 200L26 176Q32 152 64 150L136 150Q168 152 174 176L182 200Z';
 let SH='';
 switch(p.sh){
  case 0:SH=`<path d="${sp}" fill="${sc}"/><path d="M82 150Q100 178 118 150Z" fill="${sd}"/>`;break;
  case 1:SH=`<path d="${sp}" fill="${sc}"/><rect x="80" y="138" width="40" height="22" rx="10" fill="${shd(sc,-.12)}"/>`;break;
  case 2:SH=`<path d="${sp}" fill="${sc}"/><path d="M66 152Q100 132 134 152L140 166Q100 184 60 166Z" fill="${shd(sc,-.15)}"/><path d="M84 150Q100 170 116 150Z" fill="${sd}"/><path d="M92 170V190M108 170V190" stroke="${shd(sc,.6)}" stroke-width="3" stroke-linecap="round"/>`;break;
  case 3:SH=`<path d="${sp}" fill="#f4f7fa"/><path d="M82 150L100 190L118 150Z" fill="${sc}"/><path d="M82 150Q100 168 118 150Z" fill="${sd}"/><path d="M82 150L92 192L62 200L58 160Z" fill="#dfe6ec"/><path d="M118 150L108 192L138 200L142 160Z" fill="#dfe6ec"/><rect x="138" y="176" width="22" height="18" rx="3" fill="none" stroke="#c6d0d9" stroke-width="2"/>`;break;
  case 4:SH=`<defs><clipPath id="${id}"><path d="${sp}"/></clipPath></defs><path d="${sp}" fill="${sc}"/><g clip-path="url(#${id})" fill="${shd(sc,.5)}"><rect x="0" y="166" width="200" height="8"/><rect x="0" y="184" width="200" height="8"/></g><path d="M82 150Q100 178 118 150Z" fill="${sd}"/>`;break;
  case 6:SH=`<path d="${sp}" fill="#25252d"/><path d="M80 150L100 192L120 150Z" fill="#fff"/><path d="M80 150Q100 166 120 150Z" fill="${sd}"/><path d="M80 150L100 192L84 200L50 200L58 160Z" fill="#17171c"/><path d="M120 150L100 192L116 200L150 200L142 160Z" fill="#17171c"/><path d="M100 156L86 149L86 163Z M100 156L114 149L114 163Z" fill="#111"/><circle cx="100" cy="156" r="3.2" fill="#2d2d36"/><circle cx="100" cy="172" r="2" fill="#bbb"/><circle cx="100" cy="182" r="2" fill="#bbb"/>`;break;
  case 5:SH=`<path d="${sp}" fill="${sc}"/><path d="M86 150Q100 172 114 150Z" fill="${sd}"/><path d="M82 150L100 172L118 150L128 156L100 186L72 156Z" fill="${shd(sc,.55)}"/>`;break;
 }
 // глаза / брови / рот
 const E=(cx,s)=>{
  const wh=`<ellipse cx="${cx}" cy="${ey}" rx="9" ry="10" fill="#fff"/>`;
  switch(p.ey){
   case 0:return wh+`<circle cx="${cx+1}" cy="${ey+1}" r="5" fill="${I}"/>`;
   case 1:return `<path d="M${cx-9} ${ey+3}Q${cx} ${ey-10} ${cx+9} ${ey+3}" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`;
   case 2:return wh+`<circle cx="${cx+1}" cy="${ey+3}" r="5" fill="${I}"/><path d="M${cx-9} ${ey}A9 10 0 0 1 ${cx+9} ${ey}Z" fill="${shd(sk,-.08)}"/>`;
   case 3:return s==2?`<path d="M${cx-9} ${ey}Q${cx} ${ey+9} ${cx+9} ${ey}" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`:wh+`<circle cx="${cx+1}" cy="${ey+1}" r="5" fill="${I}"/>`;
   case 4:return `<ellipse cx="${cx}" cy="${ey}" rx="10" ry="12" fill="#fff"/><circle cx="${cx+1}" cy="${ey+1}" r="7" fill="${I}"/><circle cx="${cx+3}" cy="${ey-2}" r="2.5" fill="#fff"/>`;
   default:return `<circle cx="${cx}" cy="${ey}" r="5.5" fill="${I}"/>`;
  }};
 const by=ey-17,bc=p.hr?hc:shd(sk,-.35);
 const BR=['',`M68 ${by}L92 ${by}M108 ${by}L132 ${by}`,`M68 ${by+4}L92 ${by-3}M108 ${by-3}L132 ${by+4}`,`M68 ${by}L92 ${by}M108 ${by}L132 ${by}`,`M68 ${by-3}L92 ${by+4}M108 ${by+4}L132 ${by-3}`,`M68 ${by+3}L92 ${by+3}M108 ${by-1}Q120 ${by-12} 132 ${by-1}`][p.br];
 const smile=`<path d="M84 ${my}Q100 ${my+14} 116 ${my}" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`;
 const MO=[smile,
  `<path d="M82 ${my-2}Q100 ${my+22} 118 ${my-2}Z" fill="#8b2c2c"/><ellipse cx="100" cy="${my+8}" rx="8" ry="3.5" fill="#ff7a7a"/>`,
  `<path d="M88 ${my+2}L112 ${my+2}" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,
  `<path d="M86 ${my+2}Q104 ${my+4} 116 ${my-6}" fill="none" stroke="${I}" stroke-width="4" stroke-linecap="round"/>`,
  `<ellipse cx="100" cy="${my+4}" rx="7" ry="9" fill="#8b2c2c"/>`,
  `<path d="M93 ${my+7}v10a7 7 0 0 0 14 0v-10z" fill="#ff7a8a"/>`+smile][p.mo];
 // борода
 const mus=`<path d="M76 ${my-8}Q88 ${my-20} 100 ${my-10}Q112 ${my-20} 124 ${my-8}Q112 ${my-1} 100 ${my-6}Q88 ${my-1} 76 ${my-8}Z" fill="${hc}"/>`;
 const cy=t+h*.55,beard=`M${a} ${cy}Q${a} ${bt+6} 100 ${bt+10}Q${b} ${bt+6} ${b} ${cy}L${b-10} ${cy+4}Q100 ${my-14} ${a+10} ${cy+4}Z`;
 const patch=`<ellipse cx="100" cy="${my+2}" rx="17" ry="10" fill="${sk}"/>`;
 let BD0='',BD1='';
 if(p.bd==2){BD0=`<path d="${beard}" fill="${hc}"/>`+patch;BD1=mus}
 if(p.bd==3){BD0=`<path d="M84 ${my+6}Q100 ${my+2} 116 ${my+6}L112 ${bt+2}Q100 ${bt+10} 88 ${bt+2}Z" fill="${hc}"/>`;BD1=mus}
 if(p.bd==4){BD0=`<path d="${beard}" fill="${hc}" opacity=".28"/>`}
 if(p.bd==1)BD1=mus;
 // очки
 const GL=['',
  `<g fill="rgba(255,255,255,.2)" stroke="${I}" stroke-width="3"><circle cx="80" cy="${ey}" r="15"/><circle cx="120" cy="${ey}" r="15"/></g><path d="M95 ${ey}H105M65 ${ey}L${a} ${ey-2}M135 ${ey}L${b} ${ey-2}" stroke="${I}" stroke-width="3" fill="none"/>`,
  `<g fill="rgba(255,255,255,.2)" stroke="${I}" stroke-width="3"><rect x="64" y="${ey-12}" width="32" height="26" rx="6"/><rect x="104" y="${ey-12}" width="32" height="26" rx="6"/></g><path d="M96 ${ey-4}H104M64 ${ey-4}L${a} ${ey-4}M136 ${ey-4}L${b} ${ey-4}" stroke="${I}" stroke-width="3" fill="none"/>`,
  `<g fill="#2b2b2b"><rect x="62" y="${ey-10}" width="36" height="24" rx="9"/><rect x="102" y="${ey-10}" width="36" height="24" rx="9"/></g><path d="M98 ${ey-4}H102M62 ${ey-4}L${a} ${ey-4}M138 ${ey-4}L${b} ${ey-4}" stroke="#2b2b2b" stroke-width="3"/><path d="M68 ${ey-5}L76 ${ey-5}M108 ${ey-5}L116 ${ey-5}" stroke="#fff" stroke-opacity=".4" stroke-width="3" stroke-linecap="round"/>`,
  `<path d="M${a-2} ${ey-4}H${a+10}M${b-10} ${ey-4}H${b+2}" stroke="#1cb0f6" stroke-width="8" stroke-linecap="round"/><rect x="62" y="${ey-17}" width="76" height="34" rx="15" fill="rgba(110,200,255,.35)" stroke="#1cb0f6" stroke-width="4"/><path d="M100 ${ey-12}V${ey+12}" stroke="#1cb0f6" stroke-width="3"/>`][p.gl];
 // головные уборы
 const HT=['',
  `<path d="M${a-4} ${t+22}Q${a-6} ${t-34} 100 ${t-34}Q${b+6} ${t-34} ${b+4} ${t+22}Z" fill="${hk}"/><rect x="${a-6}" y="${t+8}" width="${w+12}" height="16" rx="8" fill="${shd(hk,-.15)}"/><circle cx="100" cy="${t-36}" r="9" fill="${shd(hk,.4)}"/>`,
  `<path d="M${a-2} ${t+20}Q${a} ${t-24} 100 ${t-26}Q${b} ${t-24} ${b+2} ${t+20}Z" fill="${hk}"/><path d="M${a-8} ${t+22}Q100 ${t+42} ${b+8} ${t+22}L${b+8} ${t+27}Q100 ${t+48} ${a-8} ${t+27}Z" fill="${shd(hk,-.2)}"/>`,
  `<path d="M${a+6} ${t}L${a+6} ${t+16}Q100 ${t+30} ${b-6} ${t+16}L${b-6} ${t}Z" fill="#2b2b2b"/><path d="M100 ${t-28}L${b+30} ${t-8}L100 ${t+12}L${a-30} ${t-8}Z" fill="${hk}"/><path d="M100 ${t-8}L${b+20} ${t-4}V${t+24}" stroke="#ffc800" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="${b+20}" cy="${t+26}" r="4" fill="#ffc800"/>`,
  `<path d="M${a-14} ${t+24}L100 ${t-70}L${b+14} ${t+24}Q100 ${t+38} ${a-14} ${t+24}Z" fill="${hk}"/><path d="M${a-12} ${t+14}Q100 ${t+30} ${b+12} ${t+14}" stroke="#ffc800" stroke-width="7" fill="none"/><circle cx="100" cy="${t-24}" r="6" fill="#ffc800"/>`,
  `<path d="M${a+4} ${t+4}L${a+4} ${t-22}L${a+26} ${t-6}L100 ${t-30}L${b-26} ${t-6}L${b-4} ${t-22}L${b-4} ${t+4}Q100 ${t+12} ${a+4} ${t+4}Z" fill="#ffc800"/><circle cx="100" cy="${t-12}" r="4" fill="#ff4b4b"/><circle cx="${a+16}" cy="${t-2}" r="3" fill="#1cb0f6"/><circle cx="${b-16}" cy="${t-2}" r="3" fill="#58cc02"/>`,
  `<path d="M${a-1} ${t+16}Q100 ${t+2} ${b+1} ${t+16}L${b+1} ${t+28}Q100 ${t+14} ${a-1} ${t+28}Z" fill="${hk}"/>`][p.ht];

 const body=`<path d="M84 ${bt-12}h32v50H84z" fill="${shd(sk,-.06)}"/>${SH}
<circle cx="${a-1}" cy="${t+h*.55}" r="11" fill="${sk}"/><circle cx="${b+1}" cy="${t+h*.55}" r="11" fill="${sk}"/>
<rect x="${x}" y="${t}" width="${w}" height="${h}" rx="${r}" fill="${sk}"/>
<ellipse cx="${a+17}" cy="${ny}" rx="8" ry="5" fill="#ff7a7a" opacity=".16"/><ellipse cx="${b-17}" cy="${ny}" rx="8" ry="5" fill="#ff7a7a" opacity=".16"/>
${BD0}<ellipse cx="100" cy="${ny}" rx="7" ry="6" fill="${shd(sk,-.1)}"/>
<path d="${BR}" fill="none" stroke="${bc}" stroke-width="${p.br==3?7:4}" stroke-linecap="round"/>${E(80,1)}${E(120,2)}${MO}${BD1}${HF}${GL}${HT}`;
 const bg=o.bg?`<rect x="-200" y="-200" width="600" height="600" fill="${o.bg}"/>`:'';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${o.vb||'0 0 200 200'}" preserveAspectRatio="xMidYMax meet">${bg}${HB}${body}</svg>`;
}

// ---------- сохранение / передача другим игрокам
const avCode=P=>'p:'+KS.map(k=>iv(P,k)).join('.');
function avParse(s){
 if(typeof s!='string'||!/^p:\d+(\.\d+){12}$/.test(s))return null;
 const a=s.slice(2).split('.').map(Number),P={};KS.forEach((k,i)=>P[k]=a[i]);return P;
}
const VB='28 6 144 144';
const av=c=>`<span class="av ${c||''}" style="background:${hex(S.avc)?S.avc:'#ddf4ff'}">${S.pa?avSvg(S.pa,{vb:VB}):(S.av||'🧑‍🔬')}</span>`;
const avX=(s,bg)=>{const P=avParse(s);return P?`<span class="av" style="background:${hex(bg)?bg:'#ddf4ff'};width:34px;height:34px;vertical-align:middle">${avSvg(P,{vb:VB})}</span>`:(s||'')};

// ---------- верх профиля: сплошной фон выбранного цвета
function avHero(title){
 const bg=hex(S.avc)?S.avc:'#ddf4ff',fg=lum(bg)<.62?'#fff':'#4b4b4b';
 return `<div class="hero" style="--hb:${bg};--mut:${fg};--b:${fg}">${bar(title,['✕','home()'],[ic('gear',24),'sett()'])}<div class="hv" onclick="avEd()">${S.pa?avSvg(S.pa,{vb:'14 -42 172 242'}):`<div class="he">${S.av||'🧑‍🔬'}</div>`}</div><button class="edb" onclick="avEd()">✏️</button></div>`;
}

// ---------- редактор
const CATS=[
 ['🙂',[['Цвет кожи','sk','c',SK],['Форма головы','hd','s','44 22 112 132']]],
 ['👀',[['Глаза','ey','s','50 56 100 56'],['Брови','br','s','50 56 100 56'],['Рот','mo','s','56 92 88 56']]],
 ['💇',[['Причёска','hr','s','30 -8 140 130'],['Цвет волос','hc','c',HC]]],
 ['👓',[['Очки','gl','s','46 54 108 66']]],
 ['🧔',[['Борода и усы','bd','s','48 66 104 92']]],
 ['🎓',[['Головной убор','ht','s','24 -48 152 126'],['Цвет головного убора','hk','c',SC]]],
 ['👕',[['Одежда','sh','s','14 118 172 84'],['Цвет одежды','sc','c',SC]]],
 ['🎨',[['Цвет фона профиля','bg','b',BGS]]]
];
// костюмы: [название, значение sh]. Все доступны всем; новые добавлять сюда (и в avSvg).
const CO=[['Халат медика',3],['Смокинг',6]];
const NONE={gl:1,bd:1,ht:1};
function avPrev(){const e=document.getElementById('avp');if(!e)return;e.style.background=D.bg;e.innerHTML=D.em?`<div class="he">${D.em}</div>`:avSvg(D,{vb:'14 -42 172 242'})}
function avOpts(){
 const e=document.getElementById('avo');if(!e)return;
 document.getElementById('acs').style.display=ET?'flex':'none';
 document.getElementById('at0').className=ET?'':'on';document.getElementById('at1').className=ET?'on':'';
 if(!ET){e.innerHTML='<div class="og" style="grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px">'+CO.map(([n,i])=>`<div style="cursor:pointer" onclick="avSet('sh',${i})"><button class="oc ${!D.em&&D.sh===i?'on':''}" style="width:100%;border-radius:20px">${avSvg({...D,sh:i},{vb:'14 -42 172 242'})}</button><div style="text-align:center;margin-top:8px;font-size:17px">${n}</div></div>`).join('')+'</div><div style="color:var(--mut);margin:18px 4px;font-size:14px">Скоро появятся новые костюмы</div>';return}
 e.innerHTML=CATS[EC][1].map(s=>{
  const [ti,k,ty,ex]=s;let c='';
  if(ty=='c')c=ex.map((v,i)=>`<button class="oc ${!D.em&&D[k]===i?'on':''}" onclick="avSet('${k}',${i})"><i style="background:${v}"></i></button>`).join('');
  else if(ty=='b')c=ex.map(v=>`<button class="oc ${D.bg===v?'on':''}" onclick="avBg('${v}')"><i style="background:${v};border:2px solid rgba(128,128,128,.35)"></i></button>`).join('')+`<label class="oc"><i style="background:conic-gradient(red,yellow,lime,aqua,blue,magenta,red)"></i><input type="color" value="${hex(D.bg)?D.bg:'#ddf4ff'}" oninput="avBg(this.value,1)"></label>`;
  else for(let i=0;i<N[k];i++){if(k=='sh'&&CO.some(o=>o[1]==i))continue;c+=`<button class="oc ${!D.em&&D[k]===i?'on':''}" onclick="avSet('${k}',${i})">${i==0&&NONE[k]?'<span style="font-size:26px;opacity:.5">🚫</span>':avSvg({...D,[k]:i},{vb:ex})}</button>`}
  return `<div class="ot">${ti}</div><div class="og">${c}</div>`}).join('')+(EC==0?'<button class="btn gh" style="margin-top:18px" onclick="avRnd()">🎲 Случайный аватар</button>':'');
}
function avEd(){
 D={...AD,...(S.pa||{}),bg:hex(S.avc)?S.avc:'#ddf4ff',em:S.pa?null:(S.av||'🧑‍🔬')};ET=1;EC=0;
 document.body.classList.add('les');window.scrollTo(0,0);
 $('#app').innerHTML=`<div class="aes"><div class="aet"><b onclick="avCancel()">✕</b><span>Изменить аватар</span><b style="color:var(--b)" onclick="avOk()">ГОТОВО</b></div><div id="avp" class="avp"></div></div><div class="aetabs"><button id="at0" onclick="avTab(0)">КОСТЮМЫ</button><button id="at1" onclick="avTab(1)">АВАТАР</button></div><div id="acs" class="acs">${CATS.map((c,i)=>`<button class="${i?'':'on'}" onclick="avCat(${i})">${c[0]}</button>`).join('')}</div><div id="avo"></div>`;
 avPrev();avOpts();
}
function avTab(i){ET=i;avOpts()}
function avCat(i){EC=i;document.querySelectorAll('#acs button').forEach((b,k)=>b.className=k==i?'on':'');avOpts()}
function avSet(k,i){D[k]=i;D.em=null;avPrev();avOpts()}
function avBg(v,keep){D.bg=v;avPrev();if(!keep)avOpts()}
function avEm(m){D.em=m;avPrev();avOpts()}
function avRnd(){const R=n=>Math.random()*n|0;KS.forEach(k=>D[k]=R(LM[k]));D.sk=R(SK.length);D.gl=R(5)<3?0:D.gl;D.bd=R(5)<3?0:D.bd;D.ht=R(5)<3?0:D.ht;D.em=null;avPrev();avOpts()}
function avCancel(){document.body.classList.remove('les');prof()}
function avOk(){
 if(D.em){S.pa=null;S.av=D.em}else{S.pa={};KS.forEach(k=>S.pa[k]=D[k])}
 S.avc=D.bg;save();document.body.classList.remove('les');
 try{if(S.tok)syncNow()}catch(e){}
 prof();
}
Object.assign(window,{av,avX,avSvg,avCode,avHero,avEd,avTab,avCat,avSet,avBg,avEm,avRnd,avCancel,avOk});
})();
