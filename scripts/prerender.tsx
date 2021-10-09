import render from "preact-render-to-string"

import App, { AppProps } from "../src/client/App"
import { scientists, badges, project_descriptions } from "../src/client/data"

export const getPrerenderedHtml = (t: string, props: AppProps) => t.replace(
  '<div id="app-root"></div>',
  `<div id="app-root">${render(<App {...props} />)}</div>`,
)

if (typeof require !== 'undefined' && require.main === module) {
  const minify_options = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  }

  const fs = require("fs")
  const minify = require("html-minifier").minify

  const prerenderedHtml = getPrerenderedHtml(
    fs.readFileSync('src/client/index.html', 'utf8'),
    {
      scientists,
      badges,
      project_descriptions,
      total_raised: "3,141,592",
      number_contributors: "6,535",
    },
  )

  fs.writeFileSync('dist/index.html', minify(prerenderedHtml, minify_options))
}
