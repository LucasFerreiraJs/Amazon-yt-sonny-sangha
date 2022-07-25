import moment from 'moment'
import Currency from 'react-currency-formatter'

export function OrderItem({ order }: any) {
  const { id, amount, amountShipping, items, timestamp, images } = order

  console.log('items', items)
  return (
    <div className='relative border rounded-md'>
      <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs'>Order Placed</p>
          <p>{new Date(String(timestamp)).toLocaleString()}</p>
        </div>
        <div>
          <p className='text-xs font-bold'>Total</p>
          <p>
            <Currency quantity={amount} currency="GBP" />
            {" "}- Next-Day Delivery{" "}
            <Currency quantity={amountShipping} currency="GBP" />

          </p>
        </div>

        <p className="
            text-sm whitespace-nowrap my-auto self-end flex-1 text-right text-blue-500
            sm:text-xl
          ">{items.length} items
        </p>

        <p
          className='absolute top-2 right-2 w-40
          lg:w-72 truncate text-xs whitespace-nowrap
        '>
          ORDER # {id}
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-auto'>
          {
            images.map((image: string, index: number) => {
              return (
                <img key={index} src={image} className="h-20 object-contain sm:h-32"/>)
            })
          }
        </div>
      </div>
    </div>
  )

}