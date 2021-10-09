import { render } from 'react-dom'
import App from './App'
import { scientists, badges, project_descriptions } from './data'

render(
  <App
    scientists={scientists}
    total_raised="3,141,592"
    number_contributors="6,535"
    badges={badges}
    project_descriptions={project_descriptions}
  /> as any,
  document.getElementById('app-root')
)
