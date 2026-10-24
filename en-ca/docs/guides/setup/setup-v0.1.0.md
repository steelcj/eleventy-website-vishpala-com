---
title: "Building the Vishpala Site"
dc:title: "Building the Vishpala Site"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic), AI assistance"
dc:subject: "Eleventy, setup, build, Node.js, npm, Pagefind, publishing"
dc:description: "How to install, build, preview, edit and publish the vishpala.com Eleventy site."
dc:date: "2026-10-23"
dc:type: "Text"
dc:format: "text/markdown"
dc:identifier: "urn:uuid:f2dffc2b-643b-4881-83c5-71ba53344270"
dc:language: "en-CA"
dc:rights: "CC-BY-4.0"
sat:version: "0.1.0"
sat:status: "Accepted"
---

# Building the Vishpala Site

Version: 0.1.0
Status: Accepted
# Building the Vishpala site

This package is a complete Eleventy 3 project. The content, structured on Julia's recommendations, is in `src/en/`. The look comes from the pluggable Vishpala theme in `themes/vishpala/`, which recreates the design of the Hugo mockup: bold colour blocks, the language and font switchers, and Pagefind search. It adapts to phone, tablet and desktop.

## Prerequisites

You need Node.js 18 or newer and npm, which comes with Node. Check what you have:

```bash
node --version
npm --version
```

If Node is missing or older than 18, the simplest route on Linux Mint is nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
# open a new terminal, then:
nvm install --lts
```

## First run

```bash
unzip vishpala-site-content.zip
cd vishpala-site-content
npm install
npm start
```

`npm install` downloads Eleventy, the navigation plugin and Pagefind into `node_modules/`. `npm start` builds the site and the search index, then serves it at http://localhost:8080. The root address redirects to `/en/`. The server reloads the page in your browser whenever you save a file. Press Ctrl+C to stop it.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Build once with the search index, then serve at http://localhost:8080 and rebuild on every save |
| `npm run build` | Build the finished site and its search index into `_site/`, ready to publish |
| `npm run clean` | Delete `_site/`, useful after renaming or removing pages |

The search index is built by `npm run build` and by the first step of `npm start`. While the server is running, new or changed text won't show up in search until you run `npm run build` again.

## Project layout

```
vishpala-site-content/
  package.json              Scripts and dependencies
  eleventy.config.js        Eleventy settings and theme options
  SETUP.md                  This file
  README.md                 Content notes and open items
  themes/vishpala/          The theme: layouts, styles, fonts, logo, scripts
    README.md               Theme options and how to override it
  src/
    index.njk               Root page, redirects / to /en/
    _data/site.json         Site name, live URL and default description
    en/                     English content (Markdown)
  _site/                    Built output (created by the build, not committed)
```

## Before publishing

1. Set your real address in `src/_data/site.json`, replacing `https://example.com`. It is used for canonical links, `hreflang` links, social sharing tags and the sitemap.
2. Search for `TODO`, `CHECK` and `NOTE` in `src/en/` and resolve them. They are HTML comments, so they do not show on the page, but they do end up in the published HTML source.
3. Run `npm run clean` and then `npm run build`, and look over `_site/`.

## Adding or editing a page

Create a Markdown file in the right folder under `src/en/`, with front matter like this:

```yaml
---
title: "Page title for search results and the browser tab"
description: "One sentence for search results, under about 160 characters."
heading: "Heading shown on the page"
subtitle: "A short line under the heading."
layout: layouts/page.njk
lang: en
translationKey: my-page
workId: vishpala-page-my-page
permalink: /en/my-page/
eleventyNavigation:
  key: My page
  parent: Services
  order: 7
---
```

- **`title` and `heading`:** `title` is what search engines and browser tabs show. `heading` is the visible `h1`, and falls back to `title` when left out. Keeping them separate lets the title carry search keywords while the heading stays short. Don't start the Markdown body with its own `# heading`, because the layout already adds one.
- **`layout`:** use one of these:
  - `layouts/page.njk` for ordinary pages
  - `layouts/service.njk` for service pages, which also need `tags: [service]`
  - `layouts/section.njk` for section landing pages with the coloured hero block
  - `layouts/home.njk` for the homepage
- **`eleventyNavigation`:** puts the page in the menu. Leave out `parent` for a top-level menu item, or leave the whole block out to keep the page out of the menu. Breadcrumbs don't depend on it; they follow the folder path. `order` sets the position in the menu. The top menu is kept to five items: Home, Services, Solutions, Who we serve and About. Other pages are child pages of those, or are linked from the footer.
- **Footer links:** set per language in `src/_data/site.json` under `footerLinks`. They currently link How it works and Contact.

