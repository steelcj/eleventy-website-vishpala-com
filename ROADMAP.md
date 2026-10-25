# Roadmap

Completed items move to [CHANGELOG.md](CHANGELOG.md).

## Next release

The following metrics where take against https://vishpala.netlify.app/en-ca/ (hugo-website-vishpala) and not eleventy-website-vishpala-com. That said we want to resolve any issues that are still present in eleventy-website-vishpala-com.

### Web Metrics

#### Accessibility

* Button sizes
* https://wave.webaim.org/
  * Home page(es?) does not have a first level heading.

#### Bandwidth(?)

- Ensure fonts are downloaded locally (to the theme)
  - Minimize bandwidth requirements
  - Minimize remote resources
  - Allow for downloadable sites

#### Security

* https://developer.mozilla.org/en-US/observatory
  * | Score                                                        | Reason     | Recommendation                                       |                                                              |
  | ------------------------------------------------------------ | ---------- | ---------------------------------------------------- | ------------------------------------------------------------ |
  | [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP) | −25 Failed | Content Security Policy (CSP) header not implemented | Implement one, see [MDN's Content Security Policy (CSP) documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). |

#### Speed

* https://pagespeed.web.dev/analysis/https-vishpala-netlify-app-en-ca/xhgvp36xtd?form_factor=mobile
* https://pagespeed.web.dev/analysis/https-vishpala-netlify-app-en-ca/xhgvp36xtd?form_factor=desktop
  * Accessibility 95% and mobile and desktop both show : "Touch targets do not have sufficient size or spacing."

#### Sustainability

* https://www.websitecarbon.com/website/vishpala-netlify-app-en-ca/ 
  *  Cleaner than 99% of pages tested
  * badge

```html
<div id="wcb" class="carbonbadge"></div>
<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
```


## Launch on the production server

The site is tested at https://eleventy-website-vishpala.netlify.app and moves to vishpala.com on the Digital Ocean Toronto droplet, replacing the MkDocs site there now.

1. Configure the droplet's web server with the response headers and the `/` to `/en/` redirect from `netlify.toml`. Netlify applies that file only on Netlify, so the droplet needs the same Content Security Policy, HSTS and other headers in its own configuration.
2. Change `url` in `src/_data/site.json` to `https://vishpala.com`, then build and deploy. Canonical links, `hreflang` and social tags, the sitemap, `robots.txt` and the breadcrumb data all follow it.
3. Redirect, with 301, each address of the MkDocs site that the new site does not have to its nearest new page, so links to the old pages keep working. From the MkDocs sitemap, these are `/about/`, `/accueil/`, `/achievements/`, `/actualites/`, `/a_propos/`, `/contact/`, `/galerie/`, `/news/`, `/quote/`, `/realisations/`, `/services/`, `/soumission/`, `/temoignages/`, the same under `/en/` plus `/en/home/` and `/en/references/`, and both `accueil/index (copy)/` pages. `/en/`, `/en/about/`, `/en/contact/` and `/en/services/` exist in the new site.
4. Redirect, with 301, every address of the Netlify site to the same path on vishpala.com, so search engines move anything indexed there to the production address.
5. Submit `https://vishpala.com/sitemap.xml` in Google Search Console.
6. Measure again on vishpala.com: MDN Observatory, PageSpeed, WAVE and Website Carbon. Update `carbon` in `src/_data/site.json` with the new Website Carbon result.
