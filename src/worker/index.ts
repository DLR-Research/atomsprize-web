import { Router } from 'itty-router'

import handleCheckout from './checkout'
import handleShare from './share'
import { getStats, indexStats } from '../../campaigns-worker/src/stats'

const router = Router()

router.post('/checkout', handleCheckout)
router.get('/share/:id', handleShare)
router.get('/stats', ({ url }) => indexStats({
  url,
  params: { campaignId: '1' },
}))
router.get('/stats/:id', (
  { params: { id } } : { params: { id: string } }
) => getStats({ params: { campaignId: '1', userId: id } }))
router.all('*', () => new Response('404 Not Found', { status: 404 }))

addEventListener('fetch', e => {
  // @ts-ignore
  e.respondWith(router.handle(e.request))
})
