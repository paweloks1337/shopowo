// Shopowo.pl — front-end demo (bez backendu). Routing przez # działa na GitHub Pages.
// PRZYSZŁE PODŁĄCZENIE: ustaw checkoutUrl na adres własnego, bezpiecznego checkoutu
// (np. strona operatora płatności). NIE wpisuj tu kluczy API ani haseł.
const CONFIG={checkoutUrl:null};
const $=s=>document.querySelector(s);
const zl=n=>n.toFixed(2).replace('.',',')+' zł';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CATS=['Dom i ogród','Elektronika i gadżety','Akcesoria','Uroda','Produkty codziennego użytku'];
const ICON={'Dom i ogród':'🏡','Elektronika i gadżety':'🔌','Akcesoria':'👜','Uroda':'💄','Produkty codziennego użytku':'🧺'};
let cart={};try{cart=JSON.parse(localStorage.getItem('shopowo-cart')||'{}')}catch(e){}
const P=id=>PRODUCTS.find(p=>p.id===id);
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function save(){try{localStorage.setItem('shopowo-cart',JSON.stringify(cart))}catch(e){}$('#cnt').textContent=count()}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),3500)}
const img=p=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${p.hue},70%,94%)"/><stop offset="1" stop-color="hsl(${p.hue},55%,78%)"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><text x="200" y="250" font-size="150" text-anchor="middle">${p.emoji}</text></svg>`);
const price=p=>`<div class="pr">${zl(p.price)}${p.old?`<s>${zl(p.old)}</s>`:''}</div>`;
const card=p=>`<article class="card"><a href="#/produkt/${p.id}"><div class="im"><img src="${img(p)}" alt="${esc(p.name)} (grafika poglądowa)" loading="lazy" width="400" height="400">${p.old?'<span class="badge">Promocja</span>':''}</div></a><div class="b"><small>${esc(p.cat)}</small><h3><a href="#/produkt/${p.id}">${esc(p.name)}</a></h3>${price(p)}</div><button class="btn sm" data-add="${p.id}">Dodaj do koszyka</button></article>`;
const sec=(t,tag)=>`<section class="w"><div class="sh"><h2>${t}</h2><a href="#/sklep">Zobacz wszystkie →</a></div><div class="grid">${PRODUCTS.filter(p=>p.tags.includes(tag)).slice(0,4).map(card).join('')}</div></section>`;
const INFO={
 kontakt:['Kontakt','Dane kontaktowe zostaną dodane przed uruchomieniem prawdziwej sprzedaży.'],
 regulamin:['Regulamin','Regulamin sklepu zostanie opublikowany przed rozpoczęciem sprzedaży. Obecnie strona ma charakter wyłącznie demonstracyjny.'],
 prywatnosc:['Polityka prywatności','Ta wersja demonstracyjna zapisuje w Twojej przeglądarce wyłącznie zawartość koszyka (localStorage). Nie wysyła danych na żaden serwer. Przed uruchomieniem sprzedaży polityka zostanie uzupełniona.'],
 zwroty:['Zwroty','Zasady zwrotów zostaną opisane przed uruchomieniem sprzedaży, zgodnie z obowiązującymi przepisami.']};
