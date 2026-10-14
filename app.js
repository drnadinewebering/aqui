/* aquí - demo application.
   Plain JavaScript, no framework and no build step. Open index.html and it runs.

   Reading order:
     1. STRINGS      every piece of interface text, in both languages
     2. state        what the user has chosen
     3. search()     the one function that decides which brands match
     4. views        one render function per screen (home, browse, nearby,
                     results, brand, mission, for brands, legal)
     5. router       maps the address bar hash to a view
*/

(function () {
'use strict';

/* ------------------------------------------------------------------ *
 * 1. Interface text
 * ------------------------------------------------------------------ */
var STRINGS = {
  en: {
    tagline: 'Discover what Panama makes',
    whatLabel: 'What are you looking for?',
    whatPh: 'Search a product, for example kimchi',
    whereLabel: 'Where',
    locNotFound: 'Place not found. Try a nearby town.',
    locPick: 'Please pick a town from the list.',
    wherePh: 'Choose a town in Panama',
    useLocation: 'Use my location',
    locating: 'Finding your location…',
    locFound: 'Nearest town found: ',
    locDenied: 'No problem. Type a town instead.',
    locFail: 'Your location is not available right now. Type a town instead.',
    locNote: 'Used for this search only. Nothing is stored or sent to us.',
    radiusLabel: 'Radius',
    shipTitle: 'Ships to this location',
    shipSub: 'Include brands that deliver here',
    searchBtn: 'Search',
    browseTitle: 'Browse by category',
    browseAll: 'See all categories',
    missionTeaser: 'Supporting local',
    missionLink: 'Learn more about our mission',
    resultsTitle: 'Brands',
    resultCount: function (n) { return n === 1 ? '1 brand' : n + ' brands'; },
    nearby: 'Nearby',
    ships: 'Ships here',
    inTown: 'In town',
    km: 'km away',
    noneTitle: 'Nothing found yet',
    noneText: 'No brand matches this combination. You can widen the search.',
    tryRadius: function (r) { return 'Try a ' + r + ' km radius'; },
    tryShipping: 'Include brands that ship here',
    clearAll: 'Clear the search',
    back: 'Back',
    about: 'About',
    basedIn: 'Based in',
    productsLabel: 'Products',
    examplesLabel: 'Product Examples',
    posLabel: 'Where to buy',
    openMap: 'Open in Google Maps',
    shippingLabel: 'Shipping',
    shipNationwide: 'Nationwide shipping available',
    shipProvinces: 'Ships to: ',
    shipNone: 'No shipping. Available at the points of sale above.',
    linksLabel: 'Find this brand',
    website: 'Website',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    openLink: 'Opens outside aquí',
    legalTitle: 'Legal',
    legalSub: 'How aquí handles your information, and the terms of using it.',
    privacyName: 'Privacy Policy',
    privacySub: 'What the app collects and what it does not',
    termsName: 'Terms of Use',
    termsSub: 'What aquí is, and what it is not',
    tabHome: 'Home',
    tabBrowse: 'Browse',
    tabNear: 'Nearby',
    tabMission: 'Mission',
    nearTitle: 'What is nearby',
    nearSub: 'Pick a place and see everything available there. No product needed.',
    demoNote: 'Demo version. Brands marked "Example brand" are invented placeholders that show how the app works. Brands without that mark are real.',
    exampleTag: 'Example brand',
    forBrands: 'For Brands',
    brandsFormBtn: 'Introduce your brand',
    brandsFormNote: 'Opens outside aquí, in your browser.',
    brandsTeaserTitle: 'Do you make something in Panama?',
    brandsTeaserSub: 'See how a brand joins aquí',
    waIntro: function (name) { return 'Hi, I found ' + name + ' on aquí.'; },
    photoOf: function (name, n) { return name + ', photo ' + n; },
    closePhoto: 'Close',
    inCategory: 'In this category',
    alsoIn: 'also',
    anyProduct: 'Any product',
    anywhere: 'Anywhere in Panama'
  },
  es: {
    tagline: 'Descubre lo que hace Panamá',
    whatLabel: '¿Qué estás buscando?',
    whatPh: 'Busca un producto, por ejemplo kimchi',
    whereLabel: 'Dónde',
    locNotFound: 'Lugar no encontrado. Prueba un pueblo cercano.',
    locPick: 'Elige un pueblo de la lista.',
    wherePh: 'Elige un lugar en Panamá',
    useLocation: 'Usar mi ubicación',
    locating: 'Buscando tu ubicación…',
    locFound: 'Lugar más cercano: ',
    locDenied: 'No hay problema. Escribe un lugar.',
    locFail: 'Tu ubicación no está disponible ahora. Escribe un lugar.',
    locNote: 'Se usa solo para esta búsqueda. No se guarda ni se envía a nosotros.',
    radiusLabel: 'Radio',
    shipTitle: 'Envía a esta ubicación',
    shipSub: 'Incluir marcas que entregan aquí',
    searchBtn: 'Buscar',
    browseTitle: 'Explorar por categoría',
    browseAll: 'Ver todas las categorías',
    missionTeaser: 'Apoyando lo local',
    missionLink: 'Conoce más sobre nuestra misión',
    resultsTitle: 'Marcas',
    resultCount: function (n) { return n === 1 ? '1 marca' : n + ' marcas'; },
    nearby: 'Cerca',
    ships: 'Envía aquí',
    inTown: 'En el pueblo',
    km: 'km de distancia',
    noneTitle: 'Todavía no hay resultados',
    noneText: 'Ninguna marca coincide con esta combinación. Puedes ampliar la búsqueda.',
    tryRadius: function (r) { return 'Probar un radio de ' + r + ' km'; },
    tryShipping: 'Incluir marcas que envían aquí',
    clearAll: 'Limpiar la búsqueda',
    back: 'Atrás',
    about: 'Sobre la marca',
    basedIn: 'Con base en',
    productsLabel: 'Productos',
    examplesLabel: 'Ejemplos de productos',
    posLabel: 'Dónde comprar',
    openMap: 'Abrir en Google Maps',
    shippingLabel: 'Envíos',
    shipNationwide: 'Envíos disponibles en todo Panamá',
    shipProvinces: 'Envía a: ',
    shipNone: 'Sin envíos. Disponible en los puntos de venta de arriba.',
    linksLabel: 'Encuentra esta marca',
    website: 'Sitio web',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    openLink: 'Se abre fuera de aquí',
    legalTitle: 'Legal',
    legalSub: 'Cómo aquí maneja tu información, y los términos de uso.',
    privacyName: 'Política de Privacidad',
    privacySub: 'Qué recoge la app y qué no',
    termsName: 'Términos de Uso',
    termsSub: 'Qué es aquí, y qué no es',
    tabHome: 'Inicio',
    tabBrowse: 'Explorar',
    tabNear: 'Cerca',
    tabMission: 'Misión',
    nearTitle: 'Qué hay cerca',
    nearSub: 'Elige un lugar y mira todo lo disponible ahí. No hace falta un producto.',
    demoNote: 'Versión demo. Las marcas con la etiqueta "Marca de ejemplo" son inventadas, para mostrar cómo funciona la app. Las marcas sin esa etiqueta son reales.',
    exampleTag: 'Marca de ejemplo',
    forBrands: 'Para marcas',
    brandsFormBtn: 'Presenta tu marca',
    brandsFormNote: 'Se abre fuera de aquí, en tu navegador.',
    brandsTeaserTitle: '¿Haces algo en Panamá?',
    brandsTeaserSub: 'Mira cómo una marca entra en aquí',
    waIntro: function (name) { return 'Hola, encontré ' + name + ' en aquí.'; },
    photoOf: function (name, n) { return name + ', foto ' + n; },
    closePhoto: 'Cerrar',
    inCategory: 'En esta categoría',
    alsoIn: 'también',
    anyProduct: 'Cualquier producto',
    anywhere: 'Todo Panamá'
  }
};

var RADII = [10, 25, 50];

/* ------------------------------------------------------------------ *
 * 2. State
 * ------------------------------------------------------------------ */
var state = {
  lang: 'en',
  productId: null,
  productText: '',
  categoryId: null,
  placeId: null,
  placeText: '',
  radius: 25,
  shipping: false,
  geoMsg: '',
  locWarn: '',
  formHash: '#/'
};

function store(key, val) {
  try { localStorage.setItem('aqui.' + key, val); } catch (e) {}
}
function recall(key) {
  try { return localStorage.getItem('aqui.' + key); } catch (e) { return null; }
}

function loadPrefs() {
  var l = recall('lang');
  if (l === 'en' || l === 'es') state.lang = l;
  else if ((navigator.language || '').toLowerCase().indexOf('es') === 0) state.lang = 'es';

  var p = recall('place');
  if (p && placeById(p)) { state.placeId = p; state.placeText = placeName(placeById(p)); }
  var r = parseInt(recall('radius'), 10);
  if (RADII.indexOf(r) > -1) state.radius = r;
}

function t() { return STRINGS[state.lang]; }
function nameOf(o) { return o[state.lang] || o.en; }
function placeName(p) { return p ? (state.lang === 'es' ? p.es : p.en) : ''; }

/* ------------------------------------------------------------------ *
 * helpers
 * ------------------------------------------------------------------ */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function el(id) { return document.getElementById(id); }
function placeById(id) {
  for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === id) return PLACES[i];
  return null;
}
function productById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
  return null;
}
function categoryById(id) {
  for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
  return null;
}
function brandBySlug(slug) {
  for (var i = 0; i < BRANDS.length; i++) if (BRANDS[i].slug === slug) return BRANDS[i];
  return null;
}
function categoryIconFor(brand) {
  var c = categoryById(brand.categories[0]);
  return c ? c.icon : 'browse.png';
}
/* Category tile. Shows the photo named in categories.js when that file
   exists, and falls back to the line icon when it does not, so photos can be
   added one at a time without touching the code. A .jpg that is missing is
   retried once as .png before the icon takes over. */
