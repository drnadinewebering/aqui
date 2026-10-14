# aquí 2.0

A curated discovery app for natural products and locally or artisan made
products in Panama. This repository holds the demo version, rebuilt clean on
13 September 2026.

Live: https://mippy1974.github.io/aqui2/

## Running it

There is no build step and nothing to install. Open `index.html` in a browser,
or serve the folder over HTTP. On GitHub Pages, enable Pages on the `main`
branch, root folder. Keep the `.nojekyll` file.

## What is in here

```
index.html          markup shell: header, view container, tab bar
styles.css          all styling, one file
app.js              text, state, search, views, router
categories.js       the eight browse categories
products.js         central product list, English and Spanish names
places.js           searchable towns with coordinates and province
brands.js           brands, points of sale, shipping coverage, links
content.js          Mission, Privacy Policy, Terms of Use, both languages
logo.png            wordmark
hero.jpg            home screen photo
favicon.png         browser tab and home screen icon
home.png, browse.png, location.png, mission.png, shipping.png
                    navigation and page icons
cat-<id>.png        category line icons
<id>.jpg            category card photos, one per category id
<brand>-....jpg     brand photos, heroes, covers and logos
```

Editing content means editing the data files: `categories.js`, `products.js`,
`places.js`, `brands.js` and `content.js`. They are plain JavaScript arrays with
comments explaining each field. In the full version this content
moves behind a password protected admin area.

## Category cards

Each category is one card: a photo across the top, then a paper strip holding
the name and a chevron. The card looks for `<id>.jpg` next to `index.html`, and
falls back to the category line icon when no file is there, so photos can be
replaced or added one at a time with no code change.

The photo box is a wide strip, about 2.1 times wider than tall. Send new photos
landscape, at least 1200 pixels wide, subject in the middle band.

Photo status today: all eight category photos are in place, 1600 pixels wide.

## How the search works

The brief asks for physical availability and shipping to work as two
independent criteria that can be used at the same time. The rule, in
`search()` in `app.js`:

1. Filter brands by the chosen product and/or category.
2. If no location is chosen, return them all.
3. Otherwise keep a brand when it has a point of sale inside the radius,
   **or** shipping is switched on and the brand ships to that province.

The radius is measured from a brand's **points of sale**, never from the
brand's own location. A brand may produce in Panama City and be sold in a shop
in Coronado, and a search in Coronado has to find it.

Distances are straight line, calculated with the haversine formula. No mapping
service is called.

## Location

Typing a location is the primary path, because someone in Coronado may be
planning a trip to Boquete. "Use my location" is optional. It reads the browser
position once, matches it to the nearest town in `places.js`, and discards
the coordinates. Nothing is stored or transmitted.

## Languages

English and Spanish throughout: navigation, buttons, categories, filters,
products, system text and the Mission and legal pages. A product exists once
and carries both names, so a search in either language reaches the same brands.
Autocomplete matches across languages, so typing `chucrut` in English mode
still finds Sauerkraut.

## What this demo does not include

No user accounts, no brand accounts, no cart, no checkout and no admin area.
None of those are needed for V1 per the brief, and the admin area is
deliberately out of the demo. The data shape is the same one the full version
uses, so the content carries over.

Most brands and products are invented placeholders and carry a `demo: true`
flag, which shows as an "Example brand" tag in the app. Castel Woodshop
(added 24 September 2026) is the first real brand: its text, photos and logo
come from the brand's own profile form. Tierra Viva cosmetics & cleaners
(added 2 October 2026) is the second: its text, products and places to buy
come from Nadine's finished profile, and its links and photos from the
brand's own form and folder. Deli Saludable (added 2 October 2026) is the
third: its text, products, places, shipping and links come from its own form,
which is in Spanish, so its English About is a translation draft.

## Brand profile

The profile follows the Sol de Tierra and Tierra Viva mockups Nadine drew
(October 2026): a wide hero, a round logo beside the name, the town and the
category, About, Product Examples, Products, Where to buy and round buttons to
find the brand. The page ground is a warm white, `--ground` in `styles.css`.

Where to buy is a heading followed by one row per point of sale and then a
Shipping row, all in one list. Each row shows the shop name and, under it,
the days or hours the brand gave (`pos.note`, for example Every Friday) or
else the town. A row opens in place only when it has more to show: a street
address (`pos.address`), or the town once the days have taken its place. A row
with nothing behind it has no arrow, so no arrow is ever a dead button. The
Shipping row uses the brand's own words (`shipping.note`) when it has them,
and otherwise says Nationwide shipping available or lists the provinces.
`shipping.type` and `shipping.provinces` still decide the search either way.

A brand in more than one category (Tierra Viva is in Natural Skincare &
Bodycare and in Home & Living) lists each category on its own line and shows
up in the results for both.

A brand can carry these optional fields (all described in `brands.js`):

- `photo`, a small cover (square works, 600 pixels is plenty) shown on the
  result card.
- `hero`, a wide 3:1 photo for the top of the profile, 1500 x 500 pixels. Without
  it the cover photo is cropped to the same band. `heroPos` chooses which part
  stays in view.
- `photos`, the Product Examples row, square, about 900 pixels. Tap one to open
  it full screen. The first four show before the row scrolls.
- `logo`, shown in a round frame. Square, with the mark kept inside the circle
  (a wide wordmark needs empty space above and below it). Without one the
  initials show in a tinted circle.

A brand with none of them keeps the tinted band and category icon. File names
are plain, for example `deli-saludable-hero.jpg`, because this build is flat.

`base` is optional too. A brand that has not said where it is based (Deli
Saludable today) shows no location line under its name.

To add or replace photos for a brand that is already in `brands.js`: drop the
new files next to `index.html` under new names, then point the `hero`, `photo`,
`photos` and `logo` lines of its entry at them. Nothing else changes. The old
files can stay in the repo, unused. Castel Woodshop was done this way on
2 October 2026 (the new files carry `v2` in their names).

## For brands

`#/brands` is a short page for brands that want to join, linked from the
footer and from the Mission page. Its button opens the brand profile form
(a Jotform page) outside the app. The link lives in `content.js` under
`brands.formUrl`, with `formUrlEs` reserved for a Spanish form.

## Legal pages

`content.js` holds the Privacy Policy and Terms of Use in both languages.
They describe what this build actually does. They are a starting point and
should be reviewed by a lawyer before the app is published.
