import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const arrData = {}
    let hasMore = true
    let startingAfter = undefined

    while (hasMore) {
      const subscriptions = await stripe.subscriptions.list({
        status: 'active',
        limit: 100,
        starting_after: startingAfter,
      })

      for (const sub of subscriptions.data) {
        for (const item of sub.items.data) {
          const price = await stripe.prices.retrieve(item.price.id)
          if (price.recurring) {
            const product = await stripe.products.retrieve(price.product)
            let amount = (item.quantity * price.unit_amount) / 100
            if (price.recurring.interval === 'year') {
              // Already annual
            } else if (price.recurring.interval === 'month') {
              amount *= 12 // Annualize
            }
            if (!arrData[product.name]) {
              arrData[product.name] = 0
            }
            arrData[product.name] += amount
          }
        }
      }

      hasMore = subscriptions.has_more
      if (hasMore) {
        startingAfter = subscriptions.data[subscriptions.data.length - 1].id
      }
    }

    res.status(200).json(arrData)
  } catch (error) {
    console.error('Error fetching ARR:', error)
    res.status(500).json({ message: 'Error fetching ARR' })
  }
}