The homepage blocks are edited in the `blocks` list at the top of `src/en/index.md`. Each block has a colour, a width and its links. The theme README explains each field.

## Adding a resource

Resources live in folders under `src/en/services/resources/`:

```
resources/
  index.md                    Resources landing page
  guides/                     Guides written by Vishpala (full pages on this site)
  web-metrics/
    index.md                  Lists the seven dimensions
    accessibility/  performance/  visibility/  sustainability/
    privacy-security/  agency/  longevity/
```

The folder a file sits in decides where it is listed. Each folder has a small settings file (for example `accessibility.11tydata.json`) that sets the language and category for everything in it, so a new entry needs only four lines. To add a tool to a dimension, create a Markdown file in that folder:

```yaml
---
title: "Name of the tool"
description: "One or two sentences on what it checks and why it is useful."
externalUrl: "https://example.org/"
order: 4
---
```

`order` sets its position in the list. Links to other sites don't get a page of their own; the folder's settings file takes care of that.

A guide is a full page, so it goes in `guides/` with the usual page front matter (`title`, `description`, `heading`, `subtitle`, `layout: layouts/page.njk`, `permalink` and so on) plus an `order`. See `guides/choosing-a-website-platform.md` for a complete example.

To add a new dimension, copy one of the dimension folders, rename the folder and its settings file, change `category` in the settings file and the details in its `index.md`, and give it the next `order` number. It then appears on the Web metrics page automatically.

## Breadcrumbs

Breadcrumbs are automatic. Every page more than one level below a top-level section shows a trail such as Home / Services / Resources / Web metrics / Performance, built from its folder path. Each crumb's name comes from that level's page, using its menu name if it has one and otherwise its `heading`. To shorten a long crumb, add `breadcrumb: "Short name"` to that page's front matter. The trail follows the W3C breadcrumb pattern for screen readers and is also published as structured data for search engines.

## Changing the look

Theme settings, such as which colour each section's hero uses, are in `eleventy.config.js`. To change a layout for this site only, copy it from `themes/vishpala/layouts/` into `src/_includes/layouts/` and edit the copy, and the theme will use yours instead. Colours, spacing and type sizes are CSS variables at the top of `themes/vishpala/assets/css/theme.css`. See `themes/vishpala/README.md` for the full list of options.

## Adding French

French pages go in `src/fr/`, mirroring the English folders. Give each French page:

- `lang: fr`
- a French `permalink`, such as `/fr/services/archive-de-contenu/`
- the **same** `translationKey` as its English original

The theme matches pages on `translationKey`. Once a page has a French version, the globe button and `hreflang` links appear on both versions automatically. The French version of the interface text (menu, search, font switcher) is already built in. Each language gets its own menu, built from the pages in that language. Add a French homepage at `/fr/` before linking to French from the root page in `src/index.njk`.

When your archive's publishing connector writes these files, `translationKey` and `workId` should both come from the archive's work identifier, so the archive stays the source of truth.

## Publishing

`npm run build` produces plain static files in `_site/`. Any static host can serve them: a Canadian VPS or shared host, your own server, or Netlify as with the Hugo mockup. For example, to copy the site to a server with SSH access:

```bash
npm run build
rsync -av --delete _site/ user@your-server:/var/www/vishpala/
```

For Netlify, set the build command to `npm run build` and the publish directory to `_site`.

## Using the theme in your existing site

Copy the `themes/vishpala/` folder into your Eleventy and Sveltia CMS project. Install the theme's dependencies with `npm install @11ty/eleventy-navigation pagefind`, then add the plugin to your config as shown in the theme README. Pages then use the layouts by name, as described above.

Your Sveltia CMS collections will need to know the front matter fields these pages use: `title`, `description`, `heading`, `subtitle`, `layout`, `lang`, `translationKey`, `workId`, `permalink`, `tags`, `eleventyNavigation` and, for the homepage, `blocks`.

## Troubleshooting

- **`eleventy: command not found` or missing module errors:** run `npm install` in the project folder first.
- **Search says the index is not available:** run `npm run build`. The index lives in `_site/pagefind/`, and `npm run clean` deletes it.
- **Port 8080 already in use:** run `npm run build`, then `npx @11ty/eleventy --serve --port=8081`.
- **A deleted or renamed page still appears:** run `npm run clean`, then build again.
- **`SyntaxError: Cannot use import statement`:** your Node is too old. Check `node --version` and upgrade to 18 or newer.
