import fs from 'fs'
import path from 'path'
import { minify } from 'html-minifier'

const minify_template = async () => {
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

  const p1 = fs.promises.readFile(path.resolve(__dirname, '../src/index.html'), 'utf8')
  const p2 = fs.promises.readFile(path.resolve(__dirname, '../assets/style.css'), 'utf8')
  const template = await p1
  const css = await p2
  const subbedTemplate = template
    .replace('<link rel="stylesheet" href="/style.css">', `<style>${css}</style>`)
    .replace('</head>', '<script type="module" src="/bundle.js" defer></script></head>')
  const html = minify(subbedTemplate, MINIFY_OPTIONS)
  fs.mkdir(path.resolve(__dirname, '../dist'), { recursive: true }, _ => {
    fs.writeFileSync(path.resolve(__dirname, '../dist/template.html'), html)
  })
}

if (typeof require !== 'undefined' && require.main === module) {
  minify_template()
}
