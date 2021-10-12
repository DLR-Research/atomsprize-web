import { Stripe } from 'stripe-workers'

const stripe = new Stripe(STRIPE_SECRET_KEY)

const handleRequest = async request => {
  let amount = 0
  const formData = await request.formData()
  for (const entry of formData.entries()) {
    if (entry[0] === 'amount') {
      const amount_string = (entry[1] || '').replaceAll(',', '')
      amount = 100 * Number(amount_string)
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Fast Prize'
          },
          unit_amount: amount
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'https://fastprize.org/',
    cancel_url: 'https://fastprize.org/'
  })

  return Response.redirect('https://google.com', 301)
}

export default handleRequest
