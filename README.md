# Vishpala website content, draft 2

Web-ready Markdown drafts for the Vishpala Eleventy site, based on the website planning meeting with Julia. Content is English only for now, under `src/en/`, ready for French expressions under `src/fr/`.

To preview or build the site, see [SETUP.md](SETUP.md). In short: `npm install`, then `npm start`. The look comes from the Vishpala theme in `themes/vishpala/`, which recreates the Hugo mockup's design; none of the Hugo site's content is used.

## Structure

```
src/en/
  index.md                          Homepage (write or revise last, per Julia)
  about.md                          Draft About page, compare with your existing version
  contact.md
  approach/
    one-work-many-expressions.md    The work and expression model, your key differentiator
  services/
    index.md                        Optional overview page
    content-archive.md
    publishing-connectors.md
    platform-migration.md
    accessible-low-bandwidth.md
    hosting-sovereignty.md
    fractional-cto.md
  who-we-serve/                     Phase two, "industries served"
    index.md
    nonprofits.md
    small-business.md
    civic-organizations.md
    education-research.md
    municipalities.md
  solutions/                        Phase two, "areas of practice"
    index.md
    move-off-wordpress.md
    bilingual-websites.md
    alternative-formats.md
    low-bandwidth-websites.md
    canadian-content-hosting.md
```

## Front matter conventions

Every page carries the same fields, so they can map onto Sveltia CMS collections and your Eleventy layouts.

- `title`, `description`: page title and meta description for search results (descriptions are kept under about 160 characters where possible)
- `heading`, `subtitle`: the visible heading and the short line under it
- `layout`: `layouts/home.njk`, `layouts/section.njk`, `layouts/page.njk` or `layouts/service.njk`, provided by the theme
- `blocks`: homepage only, the colour blocks of the grid
- `lang`: `en`; French copies would use `fr`
- `translationKey`: shared by every language version of a page, for the language toggle
- `workId`: a placeholder for the universal work ID from your source archive; replace with your real identifiers so the archive, not the file, is the source of truth
- `permalink`: language-prefixed paths such as `/en/services/content-archive/`
- `tags`: `service`, `audience` or `solution`, for building collections and index listings
- `eleventyNavigation`: for `@11ty/eleventy-navigation`; remove if you build navigation another way

## Open items

Search the files for `TODO`, `CHECK` and `NOTE` comments. They are HTML comments, so they will not show on the published site, but remove them before publishing.

- Confirm the spelling of your publishing connector term in `publishing-connectors.md`
- Add pricing or engagement details on each service page
- Add measured page weight and energy figures once the demo site is tested
- Add contact details in `contact.md`
- Get client permission before turning the municipality work into a case study
- Name no party or campaign on `civic-organizations.md` without a signed agreement
- Replace `about.md` with your own About page if you prefer it
- Confirm the career facts on `about.md` and `index.md` match your CV wording

## Suggested order for Julia

Send her the About page, the services pages and the approach page first, as her minimum set. The homepage summarizes those, and the `who-we-serve/` and `solutions/` pages are the next phase she described, so you can send them later or flag them as early drafts.
