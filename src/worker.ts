import { Stripe } from 'stripe-workers'

const stripe = new Stripe(STRIPE_SECRET_KEY)

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://nobleprize.com/',
    cancel_url: 'https://nobleprize.com/',
  })

  return Response.redirect(session.url, 301)
}
