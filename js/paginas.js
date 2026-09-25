(function(){
  var menu=document.querySelector('.cel-nav-in');
  var toggle=document.querySelector('.cel-menu-toggle');
  if(!menu||!toggle)return;
  function closeMenu(){menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}
  toggle.addEventListener('click',function(){var open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});
  document.querySelectorAll('.cel-tab,.cel-brand').forEach(function(link){link.addEventListener('click',closeMenu);});
})();
