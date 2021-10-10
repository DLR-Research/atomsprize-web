import template from '../client/index.min.html'
import prerender from './prerender'
import { get_mock_user } from '../client/data'

const handleShare = async ({ params: { id: user_id } }: { params: { id: number } }) => {
  const donor = get_mock_user(Number(user_id) || 99999)
  const prerenderedHtml = prerender(template, { donor })
  const finalHtml = donor ? prerenderedHtml.replace(/social\.jpg/g, `badge/${donor.user_id}.png`) : prerenderedHtml

  return new Response(finalHtml, {
    headers: {
      'content-type': 'text/html;charset=UTF-8'
    }
  })
}

export default handleShare
