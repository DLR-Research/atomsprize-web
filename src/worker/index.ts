import { Router } from 'itty-router'

import handleCheckout from './checkout';

const router = Router()

router.post("/checkout", handleCheckout)
router.all("*", () => new Response("404 Not Found", { status: 404 }))

addEventListener('fetch', (e) => {
  // @ts-ignore
  e.respondWith(router.handle(e.request))
})
