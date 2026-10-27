/* Installation UI. Uses the existing original brand icon; no tracking. */
(function () {
'use strict';
var deferred = null;
var installed = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
var button = document.createElement('button');
button.type = 'button'; button.className = 'install-help-button';
var dialog = document.createElement('dialog');
dialog.className = 'install-help-dialog';
var copy = {
 en: { button:'Install aquí', title:'Add aquí to your home screen', ios:'In Safari, open Share, choose “Add to Home Screen”, then tap “Add”. If “Open as Web App” is shown, keep it enabled.', other:'Open your browser menu and look for “Install app” or “Add to Home Screen”. If neither is available, open this page in Safari on iPhone or Chrome on Android.', install:'Install', close:'Close' },
 es: { button:'Instalar aquí', title:'Añade aquí a tu pantalla de inicio', ios:'En Safari, abre Compartir, elige “Añadir a pantalla de inicio” y pulsa “Añadir”. Si aparece “Abrir como app web”, déjalo activado.', other:'Abre el menú del navegador y busca “Instalar aplicación” o “Añadir a pantalla de inicio”. Si no aparecen, abre esta página en Safari en iPhone o Chrome en Android.', install:'Instalar', close:'Cerrar' }
};
function words() { return copy[document.documentElement.lang === 'es' ? 'es' : 'en']; }
function paint() { button.textContent = words().button; button.hidden = installed; }
function openHelp() {
 var t = words();
 var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
 dialog.replaceChildren();
 var h = document.createElement('h2'); h.id = 'install-title'; h.textContent = t.title; dialog.appendChild(h);
 dialog.setAttribute('aria-labelledby','install-title');
 var p = document.createElement('p'); p.textContent = ios ? t.ios : t.other; dialog.appendChild(p);
 if (deferred) {
  var install = document.createElement('button'); install.type = 'button'; install.className = 'btn'; install.textContent = t.install;
  install.onclick = async function () { var prompt = deferred; deferred = null; dialog.close(); if (prompt) { await prompt.prompt(); await prompt.userChoice; } };
  dialog.appendChild(install);
 }
 var close = document.createElement('button'); close.type='button'; close.className='btn btn-quiet'; close.textContent=t.close; close.onclick=function(){dialog.close();}; dialog.appendChild(close);
 dialog.showModal();
}
button.onclick=openHelp;
document.querySelector('.topbar').insertAdjacentElement('afterend',button);
document.body.appendChild(dialog);
new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
window.addEventListener('beforeinstallprompt',function(event){event.preventDefault();deferred=event;paint();});
window.addEventListener('appinstalled',function(){installed=true;deferred=null;paint();dialog.close();});
paint();
})();