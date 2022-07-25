import { buffer } from 'micro';
import * as admin from 'firebase-admin'

// secure a connect to FIREBASE from the backend
const serviceAccount = require('../../../permissions.json')

const app = !admin.apps.lengh
  ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  : admin.app()

// connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SINGING_SECRET
const fulfillOrder = async (session) => {
  console.log('fulfillOrder ', session)

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id).set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`success: order ${session.id} had been added to the db`)
    });
}

// STRIPE_SINGING_SECRET
export default async (req, res) => {
  if (req.method === 'POST') {

    const requstBuffer = await buffer(req);
    const payload = requstBuffer.toString();
    const sig = req.headers["stripe-signature"]

    let event;

    // verify that event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)


    } catch (err) {
      console.log('webhook error: ', err.message)
      return res.status(400).send(`Webhook error: ${err.message}`)

    }


    // chekout complet event
    if (event.type == 'checkout.session.completed') {
      const session = event.data.object

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch(err => res.status(400).send(`webhook error: ${err.message}`))
    }

  }
}

export const config ={
  api:{
    bodyParser: false,
    externalResolver: true
  }
}