function catTileHTML(c) {
  var icon = esc(c.icon);
  var photo = c.photo ? esc(c.photo) : '';
  var thumb = photo
    ? '<span class="cat-thumb"><img src="' + photo + '" alt="" ' +
        'data-icon="' + icon + '"></span>'
    : '<span class="cat-thumb is-icon"><img src="' + icon + '" alt=""></span>';
  return '<button type="button" class="cat" data-cat="' + esc(c.id) + '">' +
           thumb +
           '<span class="cat-label">' +
             '<span class="cat-name">' + esc(nameOf(c)) + '</span>' +
             chevronHTML('cat-chev') +
           '</span>' +
         '</button>';
}
/* thin chevron, drawn rather than typed so it matches at any size */
function chevronHTML(cls) {
  return '<svg class="' + cls + '" viewBox="0 0 8 13" fill="none" aria-hidden="true">' +
           '<path d="M1.25 1.25 L6.5 6.5 L1.25 11.75" stroke="currentColor" ' +
           'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
         '</svg>';
}
/* Back button for inner pages: drawn chevron plus the word. */
function backBtnHTML() {
  return '<button type="button" class="back" data-back="1">' +
           chevronHTML('back-chev') + esc(t().back) + '</button>';
}
/* Line icons for the brand profile. Each is one small drawing in the colour of
   the text around it; --icon in styles.css sets that colour. */
