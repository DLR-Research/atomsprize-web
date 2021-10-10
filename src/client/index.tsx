import { render, hydrate } from 'preact'
import App from './App'
import { get_mock_user } from './data'

const main = async () => {
  const user_id =
    typeof window === 'undefined'
      ? undefined
      : window.location.pathname.startsWith('/share/')
      ? Number(window.location.pathname.replace('/share/', '')) || undefined
      : undefined

  const donor = get_mock_user(user_id)

  if (process.env.NODE_ENV === 'production') {
    hydrate(<App donor={donor} />, document.getElementById('app-root')!)
  } else {
    render(<App donor={donor} />, document.getElementById('app-root')!)
  }
}

main()
