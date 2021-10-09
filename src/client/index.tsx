import { render, hydrate } from "preact"
import App from "./App"
import { scientists, badges, project_descriptions } from "./data"

if (process.env.NODE_ENV === "production") {
  hydrate(
    <App
      scientists={scientists}
      total_raised="3,141,592"
      number_contributors="6,535"
      badges={badges}
      project_descriptions={project_descriptions}
    />,
    document.getElementById("app-root")!
  )
} else {
  render(
    <App
      scientists={scientists}
      total_raised="3,141,592"
      number_contributors="6,535"
      badges={badges}
      project_descriptions={project_descriptions}
    />,
    document.getElementById("app-root")!
  )
}
