import fs from 'fs'

import prerender from '../src/worker/prerender'

if (typeof require !== 'undefined' && require.main === module) {
  const prerenderedHtml = prerender(
    fs.readFileSync('src/client/index.min.html', 'utf8'),
    {}
  )
  fs.writeFileSync('dist/index.html', prerenderedHtml)
}
