const fs = require('fs')
const path = require('path')

const prerender = require('../dist/prerender').prerender

if (typeof require !== 'undefined' && require.main === module) {
  const prerenderedHtml = prerender(fs.readFileSync(path.resolve(__dirname, '../dist/template.html'), 'utf8'), {})
  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), prerenderedHtml)
}
