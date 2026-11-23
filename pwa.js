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

/* Release updates: bump aqui-release in index.html AND version every local
   script/stylesheet whenever publishing changes. Do not remove this checker. */
(function () {
'use strict';
var meta = document.querySelector('meta[name="aqui-release"]');
if (!meta) return;
var current = meta.content;
var busy = false, pending = null, edited = false, notice = null;
document.addEventListener('input', function () { edited = true; }, true);
document.addEventListener('change', function () { edited = true; }, true);
function reloadRelease() {
  if (!pending) return;
  var key = 'aqui-update-' + pending;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch (_) { /* Storage may be unavailable. The release comparison still applies. */ }
  var url = new URL(window.location.href);
  url.searchParams.set('release', pending);
  window.location.replace(url.href);
}
function offerUpdate() {
  if (notice) return;
  notice = document.createElement('button');
  notice.type = 'button';
  notice.className = 'btn';
  notice.textContent = document.documentElement.lang === 'es'
    ? 'Nueva versión disponible. Actualizar'
    : 'New version available. Update';
  notice.style.cssText = 'position:fixed;top:12px;left:16px;right:16px;z-index:10000;max-width:600px;margin:0 auto;box-shadow:0 2px 12px #0003';
  notice.onclick = reloadRelease;
  document.body.appendChild(notice);
}
async function checkRelease() {
  if (busy || document.visibilityState === 'hidden' || navigator.onLine === false) return;
  busy = true;
  try {
    var url = new URL('index.html', document.baseURI);
    url.searchParams.set('update-check', Date.now().toString());
    var response = await fetch(url.href, {cache:'no-store', credentials:'same-origin'});
    if (!response.ok) return;
    var page = new DOMParser().parseFromString(await response.text(), 'text/html');
    var next = page.querySelector('meta[name="aqui-release"]');
    if (!next || !/^[a-zA-Z0-9._-]+$/.test(next.content) || next.content === current) return;
    pending = next.content;
    // Never interrupt searches, forms, galleries, or another detail page.
    var home = !location.hash || location.hash === '#/' || location.hash === '#';
    var dialogOpen = document.querySelector('dialog[open], [aria-modal="true"]');
    var typing = document.activeElement && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (home && !edited && !dialogOpen && !typing) reloadRelease();
    else offerUpdate();
  } catch (_) { /* Keep the current app usable offline or if a check fails. */ }
  finally { busy = false; }
}
window.addEventListener('pageshow', checkRelease);
window.addEventListener('online', checkRelease);
document.addEventListener('visibilitychange', checkRelease);
setInterval(checkRelease, 60000);
checkRelease();
})();
