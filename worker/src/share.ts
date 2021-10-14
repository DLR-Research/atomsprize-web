import template from 'fastprize-client/dist/template.html'
import { prerender } from 'fastprize-client/dist/prerender'

const MOCK_DONOR = {
  user_id: 0,
  total_donated: 99,
  total_referred: 33,
  name: "Ja'far ibn Yahya",
  email: 'jafar@dlr',
  ens_address: 'jafar.eth',
  eth_address: '0xjafar'
}

const handleShare = async ({ params: { id: user_id } }: { params: { id: number } }) => {
  const donor = MOCK_DONOR
  const prerenderedHtml = prerender(template, { donor })
  const finalHtml = donor ? prerenderedHtml.replace(/icon\.png/g, `badge/${user_id}.png`) : prerenderedHtml

  return new Response(finalHtml, {
    headers: {
      'content-type': 'text/html;charset=UTF-8'
    }
  })
}

export default handleShare
