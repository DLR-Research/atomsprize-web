import { Router } from 'itty-router'

import handle_checkout from './checkout'
import get_share from './share'
import get_badge from './badge'
import { getStats, indexStats } from '../../campaigns-worker/src/stats'

const router = Router()

router.post('/checkout', handle_checkout)
router.get('/share/:id', get_share)
router.get('/badge/:id.png', get_badge)
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
