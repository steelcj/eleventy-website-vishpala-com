/*
 * Vishpala theme for Eleventy 3.
 *
 * Usage, in eleventy.config.js:
 *   import vishpalaTheme from "./themes/vishpala/index.js";
 *   eleventyConfig.addPlugin(vishpalaTheme, { licence: { label: "CC BY 4.0", url: "..." } });
 *
 * The theme registers its layouts as virtual templates under _includes/layouts/.
 * To override one, put a file with the same name in your own _includes/layouts/
 * folder: the theme detects it and leaves yours in place.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

const THEME_DIR = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_STRINGS = {
  en: {
    skip: "Skip to content",
    menu: "Menu",
    mainNav: "Main navigation",
    languages: "Available languages",
    changeFont: "Change font",
    systemFont: "System font",
    search: "Search",
    searchPlaceholder: "Search…",
    close: "Close",
    backTo: "Back to",
    related: "Related",
    otherServices: "Other services",
    footerNav: "Footer",
    externalSite: "external site",
    breadcrumb: "Breadcrumb",
    metricsTitle: "How this site measures up",
    metricsIntro: "Results from independent testing tools. Run each test yourself to see what they say today.",
    metricsTested: "tested",
    colon: ":",
    metricsTestYourself: "Test it yourself with {tool}",
    metricsSelfAssessed: "Our own review",
    qualities: {
      accessibility: "Accessibility",
      performance: "Performance",
      visibility: "Visibility",
      sustainability: "Sustainability",
      "privacy-security": "Privacy and security",
      agency: "Agency",
      longevity: "Longevity",
    },
  },
  fr: {
    skip: "Aller au contenu",
    menu: "Menu",
    mainNav: "Navigation principale",
    languages: "Langues disponibles",
    changeFont: "Changer de police",
    systemFont: "Police système",
    search: "Rechercher",
    searchPlaceholder: "Rechercher…",
    close: "Fermer",
    backTo: "Retour à",
    related: "Voir aussi",
    otherServices: "Autres services",
    footerNav: "Pied de page",
    externalSite: "site externe",
    breadcrumb: "Fil d’Ariane",
    metricsTitle: "Ce site à l’épreuve",
    metricsIntro: "Résultats d’outils de test indépendants. Lancez chaque test vous-même pour voir ce qu’ils disent aujourd’hui.",
    metricsTested: "testé le",
    colon: "\u00a0:",
    metricsTestYourself: "Testez vous-même avec {tool}",
    metricsSelfAssessed: "Notre propre examen",
    qualities: {
      accessibility: "Accessibilité",
      performance: "Performance",
      visibility: "Visibilité",
      sustainability: "Durabilité",
      "privacy-security": "Vie privée et sécurité",
      agency: "Pouvoir d’agir",
      longevity: "Longévité",
    },
  },
};

// The seven web-metric qualities, in display order. Each has a mark in assets/img/kamon.svg.
const QUALITIES = ["accessibility", "performance", "visibility", "sustainability", "privacy-security", "agency", "longevity"];

// Testing tools a metrics result can name. In each test address, {url} is the tested page
// (URL-encoded), {rawUrl} the same unencoded, {host} its host name, and {slug} the page's
// address as Website Carbon writes it (eleventy-website-vishpala-netlify-app-en).
const METRIC_TOOLS = {
  lighthouse: { name: "Lighthouse", runner: "PageSpeed Insights", test: "https://pagespeed.web.dev/report?url={url}" },
  observatory: { name: "HTTP Observatory", test: "https://developer.mozilla.org/en-US/observatory/analyze?host={host}" },
  ssllabs: { name: "SSL Server Test", test: "https://www.ssllabs.com/ssltest/analyze.html?d={host}" },
  websitecarbon: { name: "Website Carbon Calculator", test: "https://www.websitecarbon.com/website/{slug}/" },
  w3c: { name: "W3C Markup Validation Service", test: "https://validator.w3.org/nu/?doc={url}" },
  wave: { name: "WAVE", test: "https://wave.webaim.org/report#/{rawUrl}" },
};

const DEFAULTS = {
  // Which colour each top-level section's hero block uses, keyed by the first
  // path segment after the language (for example /en/services/ -> "services").
  sectionColours: {
    services: "red",
    "who-we-serve": "yellow",
    solutions: "blue",
    approach: "blue",
    about: "white",
    contact: "yellow",
  },
  defaultColour: "white",
  // The contrasting colour of the logo block beside each hero colour.
  logoColours: { red: "blue", blue: "red", yellow: "white", white: "yellow" },
  languageLabels: { en: "English", fr: "Français", es: "Español" },
  licence: { label: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
  search: true,
  sitemap: true,
  strings: {},
};

export default function vishpalaTheme(eleventyConfig, userOptions = {}) {
  const options = {
    ...DEFAULTS,
    ...userOptions,
    sectionColours: { ...DEFAULTS.sectionColours, ...(userOptions.sectionColours || {}) },
    languageLabels: { ...DEFAULTS.languageLabels, ...(userOptions.languageLabels || {}) },
  };
  const strings = {};
  for (const lang of new Set([...Object.keys(DEFAULT_STRINGS), ...Object.keys(options.strings)])) {
    strings[lang] = { ...DEFAULT_STRINGS.en, ...(DEFAULT_STRINGS[lang] || {}), ...(options.strings[lang] || {}) };
  }

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addGlobalData("theme", { ...options, strings, qualities: QUALITIES, metricTools: METRIC_TOOLS });

  // Theme assets are served from /theme/.
  eleventyConfig.addPassthroughCopy({ [path.join(THEME_DIR, "assets")]: "theme" });

  // Pages in one language, for per-language menus and lists.
  eleventyConfig.addFilter("byLang", (pages, lang) =>
    (pages || []).filter((p) => p.data.lang === lang)
  );

  // Other-language versions of a page, matched on translationKey.
  eleventyConfig.addFilter("translationsOf", (pages, key, currentLang) =>
    (pages || []).filter((p) => key && p.data.translationKey === key && p.data.lang !== currentLang)
  );

  // The first path segment after the language: /en/services/x/ -> "services".
  eleventyConfig.addFilter("sectionOf", (url) => (url || "").split("/").filter(Boolean)[1] || "");

  eleventyConfig.addFilter("sectionColour", (url) => {
    const section = (url || "").split("/").filter(Boolean)[1] || "";
    return options.sectionColours[section] || options.defaultColour;
  });

  eleventyConfig.addFilter("logoColour", (colour) => options.logoColours[colour] || "yellow");

  eleventyConfig.addFilter("year", () => String(new Date().getFullYear()));

  // Text given per language ({ "en": "...", "fr": "..." }) in the page's language, else English.
  // Plain strings are returned as they are.
  eleventyConfig.addFilter("inLang", (value, lang) =>
    value && typeof value === "object" ? value[lang] || value.en : value
  );

  // The metrics results recorded for one quality.
  eleventyConfig.addFilter("metricResults", (results, quality) =>
    (results || []).filter((r) => r.quality === quality)
  );

  // The address that runs a metrics tool on the tested page, from the tool's test template.
  eleventyConfig.addFilter("metricTestUrl", (toolKey, pageUrl) => {
    const tool = METRIC_TOOLS[toolKey];
    if (!tool || !pageUrl) return "";
    const u = new URL(pageUrl);
    const slug = (u.host + u.pathname).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return tool.test
      .replace("{url}", encodeURIComponent(pageUrl))
      .replace("{rawUrl}", pageUrl)
      .replace("{host}", u.host)
      .replace("{slug}", slug);
  });

  // Pages whose data field equals a value, for example resource entries in one category.
  eleventyConfig.addFilter("whereData", (pages, key, value) =>
    (pages || []).filter((p) => p.data[key] === value)
  );

  // Breadcrumb trail built from the folder path: /en/a/b/ -> the pages at /en/, /en/a/ and /en/a/b/.
  // Levels with no page of their own are skipped. Each crumb is { url, label }.
  eleventyConfig.addFilter("breadcrumbs", (pages, url) => {
    const byUrl = new Map((pages || []).filter((p) => p.url).map((p) => [p.url, p]));
    const parts = (url || "").split("/").filter(Boolean);
    const trail = [];
    for (let i = 1; i <= parts.length; i++) {
      const crumbUrl = "/" + parts.slice(0, i).join("/") + "/";
      const p = byUrl.get(crumbUrl);
      if (!p) continue;
      const d = p.data;
      const label = d.breadcrumb || (d.eleventyNavigation && d.eleventyNavigation.key) || d.heading || d.title;
      trail.push({ url: crumbUrl, label });
    }
    return trail;
  });

  // Accessible breadcrumb navigation (W3C WAI-ARIA breadcrumb pattern): a labelled nav,
  // an ordered list, the current page marked with aria-current and not linked.
  // Separators are drawn in CSS so screen readers do not announce them.
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  eleventyConfig.addShortcode("breadcrumbNav", (trail, label) => {
    if (!trail || trail.length < 3) return "";
    const items = trail.map((c, i) => i === trail.length - 1
      ? `<li><span aria-current="page">${esc(c.label)}</span></li>`
      : `<li><a href="${esc(c.url)}">${esc(c.label)}</a></li>`).join("");
    return `<nav class="breadcrumbs" aria-label="${esc(label || "Breadcrumb")}" data-pagefind-ignore><ol>${items}</ol></nav>`;
  });

  // The same trail as schema.org BreadcrumbList structured data, for search engines.
  eleventyConfig.addShortcode("breadcrumbJsonLd", (trail, siteUrl) => {
    if (!trail || trail.length < 3) return "";
    const data = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: (siteUrl || "") + c.url })),
    };
    return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
  });

  // Register each layout unless the site provides its own with the same name.
  const inputDir = eleventyConfig.directories?.input || "src";
  const includesDir = eleventyConfig.directories?.includes || path.join(inputDir, "_includes");
  const layoutsDir = path.join(THEME_DIR, "layouts");
  for (const file of fs.readdirSync(layoutsDir)) {
    const siteOverride = path.join(includesDir, "layouts", file);
    if (fs.existsSync(siteOverride)) continue;
    const virtualPath = path.posix.join(path.relative(inputDir, includesDir).split(path.sep).join("/"), "layouts", file);
    eleventyConfig.addTemplate(virtualPath, fs.readFileSync(path.join(layoutsDir, file), "utf8"));
  }

  if (options.sitemap) {
    eleventyConfig.addTemplate(
      "theme-sitemap.njk",
      fs.readFileSync(path.join(THEME_DIR, "templates", "sitemap.njk"), "utf8"),
      { permalink: "/sitemap.xml", eleventyExcludeFromCollections: true }
    );
    eleventyConfig.addTemplate(
      "theme-robots.njk",
      "User-agent: *\nAllow: /\nSitemap: {{ site.url }}/sitemap.xml\n",
      { permalink: "/robots.txt", eleventyExcludeFromCollections: true }
    );
  }
}
