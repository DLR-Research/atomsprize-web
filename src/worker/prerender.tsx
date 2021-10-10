import render from 'preact-render-to-string'

import App, { AppProps } from '../client/App'

const prerender = (template: string, props: AppProps) =>
  template.replace('<div id=app-root></div>', `<div id=app-root>${render(<App {...props} />)}</div>`)

export default prerender
