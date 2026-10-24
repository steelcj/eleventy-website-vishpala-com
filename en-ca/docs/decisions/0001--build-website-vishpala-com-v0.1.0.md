---
title: "Decision: Build the vishpala.com Website"
dc:title: "Decision: Build the vishpala.com Website"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic), AI assistance"
dc:subject: "vishpala.com, website, Eleventy, Sveltia CMS, Fluid Infusion, accessibility, multilingual, licensing"
dc:description: "Build vishpala.com as an accessible, low-bandwidth, easy-to-maintain Eleventy and Sveltia CMS site in en-CA, fr-CA and es, replacing vishpala-eleventy-mvp, with code under MIT and documentation and content under CC BY 4.0."
dc:date: "2026-10-23"
dc:type: "Text"
dc:format: "text/markdown"
dc:identifier: "urn:uuid:0876302b-83d1-420e-a047-d1ca482a9d08"
dc:language: "en-CA"
dc:rights: "CC-BY-4.0"
sat:version: "0.1.0"
sat:status: "Accepted"
---

# Decision: Build the vishpala.com Website

Version: 0.1.0
Status: Accepted

## Context

vishpala.com is Vishpala's public site. Vishpala serves aging and underserved populations, older systems, and people on low or intermittent bandwidth, so its own site has to be highly accessible, light to load, and easy to maintain and update.

An earlier repository, vishpala-eleventy-mvp, proved out the stack. This repository starts fresh rather than continuing it.

## Decision

Build vishpala.com in this repository, with these choices:

- **Stack:** Eleventy for the build and Sveltia CMS for editing, with Fluid Infusion components in the templates.
- **Languages:** en-CA, fr-CA and es, each with its own multilingual paths.
- **Content structure:** follow Julia's layout and SEO recommendations rather than the content of the earlier Hugo mockup, with a five-item top menu.
- **Starting point:** the site is built from scratch, using the default theme, fonts and logos of the Hugo vishpala website. Nothing carries over from vishpala-eleventy-mvp.
- **Licensing:**
  - Code is licensed under the MIT License.
  - Documentation is licensed under Creative Commons Attribution 4.0 International.
  - Site content is licensed under Creative Commons Attribution 4.0 International.
  - The Vishpala logos and wordmarks are copyright Vishpala and excluded from both licences.
  - Fonts keep their own licences, as stated in the font licence files included with them.

## Alternatives considered

**Continue vishpala-eleventy-mvp.** Not chosen: a fresh repository can conform to uc-automa from its first commit, rather than being migrated to it.

## Consequences

- This repository replaces vishpala-eleventy-mvp, which stays as a record of the earlier work.
- The MIT and CC BY 4.0 split matches the uc-automa base layout, which carries both licences in through its offerings.
- Each font's licence text belongs in `LICENSES/` under its SPDX identifier, with `REUSE.toml` naming the paths it covers, and the logo and wordmark exclusion is recorded there too.

## Changelog

| Version | Date | Status | Notes |
| --- | --- | --- | --- |
| 0.1.0 | 2026-10-23 | Accepted | Initial version |

## License

This document, *Decision: Build the vishpala.com Website*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
