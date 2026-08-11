import wuyong from "@fetsorn/eleventy-plugin-wuyong";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(wuyong, {
    csvs: "../csvs",
    root: "laboratory",
    title: "labs",
  });

  eleventyConfig.addPassthroughCopy({ "src/assets/index.css": "/index.css" });

  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setIncludesDirectory("_includes");
  eleventyConfig.setDataDirectory("_data");
  eleventyConfig.setOutputDirectory("_site");
}
