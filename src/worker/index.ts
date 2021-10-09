import { Router } from 'itty-router'

import handleCheckout from './checkout'
import handleShare from './share'

const router = Router()

router.post("/checkout", handleCheckout)
router.get("/share/:id", handleShare)
router.all("*", () => new Response("404 Not Found", { status: 404 }))

addEventListener('fetch', (e) => {
  // @ts-ignore
  e.respondWith(router.handle(e.request))
})
