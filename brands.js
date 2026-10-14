/* aquí - brands. The brand is the central public entity in the app.

   Shape of one brand:
     slug        url id
     name        display name, same in both languages
     tagline     one line, en / es
     about       About section, en / es
     categories  one or more category ids from categories.js
     products    product ids from products.js (many to many)
     base        where the brand is based or produces. NOT used for radius search.
                 Optional: leave it out when the brand has not said, and the
                 profile shows no location line (Deli Saludable today).
     pos         retail points of sale. THESE are what the radius search uses.
                 each has a shop name, a town, and its own coordinates.
     shipping    { type: 'nationwide' | 'provinces' | 'none', provinces: [...],
                   note: { en, es } }
                 type and provinces decide the search. note is optional: the
                 brand's own words for the Shipping row on the profile, for
                 example "All over Panama via Uno Express and Fletes Chavales".
                 Without a note the row says "Nationwide shipping available"
                 or lists the provinces.
     links       website, instagram, whatsapp

     demo        true on the invented placeholder brands. They show a small
                 "Example brand" tag in the app. Real brands have no demo flag.
     photo       cover image file (3:2 works best). Shown on the result card, and
                 at the top of the profile unless the brand has a hero. Leave it
                 out and the brand gets a tinted tile with its category icon.
     hero        optional wide photo for the top of the profile, 3 to 1 (for
                 example 1500 x 500 pixels): the brand's products styled on one
                 surface. Without it the profile crops the cover photo to the
                 same wide band.
     heroPos     optional, which part of the photo stays in view when it is
                 cropped to the band, for example "50% 30%" (left to right, top
                 to bottom). Default is the centre.
     photos      "Product Examples" on the profile: four across, more scroll
                 sideways, tap one to open it full screen
     logo        logo file, shown in a round frame beside the brand name. Square,
                 with the mark in the middle. Without one the profile shows the
                 brand's initials in a tinted circle.
     pos.note    optional, { en, es }: the days or hours, shown under the shop
                 name in place of the town, for example
                 { en: "Every Friday", es: "Todos los viernes" }
     pos.address optional street line, shown when the row is opened

   On the profile, Where to buy is one row per point of sale. A row shows an
   arrow and opens in place only when it has more to show: an address, or the
   town once pos.note has taken its place. A row with nothing behind it has no
   arrow.

   The invented brands use generated tiles instead of photos, so nothing there
   claims to be real. Castel Woodshop (24 Sep 2026) is the first real brand:
   text and photos come from the brand's own profile form. Tierra Viva (2 Oct
   2026) is the second and Deli Saludable (2 Oct 2026) the third.

   LINKS RULE (14 Oct 2026, for every brand profile, always): a button under
   "Find this brand" shows only for a link the brand really has, and opens
   only its own kind of link.
     instagram  the handle, with or without @, or the instagram.com address
     whatsapp   the number, for example "+507 6050 5505"
     website    the brand's own site, for example "www.example.com"
   Leave a link as "" when the brand does not have it. A WhatsApp catalog
   (wa.me/c/...) is not a website, so it does not go in website. The app also
   ignores anything blank, malformed or of the wrong kind, so no icon ever
   points somewhere else. */

