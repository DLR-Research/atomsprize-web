import template from "../client/index.html"
import { getPrerenderedHtml } from "../../scripts/prerender";
import { scientists, badges, project_descriptions } from "../client/data"

const handleShare = async ({ params: { id: user_id } }: { params: { id: number } }) => {
  const prerenderedHtml = getPrerenderedHtml(
    template,
    {
      scientists,
      badges,
      project_descriptions,
      user_id,
      total_raised: "3,141,592",
      number_contributors: "6,535",
    },
  )

  return new Response(prerenderedHtml, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
}

export default handleShare
