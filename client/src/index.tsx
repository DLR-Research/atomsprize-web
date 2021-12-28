import { render, hydrate } from 'preact'
import App from './App'

if (process.env.NODE_ENV === 'production') {
  hydrate(<App />, document.getElementById('app-root')!)
} else {
  render(<App />, document.getElementById('app-root')!)
}