function home(){return `<section class="hero"><h1>Przemyślane zakupy, bez zbędnego szumu.</h1><p>Shopowo.pl to demonstracyjna wersja sklepu. Produkty są przykładowe i nie są dostępne w sprzedaży.</p><a class="btn" href="#/sklep">Przeglądaj produkty</a><a class="btn o" href="#/sklep?sort=promo">Promocje</a></section>
<section class="w"><h2>Kategorie</h2><div class="cats">${CATS.map(c=>`<a class="cat" href="#/sklep?cat=${encodeURIComponent(c)}"><span>${ICON[c]}</span>${c}</a>`).join('')}</div></section>
${sec('Popularne produkty','popular')}${sec('Promocje','promo')}${sec('Nowości','new')}
<section class="w"><h2>Dlaczego Shopowo?</h2><div class="why"><div><h3>Przejrzysty katalog</h3><p>Wyszukiwanie, filtry i sortowanie w jednym miejscu.</p></div><div><h3>Koszyk w przeglądarce</h3><p>Zapamiętuje produkty na Twoim urządzeniu.</p></div><div><h3>Uczciwie o demo</h3><p>Jasno oznaczamy, że to wersja pokazowa.</p></div><div><h3>Gotowy do rozwoju</h3><p>Zaprojektowany pod płatności i dostawcę.</p></div></div></section>
<section class="w"><h2>Najczęstsze pytania</h2>
<details><summary>Czy mogę tu coś kupić?</summary><p>Jeszcze nie. To wersja demonstracyjna — zamówienia nie są przyjmowane, a płatności nie są obsługiwane.</p></details>
<details><summary>Czy produkty są prawdziwe?</summary><p>Nie, to przykładowe pozycje z grafikami poglądowymi.</p></details>
<details><summary>Co się dzieje z koszykiem?</summary><p>Jest zapisywany wyłącznie w Twojej przeglądarce i nie trafia na żaden serwer.</p></details>
<details><summary>Kiedy ruszy prawdziwa sprzedaż?</summary><p>Dopiero po podłączeniu systemu zamówień, płatności i dostawcy oraz uzupełnieniu dokumentów prawnych.</p></details></section>`}
function shop(q){const cat=q.get('cat')||'',s=(q.get('q')||'').toLowerCase().trim(),so=q.get('sort')||'';
 let l=PRODUCTS.filter(p=>(!cat||p.cat===cat)&&(!s||(p.name+' '+p.desc+' '+p.cat).toLowerCase().includes(s))&&(so!=='promo'||p.old));
 if(so==='tan')l.sort((a,b)=>a.price-b.price);if(so==='drog')l.sort((a,b)=>b.price-a.price);if(so==='az')l.sort((a,b)=>a.name.localeCompare(b.name,'pl'));
 return `<div class="w"><h1 style="margin-top:20px">${cat?esc(cat):'Wszystkie produkty'}</h1>${s?`<p>Wyniki dla: <b>${esc(s)}</b></p>`:''}
 <div class="bar"><select data-f="cat" aria-label="Kategoria"><option value="">Wszystkie kategorie</option>${CATS.map(c=>`<option ${c===cat?'selected':''}>${c}</option>`).join('')}</select>
 <select data-f="sort" aria-label="Sortowanie"><option value="">Domyślnie</option>${[['tan','Cena rosnąco'],['drog','Cena malejąco'],['az','Nazwa A–Z'],['promo','Tylko promocje']].map(o=>`<option value="${o[0]}" ${o[0]===so?'selected':''}>${o[1]}</option>`).join('')}</select></div>
 ${l.length?`<div class="grid">${l.map(card).join('')}</div>`:'<div class="empty"><h2>Brak wyników</h2><p>Spróbuj innej frazy lub zmień filtry.</p><a class="btn" href="#/sklep">Wyczyść filtry</a></div>'}</div>`}
function prod(p){return `<p class="crumb"><a href="#/">Start</a> / <a href="#/sklep?cat=${encodeURIComponent(p.cat)}">${esc(p.cat)}</a></p><div class="w pd"><img src="${img(p)}" alt="${esc(p.name)} (grafika poglądowa)" width="400" height="400"><div><h1>${esc(p.name)}</h1><div class="price">${zl(p.price)}${p.old?` <s style="font-size:16px;color:var(--mut);font-weight:400">${zl(p.old)}</s>`:''}</div><p>${esc(p.desc)}</p>
 <p><span class="qty"><button data-q="-1" aria-label="Mniej">−</button><span id="pq">1</span><button data-q="1" aria-label="Więcej">+</button></span></p><button class="btn" data-addq="${p.id}">Dodaj do koszyka</button>
 <div class="note">Produkt demonstracyjny — nie jest dostępny w sprzedaży. Grafika ma charakter poglądowy.</div></div></div>`}
