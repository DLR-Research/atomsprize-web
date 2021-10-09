import { Stripe } from 'stripe-workers'

const stripe = new Stripe(STRIPE_SECRET_KEY)

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let amount = 0
  const formData = await request.formData()
  for (const entry of formData.entries()) {
    if (entry[0] === 'amount') {
      amount = 100 * (Number(entry[1]) || 0)
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Noble Prize',
          },
          unit_amount: amount,
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
