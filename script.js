const dishes=[
{c:'Mains',n:'Creamy Chicken Penne',d:'Garlic bread, basil, parmesan',p:695,i:'penne'},
{c:'Mains',n:'Gochujang Chicken Bibimbap',d:'Sunny egg, pickled carrot, cucumber, rice',p:895,i:'bibimbap'},
{c:'Mains',n:'Cilantro Lime Chicken Plate',d:'Black beans, guacamole, pico de gallo',p:745,i:'burrito'},
{c:'Mains',n:'Chicken Fettuccine Alfredo',d:'Shaved parmesan, basil, garlic toast',p:725,i:'alfredo'},
{c:'Desserts',n:'Matcha Basque Cheesecake',d:'Roasted hazelnut, cacao, vanilla ice cream',p:495},
{c:'Desserts',n:'Yuzu Panna Cotta',d:'Apple, brown butter, crème fraîche, caramel',p:475},
{c:'Desserts',n:'Lemon Meringue Tart',d:'Yuzu curd, meringue, sesame',p:475},
{c:'Desserts',n:'Classic Crème Brûlée',d:'Poached pear, almond, honey, vanilla',p:475},
{c:'Desserts',n:'Belgian Chocolate Lava Cake',d:'Caramel, cocoa nib, malted milk ice cream',p:525}];
const card=x=>`<article class="dish"><img src="${x.i}.jpg" alt="${x.n}" loading="lazy"><div><h3>${x.n}</h3><p>${x.d}</p><span class="price">₹${x.p}</span></div></article>`;
const row=x=>`<div class="row"><div><h3>${x.n}</h3><p>${x.d}</p></div><b>₹${x.p}</b></div>`;
const sig=document.getElementById('signature');
if(sig)sig.innerHTML=dishes.filter(x=>x.i).slice(0,3).map(card).join('');
const ml=document.getElementById('menu-list');
if(ml){const show=c=>{ml.innerHTML=c==='Mains'?'<div class="grid">'+dishes.filter(x=>x.c===c).map(card).join('')+'</div>':dishes.filter(x=>x.c===c).map(row).join('');
document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.c===c))};
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>show(b.dataset.c));show('Mains')}
const b=document.getElementById('burger');if(b)b.onclick=()=>document.querySelector('nav').classList.toggle('open');
const w=document.getElementById('wheel');
if(w){const prizes=['5% off','10% off','Free dessert','15% off','20% off','10% off'];
prizes.forEach((t,i)=>{const s=document.createElement('span');s.textContent=t;s.style.transform=`rotate(${i*60+30}deg)`;w.appendChild(s)});
const out=document.getElementById('result'),btn=document.getElementById('spin');
const show=(p,code)=>{out.hidden=false;out.innerHTML=`<p>Your lifetime Plated Circle benefit</p><strong>${p}</strong><p>Member code <b>${code}</b>. Show it at your table.</p>`;btn.disabled=true;btn.textContent='Already unlocked'};
const saved=JSON.parse(localStorage.getItem('plated-circle')||'null');if(saved)show(saved.p,saved.code);
btn.onclick=()=>{const i=Math.floor(Math.random()*6);w.style.transform=`rotate(${360*6-(i*60+30)}deg)`;btn.disabled=true;
setTimeout(()=>{const r={p:prizes[i],code:'PC-'+Math.random().toString(36).slice(2,7).toUpperCase()};localStorage.setItem('plated-circle',JSON.stringify(r));show(r.p,r.code)},5200)}}
const f=document.getElementById('form');
if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);
location.href=`mailto:hello@platedindia.com?subject=${encodeURIComponent(d.get('topic')+' – '+d.get('name'))}&body=${encodeURIComponent(d.get('message')+'\n\n'+d.get('name')+' / '+d.get('email'))}`};
