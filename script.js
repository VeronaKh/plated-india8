const dishes=[
  // SIGNATURE GLOBAL PLATES — NON-VEG
{c:'Signature Global Plates - Non-Veg',n:'Korean Gochujang Glazed Chicken',d:'Grilled chicken thigh, Japanese steamed rice, house kimchi, sesame cucumber, charred broccoli & gochujang glaze.',p:895},
{c:'Signature Global Plates - Non-Veg',n:'Mediterranean Harissa Chicken Supreme',d:'Harissa-spiced chicken, saffron rice, roasted seasonal vegetables, silky hummus, garlic yogurt, pickled onion & crisp pita.',p:925},
{c:'Signature Global Plates - Non-Veg',n:'Mexican Chipotle Chicken',d:'Smoky chipotle chicken, cilantro rice, black beans, corn salsa, pico de gallo, fresh guacamole & artisan tortilla crisps.',p:875},
{c:'Signature Global Plates - Non-Veg',n:'Japanese Teriyaki Salmon',d:'Pan-seared salmon, Japanese rice, edamame, pickled cucumber, wok-tossed seasonal vegetables & house teriyaki glaze.',p:1195},
{c:'Signature Global Plates - Vegetarian',n:'Miso-Glazed Tofu Steak',d:'Seared silken tofu, white miso glaze, Japanese rice, edamame, sesame greens & pickled cucumber.',p:795},
{c:'Signature Global Plates - Vegetarian',n:'Truffle Wild Mushroom Risotto',d:'Arborio rice, wild mushrooms, Parmesan, truffle essence & garden herbs.',p:825},
{c:'Signature Global Plates - Vegetarian',n:'Charred Cauliflower & Harissa Bowl',d:'Charred cauliflower, saffron quinoa, hummus, roasted vegetables, chickpea crisp, pickled onion & herb oil.',p:725},
{c:'Premium Sides & Sharing Plates - Non-Veg',n:'Crispy Korean Chicken Bites',d:'Buttermilk-marinated chicken, Korean-style glaze & sesame dip.',p:395},
{c:'Premium Sides & Sharing Plates - Non-Veg',n:'Miso-Glazed Chicken Skewers',d:'Char-grilled chicken skewers, white miso glaze, spring onion, sesame & yuzu kosho dip.',p:425},
{c:'Premium Sides & Sharing Plates - Non-Veg',n:'Prawn Tempura',d:'Tiger prawns in a delicate tempura, served with yuzu ponzu & wasabi aioli.',p:475},
{c:'Premium Sides & Sharing Plates - Non-Veg',n:'Harissa Lamb Skewers',d:'Tender lamb skewers, North African harissa, smoked yogurt, pickled onion & fresh herbs.',p:495},
{c:'Premium Sides & Sharing Plates - Vegetarian',n:'Parmesan & Truffle Fries',d:'Crisp fries, aged Parmesan, truffle essence & garden herbs.',p:375},
{c:'Premium Sides & Sharing Plates - Vegetarian',n:'Spinach & Feta Croquettes',d:'Crisp croquettes filled with spinach, feta & garden herbs, served with roasted garlic dip.',p:350},
{c:'Premium Sides & Sharing Plates - Vegan',n:'Edamame & Avocado Gyoza',d:'Delicate vegetable dumplings, edamame, avocado & sesame ponzu.',p:375},
{c:'Premium Sides & Sharing Plates - Vegan',n:'Hummus & Warm Artisan Pita',d:'Silken hummus, extra virgin olive oil, za’atar & toasted pita.',p:295},
{c:'Premium Sides & Sharing Plates - Vegan',n:'Chilli-Salted Edamame',d:'Steamed edamame, sea salt, chilli & toasted sesame.',p:295},
{c:'Premium Sides & Sharing Plates - Vegan',n:'Roasted Seasonal Vegetables',d:'Market vegetables, herb oil & light balsamic glaze.',p:275},
{c:'Premium Sides & Sharing Plates - Vegan',n:'Loaded Kimchi Fries',d:'Crisp fries, kimchi, gochujang aioli, sesame & spring onion.',p:325},
{c:'Zero-Proof Collection',n:'Yuzu & Elderflower Lemonade',d:'',p:325},
{c:'Zero-Proof Collection',n:'Watermelon & Mint Cooler',d:'',p:295},
{c:'Zero-Proof Collection',n:'Passion Fruit & Ginger Sparkler',d:'',p:345},
{c:'Zero-Proof Collection',n:'Lychee & Basil Refresher',d:'',p:325},
{c:'Zero-Proof Collection',n:'Cucumber, Lime & Sea Salt Soda',d:'',p:295},
{c:'Zero-Proof Collection',n:'Yuzu–Ginger & Shiso Spritz',d:'',p:375},
{c:'Zero-Proof Collection',n:'Saffron Pistachio Lassi',d:'',p:375},
{c:'Artisan Coffee & Tea',n:'Cold Brew',d:'',p:325},
{c:'Artisan Coffee & Tea',n:'Iced Vanilla Latte',d:'',p:375},
{c:'Artisan Coffee & Tea',n:'Ceremonial Matcha Latte',d:'',p:425},
{c:'Artisan Coffee & Tea',n:'Hojicha Latte',d:'',p:425},
{c:'Artisan Coffee & Tea',n:'Coconut Matcha Cloud',d:'',p:445},
{c:'Artisan Coffee & Tea',n:'Iced Coconut Cold Brew',d:'',p:375},
{c:'Artisan Coffee & Tea',n:'Espresso / Americano',d:'',p:275},
{c:'Artisan Coffee & Tea',n:'Flat White',d:'',p:350},
{c:'Sweet Finale',n:'Matcha Basque Cheesecake',d:'Roasted hazelnut, cacao, vanilla ice cream',p:495},
{c:'Sweet Finale',n:'Yuzu Panna Cotta',d:'',p:475},
{c:'Sweet Finale',n:'Belgian Chocolate Lava Cake',d:'',p:525},
{c:'Sweet Finale',n:'Classic Crème Brûlée',d:'',p:475},
{c:'Sweet Finale',n:'Lemon Meringue Tart',d:'',p:475},
{c:'Sweet Finale',n:'Pistachio & Rose Financier',d:'',p:425},
{c:'Sweet Finale',n:'Mango & Passion Fruit Pavlova',d:'',p:475},
{c:'Sweet Finale',n:'Crêpes Suzette',d:'',p:495},
];
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
