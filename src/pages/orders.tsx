import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/client"
import db from '../../firebase'
import moment from 'moment'
import { OrderItem } from "../../components/OrderItem";



export default function Orders({ orders }: any) {

  console.log('orders db', orders)
  const [session] = useSession();

  return (

    <main className="max-w-screen-ls mx-auto p-10">
      <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
        Your orders
      </h1>

      {
        session
          ? (<h2>{orders.length} Orders</h2>)
          : (<h2>Please sign in to see your orders</h2>)
      }

      <div className="mt-5 space-y-4">
        {
          orders?.map((order: any) => (
            <OrderItem key={order.id} order={order} />
          ))
        }
      </div>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  function toDateTime(secs:number) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);


    return t
}

  // GET USERS
  const session: any = await getSession(context);

  if (!session) {
    return {
      props: {}
    }
  }

  // firebase db
  const stripeOrders = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order: any) => {

      let {seconds} = JSON.parse(JSON.stringify(order.data().timestamp))
      let getDate = toDateTime(seconds)


      return {
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: String(getDate),
        items: (
          await stripe.checkout.sessions.listLineItems(order.id, {
            limit: 100
          })
        ).data,

      }
    })
  );


  return {
    props: {
      orders
    }
  }
}


