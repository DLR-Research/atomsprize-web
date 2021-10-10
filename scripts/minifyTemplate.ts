import fs from 'fs'
import { minify } from 'html-minifier'

const MINIFY_OPTIONS = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURL: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
}

if (typeof require !== 'undefined' && require.main === module) {
  const template = fs.readFileSync('src/client/index.html', 'utf8')
  const css = fs.readFileSync('assets/style.css', 'utf8')
  const subbedTemplate = template
    .replace(
      '<link rel="stylesheet" href="/style.css">',
      `<style>${css}</style>`
    )
    .replace(
      '</body>',
      '<script type="module" src="/bundle.js" defer></script></body>'
    )
  const html = minify(subbedTemplate, MINIFY_OPTIONS)
  fs.writeFileSync('src/client/index.min.html', html)
}
