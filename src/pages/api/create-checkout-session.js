
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {


  console.log('aqui aa key', process.env.STRIPE_SECRET_KEY)


  const { items, email } = req.body
  const transformItems = items.map(item => ({
    price_data: {
      currency: 'gbp',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image]
      }
    },
    description: item.description,
    quantity: 1
  }));


  console.log()
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates:['shr_1LPKDbJtNlxrNcJf0O492jG3'],
    shipping_address_collection: {
      allowed_countries: ['BR', 'GB', 'US', 'CA']
    },
    line_items: transformItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/seccess`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  });



  res.status(200).json({id: session.id})
};