// ===== SETTINGS (restaurant fills these in, see README) =====
const CFG={restaurantEmail:'hello@platedindia.com',emailjsPublicKey:'',emailjsServiceId:'',emailjsTemplateId:''};
// =============================================================
const dishes=[
{c:'Mains',n:'Creamy Chicken Penne',d:'Garlic bread, basil, parmesan',p:695,i:'penne'},
{c:'Mains',n:'Gochujang Chicken Bibimbap',d:'Sunny egg, pickled carrot, cucumber, rice',p:895,i:'bibimbap'},
{c:'Mains',n:'Cilantro Lime Chicken Plate',d:'Black beans, guacamole, pico de gallo',p:745,i:'burrito'},
{c:'Mains',n:'Chicken Fettuccine Alfredo',d:'Shaved parmesan, basil, garlic toast',p:725,i:'alfredo'},
{c:'Desserts',n:'Matcha Basque Cheesecake',d:'Roasted hazelnut, cacao, vanilla ice cream',p:495},
{c:'Desserts',n:'Yuzu Panna Cotta',d:'Apple, brown butter, crème fraîche, caramel',p:475},
{c:'Desserts',n:'Lemon Meringue Tart',d:'Yuzu curd, meringue, sesame',p:475},
{c:'Desserts',n:'Classic Crème Brûlée',d:'Poached pear, almond, honey, vanilla',p:475},
{c:'Desserts',n:'Belgian Chocolate Lava Cake',d:'Caramel, cocoa nib, malted milk ice cream',p:525}].map((x,id)=>({...x,id}));
const add=x=>`<button class="btn add" data-add="${x.id}">Add to cart</button>`;
const card=(x,buy)=>`<article class="dish"><img src="${x.i}.jpg" alt="${x.n}" loading="lazy"><div><h3>${x.n}</h3><p>${x.d}</p><span class="price">₹${x.p}</span>${buy?add(x):''}</div></article>`;
const row=x=>`<div class="row"><div><h3>${x.n}</h3><p>${x.d}</p></div><div class="buy"><b>₹${x.p}</b>${add(x)}</div></div>`;
const sig=document.getElementById('signature');
if(sig)sig.innerHTML=dishes.filter(x=>x.i).slice(0,3).map(x=>card(x,false)).join('');
const ml=document.getElementById('menu-list');
if(ml){const show=c=>{ml.innerHTML=c==='Mains'?'<div class="grid">'+dishes.filter(x=>x.c===c).map(x=>card(x,true)).join('')+'</div>':dishes.filter(x=>x.c===c).map(row).join('');
document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.c===c))};
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>show(b.dataset.c));show('Mains')}
const b=document.getElementById('burger');if(b)b.onclick=()=>document.querySelector('nav').classList.toggle('open');

// ===== Cart + order =====
const drawer=document.getElementById('drawer');
if(drawer){
let cart={},mode='Dine In';
try{cart=JSON.parse(localStorage.getItem('plated-cart')||'{}')}catch(e){}
const $=id=>document.getElementById(id),money=n=>'₹'+n;
const items=()=>Object.entries(cart).filter(([,q])=>q>0).map(([i,q])=>({...dishes[i],q}));
const total=()=>items().reduce((s,x)=>s+x.p*x.q,0);
const modeInfo={'Dine In':['Table number (optional)','Billing at the counter after your meal.'],'Take Away':['','Billing at the counter when you pick up your order.'],'Delivery':['Delivery address','Payment on delivery.']};
const draw=()=>{const it=items(),n=it.reduce((s,x)=>s+x.q,0);
try{localStorage.setItem('plated-cart',JSON.stringify(cart))}catch(e){}
$('cart-n').textContent=n;$('cart-btn').hidden=n===0&&drawer.hidden;
$('cart-items').innerHTML=it.length?it.map(x=>`<div class="row"><div><h3>${x.n}</h3><p>${money(x.p)} each</p></div><div class="qty"><button data-dec="${x.id}" aria-label="Less">−</button><span>${x.q}</span><button data-inc="${x.id}" aria-label="More">+</button></div></div>`).join(''):'<p class="muted">Your cart is empty.</p>';
$('cart-total').textContent=money(total());$('place').disabled=!it.length;
$('mode-label').textContent=mode;const [ph,note]=modeInfo[mode];
$('extra').hidden=!ph;$('extra').placeholder=ph;$('extra').required=mode==='Delivery';$('pay-note').textContent=note};
document.querySelectorAll('#modes button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;document.querySelectorAll('#modes button').forEach(x=>x.classList.toggle('on',x===b));draw()});
document.addEventListener('click',e=>{const t=e.target,g=k=>t.dataset[k];
if(g('add')!==undefined){cart[g('add')]=(cart[g('add')]||0)+1;t.textContent='Added ✓';setTimeout(()=>t.textContent='Add to cart',900)}
if(g('inc')!==undefined)cart[g('inc')]++;if(g('dec')!==undefined)cart[g('dec')]=Math.max(0,cart[g('dec')]-1);draw()});
$('cart-btn').onclick=()=>{drawer.hidden=false;$('cart-btn').hidden=true};
$('close').onclick=()=>{drawer.hidden=true;draw()};
$('order').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),id='PL-'+Math.random().toString(36).slice(2,8).toUpperCase();
const lines=items().map(x=>`${x.q} × ${x.n} (${money(x.p*x.q)})`),name=f.get('name'),extra=f.get('extra')||'-';
const details=`Order ${id}<br>Type: ${mode}<br>${lines.join('<br>')}<br><b>Total: ${money(total())}</b><br>${modeInfo[mode][1]}`;
const customer={to_email:f.get('email'),to_name:name,subject:'Thank you for your order at Plated ('+id+')',message:`Hi ${name},<br><br>Thank you for your order! We have received your order and are preparing it.<br><br>${details}<br><br>See you soon,<br>Team Plated`};
const owner={to_email:CFG.restaurantEmail,to_name:'Plated team',subject:'New order '+id+' ('+mode+')',message:`${details}<br><br>Customer: ${name}<br>Phone: ${f.get('phone')}<br>Email: ${f.get('email')}<br>${mode==='Delivery'?'Address':'Table'}: ${extra}`};
$('place').disabled=true;$('place').textContent='Sending…';let live=false;
try{if(window.emailjs&&CFG.emailjsPublicKey){const o={publicKey:CFG.emailjsPublicKey};
await emailjs.send(CFG.emailjsServiceId,CFG.emailjsTemplateId,customer,o);await emailjs.send(CFG.emailjsServiceId,CFG.emailjsTemplateId,owner,o);live=true}}catch(err){console.error(err)}
if(!live)location.href=`mailto:${CFG.restaurantEmail}?subject=${encodeURIComponent(owner.subject)}&body=${encodeURIComponent(owner.message.replace(/<br>/g,'\n').replace(/<\/?b>/g,''))}`;
e.target.hidden=true;$('done').hidden=false;
$('done').innerHTML=`<h3>Thank you, ${name}!</h3><p>We have received your order <b>${id}</b>.${live?' A confirmation email is on its way to '+f.get('email')+'.':' (Demo mode: email sending is not connected yet.)'}</p><p>${modeInfo[mode][1]}</p>`;
cart={};draw()};
draw()}
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
