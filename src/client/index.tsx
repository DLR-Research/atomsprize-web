import { render, hydrate } from "preact"
import App from "./App"
import { scientists, badges, project_descriptions } from "./data"

const user_id =
  typeof window === "undefined"
    ? undefined
    : window.location.pathname.startsWith("/share/")
    ? Number(window.location.pathname.replace("/share/", "")) || undefined
    : undefined

if (process.env.NODE_ENV === "production") {
  hydrate(
    <App
      scientists={scientists}
      total_raised="3,141,592"
      number_contributors="6,535"
      badges={badges}
      project_descriptions={project_descriptions}
      user_id={user_id}
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
      user_id={user_id}
    />,
    document.getElementById("app-root")!
  )
}
