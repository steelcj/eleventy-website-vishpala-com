# Roadmap

Completed items move to [CHANGELOG.md](CHANGELOG.md).

## Next release

The following metrics were taken against https://vishpala.netlify.app/en-ca/ (hugo-website-vishpala) and not eleventy-website-vishpala-com. That said we want to resolve any issues that are still present in eleventy-website-vishpala-com.

### Web Metrics

#### Bandwidth(?)

- Allow for downloadable sites: handled by https://github.com/steelcj/balise-sos-demo, to be served at balise.vishpala.com at a later date.

## Launch on the production server

The site is tested at https://eleventy-website-vishpala.netlify.app and moves to vishpala.com on the Digital Ocean Toronto droplet, replacing the MkDocs site there now.

1. Configure the droplet's web server with the response headers and the `/` to `/en/` redirect from `netlify.toml`. Netlify applies that file only on Netlify, so the droplet needs the same Content Security Policy, HSTS and other headers in its own configuration.
2. Change `url` in `src/_data/site.json` to `https://vishpala.com`, then build and deploy. Canonical links, `hreflang` and social tags, the sitemap, `robots.txt` and the breadcrumb data all follow it.
3. Redirect, with 301, every address of the MkDocs site that the new site does not have to the new home page, `/en/`. The MkDocs site was a preview for a client and its content has no counterpart in the new site. From the MkDocs sitemap, these are `/about/`, `/accueil/`, `/achievements/`, `/actualites/`, `/a_propos/`, `/contact/`, `/galerie/`, `/news/`, `/quote/`, `/realisations/`, `/services/`, `/soumission/`, `/temoignages/`, the same under `/en/` plus `/en/home/` and `/en/references/`, and both `accueil/index (copy)/` pages. `/en/about/`, `/en/contact/` and `/en/services/` also exist in the new site, which now serves its own pages there.
4. Redirect, with 301, every address of the Netlify site to the same path on vishpala.com, so search engines move anything indexed there to the production address.
5. Submit `https://vishpala.com/sitemap.xml` in Google Search Console.
6. Measure again on vishpala.com: MDN Observatory, PageSpeed, WAVE and Website Carbon. Update the results under `metrics` in `src/_data/site.json`, including the longevity result, which no longer needs to mention Netlify's script. On Netlify, Lighthouse best practices is 93, and the W3C validator stops with a fatal error, only because of the "Powered by Netlify" badge. Netlify's Free plan adds the badge's script after the end of every page, and turning the badge off in the project settings and redeploying did not remove it. The Content Security Policy blocks the badge's inline style and script, which logs two console errors. The droplet adds no badge, so expect best practices 100 and no validator errors, as in local tests with the same headers, as long as it serves the `netlify.toml` headers over HTTPS and adds nothing to the pages.
