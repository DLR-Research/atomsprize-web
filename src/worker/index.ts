import { Router } from "itty-router"

import handleCheckout from "./checkout"
import handleShare from "./share"
import { handleStats, handleStatsIndex } from "./stats";

const router = Router()

router.post("/checkout", handleCheckout)
router.get("/share/:id", handleShare)
router.get("/stats", handleStatsIndex)
router.get("/stats/:id", handleStats)
router.all("*", () => new Response("404 Not Found", { status: 404 }))

addEventListener("fetch", e => {
  // @ts-ignore
  e.respondWith(router.handle(e.request))
})
