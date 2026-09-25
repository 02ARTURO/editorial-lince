(function(){
  var select=document.getElementById('man-select-area');
  var tarjetas=document.querySelectorAll('#man-grid > li');
  var menu=document.querySelector('.cel-nav-in');
  var menuToggle=document.querySelector('.cel-menu-toggle');
  var nav=document.querySelector('.cel-nav');

  if(select) select.addEventListener('change',function(){
    var filtro=select.value;
    tarjetas.forEach(function(li){
      li.classList.toggle('man-oculto',filtro!=='todos'&&li.getAttribute('data-area')!==filtro);
    });
  });

  function closeMenu(){
    if(!menu||!menuToggle)return;
    menu.classList.remove('is-open');
    nav.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded','false');
    menuToggle.setAttribute('aria-label','Abrir menú');
  }

  if(menuToggle) menuToggle.addEventListener('click',function(){
    var open=menu.classList.toggle('is-open');
    nav.classList.toggle('menu-open',open);
    menuToggle.setAttribute('aria-expanded',open?'true':'false');
    menuToggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  });
  document.querySelectorAll('.cel-tab,.cel-brand').forEach(function(link){link.addEventListener('click',closeMenu);});
})();