window.BRANDS = [
  {
    slug: "fermentos-del-istmo",
    name: "Fermentos del Istmo",
    tagline: { en: "Small batch ferments from Panama City", es: "Fermentos artesanales de Ciudad de Panamá" },
    about: { en: "A two person fermentation kitchen in Casco Antiguo. Everything is made in small batches with vegetables bought the same week from growers in Cerro Punta and Coclé. Jars are returnable.",
             es: "Una cocina de fermentación de dos personas en el Casco Antiguo. Todo se elabora en lotes pequeños con vegetales comprados la misma semana a productores de Cerro Punta y Coclé. Los frascos son retornables." },
    categories: ["food"],
    products: ["kimchi", "kombucha", "sauerkraut", "water-kefir"],
    base: { town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9824, lng: -79.5199 },
    pos: [
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9784, lng: -79.5239 },
      { name: "Feria de El Valle", town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.6, lng: -80.1333 },
      { name: "Tienda Natural Penonomé", town: "Penonomé", townEs: "Penonomé", province: "Coclé", lat: 8.5207, lng: -80.346 }
    ],
    shipping: { type: "provinces", provinces: ["Panamá", "Panamá Oeste", "Coclé"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "fermentos-azuero",
    name: "Fermentos Azuero",
    tagline: { en: "Ferments and kombucha from Herrera", es: "Fermentos y kombucha de Herrera" },
    about: { en: "Started as a home project during the rainy season and grew into a small production room behind the family house in Chitré. Deliveries go out twice a week by bus to the interior.",
             es: "Comenzó como un proyecto casero en la temporada de lluvias y creció hasta convertirse en una pequeña sala de producción detrás de la casa familiar en Chitré. Los envíos salen dos veces por semana en bus hacia el interior." },
    categories: ["food"],
    products: ["kimchi", "sauerkraut", "kombucha"],
    base: { town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9667, lng: -80.4333 },
    pos: [
      { name: "Súper Natural Chitré", town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9627, lng: -80.4373 },
      { name: "Feria de Las Tablas", town: "Las Tablas", townEs: "Las Tablas", province: "Los Santos", lat: 7.7667, lng: -80.2833 }
    ],
    shipping: { type: "provinces", provinces: ["Herrera", "Los Santos", "Coclé", "Veraguas"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "kimchi-volcan",
    name: "Kimchi Volcán",
    tagline: { en: "Highland kimchi and chili ferments", es: "Kimchi y fermentos de chile de tierras altas" },
    about: { en: "Cabbage, radish and chili grown at 1,600 metres in Volcán. The cool air lets the ferment go slowly, which is where the flavour comes from. Sold only in Chiriquí for now.",
             es: "Repollo, rábano y chile cultivados a 1,600 metros en Volcán. El aire frío permite una fermentación lenta, y de ahí viene el sabor. Por ahora se vende solo en Chiriquí." },
    categories: ["food"],
    products: ["kimchi", "sauerkraut", "hot-sauce"],
    base: { town: "Volcán", townEs: "Volcán", province: "Chiriquí", lat: 8.7833, lng: -82.6333 },
    pos: [
      { name: "Mercado de Volcán", town: "Volcán", townEs: "Volcán", province: "Chiriquí", lat: 8.7793, lng: -82.6373 },
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.78, lng: -82.44 },
      { name: "Orgánica David", town: "David", townEs: "David", province: "Chiriquí", lat: 8.4373, lng: -82.4293 }
    ],
    shipping: { type: "provinces", provinces: ["Chiriquí"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "masa-madre-boquete",
    name: "Masa Madre Boquete",
    tagline: { en: "Sourdough baked the same morning", es: "Masa madre horneada la misma mañana" },
    about: { en: "A wood fired oven above the Caldera road. The starter has been going since 2019. Loaves come out Thursday and Saturday and are usually gone by ten.",
             es: "Un horno de leña sobre el camino a Caldera. La masa madre vive desde 2019. Los panes salen jueves y sábado, y normalmente se agotan antes de las diez." },
    categories: ["food"],
    products: ["sourdough", "granola"],
    base: { town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.78, lng: -82.44 },
    pos: [
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.776, lng: -82.444 },
      { name: "Café Central David", town: "David", townEs: "David", province: "Chiriquí", lat: 8.4333, lng: -82.4333 }
    ],
    shipping: { type: "none", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "cacao-portobelo",
    name: "Cacao Portobelo",
    tagline: { en: "Bean to bar cacao from the Caribbean coast", es: "Cacao de grano a barra de la costa caribeña" },
    about: { en: "Cacao is fermented and dried on the coast, then stone ground in Portobelo. The bars carry the name of the farm they came from.",
             es: "El cacao se fermenta y se seca en la costa, y luego se muele en piedra en Portobelo. Cada barra lleva el nombre de la finca de origen." },
    categories: ["food"],
    products: ["cacao-nibs", "chocolate-bar", "cacao-paste"],
    base: { town: "Portobelo", townEs: "Portobelo", province: "Colón", lat: 9.55, lng: -79.65 },
    pos: [
      { name: "Taller Portobelo", town: "Portobelo", townEs: "Portobelo", province: "Colón", lat: 9.546, lng: -79.654 },
      { name: "Mercado Colón", town: "Colón", townEs: "Colón", province: "Colón", lat: 9.3592, lng: -79.9014 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9864, lng: -79.5159 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "miel-de-azuero",
    name: "Miel de Azuero",
    tagline: { en: "Raw honey and beeswax from Los Santos", es: "Miel cruda y cera de abeja de Los Santos" },
    about: { en: "Hives sit in the dry forest near Pedasí. Honey is never heated, so it sets firm in the cooler months. Wax left over from harvest becomes candles.",
             es: "Las colmenas están en el bosque seco cerca de Pedasí. La miel nunca se calienta, por eso se cristaliza en los meses más frescos. La cera que sobra de la cosecha se convierte en velas." },
    categories: ["food", "ritual"],
    products: ["raw-honey", "beeswax-candle"],
    base: { town: "Pedasí", townEs: "Pedasí", province: "Los Santos", lat: 7.5333, lng: -80.0333 },
    pos: [
      { name: "Tienda del Pueblo Pedasí", town: "Pedasí", townEs: "Pedasí", province: "Los Santos", lat: 7.5293, lng: -80.0373 },
      { name: "Feria de Las Tablas", town: "Las Tablas", townEs: "Las Tablas", province: "Los Santos", lat: 7.7667, lng: -80.2833 },
      { name: "Súper Natural Chitré", town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9707, lng: -80.4293 }
    ],
    shipping: { type: "provinces", provinces: ["Los Santos", "Herrera", "Panamá"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "cafe-alto-quiel",
    name: "Café Alto Quiel",
    tagline: { en: "Single farm coffee, roasted to order", es: "Café de una sola finca, tostado por encargo" },
    about: { en: "Two hectares above Alto Quiel, picked by hand over four passes. Roasting happens on Mondays and the bags are dated, not stamped with a best before.",
             es: "Dos hectáreas sobre Alto Quiel, cosechadas a mano en cuatro pasadas. El tueste es los lunes y las bolsas llevan fecha de tostado, no fecha de vencimiento." },
    categories: ["food"],
    products: ["coffee"],
    base: { town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.78, lng: -82.44 },
    pos: [
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.776, lng: -82.444 },
      { name: "Café Central David", town: "David", townEs: "David", province: "Chiriquí", lat: 8.4333, lng: -82.4333 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9864, lng: -79.5159 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "kombucha-tropical",
    name: "Kombucha Tropical",
    tagline: { en: "Kombucha and water kefir brewed in La Chorrera", es: "Kombucha y kéfir de agua elaborados en La Chorrera" },
    about: { en: "Flavoured with whatever is in season along the Pacific coast: nance, guanábana, tamarind, ginger. Bottles are glass and come back for refill at the markets.",
             es: "Saborizada con lo que está en temporada en la costa del Pacífico: nance, guanábana, tamarindo, jengibre. Las botellas son de vidrio y regresan para rellenar en las ferias." },
    categories: ["food"],
    products: ["kombucha", "water-kefir"],
    base: { town: "La Chorrera", townEs: "La Chorrera", province: "Panamá Oeste", lat: 8.88, lng: -79.7833 },
    pos: [
      { name: "Feria La Chorrera", town: "La Chorrera", townEs: "La Chorrera", province: "Panamá Oeste", lat: 8.876, lng: -79.7873 },
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 },
      { name: "Gorgona Beach Store", town: "Gorgona", townEs: "Gorgona", province: "Panamá Oeste", lat: 8.554, lng: -79.8793 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9784, lng: -79.5239 }
    ],
    shipping: { type: "provinces", provinces: ["Panamá", "Panamá Oeste"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "nueces-del-pacifico",
    name: "Nueces del Pacífico",
    tagline: { en: "Nut butters and granola from Coclé", es: "Mantequillas de nueces y granola de Coclé" },
    about: { en: "Cashews from Aguadulce, roasted low and ground long so nothing else has to be added. The granola uses honey from the same province.",
             es: "Marañón de Aguadulce, tostado a baja temperatura y molido por largo rato para no tener que agregar nada más. La granola usa miel de la misma provincia." },
    categories: ["food"],
    products: ["nut-butter", "granola"],
    base: { town: "Aguadulce", townEs: "Aguadulce", province: "Coclé", lat: 8.25, lng: -80.55 },
    pos: [
      { name: "Mercado Aguadulce", town: "Aguadulce", townEs: "Aguadulce", province: "Coclé", lat: 8.246, lng: -80.554 },
      { name: "Tienda Natural Penonomé", town: "Penonomé", townEs: "Penonomé", province: "Coclé", lat: 8.5167, lng: -80.35 },
      { name: "Orgánico Santiago", town: "Santiago", townEs: "Santiago", province: "Veraguas", lat: 8.104, lng: -80.9793 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "salsa-islena",
    name: "Salsa Isleña",
    tagline: { en: "Island hot sauce and coconut yogurt", es: "Salsa picante isleña y yogur de coco" },
    about: { en: "Made on Isla Colón with scotch bonnet peppers grown on the island and coconut pressed the same day. Small runs, often sold out.",
             es: "Elaborada en Isla Colón con ají chombo cultivado en la isla y coco prensado el mismo día. Producción pequeña, a menudo agotada." },
    categories: ["food"],
    products: ["hot-sauce", "coconut-yogurt"],
    base: { town: "Bocas del Toro", townEs: "Bocas del Toro", province: "Bocas del Toro", lat: 9.34, lng: -82.24 },
    pos: [
      { name: "Bocas Town Market", town: "Bocas del Toro", townEs: "Bocas del Toro", province: "Bocas del Toro", lat: 9.336, lng: -82.244 },
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.78, lng: -82.44 }
    ],
    shipping: { type: "provinces", provinces: ["Bocas del Toro", "Chiriquí"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "jardin-de-santa-fe",
    name: "Jardín de Santa Fe",
    tagline: { en: "Garden teas and honey from Veraguas", es: "Tés de jardín y miel de Veraguas" },
    about: { en: "A hillside garden above Santa Fe where hibiscus and lemongrass grow beside the beehives. Everything is cut, dried and packed by the same three people.",
             es: "Un jardín en la ladera sobre Santa Fe donde la flor de Jamaica y la hierba limón crecen junto a las colmenas. Todo lo cortan, secan y empacan las mismas tres personas." },
    categories: ["herbs", "food"],
    products: ["hibiscus-tea", "lemongrass-tea", "raw-honey"],
    base: { town: "Santa Fe", townEs: "Santa Fe", province: "Veraguas", lat: 8.5167, lng: -81.0833 },
    pos: [
      { name: "Feria Santa Fe", town: "Santa Fe", townEs: "Santa Fe", province: "Veraguas", lat: 8.5127, lng: -81.0873 },
      { name: "Orgánico Santiago", town: "Santiago", townEs: "Santiago", province: "Veraguas", lat: 8.1, lng: -80.9833 }
    ],
    shipping: { type: "provinces", provinces: ["Veraguas", "Herrera", "Coclé"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "hierbas-cerro-punta",
    name: "Hierbas de Cerro Punta",
    tagline: { en: "Highland herbs, dried and blended", es: "Hierbas de altura, secas y mezcladas" },
    about: { en: "Grown between 1,800 and 2,000 metres where the nights are cold. Herbs are shade dried rather than heat dried, which keeps the colour and the oils.",
             es: "Cultivadas entre 1,800 y 2,000 metros, donde las noches son frías. Las hierbas se secan a la sombra y no con calor, lo que conserva el color y los aceites." },
    categories: ["herbs"],
    products: ["herbal-tea", "lemongrass-tea", "moringa", "turmeric"],
    base: { town: "Cerro Punta", townEs: "Cerro Punta", province: "Chiriquí", lat: 8.85, lng: -82.5833 },
    pos: [
      { name: "Mercado Cerro Punta", town: "Cerro Punta", townEs: "Cerro Punta", province: "Chiriquí", lat: 8.846, lng: -82.5873 },
      { name: "Mercado de Volcán", town: "Volcán", townEs: "Volcán", province: "Chiriquí", lat: 8.7833, lng: -82.6333 },
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.784, lng: -82.436 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "botica-verde",
    name: "Botica Verde",
    tagline: { en: "Tinctures, syrups and essential oils", es: "Tinturas, jarabes y aceites esenciales" },
    about: { en: "A herbalist practice in San Francisco that began making its own preparations because nothing on the shelf matched what the clients needed. Batch numbers are on every bottle.",
             es: "Una práctica de herbolaria en San Francisco que empezó a hacer sus propias preparaciones porque nada en el estante coincidía con lo que necesitaban sus clientes. Cada frasco lleva número de lote." },
    categories: ["herbs"],
    products: ["tincture", "elderberry", "essential-oil", "hibiscus-tea"],
    base: { town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9824, lng: -79.5199 },
    pos: [
      { name: "Botica Verde San Francisco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9784, lng: -79.5239 },
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "selva-botanica",
    name: "Selva Botánica",
    tagline: { en: "Face and body care made in El Valle", es: "Cuidado facial y corporal hecho en El Valle" },
    about: { en: "Formulated in a small lab beside the crater. Short ingredient lists, glass packaging, and every batch tested on the founder first.",
             es: "Formulado en un pequeño laboratorio junto al cráter. Listas de ingredientes cortas, envases de vidrio, y cada lote probado primero por la fundadora." },
    categories: ["skincare"],
    products: ["face-serum", "cleanser", "body-oil", "lip-balm"],
    base: { town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.6, lng: -80.1333 },
    pos: [
      { name: "Feria de El Valle", town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.596, lng: -80.1373 },
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9864, lng: -79.5159 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "jaboneria-istmo",
    name: "Jabonería Istmo",
    tagline: { en: "Cold process soap and solid hair care", es: "Jabón en frío y cuidado capilar sólido" },
    about: { en: "Cured for six weeks in Chitré before it leaves the workshop. Oils are coconut, palm free, and the scent comes from essential oils only.",
             es: "Curado durante seis semanas en Chitré antes de salir del taller. Los aceites son de coco, sin palma, y el aroma viene solo de aceites esenciales." },
    categories: ["skincare"],
    products: ["soap", "shampoo-bar", "conditioner-bar"],
    base: { town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9667, lng: -80.4333 },
    pos: [
      { name: "Súper Natural Chitré", town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9627, lng: -80.4373 },
      { name: "Feria de Las Tablas", town: "Las Tablas", townEs: "Las Tablas", province: "Los Santos", lat: 7.7667, lng: -80.2833 },
      { name: "Orgánico Santiago", town: "Santiago", townEs: "Santiago", province: "Veraguas", lat: 8.104, lng: -80.9793 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "coco-y-cera",
    name: "Coco y Cera",
    tagline: { en: "Coconut based balms and mineral sunscreen", es: "Bálsamos de coco y protector solar mineral" },
    about: { en: "Made on Isla Colón with coconut oil pressed on the archipelago. The sunscreen uses non nano zinc and is reef safe, which matters here.",
             es: "Elaborado en Isla Colón con aceite de coco prensado en el archipiélago. El protector solar usa zinc no nano y es seguro para el arrecife, algo que aquí importa." },
    categories: ["skincare"],
    products: ["body-butter", "lip-balm", "deodorant", "sunscreen"],
    base: { town: "Bocas del Toro", townEs: "Bocas del Toro", province: "Bocas del Toro", lat: 9.34, lng: -82.24 },
    pos: [
      { name: "Bocas Town Market", town: "Bocas del Toro", townEs: "Bocas del Toro", province: "Bocas del Toro", lat: 9.336, lng: -82.244 },
      { name: "Mercado Colón", town: "Colón", townEs: "Colón", province: "Colón", lat: 9.3592, lng: -79.9014 }
    ],
    shipping: { type: "provinces", provinces: ["Bocas del Toro", "Chiriquí", "Panamá"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "raiz-natural",
    name: "Raíz Natural",
    tagline: { en: "Everyday natural care from David", es: "Cuidado natural diario desde David" },
    about: { en: "Simple daily products at a price people in Chiriquí can actually pay. Refills cost less than the first jar, which is the whole point.",
             es: "Productos diarios sencillos a un precio que la gente en Chiriquí realmente puede pagar. Los rellenos cuestan menos que el primer frasco, y esa es la idea." },
    categories: ["skincare", "menstrual"],
    products: ["deodorant", "intimate-wash", "soap"],
    base: { town: "David", townEs: "David", province: "Chiriquí", lat: 8.4333, lng: -82.4333 },
    pos: [
      { name: "Orgánica David", town: "David", townEs: "David", province: "Chiriquí", lat: 8.4293, lng: -82.4373 },
      { name: "Tuesday Market Boquete", town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.78, lng: -82.44 },
      { name: "Mercado de Volcán", town: "Volcán", townEs: "Volcán", province: "Chiriquí", lat: 8.7873, lng: -82.6293 }
    ],
    shipping: { type: "provinces", provinces: ["Chiriquí", "Bocas del Toro"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "luna-roja",
    name: "Luna Roja",
    tagline: { en: "Reusable period care", es: "Cuidado menstrual reutilizable" },
    about: { en: "Cups, cloth pads and period underwear, with a sizing guide written in plain Spanish. Runs free workshops in schools twice a year.",
             es: "Copas, toallas de tela y ropa interior menstrual, con una guía de tallas escrita en español sencillo. Ofrece talleres gratuitos en escuelas dos veces al año." },
    categories: ["menstrual"],
    products: ["menstrual-cup", "cloth-pads", "period-underwear"],
    base: { town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9824, lng: -79.5199 },
    pos: [
      { name: "Botica Verde San Francisco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9784, lng: -79.5239 },
      { name: "Feria La Chorrera", town: "La Chorrera", townEs: "La Chorrera", province: "Panamá Oeste", lat: 8.88, lng: -79.7833 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "ciclo-panama",
    name: "Ciclo Panamá",
    tagline: { en: "Cloth pads sewn in Veraguas", es: "Toallas de tela cosidas en Veraguas" },
    about: { en: "A sewing cooperative of nine women in Santiago. Cotton is bought locally and the offcuts become the small pouches each set ships in.",
             es: "Una cooperativa de costura de nueve mujeres en Santiago. El algodón se compra localmente y los retazos se convierten en las bolsitas en que viaja cada juego." },
    categories: ["menstrual"],
    products: ["cloth-pads", "period-underwear", "intimate-wash"],
    base: { town: "Santiago", townEs: "Santiago", province: "Veraguas", lat: 8.1, lng: -80.9833 },
    pos: [
      { name: "Orgánico Santiago", town: "Santiago", townEs: "Santiago", province: "Veraguas", lat: 8.096, lng: -80.9873 },
      { name: "Súper Natural Chitré", town: "Chitré", townEs: "Chitré", province: "Herrera", lat: 7.9667, lng: -80.4333 },
      { name: "Tienda Natural Penonomé", town: "Penonomé", townEs: "Penonomé", province: "Coclé", lat: 8.5207, lng: -80.346 }
    ],
    shipping: { type: "provinces", provinces: ["Veraguas", "Herrera", "Los Santos", "Coclé"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "vela-y-copal",
    name: "Vela y Copal",
    tagline: { en: "Candles, incense and room sprays", es: "Velas, incienso y esprays de ambiente" },
    about: { en: "Poured in El Valle in small runs. Palo santo is bought only from suppliers who can show where the wood fell, never from cut trees.",
             es: "Vertidas en El Valle en tandas pequeñas. El palo santo se compra solo a proveedores que pueden mostrar dónde cayó la madera, nunca de árboles talados." },
    categories: ["ritual"],
    products: ["soy-candle", "incense", "palo-santo", "room-spray"],
    base: { town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.6, lng: -80.1333 },
    pos: [
      { name: "Feria de El Valle", town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.596, lng: -80.1373 },
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9864, lng: -79.5159 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "casa-ambar",
    name: "Casa Ámbar",
    tagline: { en: "Beeswax candles and slow made home pieces", es: "Velas de cera de abeja y piezas de hogar hechas con calma" },
    about: { en: "A house in Pedasí that turned into a workshop. Candles in winter, ceramics when the kiln is free, and nothing made faster than it wants to be.",
             es: "Una casa en Pedasí que se convirtió en taller. Velas en invierno, cerámica cuando el horno está libre, y nada hecho más rápido de lo que pide." },
    categories: ["ritual", "living"],
    products: ["beeswax-candle", "room-spray", "ceramic-mug"],
    base: { town: "Pedasí", townEs: "Pedasí", province: "Los Santos", lat: 7.5333, lng: -80.0333 },
    pos: [
      { name: "Tienda del Pueblo Pedasí", town: "Pedasí", townEs: "Pedasí", province: "Los Santos", lat: 7.5293, lng: -80.0373 },
      { name: "Feria de Las Tablas", town: "Las Tablas", townEs: "Las Tablas", province: "Los Santos", lat: 7.7667, lng: -80.2833 }
    ],
    shipping: { type: "provinces", provinces: ["Los Santos", "Herrera", "Panamá"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "taller-gorgona",
    name: "Taller Gorgona",
    tagline: { en: "Macramé, baskets and woven throws", es: "Macramé, canastas y mantas tejidas" },
    about: { en: "Knotted by hand a hundred metres from the beach. Cotton cord is undyed or coloured with plant dyes, so no two runs match exactly.",
             es: "Anudado a mano a cien metros de la playa. El cordón de algodón va sin teñir o con tintes vegetales, así que ninguna tanda es exactamente igual a otra." },
    categories: ["living"],
    products: ["macrame", "basket", "cotton-throw"],
    base: { town: "Gorgona", townEs: "Gorgona", province: "Panamá Oeste", lat: 8.55, lng: -79.8833 },
    pos: [
      { name: "Gorgona Beach Store", town: "Gorgona", townEs: "Gorgona", province: "Panamá Oeste", lat: 8.546, lng: -79.8873 },
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 },
      { name: "San Carlos Feria", town: "San Carlos", townEs: "San Carlos", province: "Panamá Oeste", lat: 8.4873, lng: -80.046 }
    ],
    shipping: { type: "provinces", provinces: ["Panamá Oeste", "Panamá", "Coclé"] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "madera-y-barro",
    name: "Madera y Barro",
    tagline: { en: "Wood and clay for the kitchen", es: "Madera y barro para la cocina" },
    about: { en: "Boards from fallen cedar and mugs thrown on a kick wheel in Penonomé. Pieces are signed underneath and can be repaired rather than replaced.",
             es: "Tablas de cedro caído y tazas torneadas en un torno de pie en Penonomé. Las piezas van firmadas por debajo y se pueden reparar en vez de reemplazar." },
    categories: ["living"],
    products: ["cutting-board", "ceramic-mug", "basket"],
    base: { town: "Penonomé", townEs: "Penonomé", province: "Coclé", lat: 8.5167, lng: -80.35 },
    pos: [
      { name: "Tienda Natural Penonomé", town: "Penonomé", townEs: "Penonomé", province: "Coclé", lat: 8.5127, lng: -80.354 },
      { name: "Mercado Aguadulce", town: "Aguadulce", townEs: "Aguadulce", province: "Coclé", lat: 8.25, lng: -80.55 },
      { name: "Feria de El Valle", town: "El Valle de Antón", townEs: "El Valle de Antón", province: "Coclé", lat: 8.604, lng: -80.1293 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },
  {
    slug: "pequeno-istmo",
    name: "Pequeño Istmo",
    tagline: { en: "Gentle care and play things for small people", es: "Cuidado suave y juguetes para los más pequeños" },
    about: { en: "Started when the founder could not find a balm for her own baby that she was willing to use. Clothing is cotton, toys are untreated wood, nothing is scented.",
             es: "Nació cuando la fundadora no encontró un bálsamo para su propio bebé que estuviera dispuesta a usar. La ropa es de algodón, los juguetes de madera sin tratar, y nada lleva perfume." },
    categories: ["kids", "skincare"],
    products: ["baby-balm", "kids-clothing", "cloth-diapers", "wooden-toy"],
    base: { town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.95 },
    pos: [
      { name: "Coronado Market", town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5293, lng: -79.954 },
      { name: "Gorgona Beach Store", town: "Gorgona", townEs: "Gorgona", province: "Panamá Oeste", lat: 8.55, lng: -79.8833 },
      { name: "Mercado Orgánico Casco", town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9864, lng: -79.5159 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "", whatsapp: "" },
    published: true,
    demo: true
  },

  /* ---------------------------------------------------------------- *
   * REAL BRAND. Castel Woodshop, Las Palmas de Gorgona, Chame.
   * Source: the brand's profile form, submitted 21 Sep 2026 by
   * Ernesto Castillo. Story text is the brand's own, first person, with
   * an English version to match. Point of sale coordinates are the
   * Gorgona town centre until the brand sends a map pin.
   * ---------------------------------------------------------------- */
  {
    slug: "castel-woodshop",
    name: "Castel Woodshop",
    tagline: { en: "Handmade wooden pieces for the home and kitchen, in local woods",
               es: "Piezas de madera hechas a mano para el hogar y la cocina, con maderas locales" },
    about: {
      en: "Scrolling through Instagram, watching artisans in the United States and Europe, I was fascinated by the beautiful pieces they shaped with their own hands: work so precise it looked as if a machine had made it.\n\nInspired by that craft, in 2022 I bought my first tools. Little by little, almost without noticing, I gathered enough equipment to open my own workshop, and over the last few years it became my great passion.\n\nThat is how Castel Woodshop was born, with the firm goal of becoming a business and a brand with an identity of its own. What makes us special is the use of local woods to bring everyday objects for the home to life. Every Castel Woodshop piece carries a high level of detail and subtlety. We do not only make functional objects; we make pieces that reveal their quality to the touch and stand out for the perfection of their finish, made to last and to transform any space.",
      es: "Mientras navegaba por Instagram y observaba a artesanos de Estados Unidos y Europa, quedé fascinado por las hermosas creaciones que modelaban con sus propias manos; piezas tan perfectas que parecían fabricadas por maquinaria industrial.\n\nInspirado por este arte, en el año 2022 decidí comprar mis primeras herramientas. Poco a poco, y casi sin darme cuenta, reuní el equipamiento suficiente para abrir mi propio taller, el cual se convirtió en mi gran pasión durante los últimos años.\n\nAsí nace Castel Woodshop, con el firme propósito de transformarse en un negocio y una marca con identidad propia. Lo que nos hace especiales es el uso de maderas locales para dar vida a objetos cotidianos del hogar. En cada pieza de Castel Woodshop se respira un alto nivel de detalle y sutileza. No solo creamos objetos funcionales, sino piezas que revelan su calidad al tacto y destacan por la perfección de sus acabados, pensadas para durar y transformar cualquier espacio."
    },
    categories: ["living"],
    products: ["cutting-board", "serving-tray", "beer-carrier", "liquor-dispenser", "wine-rack", "custom-wood"],
    base: { town: "Las Palmas de Gorgona", townEs: "Las Palmas de Gorgona", province: "Panamá Oeste", lat: 8.5500, lng: -79.8833 },
    pos: [
      { name: "Taller Castel Woodshop", address: "Avenida Bella Vista, Lote U-01",
        town: "Las Palmas de Gorgona, Chame", townEs: "Las Palmas de Gorgona, Chame", province: "Panamá Oeste",
        lat: 8.5500, lng: -79.8833 }
    ],
    shipping: { type: "nationwide", provinces: [] },
    links: { website: "", instagram: "castelwoodshop", whatsapp: "+507 6050 5505" },
    /* 2 Oct 2026: updated photos, hero and logo from Nadine's fixed set. The new
       files carry v2 in the name so the earlier castel-woodshop-1 to 8 files,
       the cover and the first logo stay in the repo untouched, unused. */
    photo: "castel-woodshop-v2-cover.jpg",
    hero: "castel-woodshop-hero.jpg",
    photos: ["castel-woodshop-v2-1.jpg", "castel-woodshop-v2-2.jpg", "castel-woodshop-v2-3.jpg", "castel-woodshop-v2-4.jpg",
             "castel-woodshop-v2-5.jpg", "castel-woodshop-v2-6.jpg", "castel-woodshop-v2-7.jpg", "castel-woodshop-v2-8.jpg"],
    logo: "castel-woodshop-v2-logo.png",
    published: true
  },
  /* Tierra Viva cosmetics & cleaners (2 Oct 2026), second real brand.
     Text, products and places to buy come from Nadine's finished profile
     screenshot of 2 Oct 2026. The Spanish text is a first draft. The links,
     the courier line for Bocas del Toro and the photos, hero and logo come
     from the brand's own form and folder. */
  {
    slug: "tierra-viva",
    name: "Tierra Viva cosmetics & cleaners",
    tagline: { en: "Natural toxin free cosmetics and cleaners that actually work",
               es: "Cosméticos y productos de limpieza naturales, sin toxinas, que de verdad funcionan" },
    about: {
      en: "Amazing natural toxin free cosmetics and cleaners that actually work! Made in Panama. Tierra Viva creates effective, natural products for everyday care, using high quality ingredients and a deep love for the natural world.",
      es: "¡Cosméticos y productos de limpieza naturales, sin toxinas, que de verdad funcionan! Hechos en Panamá. Tierra Viva crea productos naturales y eficaces para el cuidado diario, con ingredientes de alta calidad y un profundo amor por el mundo natural."
    },
    categories: ["skincare", "living"],
    products: ["bar-soap", "liquid-soap", "all-purpose-cleaner", "laundry-soap", "toilet-spray",
               "bug-repellent", "board-butter", "dishwasher-soap", "deodorant", "body-butter",
               "toothpaste", "foot-soak-salts", "essential-oil-roller", "home-care", "skincare"],
    base: { town: "El Volcán", townEs: "El Volcán", province: "Chiriquí", lat: 8.7833, lng: -82.6333 },
    pos: [
      { name: "Volcán Market", note: { en: "Every Friday", es: "Todos los viernes" },
        town: "Volcán", townEs: "Volcán", province: "Chiriquí", lat: 8.7833, lng: -82.6333 },
      { name: "Boquete Market", note: { en: "Every Tuesday", es: "Todos los martes" },
        town: "Boquete", townEs: "Boquete", province: "Chiriquí", lat: 8.7800, lng: -82.4400 },
      { name: "The Red Barn",
        /* maps: Google Maps place page for Red Barn near Coronado (found 14 Oct 2026).
           Any shop can get one. The row then opens and shows an Open in Google Maps link. */
        maps: "https://www.google.com/maps/place/Red+Barn/@8.5440563,-79.9126136,17z/data=!3m1!4b1!4m6!3m5!1s0x8facef0061e03d49:0x5bf280c8ad82e151!8m2!3d8.5440563!4d-79.9126136",
        town: "Coronado", townEs: "Coronado", province: "Panamá Oeste", lat: 8.5333, lng: -79.9500 }
    ],
    shipping: { type: "nationwide", provinces: [],
                note: { en: "All over Panama via Uno Express and Fletes Chavales, or courier to Bocas del Toro",
                        es: "A todo Panamá con Uno Express y Fletes Chavales, o por courier a Bocas del Toro" } },
    /* From the brand's form: Instagram @tierra_viva.volcan, WhatsApp (507) 689 88046, and a
       WhatsApp catalog link that sits in website. */
    /* 14 Oct 2026: no website. The wa.me/c/50768988046 catalog link is a WhatsApp
       catalog, not a website, so it is kept here and not shown as a Website button. */
    links: { website: "", instagram: "tierra_viva.volcan", whatsapp: "+507 6898 8046" },
    photo: "tierra-viva-cover.jpg",
    hero: "tierra-viva-hero.jpg",
    photos: ["tierra-viva-1.jpg", "tierra-viva-2.jpg", "tierra-viva-3.jpg", "tierra-viva-4.jpg",
             "tierra-viva-5.jpg", "tierra-viva-6.jpg", "tierra-viva-7.jpg", "tierra-viva-8.jpg"],
    logo: "tierra-viva-logo.jpg",
    published: true
  },
  {
    /* Deli Saludable, 2 Oct 2026. Text, products, places and links come from the
       brand's own form (in Spanish). The English About is a translation draft.
       OPEN: the form does not say where the brand is based, so there is no base
       and no location line. The form also says "aptos para veganos" for all
       products while the list includes chicken bone broth: confirm the wording
       with the brand. */
    slug: "deli-saludable",
    name: "Deli Saludable",
    tagline: { en: "Artisan healthy foods, honest food at a fair price",
               es: "Alimentos artesanales y saludables, comida honesta a precio justo" },
    about: {
      en: "We are Deli Saludable, Artisan Healthy Foods, a family business that handcrafts healthy products and seals them under vacuum. Honest food at a fair price.\n\nOur products are 100% natural, low in salt, low in fat, with no added sugar, free of chemicals, preservatives, colorings and sweeteners, and suitable for vegans. We use selected local ingredients.\n\nWe use recyclable glass jars and encourage recycling through our “Join our green circle” program: customers earn a reward for every clean jar they return. We use reusable bags for our deliveries.",
      es: "Somos Deli Saludable (Artisan Healthy Foods), un emprendimiento familiar de elaboración artesanal de productos saludables y sellados al vacío. Comida honesta a precio justo.\n\nNuestros productos se caracterizan por ser 100% naturales, bajos en sal, sin azúcar añadido, bajos en grasa, sin químicos/conservantes/colorantes/endulzantes, aptos para veganos. Utilizamos materia prima local, seleccionada.\n\nUtilizamos envases de vidrio (reciclables), incentivamos el reciclaje con nuestros clientes mediante el programa “únete a nuestro círculo verde” con el cual obtienes una recompensa por cada envase limpio devuelto, utilizamos bolsas reutilizables para nuestras entregas."
    },
    categories: ["food"],
    products: ["jam", "spread", "healthy-snacks", "pesto", "chimichurri", "tomato-sauce",
               "dried-tomatoes", "hot-sauce", "apple-cider-vinegar", "kombucha", "bone-broth", "coffee-liqueur"],
    pos: [
      { name: "Sizzle & Spice", note: { en: "Gorgona Beach Plaza", es: "Gorgona Beach Plaza" },
        town: "Gorgona", townEs: "Gorgona", province: "Panamá Oeste", lat: 8.5500, lng: -79.8833 },
      { name: "El Trapiche", note: { en: "Bella Vista", es: "Bella Vista" },
        town: "Panama City", townEs: "Ciudad de Panamá", province: "Panamá", lat: 8.9824, lng: -79.5199 }
    ],
    /* The form answers "Panamá (área metropolitana)". Only Panama City is in
       places.js for now, so provinces lists Panamá. */
    shipping: { type: "provinces", provinces: ["Panamá"],
                note: { en: "Panama City metro area", es: "Panamá (área metropolitana)" } },
    /* From the brand's form: Instagram delisaludable.pa, WhatsApp (+507) 666 13469, and a
       WhatsApp catalog link that sits in website. */
    /* 14 Oct 2026: no website. The wa.me/c/50766613469 catalog link is a WhatsApp
       catalog, not a website, so it is kept here and not shown as a Website button. */
    links: { website: "", instagram: "delisaludable.pa", whatsapp: "+507 6661 3469" },
    photo: "deli-saludable-cover.jpg",
    hero: "deli-saludable-hero.jpg",
    photos: ["deli-saludable-1.jpg", "deli-saludable-2.jpg", "deli-saludable-3.jpg", "deli-saludable-4.jpg",
             "deli-saludable-5.jpg", "deli-saludable-6.jpg", "deli-saludable-7.jpg", "deli-saludable-8.jpg"],
    logo: "deli-saludable-logo.png",
    published: true
  }
];
