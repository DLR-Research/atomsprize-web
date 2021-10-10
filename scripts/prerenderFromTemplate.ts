import fs from 'fs'

import prerender from '../src/worker/prerender'

const prerenderedHtml = prerender(fs.readFileSync('src/client/index.min.html', 'utf8'), {})
fs.writeFileSync('dist/index.html', prerenderedHtml)
