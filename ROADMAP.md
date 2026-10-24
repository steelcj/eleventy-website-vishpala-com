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

