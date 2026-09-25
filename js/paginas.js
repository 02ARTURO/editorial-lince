(function(){
  var menu=document.querySelector('.cel-nav-in');
  var toggle=document.querySelector('.cel-menu-toggle');
  var nav=document.querySelector('.cel-nav');
  if(!menu||!toggle)return;
  function closeMenu(){menu.classList.remove('is-open');nav.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}
  toggle.addEventListener('click',function(){var open=menu.classList.toggle('is-open');nav.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',open?'true':'false');toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  document.querySelectorAll('.cel-tab,.cel-brand').forEach(function(link){link.addEventListener('click',closeMenu);});
})();