function cartV(){const ids=Object.keys(cart).filter(id=>P(id));if(!ids.length)return `<div class="w empty"><h1>Koszyk jest pusty</h1><p>Dodaj produkty, aby zobaczyć tutaj podsumowanie.</p><a class="btn" href="#/sklep">Przejdź do sklepu</a></div>`;
 const tot=ids.reduce((a,id)=>a+P(id).price*cart[id],0);
 return `<div class="w txt" style="max-width:760px"><h1>Koszyk</h1><div class="note">Koszyk demonstracyjny. Zamówienia nie są realizowane, a płatności nie są obsługiwane.</div>
 ${ids.map(id=>{const p=P(id);return `<div class="row"><img src="${img(p)}" alt="" width="72" height="72"><div><a href="#/produkt/${id}"><b>${esc(p.name)}</b></a><div class="x"><span class="qty"><button data-c="${id}" data-d="-1" aria-label="Mniej">−</button><span>${cart[id]}</span><button data-c="${id}" data-d="1" aria-label="Więcej">+</button></span><b>${zl(p.price*cart[id])}</b><button class="link" data-del="${id}">Usuń</button></div></div></div>`}).join('')}
 <div class="tot"><span>Razem</span><span>${zl(tot)}</span></div><p style="color:var(--mut);font-size:14px">Koszty dostawy zostaną określone po podłączeniu dostawcy.</p><button class="btn" data-checkout style="width:100%">Przejdź do zamówienia</button></div>`}
function route(){const [path,qs]=(location.hash.slice(1)||'/').split('?'),q=new URLSearchParams(qs||''),s=path.split('/').filter(Boolean);
 let t='Shopowo.pl — sklep demonstracyjny',h;
 if(!s.length)h=home();
 else if(s[0]==='sklep'){h=shop(q);t=(q.get('cat')||'Produkty')+' — Shopowo.pl'}
 else if(s[0]==='produkt'&&P(s[1])){h=prod(P(s[1]));t=P(s[1]).name+' — Shopowo.pl'}
 else if(s[0]==='koszyk'){h=cartV();t='Koszyk — Shopowo.pl'}
 else if(s[0]==='info'&&INFO[s[1]]){h=`<div class="txt w"><h1>${INFO[s[1]][0]}</h1><p>${INFO[s[1]][1]}</p><div class="note">Strona robocza — wersja demonstracyjna.</div></div>`;t=INFO[s[1]][0]+' — Shopowo.pl'}
 else{h='<div class="w empty"><h1>Nie znaleziono strony</h1><p>Ta strona nie istnieje lub została przeniesiona.</p><a class="btn" href="#/">Wróć na start</a></div>';t='Nie znaleziono — Shopowo.pl'}
 $('#main').innerHTML=h;document.title=t;scrollTo(0,0);$('#nav').classList.remove('open');$('#bg').setAttribute('aria-expanded','false');
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',q.get('cat')===decodeURIComponent((a.href.split('cat=')[1]||''))))}
const add=(id,n=1)=>{cart[id]=(cart[id]||0)+n;save();toast('Dodano do koszyka: '+P(id).name)};
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.add)add(d.add);
 else if(d.addq)add(d.addq,+$('#pq').textContent);
 else if(d.q){const el=$('#pq');el.textContent=Math.min(99,Math.max(1,+el.textContent+ +d.q))}
 else if(d.c){cart[d.c]=Math.min(99,Math.max(1,cart[d.c]+ +d.d));save();route()}
 else if(d.del){delete cart[d.del];save();route()}
 else if('checkout' in d){CONFIG.checkoutUrl?location.href=CONFIG.checkoutUrl:toast('To wersja demonstracyjna — zamówienia nie są przyjmowane i nic nie zostanie pobrane.')}
 else if(b.id==='bg'){const o=$('#nav').classList.toggle('open');b.setAttribute('aria-expanded',o)}});
document.addEventListener('change',e=>{const f=e.target.dataset.f;if(!f)return;const q=new URLSearchParams((location.hash.split('?')[1])||'');e.target.value?q.set(f,e.target.value):q.delete(f);location.hash='#/sklep?'+q})
$('#sf').addEventListener('submit',e=>{e.preventDefault();const v=$('#q').value.trim();location.hash='#/sklep'+(v?'?q='+encodeURIComponent(v):'')});
$('#nav').innerHTML=CATS.map(c=>`<a href="#/sklep?cat=${encodeURIComponent(c)}">${c}</a>`).join('');
addEventListener('hashchange',route);save();route();