function lineIcon(inner) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
}
var ICONS = {
  pin: lineIcon('<path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
  store: lineIcon('<path d="M3.5 9.5 5.5 4h13l2 5.5"/>' +
    '<path d="M3.5 9.5a2.83 2.83 0 0 0 5.67 0 2.83 2.83 0 0 0 5.66 0 2.83 2.83 0 0 0 5.67 0"/>' +
    '<path d="M5 12.2v8.3h14v-8.3"/><path d="M10 20.5v-4.8h4v4.8"/>'),
  truck: lineIcon('<path d="M2.5 6.5H14V16H2.5z"/><path d="M14 9.5h4l3 3.5v3H14"/>' +
    '<circle cx="7" cy="17.5" r="2" style="fill:var(--ground)"/><circle cx="17" cy="17.5" r="2" style="fill:var(--ground)"/>'),
  instagram: lineIcon('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/>' +
    '<circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/>'),
  whatsapp: lineIcon('<path d="M3.6 20.4l1.2-4.3a8.5 8.5 0 1 1 3.2 3.1z"/>' +
    '<path d="M9.4 8.3c-.5.8-.2 2.1 1.1 3.6s2.8 2.2 3.8 1.9l.8-.8c.2-.2.2-.5 0-.7l-1.2-.9c-.2-.2-.5-.1-.7.1l-.4.4' +
    'c-.7-.3-1.5-1-1.9-1.8l.4-.4c.2-.2.2-.5.1-.7l-.8-1.3c-.2-.3-.6-.3-.8 0z"/>'),
  link: lineIcon('<path d="M10 13.5a4.5 4.5 0 0 0 6.4.4l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.7 1.7"/>' +
    '<path d="M14 10.5a4.5 4.5 0 0 0-6.4-.4l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.7-1.7"/>')
};
/* Initials for a brand with no logo file yet: the first letter of up to two
   main words, so "Sol de Tierra" gives ST. */
var SMALL_WORDS = ['a', 'and', 'de', 'del', 'e', 'el', 'la', 'las', 'los', 'of', 'the', 'y'];
function monogram(name) {
  var words = String(name).split(/\s+/).filter(function (w) {
    return w && SMALL_WORDS.indexOf(w.toLowerCase()) === -1;
  });
  if (!words.length) words = [String(name).charAt(0)];
  return words.slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
}
/* Called after every render that draws category tiles. */
function wireCatPhotos() {
  each('.cat-thumb img[data-icon]', function (img) {
    img.onerror = function () {
      var src = img.getAttribute('src') || '';
      if (/\.jpg$/i.test(src)) { img.src = src.replace(/\.jpg$/i, '.png'); return; }
      img.onerror = null;
      img.src = img.getAttribute('data-icon');
      if (img.parentNode) img.parentNode.className = 'cat-thumb is-icon';
    };
    /* an image that already failed before this ran */
    if (img.complete && img.naturalWidth === 0) img.onerror();
  });
}
/* Placeholder photos. Until real brand photos exist, each brand gets a steady
   tile colour drawn from the same warm range as the icons, so a list of
   results does not read as one flat block. */
var TINTS = ['#E7DCCB', '#E3D7CC', '#DEDACB', '#EADAD2', '#DDD9CE', '#E9E0D0'];
function tintFor(slug) {
  var n = 0;
  for (var i = 0; i < slug.length; i++) n = (n * 31 + slug.charCodeAt(i)) % 997;
  return TINTS[n % TINTS.length];
}
/* Result card thumbnail. A brand with a logo shows it; otherwise its photo;
   otherwise the tinted tile and category icon. */
function brandThumbHTML(b) {
  /* 14 Oct 2026: the logo comes first on result cards (Nadine's request). A
     brand with no logo yet keeps its photo, then the tinted tile. */
  if (b.logo) {
    return '<div class="thumb has-logo"><img src="' + esc(b.logo) + '" alt=""></div>';
  }
  var src = b.photo || b.hero;
  if (src) {
    return '<div class="thumb has-photo"><img src="' + esc(src) + '" alt=""></div>';
  }
  return '<div class="thumb" style="background:' + tintFor(b.slug) + '">' +
           '<img src="' + esc(categoryIconFor(b)) + '" alt=""></div>';
}
/* Wide band at the top of a profile (3:1). A brand uses its own `hero` photo
   when it has one, otherwise its cover `photo` cropped to the same band.
   `heroPos` (optional) says which part of the photo stays in view, for
   example "50% 30%". No photo at all: tinted band with the category icon. */
function brandHeroHTML(b) {
  var src = b.hero || b.photo;
  if (src) {
    return '<div class="hero has-photo"><img src="' + esc(src) + '" alt=""' +
           (b.heroPos ? ' style="object-position:' + esc(b.heroPos) + '"' : '') + '></div>';
  }
  return '<div class="hero" style="background:' + tintFor(b.slug) + '">' +
           '<img src="' + esc(categoryIconFor(b)) + '" alt=""></div>';
}
function exampleTagHTML(b) {
  return b.demo ? '<span class="tag example">' + esc(t().exampleTag) + '</span>' : '';
}
/* Full screen photo. One overlay, tap anywhere or press Escape to close. */
function openPhoto(src, label) {
  closePhoto();
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.id = 'lightbox';
  box.innerHTML = '<button type="button" class="lb-close" aria-label="' + esc(t().closePhoto) + '">×</button>' +
                  '<img src="' + esc(src) + '" alt="' + esc(label || '') + '">';
  box.onclick = closePhoto;
  document.body.appendChild(box);
  document.addEventListener('keydown', escClose);
}
function closePhoto() {
  var box = el('lightbox');
  if (box && box.parentNode) box.parentNode.removeChild(box);
  document.removeEventListener('keydown', escClose);
}
function escClose(e) { if (e.key === 'Escape') closePhoto(); }

/* straight line distance in km */
function distance(a, b) {
  var R = 6371, toRad = Math.PI / 180;
  var dLat = (b.lat - a.lat) * toRad;
  var dLng = (b.lng - a.lng) * toRad;
  var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(a.lat * toRad) * Math.cos(b.lat * toRad) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
function shipsTo(brand, province) {
  var s = brand.shipping;
  if (!s || s.type === 'none') return false;
  if (s.type === 'nationwide') return true;
  return s.provinces.indexOf(province) > -1;
}
/* strip accents so typing "penonome" still finds "Penonomé" */
function norm(s) {
  var v = String(s == null ? '' : s).toLowerCase();
  if (v.normalize) v = v.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return v;
}

/* ------------------------------------------------------------------ *
 * 3. Search
 *
 * Rule from the brief:
 *   filter by product and/or category first,
 *   then keep a brand if it has a point of sale inside the radius
 *   OR (shipping is on AND the brand ships to that province).
 *   Radius uses points of sale only, never the brand's own location.
 * ------------------------------------------------------------------ */
function search(q) {
  var list = BRANDS.filter(function (b) { return b.published; });

  if (q.productId) {
    list = list.filter(function (b) { return b.products.indexOf(q.productId) > -1; });
  }
  if (q.categoryId) {
    list = list.filter(function (b) { return b.categories.indexOf(q.categoryId) > -1; });
  }

  var place = q.placeId ? placeById(q.placeId) : null;

  if (!place) {
    return list.map(function (b) { return { brand: b, nearest: null, ships: false }; })
               .sort(function (a, b) { return a.brand.name.localeCompare(b.brand.name); });
  }

  var out = [];
  list.forEach(function (b) {
    var nearest = null;
    b.pos.forEach(function (p) {
      var d = distance(place, p);
      if (d <= q.radius && (!nearest || d < nearest.d)) nearest = { pos: p, d: d };
    });
    var ships = q.shipping && shipsTo(b, place.province);
    if (nearest || ships) out.push({ brand: b, nearest: nearest, ships: ships });
  });

  out.sort(function (a, b) {
    if (a.nearest && b.nearest) return a.nearest.d - b.nearest.d;
    if (a.nearest) return -1;
    if (b.nearest) return 1;
    return a.brand.name.localeCompare(b.brand.name);
  });
  return out;
}

/* ------------------------------------------------------------------ *
 * 4. Views
 * ------------------------------------------------------------------ */

function searchFormHTML(opts) {
  opts = opts || {};
  var s = t();
  var html = '';

  if (!opts.hideProduct) {
    html +=
      '<div class="field">' +
        '<label for="q">' + esc(s.whatLabel) + '</label>' +
        '<div class="input-wrap">' +
          '<img class="lead-icon" src="browse.png" alt="">' +
          '<input type="text" id="q" class="with-icon" autocomplete="off" ' +
                 'placeholder="' + esc(s.whatPh) + '" value="' + esc(state.productText) + '">' +
        '</div>' +
        '<div id="acProduct"></div>' +
      '</div>';
  }

  html +=
    '<div class="field">' +
      '<label for="loc">' + esc(s.whereLabel) + '</label>' +
      '<div class="input-wrap">' +
        '<img class="lead-icon" src="location.png" alt="">' +
        '<input type="text" id="loc" class="with-icon" autocomplete="off" ' +
               'placeholder="' + esc(s.wherePh) + '" value="' + esc(state.placeText) + '">' +
      '</div>' +
      '<div id="acPlace"></div>' +
      '<button type="button" class="geo-btn" id="geoBtn">' +
        '<img src="location.png" alt="">' + esc(s.useLocation) +
      '</button>' +
      '<p class="geo-msg' + (state.locWarn ? ' warn' : '') + '" id="geoMsg">' + esc(state.locWarn === 'pick' ? s.locPick : (state.locWarn ? s.locNotFound : (state.geoMsg || s.locNote))) + '</p>' +
    '</div>';

  html += '<div class="field"><label>' + esc(s.radiusLabel) + '</label><div class="chips" id="radiusChips">';
  RADII.forEach(function (r) {
    html += '<button type="button" class="chip' + (state.radius === r ? ' on' : '') +
            '" data-radius="' + r + '">' + r + ' km</button>';
  });
  html += '</div></div>';

  html +=
    '<div class="field">' +
      '<div class="toggle-row' + (state.shipping ? ' on' : '') + '" id="shipToggle" role="switch" ' +
           'aria-checked="' + (state.shipping ? 'true' : 'false') + '" tabindex="0">' +
        '<img src="shipping.png" alt="">' +
        '<span class="t-text"><b>' + esc(s.shipTitle) + '</b><span>' + esc(s.shipSub) + '</span></span>' +
        '<span class="switch"></span>' +
      '</div>' +
    '</div>';

  html += '<button type="button" class="btn" id="goBtn">' + esc(s.searchBtn) + '</button>';
  return html;
}

function viewHome() {
  var s = t();
  var html =
    '<p class="page-sub" style="margin-top:2px">' + esc(s.tagline) + '</p>' +
    '<div class="hero-photo"><img src="home-hero-wide.jpg" alt=""></div>' +
    '<div class="demo-note">' + esc(s.demoNote) + '</div>' +
    searchFormHTML({}) +
    '<div class="section-label">' + esc(s.browseTitle) + '</div>' +
    '<div class="cat-grid">';

  CATEGORIES.slice(0, 4).forEach(function (c) { html += catTileHTML(c); });
  html += '</div>' +
    '<button type="button" class="btn btn-quiet btn-chev" style="margin-top:13px" data-go="#/browse">' +
      esc(s.browseAll) + chevronHTML('btn-chev-icon') + '</button>' +
    /* 14 Oct 2026: the mission lives on Nadine's website. This card is the only
       way to it from the app, and it opens outside aquí. */
    '<a class="teaser" href="' + esc(CONTENT.missionUrl) + '" target="_blank" rel="noopener">' +
      '<img src="mission.png" alt="">' +
      '<span><b>' + esc(s.missionTeaser) + '</b><span>' + esc(s.missionLink) + '</span></span>' +
    '</a>' +
    footerHTML();

  render(html);
  wireSearchForm();
  wireCatButtons();
  wireCatPhotos();
}

function viewNearby() {
  var s = t();
  var html =
    '<h1 class="page-title">' + esc(s.nearTitle) + '</h1>' +
    '<p class="page-sub">' + esc(s.nearSub) + '</p>' +
    searchFormHTML({ hideProduct: true }) +
    footerHTML();
  render(html);
  wireSearchForm({ hideProduct: true });
}

function viewBrowse() {
  var s = t();
  var html =
    '<h1 class="page-title">' + esc(s.browseTitle) + '</h1>' +
    '<p class="page-sub">' + esc(s.tagline) + '</p>' +
    '<div class="cat-grid">';
  CATEGORIES.forEach(function (c) { html += catTileHTML(c); });
  html += '</div>' + footerHTML();
  render(html);
  wireCatButtons();
  wireCatPhotos();
}

function resultTagsHTML(row, b) {
  var s = t(), tags = '';
  if (b) tags += exampleTagHTML(b);
  if (row.nearest) {
    var d = row.nearest.d;
    var label = d < 1.5 ? s.inTown : (Math.round(d) + ' ' + s.km);
    tags += '<span class="tag solid">' + esc(row.nearest.pos.name) + ' · ' + esc(label) + '</span>';
  }
  if (row.ships) tags += '<span class="tag">' + esc(s.ships) + '</span>';
  return tags ? '<div class="why">' + tags + '</div>' : '';
}

function viewResults() {
  var s = t();
  var rows = search(state);
  var prod = state.productId ? productById(state.productId) : null;
  var cat = state.categoryId ? categoryById(state.categoryId) : null;
  var place = state.placeId ? placeById(state.placeId) : null;

  var heading = prod ? nameOf(prod) : (cat ? nameOf(cat) : s.resultsTitle);
  var sub = [];
  sub.push(place ? placeName(place) + ' · ' + state.radius + ' km' : s.anywhere);
  if (state.shipping) sub.push(s.ships.toLowerCase());

  var html =
    backBtnHTML() +
    '<div class="results-head">' +
      '<h2>' + esc(heading) + '</h2>' +
      '<span class="count">' + esc(s.resultCount(rows.length)) + '</span>' +
    '</div>' +
    '<p class="page-sub" style="margin-top:-8px">' + esc(sub.join(' · ')) + '</p>';

  if (!rows.length) {
    html += '<div class="empty"><h3>' + esc(s.noneTitle) + '</h3><p>' + esc(s.noneText) + '</p>';
    var bigger = null;
    for (var i = 0; i < RADII.length; i++) if (RADII[i] > state.radius) { bigger = RADII[i]; break; }
    if (place && bigger) {
      html += '<button type="button" class="btn" data-widen="' + bigger + '">' +
                esc(s.tryRadius(bigger)) + '</button>';
    }
    if (place && !state.shipping) {
      html += '<button type="button" class="btn btn-quiet" data-shipon="1">' + esc(s.tryShipping) + '</button>';
    }
    html += '<button type="button" class="btn btn-quiet" style="margin-top:8px" data-clear="1">' +
              esc(s.clearAll) + '</button></div>';
  } else {
    rows.forEach(function (row) {
      var b = row.brand;
      html +=
        '<div class="card" data-brand="' + esc(b.slug) + '">' +
          brandThumbHTML(b) +
          '<div class="card-body">' +
            '<h3>' + esc(b.name) + '</h3>' +
            '<p>' + esc(nameOf(b.tagline)) + '</p>' +
            resultTagsHTML(row, b) +
          '</div>' +
        '</div>';
    });
  }

  html += footerHTML();
  render(html);

  each('[data-brand]', function (n) {
    n.onclick = function () { location.hash = '#/brand/' + n.getAttribute('data-brand'); };
  });
  each('[data-widen]', function (n) {
    n.onclick = function () {
      state.radius = parseInt(n.getAttribute('data-widen'), 10);
      store('radius', state.radius); viewResults();
    };
  });
  each('[data-shipon]', function (n) {
    n.onclick = function () { state.shipping = true; viewResults(); };
  });
  each('[data-clear]', function (n) {
    n.onclick = function () {
      state.productId = null; state.productText = '';
      state.categoryId = null; state.shipping = false;
      location.hash = '#/';
    };
  });
  each('[data-back]', function (n) {
    n.onclick = function () { history.back(); };
  });
}

/* One row of the profile (Where to buy, Shipping). With `detail` it is a
   button that opens in place and shows a chevron; without it the row is plain
   text, because a chevron with nothing behind it would be a dead button. */
function rowHTML(key, icon, label, lines, detail) {
  var head = '<span class="row-icon">' + icon + '</span>' +
             '<span class="row-text"><b>' + esc(label) + '</b>' + lines + '</span>';
  if (!detail) return '<div class="row"><div class="row-top">' + head + '</div></div>';
  return '<div class="row">' +
           '<button type="button" class="row-top" aria-expanded="false" aria-controls="row-' + key + '">' +
             head + chevronHTML('row-chev') +
           '</button>' +
           '<div class="row-detail" id="row-' + key + '" hidden>' + detail + '</div>' +
         '</div>';
}
/* Clean a brand's links. Returns only values that are real and of the right
   kind: an Instagram handle, a WhatsApp number (digits), a website address.
   Anything else comes back empty and its button is not drawn. */
function cleanLinks(raw) {
  var lk = raw || {};
  var ig = String(lk.instagram || '').trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/[\/?#].*$/, '');
  if (!/^[A-Za-z0-9._]{1,30}$/.test(ig)) ig = '';

  var waRaw = String(lk.whatsapp || '').trim();
  var wa = /wa\.me\/c\//i.test(waRaw) ? '' : waRaw.replace(/[^0-9]/g, '');
  if (wa.length < 7 || wa.length > 15) wa = '';

  var web = String(lk.website || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  var host = web.split(/[\/?#]/)[0].toLowerCase();
  var wrongKind = /(^|\.)(wa\.me|whatsapp\.com|instagram\.com|instagr\.am)$/.test(host);
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) || wrongKind) web = '';

  return { instagram: ig, whatsapp: wa, website: web };
}

/* One round "Find this brand" button. All three open outside the app. */
function findHTML(href, icon, label, aria) {
  return '<a href="' + esc(href) + '" target="_blank" rel="noopener" aria-label="' +
           esc(aria + ', ' + t().openLink.toLowerCase()) + '">' +
           '<span class="find-dot">' + icon + '</span><span>' + esc(label) + '</span></a>';
}

function viewBrand(slug) {
  var s = t();
  var b = brandBySlug(slug);
  if (!b) { location.hash = '#/'; return; }

  var es = state.lang === 'es';
  /* base is optional: a brand that has not said where it is based simply has no
     location line under its name, rather than a guessed one. */
  var baseTown = b.base ? (es ? b.base.townEs : b.base.town) : '';
  /* One line per category, so a name such as "Home & Living" never breaks
     in the middle when a brand sits in more than one category. */
  var cats = b.categories.map(function (id) {
    var c = categoryById(id);
    return c ? '<span>' + esc(nameOf(c)) + '</span>' : '';
  }).join('');

  /* Head: round logo (initials until the brand has one), name, base, category. */
  var logoHTML = b.logo
    ? '<div class="brand-logo"><img src="' + esc(b.logo) + '" alt=""></div>'
    : '<div class="brand-logo mono" style="background:' + tintFor(b.slug) + '" aria-hidden="true">' +
        esc(monogram(b.name)) + '</div>';
  var headHTML =
    '<div class="brand-head">' + logoHTML +
      '<div class="brand-head-text">' +
        '<h1 class="brand-name">' + esc(b.name) + '</h1>' +
        (b.base ? '<p class="brand-loc">' + ICONS.pin + '<span>' + esc(baseTown) + ', ' + esc(b.base.province) + '</span></p>' : '') +
        '<p class="brand-cat">' + cats + '</p>' +
        (b.demo ? '<div class="brand-flags">' + exampleTagHTML(b) + '</div>' : '') +
      '</div>' +
    '</div>';

  /* About text: a blank line in the data starts a new paragraph. */
  var aboutHTML = String(nameOf(b.about)).split(/\n\s*\n/).map(function (para) {
    return '<p>' + esc(para) + '</p>';
  }).join('');

  /* Product Examples: the brand's photos. Tap one to see it full screen. */
  var examplesHTML = '';
  if (b.photos && b.photos.length) {
    examplesHTML =
      '<div class="sec"><h2>' + esc(s.examplesLabel) + '</h2><div class="examples">' +
      b.photos.map(function (src, i) {
        return '<button type="button" class="g-item" data-photo="' + esc(src) +
               '" aria-label="' + esc(s.photoOf(b.name, i + 1)) + '">' +
               '<img src="' + esc(src) + '" alt="" loading="lazy"></button>';
      }).join('') +
      '</div></div>';
  }

  var pills = b.products.map(function (id) {
    var p = productById(id);
    return p ? '<span class="pill">' + esc(nameOf(p)) + '</span>' : '';
  }).join('');
  var productsHTML = pills
    ? '<div class="sec"><h2>' + esc(s.productsLabel) + '</h2><div class="pills">' + pills + '</div></div>'
    : '';

  /* Where to buy: a heading, then one row per point of sale, then Shipping in
     the same list. Each row shows the shop name and, under it, the days the
     brand gave (pos.note, for example "Every Friday") or else the town.
     A row opens in place only when there is more to show: a street address,
     or the town once the days have taken its place. A row with nothing
     behind it has no arrow, so no arrow is ever a dead button. */
  var townOf = function (p) { return es ? p.townEs : p.town; };
  var rows = '';
  b.pos.forEach(function (p, i) {
    var sub = p.note ? nameOf(p.note) : townOf(p);
    var mapsOk = /^https:\/\/(www\.)?google\.com\/maps\//.test(p.maps || '');
    var detail = (p.address || p.note || mapsOk)
      ? (p.address ? '<span>' + esc(p.address) + '</span>' : '') +
        '<span>' + esc(townOf(p) + ', ' + p.province) + '</span>' +
        (mapsOk ? '<a class="map-link" href="' + esc(p.maps) + '" target="_blank" rel="noopener">' +
                  esc(s.openMap) + '</a>' : '')
      : '';
    rows += rowHTML('buy' + i, ICONS.store, p.name, '<span>' + esc(sub) + '</span>', detail);
  });
  /* Shipping text: the brand's own words (shipping.note) when it gave some,
     otherwise a standard line built from shipping.type. */
  var shipText = b.shipping.note ? nameOf(b.shipping.note)
               : b.shipping.type === 'nationwide' ? s.shipNationwide
               : b.shipping.type === 'none' ? s.shipNone
               : s.shipProvinces + b.shipping.provinces.join(', ');
  rows += rowHTML('ship', ICONS.truck, s.shippingLabel, '<span>' + esc(shipText) + '</span>', '');
  /* A brand with no place and no shipping has nothing to show here. */
  var buyHTML = (b.pos.length || b.shipping.type !== 'none')
    ? '<div class="sec"><h2>' + esc(s.posLabel) + '</h2><div class="rows">' + rows + '</div></div>'
    : '';

  /* Find this brand: Instagram, WhatsApp, Website. A button shows only for a
     link the brand really has, and each button opens only its own kind of
     link. cleanLinks() drops anything blank, malformed or of the wrong kind
     (a WhatsApp catalog or an Instagram page in the website field), so a
     profile never shows an icon that points somewhere else. */
  var find = '';
  var lk = cleanLinks(b.links);
  if (lk.instagram) {
    find += findHTML('https://instagram.com/' + lk.instagram, ICONS.instagram, s.instagram,
                     s.instagram + ' @' + lk.instagram);
  }
  if (lk.whatsapp) {
    /* The chat opens with a short greeting already typed, so the brand can see
       the contact came through aquí. The person can edit or delete it. */
    find += findHTML('https://wa.me/' + lk.whatsapp +
                     '?text=' + encodeURIComponent(s.waIntro(b.name)),
                     ICONS.whatsapp, s.whatsapp, s.whatsapp + ' +' + lk.whatsapp);
  }
  if (lk.website) {
    find += findHTML('https://' + lk.website, ICONS.link, s.website, s.website + ' ' + lk.website);
  }

  render(
    backBtnHTML() +
    brandHeroHTML(b) +
    headHTML +
    '<div class="sec"><h2>' + esc(s.about) + '</h2><div class="about">' + aboutHTML + '</div></div>' +
    examplesHTML +
    productsHTML +
    buyHTML +
    (find ? '<div class="sec"><h2>' + esc(s.linksLabel) + '</h2><div class="find">' + find + '</div></div>' : '') +
    footerHTML()
  );

  each('[data-back]', function (n) { n.onclick = function () { history.back(); }; });
  each('[data-photo]', function (n) {
    n.onclick = function () { openPhoto(n.getAttribute('data-photo'), n.getAttribute('aria-label')); };
  });
  each('button.row-top', function (btn) {
    btn.onclick = function () {
      var row = btn.parentNode;
      var open = !row.classList.contains('open');
      row.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      el(btn.getAttribute('aria-controls')).hidden = !open;
    };
  });
}

function docPageHTML(doc) {
  var html = '';
  if (doc.updated) html += '<p class="updated">' + esc(doc.updated) + '</p>';
  if (doc.lead) html += '<p class="lead">' + esc(doc.lead) + '</p>';
  html += '<div class="doc">';
  doc.sections.forEach(function (sec) {
    html += '<h3>' + esc(sec.h) + '</h3>';
    sec.p.forEach(function (para) { html += '<p>' + esc(para) + '</p>'; });
  });
  html += '</div>';
  return html;
}

function viewMission() {
  var s = t();
  var doc = CONTENT.mission[state.lang];
  render(
    '<h1 class="page-title">' + esc(doc.title) + '</h1>' +
    docPageHTML(doc) +
    '<div class="teaser" data-go="#/brands">' +
      '<img src="mission.png" alt="">' +
      '<span><b>' + esc(s.brandsTeaserTitle) + '</b><span>' + esc(s.brandsTeaserSub) + '</span></span>' +
    '</div>' +
    footerHTML()
  );
}

/* For brands: what aquí offers a brand and the link to the profile form.
   The form is a Jotform page and opens outside the app. */
function viewForBrands() {
  var s = t();
  var doc = CONTENT.brands[state.lang];
  var url = (state.lang === 'es' && CONTENT.brands.formUrlEs) ? CONTENT.brands.formUrlEs : CONTENT.brands.formUrl;
  render(
    '<h1 class="page-title">' + esc(doc.title) + '</h1>' +
    docPageHTML(doc) +
    '<a class="btn btn-link" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      esc(s.brandsFormBtn) + '</a>' +
    '<p class="hint" style="text-align:center">' + esc(s.brandsFormNote) + '</p>' +
    footerHTML()
  );
}

function viewLegalIndex() {
  var s = t();
  render(
    '<h1 class="page-title">' + esc(s.legalTitle) + '</h1>' +
    '<p class="page-sub">' + esc(s.legalSub) + '</p>' +
    '<div class="legal-list">' +
      '<div class="legal-item" data-go="#/legal/privacy">' +
        '<span><b>' + esc(s.privacyName) + '</b><span>' + esc(s.privacySub) + '</span></span></div>' +
      '<div class="legal-item" data-go="#/legal/terms">' +
        '<span><b>' + esc(s.termsName) + '</b><span>' + esc(s.termsSub) + '</span></span></div>' +
    '</div>' + footerHTML()
  );
}

function viewLegalDoc(which) {
  var s = t();
  var doc = CONTENT[which][state.lang];
  render(
    backBtnHTML() +
    '<h1 class="page-title">' + esc(doc.title) + '</h1>' +
    docPageHTML(doc) + footerHTML()
  );
  each('[data-back]', function (n) { n.onclick = function () { history.back(); }; });
}

function footerHTML() {
  var s = t();
  return '<div class="mini-foot">' +
    /* 14 Oct 2026: For Brands opens the website page directly. */
    '<a href="' + esc(CONTENT.brands.formUrl) + '" target="_blank" rel="noopener">' + esc(s.forBrands) + '</a>' +
    '<a href="#/legal/privacy">' + esc(s.privacyName) + '</a>' +
    '<a href="#/legal/terms">' + esc(s.termsName) + '</a>' +
  '</div>';
}

/* ------------------------------------------------------------------ *
 * wiring
 * ------------------------------------------------------------------ */
function each(sel, fn) {
  var nodes = document.querySelectorAll(sel);
  for (var i = 0; i < nodes.length; i++) fn(nodes[i]);
}

function render(html) {
  var v = el('view');
  v.innerHTML = html;
  window.scrollTo(0, 0);
  each('[data-go]', function (n) {
    n.onclick = function () { location.hash = n.getAttribute('data-go'); };
  });
}

function wireCatButtons() {
  each('[data-cat]', function (n) {
    n.onclick = function () {
      state.categoryId = n.getAttribute('data-cat');
      state.productId = null; state.productText = '';
      location.hash = '#/results';
    };
  });
}

function autocomplete(inputId, boxId, getItems, onPick, emptyMsg) {
  var input = el(inputId), box = el(boxId);
  if (!input || !box) return;

  function close() { box.innerHTML = ''; }

  input.addEventListener('input', function () {
    var q = norm(input.value.trim());
    if (q.length < 1) { close(); return; }
    var items = getItems(q).slice(0, 7);
    if (!items.length) {
      /* Nothing matched. For the Where field, say so and point to the next
         biggest city, so the person is never left with a blank list. */
      /* The message shows once, in the line under the field (setLocWarn),
         so the dropdown just closes. */
      close();
      return;
    }
    var html = '<div class="ac">';
    items.forEach(function (it, i) {
      html += '<div data-i="' + i + '">' + esc(it.label) +
              (it.note ? '<span class="ac-note">' + esc(it.note) + '</span>' : '') + '</div>';
    });
    html += '</div>';
    box.innerHTML = html;
    each('#' + boxId + ' .ac div[data-i]', function (n) {
      n.onclick = function () {
        var it = items[parseInt(n.getAttribute('data-i'), 10)];
        input.value = it.label;
        onPick(it);
        close();
      };
    });
  });

  input.addEventListener('blur', function () { setTimeout(close, 180); });
}

/* Places that match what was typed, best match first. q must already be
   passed through norm(). Used by the suggestions and by the not found check. */
function findPlaces(q) {
    var out = [];
    PLACES.forEach(function (p) {
      var name = norm(placeName(p)), rank = -1, note = p.province;
      if (name.indexOf(q) === 0) rank = 0;
      else if (name.indexOf(' ' + q) > -1) rank = 1;
      else if (name.indexOf(q) > -1) rank = 2;
      else {
        /* Other names for the place, such as a Panama City neighborhood. */
        (p.alias || []).forEach(function (a) {
          if (rank < 0 && norm(a).indexOf(q) > -1) { rank = 3; note = a + ', ' + p.province; }
        });
        if (rank < 0 && norm(p.province).indexOf(q) > -1) rank = 4;
      }
      if (rank > -1) out.push({ id: p.id, label: placeName(p), note: note, rank: rank, n: out.length });
    });
    /* Best match first: name starts with what was typed, then a word that
       starts with it, then anywhere in the name, then other names, then the
       province. Equal ranks keep the list order. */
    out.sort(function (a, b) { return a.rank - b.rank || a.n - b.n; });
    return out;
}

function setLocWarn(kind) {
  var s = t(), gm = el('geoMsg');
  state.locWarn = kind || '';
  if (gm) {
    gm.classList.toggle('warn', !!kind);
    gm.textContent = kind === 'pick' ? s.locPick : (kind ? s.locNotFound : (state.geoMsg || s.locNote));
  }
}

function wireSearchForm(opts) {
  opts = opts || {};
  var s = t();
  state.formHash = location.hash || '#/';

  if (!opts.hideProduct) {
    autocomplete('q', 'acProduct', function (q) {
      var out = [];
      PRODUCTS.forEach(function (p) {
        var here = norm(nameOf(p)), there = norm(state.lang === 'es' ? p.en : p.es);
        if (here.indexOf(q) > -1) {
          out.push({ id: p.id, label: nameOf(p), n: out.length,
                     rank: here.indexOf(q) === 0 ? 0 : (here.indexOf(' ' + q) > -1 ? 1 : 2) });
        } else if (there.indexOf(q) > -1) {
          out.push({ id: p.id, label: nameOf(p), note: (state.lang === 'es' ? p.en : p.es), n: out.length,
                     rank: there.indexOf(q) === 0 ? 3 : (there.indexOf(' ' + q) > -1 ? 4 : 5) });
        }
      });
      /* Best match first: a name that starts with what was typed, then a name
         with a word that starts with it, then anywhere inside it. The other
         language's names come after those. Equal ranks keep the list order.
         So "jam" suggests Jam & Marmalade before Hibiscus Tea (whose Spanish
         name, flor de Jamaica, also contains it). */
      out.sort(function (a, b) { return a.rank - b.rank || a.n - b.n; });
      return out;
    }, function (it) {
      state.productId = it.id;
      state.productText = it.label;
    });

    var qi = el('q');
    if (qi) qi.addEventListener('input', function () {
      state.productText = qi.value;
      if (!qi.value.trim()) state.productId = null;
    });
  }

  autocomplete('loc', 'acPlace', findPlaces, function (it) {
    state.placeId = it.id;
    state.placeText = it.label;
    state.geoMsg = '';
    setLocWarn('');
    store('place', it.id);
  }, function () { return t().locNotFound; });

  var li = el('loc');
  if (li && state.locWarn) { try { li.focus({ preventScroll: false }); } catch (e) { li.focus(); } }
  if (li) li.addEventListener('input', function () {
    state.placeText = li.value;
    /* Typing again un-picks the place, so only a place chosen from the list counts. */
    state.placeId = null;
    /* Say so right away when nothing in the list matches what was typed. */
    state.geoMsg = '';
    var typedNow = norm(li.value.trim());
    setLocWarn(typedNow && !findPlaces(typedNow).length ? 'notFound' : '');
    if (!li.value.trim()) { try { localStorage.removeItem('aqui.place'); } catch (e) {} }
  });

  /* Use my location.
     Reads the browser position once, matches it to the nearest town in
     places.js, and throws the coordinates away. Nothing is stored. */
  var geo = el('geoBtn'), msg = el('geoMsg');
  if (geo) geo.onclick = function () {
    if (!navigator.geolocation) { msg.textContent = s.locFail; return; }
    geo.disabled = true;
    msg.textContent = s.locating;
    navigator.geolocation.getCurrentPosition(function (pos) {
      var here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      var best = null;
      PLACES.forEach(function (p) {
        var d = distance(here, p);
        if (!best || d < best.d) best = { p: p, d: d };
      });
      state.locWarn = '';
      state.placeId = best.p.id;
      state.placeText = placeName(best.p);
      store('place', best.p.id);
      el('loc').value = state.placeText;
      state.geoMsg = s.locFound + state.placeText + '. ' + s.locNote;
      msg.textContent = state.geoMsg;
      geo.disabled = false;
    }, function (err) {
      msg.textContent = (err && err.code === 1) ? s.locDenied : s.locFail;
      geo.disabled = false;
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  };

  each('#radiusChips .chip', function (n) {
    n.onclick = function () {
      state.radius = parseInt(n.getAttribute('data-radius'), 10);
      store('radius', state.radius);
      each('#radiusChips .chip', function (m) { m.classList.remove('on'); });
      n.classList.add('on');
    };
  });

  var tg = el('shipToggle');
  if (tg) {
    var flip = function () {
      state.shipping = !state.shipping;
      tg.classList.toggle('on', state.shipping);
      tg.setAttribute('aria-checked', state.shipping ? 'true' : 'false');
    };
    tg.onclick = flip;
    tg.onkeydown = function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
    };
  }

  var go = el('goBtn');
  if (go) go.onclick = function () {
    if (opts.hideProduct) { state.productId = null; state.productText = ''; state.categoryId = null; }
    location.hash = '#/results';
  };
}

/* ------------------------------------------------------------------ *
 * language + tabs
 * ------------------------------------------------------------------ */
function setLang(l) {
  state.lang = l;
  store('lang', l);
  document.documentElement.lang = l;
  if (state.productId) state.productText = nameOf(productById(state.productId));
  if (state.placeId) state.placeText = placeName(placeById(state.placeId));
  paintLang();
  paintTabs();
  route();
}

function paintLang() {
  each('.lang-btn', function (b) {
    b.classList.toggle('on', b.getAttribute('data-lang') === state.lang);
  });
}

/* Tab bar icons (14 Oct 2026, to match Nadine's mock up): white line icons that
   take their colour from the tab. The home icon fills in when it is the open tab. */
var TAB_SVG = {
  home: function (on) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11.2 12 4l8.5 7.2V19a1.5 1.5 0 0 1-1.5 1.5h-4v-5.7h-6v5.7H5A1.5 1.5 0 0 1 3.5 19z" ' +
           (on ? 'fill="currentColor" ' : 'fill="none" ') + 'stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
  },
  browse: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.3" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
           '<path d="m15.4 15.4 5 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  },
  near: function () {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2s-6.8-6.2-6.8-11.2a6.8 6.8 0 0 1 13.6 0c0 5-6.8 11.2-6.8 11.2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' +
           '<circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
  }
};
var TABS = [
  { hash: '#/',        svg: 'home',   key: 'tabHome' },
  { hash: '#/browse',  svg: 'browse', key: 'tabBrowse' },
  { hash: '#/nearby',  svg: 'near',   key: 'tabNear' }
  /* The Mission tab was removed on 14 Oct 2026: the mission now lives on the
     website, reached from the Supporting local card on the home screen. The
     in-app Mission page (viewMission, route #/mission) is kept but not linked. */
];

function paintTabs() {
  var s = t(), cur = location.hash || '#/';
  var html = '';
  TABS.forEach(function (tab) {
    var on = (tab.hash === '#/' && (cur === '#/' || cur === '')) ||
             (tab.hash !== '#/' && cur.indexOf(tab.hash) === 0);
    html += '<button type="button" class="tab' + (on ? ' on' : '') + '" data-go="' + tab.hash + '">' +
              TAB_SVG[tab.svg](on) + '<span>' + esc(s[tab.key]) + '</span></button>';
  });
  el('tabbar').innerHTML = html;
  each('#tabbar [data-go]', function (n) {
    n.onclick = function () { location.hash = n.getAttribute('data-go'); };
  });
}

/* ------------------------------------------------------------------ *
 * 5. Router
 * ------------------------------------------------------------------ */
function route() {
  var h = location.hash || '#/';
  closePhoto();
  paintTabs();

  if (h.indexOf('#/brand/') === 0) return viewBrand(h.slice('#/brand/'.length));
  if (h === '#/results') {
    /* A place was typed but not chosen from the list. If it matches a listed
       name exactly, use it. If not, go back to the form and ask for a nearby
       town, so a search never quietly turns into "anywhere in Panama". */
    if (!state.placeId && String(state.placeText || '').trim()) {
      var typed = norm(state.placeText.trim());
      for (var i = 0; i < PLACES.length; i++) {
        if (norm(PLACES[i].en) === typed || norm(PLACES[i].es) === typed) {
          state.placeId = PLACES[i].id; state.placeText = placeName(PLACES[i]); break;
        }
      }
      if (!state.placeId) {
        state.locWarn = findPlaces(typed).length ? 'pick' : 'notFound';
        location.replace(state.formHash || '#/');
        return;
      }
    }
    return viewResults();
  }
  if (h === '#/browse') return viewBrowse();
  if (h === '#/nearby') return viewNearby();
  if (h === '#/mission') return viewMission();
  if (h === '#/brands') return viewForBrands();
  if (h === '#/legal') return viewLegalIndex();
  if (h === '#/legal/privacy') return viewLegalDoc('privacy');
  if (h === '#/legal/terms') return viewLegalDoc('terms');
  return viewHome();
}

window.addEventListener('hashchange', route);

loadPrefs();
document.documentElement.lang = state.lang;
each('.lang-btn', function (b) {
  b.onclick = function () { setLang(b.getAttribute('data-lang')); };
});
paintLang();
route();

})();
