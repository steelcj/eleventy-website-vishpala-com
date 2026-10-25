# Vishpala theme for Eleventy

A pluggable Eleventy 3 theme with the look of the Vishpala Hugo mockup: black gutters between bold red, blue, yellow and white blocks, a logo lockup, a language switcher, a font switcher (system font or Atkinson Hyperlegible) and Pagefind search. It is responsive: six grid columns on desktop, four on tablet, and one on phone, where the menu collapses behind a Menu button.

## Using it

```js
// eleventy.config.js
import vishpalaTheme from "./themes/vishpala/index.js";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.addPlugin(vishpalaTheme, {
    sectionColours: { services: "red", solutions: "blue" },
  });
}
```

Set the input directory before adding the plugin, so the theme knows where your `_includes` folder is. The site also needs `src/_data/site.json` with `name`, `url` and `description`. An optional `footerLinks` object, keyed by language, adds links to the footer:

```json
"footerLinks": { "en": [ { "text": "Contact", "url": "/en/contact/" } ] }
```

An optional `metrics` object records the site's own results from web-metrics testing tools, for qualities based on the Universal Cake Evaluation Metrics: accessibility, performance, visibility, sustainability, privacy and security, agency, longevity and portability. Each quality has a mark in the style of a Japanese family crest (kamon):

```json
"metrics": {
  "footer": false,
  "page": { "en": "/en/services/resources/web-metrics/" },
  "tested": "/en/",
  "results": [
    { "quality": "privacy-security", "tool": "observatory", "result": "A+, score 130, 12 of 12 tests passed", "tested": "2026-10-24" },
    { "quality": "agency", "result": "No tracking, advertising, cookies, pop-ups or deceptive patterns", "tested": "2026-10-24" }
  ]
}
```

- `results` lists one entry per tool and quality. `tool` is one of `lighthouse`, `observatory`, `ssllabs`, `websitecarbon`, `w3c` or `wave`; an entry without one is shown as the site's own review, with no test link. `result` is plain text, or an object keyed by language (`{ "en": "...", "fr": "..." }`).
- `tested` is the path of the page the tools tested. With `site.url`, it builds each tool's "Test it yourself" link, so the links follow the site to its production address.
- `page` is the page, per language, that shows every result (front matter `metricResults: "all"`). A section page with `metricResults` set to one quality shows that quality's results.
- `footer: true` adds a row of the marks to every page's footer, each linking to its quality's results on `page`.

## What the theme provides

- **Layouts:** `layouts/base.njk`, `layouts/home.njk`, `layouts/section.njk`, `layouts/page.njk`, `layouts/service.njk`
- **Assets** served from `/theme/`: the stylesheet, Atkinson Hyperlegible fonts, the Vishpala mark, a kamon mark for each quality (`img/kamon.svg`), the theme script and the search script
- **Filters:** `byLang`, `translationsOf`, `whereData`, `breadcrumbs`, `sectionOf`, `sectionColour`, `logoColour`, `year`, `inLang`, `metricResults`, `metricTestUrl`
- **Shortcodes:** `breadcrumbNav` (accessible breadcrumb navigation) and `breadcrumbJsonLd` (schema.org `BreadcrumbList`)
- **SEO files:** `/sitemap.xml` with `hreflang` alternates, and `/robots.txt`
- The `@11ty/eleventy-navigation` plugin, used for menus and "Back to" links

## Options

| Option | Default | Purpose |
| --- | --- | --- |
| `sectionColours` | services red, solutions blue, who-we-serve yellow, approach blue, about white, contact yellow | Hero block colour for each first path segment after the language |
| `defaultColour` | `white` | Hero colour for sections not listed |
| `logoColours` | red→blue, blue→red, yellow→white, white→yellow | Colour of the logo block beside each hero colour |
| `languageLabels` | English, Français, Español | Names shown in the language switcher |
| `licence` | CC BY 4.0 | Footer licence link |
| `search` | `true` | Show the search button and modal (needs Pagefind in the build) |
| `sitemap` | `true` | Generate `sitemap.xml` and `robots.txt` |
| `strings` | English and French | Interface text per language, merged over the defaults |

## Layouts

**home.njk** builds the block grid from a `blocks` list in front matter, like the original four-block Hugo homepage. Each block takes `title`, an optional `url` that turns the title into a link to its section, a short `text` tagline, `colour` (red, blue, yellow or white), `span` (2, 3, 4 or 6 of the six columns), an optional `featured` link and an optional `more` link (each with `text` and `url`), and an `id`. A `links` list is also supported for blocks that need several links. The page `heading` becomes a visually hidden `h1` for screen readers and search engines. Blocks are sized by their content, as in the original Mondrian-style grid, so rows can differ in height. Any Markdown body appears as a full-width white block after the grid.

**section.njk** is for section landing pages. It shows `heading` (or `title`) and `subtitle` in a coloured hero block beside the logo. With `listTag` set, it also lists every page in the same language carrying that tag, sorted by their `order` field. A listed entry with an `externalUrl` links to that address and is marked as an external site, so entries can be links out without a page of their own (`permalink: false`). Alternatively, `listCategory` lists the entries in a folder: pages with `resourceEntry: true` and a matching `category`, both normally set by the folder's directory data file. Add a `listCategories` list (each item a `key`, `title` and optional `text`) to group entries under headings, matched on each entry's `category`; categories are shown in the order listed, and empty ones are skipped. `metricResults` shows the site's web-metrics results after the page content, for `"all"` qualities or for one, such as `"performance"`.

**page.njk** is for ordinary pages, with breadcrumbs, the `heading` and `subtitle`, and an optional `related` list.

**service.njk** is `page.njk` plus a list of the other pages tagged `service` in the same language.

## Overriding

To change a layout for one site, copy it from `themes/vishpala/layouts/` into the site's own `src/_includes/layouts/` and edit it there. The theme sees the file and registers its own version only for the layouts you have not overridden. To change styles, add a site stylesheet after the theme's, or edit `assets/css/theme.css`. All colours and sizes are CSS custom properties at the top of that file.

## Credits

Atkinson Hyperlegible was designed by the Braille Institute and is distributed under the SIL Open Font License 1.1. Search is provided by [Pagefind](https://pagefind.app/). The kamon marks were drawn for this theme.

## Breadcrumbs

The trail is built from the page's URL: each parent folder that has its own page becomes a crumb, labelled with its `breadcrumb`, navigation key, `heading` or `title`, in that order of preference. It is shown on pages at least two levels below the language root (three or more crumbs): inside the hero block on section pages and above the heading on ordinary pages. The markup follows the W3C WAI-ARIA breadcrumb pattern: a `nav` labelled "Breadcrumb", an ordered list, and the current page marked with `aria-current="page"` and not linked. Separators are drawn in CSS, so assistive technology does not read them. The same trail is published as `BreadcrumbList` JSON-LD in the page head.
