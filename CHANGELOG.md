# Changelog

All notable changes are recorded here, in the form of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This repository follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `netlify.toml`: the Netlify build settings, a redirect from `/` to `/en/`, and security headers on every response: a Content Security Policy allowing only the site's own resources, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`. MDN Observatory rates the Netlify deploy A+ (score 130, 12 of 12 tests passed); the Hugo mockup failed its Content Security Policy test.
- The fallback root page has a first-level heading. WAVE found none on the Hugo mockup's home page; this site's English home page already had one, visually hidden.
- The site's own web-metrics results, recorded in `site.json` under `metrics`: Lighthouse 100 for accessibility, performance and SEO on mobile and desktop, WAVE with no errors and an AIM score of 10, Website Carbon A+, HTTP Observatory A+ and SSL Server Test A+, all tested 2026-10-24 on the Netlify deploy. The Web metrics page lists every result and each quality's page lists its own, each with a link that runs the test again, so visitors can check for themselves. The Accessibility page notes that WAVE recognizes a skip link only by English wording, so it does not list the French, Spanish or Arabic ones.
- The Vishpala theme draws each web-metric quality as a mark in the style of Japanese family crests (kamon), in `img/kamon.svg`: the qualities of the Universal Cake Evaluation Metrics, plus portability, a way out. With `metrics.footer` on, as it is for this site, a row of them in every page's footer links to the results. The row wraps to fit any screen width and any number of marks.
- French pages, in Canadian French under `/fr/`: the home page, Services and Resources, so the logo, menu and breadcrumbs work in French, and the Web metrics page with a page and tool entries for each quality. The rest of the site is English only for now, and French pages say so where they link to it. The metrics results carry French text, and the Vishpala theme puts a space before a colon in French.
- The Vishpala theme supports right-to-left languages. Each page's `<html>` carries the text direction of its language, and the styles use start and end instead of left and right, so a page in Arabic or Hebrew lays out as a mirror image.
- Spanish pages, in neutral Latin American Spanish under `/es/`, matching the French ones: the home page, Services and Resources, and the Measuring our work page with a page and tool entries for each quality. The metrics results carry Spanish text, and the Vishpala theme has Spanish interface text. On French and Spanish pages, links whose text is an English page name are marked as English, so screen readers pronounce them correctly.
- Arabic pages, under `/ar/`, to show the right-to-left support: the home page, Services, Resources and the Measuring our work page, with Arabic results and interface text. Dates and grades such as A+ keep their reading order inside Arabic sentences. The portability mark's way out points left, toward the end of an Arabic line. The Arabic is a machine translation in Modern Standard Arabic, to be reviewed by a native speaker.

### Changed

- The Web metrics page is "Measuring our work: the foundations of great technology", in English and French. It explains how the qualities follow from the company's values, and no longer counts them in its title. Its address is unchanged.
- `.uc-automa.yaml` pins uc-automa 0.2.0, the first release with the `eleventy-site` layout; it pinned 0.1.0, which has no such layout.
- The script that applies the font preference before render is a file, `/theme/js/font-preference.js`, instead of inline, so the Content Security Policy allows it without a hash.
- Header buttons, the mobile Menu button, mobile menu items and language menu items are at least 44 by 44 pixels (WCAG 2.5.5); they were 27 to 32 pixels tall. PageSpeed found touch targets too small on the Hugo mockup; on this site, Lighthouse scores accessibility 100 on mobile and desktop.
- `site.json` gives the site's address as `https://eleventy-website-vishpala.netlify.app`, the test deploy, until the site moves to its production server; it was the placeholder `https://example.com`. Canonical links, `hreflang` and social tags, the sitemap, `robots.txt` and the breadcrumb data use it.

### Fixed

- Search messages are in the page's language, with its plural rules, from the Vishpala theme's interface text. Spanish searches showed English messages, and the French ones were written into the search script.
- The site footer names the content licence as CC BY 4.0, matching decision 0001 and `REUSE.toml`; it said CC BY-SA 4.0. The Vishpala theme's default licence changes to match.
- Atkinson Hyperlegible renders for all text when chosen. Each font subset now has its own `@font-face` rule and `unicode-range`; before, browsers loaded only the Latin Extended file, which has no basic Latin letters, and drew most text in a fallback font. Only the Latin files download now. The home page transfers about 24 KiB in all, none of it from other sites, and Lighthouse scores performance 100 on mobile and desktop.
- On section pages, the hero with the page's heading is inside `main`, so "Skip to content" lands on the heading instead of skipping past it, and every part of the page sits in a landmark. Search still indexes only the content below the hero.
- The link above the footer marks is 44 pixels tall, like the marks below it. Lighthouse found it too small and too close to the first mark on mobile, and scored SEO 99.
- On phones, the header fits the screen: the language, font and search buttons have a line of their own under the logo, and their menus open on screen. Since those buttons grew to 44 pixels, the header was 397 pixels wide, so pages scrolled sideways on narrower phones and failed WCAG 1.4.10 (Reflow) at 320 pixels.
- Keyboard focus moves through the footer in the order it reads: the marks come first in the HTML as well as on screen. Before, CSS moved them to the top while focus reached them after the footer links.
- Footer links show their clickable area on hover, in the focus colours with a thinner outline than keyboard focus.
- Visually hidden text, such as the home page's heading, has its own colours, so WAVE no longer reports it as a contrast error against the black page background.
