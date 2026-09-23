/* Centro Editorial Lince — pestañas, catálogo y slider */
(function(){
  var CEL_DATA = window.CEL_DATA || {impresos:[],electronicos:[],manuales:[]};

  var root=document.getElementById('editorial-lince'); if(!root) return;

  function esc(s){return String(s||'').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  root.querySelectorAll('[data-cel-list]').forEach(function(box){
    var items=CEL_DATA[box.getAttribute('data-cel-list')]||[];
    if(!items.length){box.outerHTML='<div class="cel-empty"><p>Próximamente</p></div>';return;}
    box.innerHTML=items.map(function(b){
      var link=b.enlace?' href="'+esc(b.enlace)+'" target="_blank" rel="noopener"':'';
      return '<article class="cel-book">'+
        '<div class="cel-cover">'+(b.portada?'<img loading="lazy" src="'+esc(b.portada)+'" alt="'+esc(b.titulo)+'">':'')+'</div>'+
        '<div class="cel-book-body">'+
          '<h3 class="cel-book-t">'+esc(b.titulo)+'</h3>'+
          (b.autor?'<p class="cel-book-a">'+esc(b.autor)+'</p>':'')+
          (b.descripcion?'<p class="cel-book-d">'+esc(b.descripcion)+'</p>':'')+
          (b.isbn?'<p class="cel-isbn">'+esc(b.isbn)+'</p>':'')+
          (b.enlace?'<a class="cel-btn"'+link+'>'+esc(b.boton||'Consultar')+'</a>':'')+
        '</div></article>';
    }).join('');
  });

  /* ---------- Pestañas ---------- */
  var tabs=root.querySelectorAll('.cel-tab'), panels=root.querySelectorAll('.cel-panel'), nav=root.querySelector('.cel-nav'), footer=root.querySelector('.cel-foot'), brand=root.querySelector('.cel-brand');
  function home(){
    panels.forEach(function(p){p.classList.remove('is-on');});
    tabs.forEach(function(t){t.classList.remove('is-on');});
    if(footer) footer.classList.remove('is-visible');
    try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function show(id,scroll){
    var ok=false;
    panels.forEach(function(p){var on=p.getAttribute('data-cel-panel')===id;p.classList.toggle('is-on',on);if(on)ok=true;});
    if(!ok) return;
    if(footer) footer.classList.add('is-visible');
    tabs.forEach(function(t){var on=t.getAttribute('data-cel-tab')===id;t.classList.toggle('is-on',on);
      if(on&&t.scrollIntoView){var box=t.parentNode;box.scrollLeft=t.offsetLeft-(box.clientWidth-t.clientWidth)/2;}});
    try{history.replaceState(null,'','#'+id);}catch(e){}
    if(scroll){var y=nav.getBoundingClientRect().top+window.pageYOffset-10;
      if(nav.getBoundingClientRect().top<0||scroll==='force') window.scrollTo({top:y,behavior:'smooth'});}
  }
  if(brand) brand.addEventListener('click',home);
  tabs.forEach(function(t){t.addEventListener('click',function(){show(t.getAttribute('data-cel-tab'),true);});});
  root.querySelectorAll('[data-cel-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();show(a.getAttribute('data-cel-go'),'force');});});
  var h=(location.hash||'').replace('#','');
  if(h&&root.querySelector('[data-cel-panel="'+h+'"]')) show(h,false);

  /* ---------- Slider ---------- */
  var slides=root.querySelectorAll('.cel-slide'), dotsBox=root.querySelector('.cel-dots'), cur=0, timer=null;
  if(slides.length<2){root.querySelectorAll('.cel-arrow').forEach(function(b){b.style.display='none';});return;}
  slides.forEach(function(_,i){var d=document.createElement('button');d.type='button';d.className='cel-dot'+(i?'':' is-on');d.setAttribute('aria-label','Banner '+(i+1));
    d.addEventListener('click',function(){go(i);restart();});dotsBox.appendChild(d);});
  var dots=dotsBox.querySelectorAll('.cel-dot');
  function go(i){cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('is-on',k===cur);});
    dots.forEach(function(d,k){d.classList.toggle('is-on',k===cur);});}
  function restart(){clearInterval(timer);timer=setInterval(function(){go(cur+1);},6000);}
  root.querySelector('.cel-prev').addEventListener('click',function(){go(cur-1);restart();});
  root.querySelector('.cel-next').addEventListener('click',function(){go(cur+1);restart();});
  var sl=root.querySelector('.cel-slider'), x0=null;
  sl.addEventListener('mouseenter',function(){clearInterval(timer);});
  sl.addEventListener('mouseleave',restart);
  sl.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  sl.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40){go(cur+(dx<0?1:-1));restart();}x0=null;});
  restart();
})();
