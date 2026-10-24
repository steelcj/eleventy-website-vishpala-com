import vishpalaTheme from "./themes/vishpala/index.js";

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setOutputDirectory("_site");

  // Site-level static files (images, downloads) go in src/assets/.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addPlugin(vishpalaTheme, {
    // Colour of each section's hero block: red, blue, yellow or white.
    sectionColours: {
      services: "red",
      "who-we-serve": "yellow",
      solutions: "blue",
      approach: "blue",
      about: "white",
      contact: "yellow",
    },
    licence: { label: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
    search: true,
    sitemap: true,
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
