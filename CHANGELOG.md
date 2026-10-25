# Changelog

All notable changes are recorded here, in the form of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This repository follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `netlify.toml`: the Netlify build settings, a redirect from `/` to `/en/`, and security headers on every response: a Content Security Policy allowing only the site's own resources, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`. MDN Observatory rates the Netlify deploy A+ (score 130, 12 of 12 tests passed); the Hugo mockup failed its Content Security Policy test.
- The fallback root page has a first-level heading. WAVE found none on the Hugo mockup's home page; this site's English home page already had one, visually hidden.
- The site's own web-metrics results, recorded in `site.json` under `metrics`: Lighthouse 100 for accessibility, performance and SEO on mobile and desktop, WAVE with no errors and an AIM score of 10, Website Carbon A+, HTTP Observatory A+ and SSL Server Test A+, all tested 2026-10-24 on the Netlify deploy. The Web metrics page lists every result and each quality's page lists its own, each with a link that runs the test again, so visitors can check for themselves. The Accessibility page notes that WAVE recognizes a skip link only by English wording, so it does not list the French one.
- The Vishpala theme draws the seven web-metric qualities as marks in the style of Japanese family crests (kamon), in `img/kamon.svg`. With `metrics.footer` on, as it is for this site, a row of them in every page's footer links to the results.
- French pages, in Canadian French under `/fr/`: the home page, Services and Resources, so the logo, menu and breadcrumbs work in French, and the Web metrics page with its seven quality pages and thirteen tool entries. The rest of the site is English only for now, and French pages say so where they link to it. The metrics results carry French text, and the Vishpala theme puts a space before a colon in French.

### Changed

- `.uc-automa.yaml` pins uc-automa 0.2.0, the first release with the `eleventy-site` layout; it pinned 0.1.0, which has no such layout.
- The script that applies the font preference before render is a file, `/theme/js/font-preference.js`, instead of inline, so the Content Security Policy allows it without a hash.
- Header buttons, the mobile Menu button, mobile menu items and language menu items are at least 44 by 44 pixels (WCAG 2.5.5); they were 27 to 32 pixels tall. PageSpeed found touch targets too small on the Hugo mockup; on this site, Lighthouse scores accessibility 100 on mobile and desktop.
- `site.json` gives the site's address as `https://eleventy-website-vishpala.netlify.app`, the test deploy, until the site moves to its production server; it was the placeholder `https://example.com`. Canonical links, `hreflang` and social tags, the sitemap, `robots.txt` and the breadcrumb data use it.

### Fixed

- The site footer names the content licence as CC BY 4.0, matching decision 0001 and `REUSE.toml`; it said CC BY-SA 4.0. The Vishpala theme's default licence changes to match.
- Atkinson Hyperlegible renders for all text when chosen. Each font subset now has its own `@font-face` rule and `unicode-range`; before, browsers loaded only the Latin Extended file, which has no basic Latin letters, and drew most text in a fallback font. Only the Latin files download now. The home page transfers about 24 KiB in all, none of it from other sites, and Lighthouse scores performance 100 on mobile and desktop.
- On section pages, the hero with the page's heading is inside `main`, so "Skip to content" lands on the heading instead of skipping past it, and every part of the page sits in a landmark. Search still indexes only the content below the hero.
- The link above the footer marks is 44 pixels tall, like the marks below it. Lighthouse found it too small and too close to the first mark on mobile, and scored SEO 99.
- Visually hidden text, such as the home page's heading, has its own colours, so WAVE no longer reports it as a contrast error against the black page background.
