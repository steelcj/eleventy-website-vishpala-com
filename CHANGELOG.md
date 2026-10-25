# Changelog

All notable changes are recorded here, in the form of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This repository follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `netlify.toml`: the Netlify build settings, a redirect from `/` to `/en/`, and security headers on every response: a Content Security Policy allowing only the site's own resources, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy`.
- The fallback root page has a first-level heading.
- The footer shows the site's Website Carbon result as text, with no remote script or image: rating A+, less than 0.01 g of CO₂ per visit, cleaner than 99% of web pages, tested 2026-10-24. The figures live in `site.json` under `carbon`, and the theme's new `localNumber` filter writes the number the page's language's way.

### Changed

- `.uc-automa.yaml` pins uc-automa 0.2.0, the first release with the `eleventy-site` layout; it pinned 0.1.0, which has no such layout.
- The script that applies the font preference before render is a file, `/theme/js/font-preference.js`, instead of inline, so the Content Security Policy allows it without a hash.
- Header buttons, the mobile Menu button, mobile menu items and language menu items are at least 44 by 44 pixels (WCAG 2.5.5); they were 27 to 32 pixels tall.
- `site.json` gives the site's address as `https://eleventy-website-vishpala.netlify.app`, the test deploy, until the site moves to its production server; it was the placeholder `https://example.com`. Canonical links, `hreflang` and social tags, the sitemap, `robots.txt` and the breadcrumb data use it.

### Fixed

- The site footer names the content licence as CC BY 4.0, matching decision 0001 and `REUSE.toml`; it said CC BY-SA 4.0. The Vishpala theme's default licence changes to match.
- Atkinson Hyperlegible renders for all text when chosen. Each font subset now has its own `@font-face` rule and `unicode-range`; before, browsers loaded only the Latin Extended file, which has no basic Latin letters, and drew most text in a fallback font.
- On section pages, the hero with the page's heading is inside `main`, so "Skip to content" lands on the heading instead of skipping past it, and every part of the page sits in a landmark. Search still indexes only the content below the hero.
