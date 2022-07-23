import Image from "next/image";
import { useSelector } from "react-redux";
import { CheckoutProduct } from "../../components/CheckoutProduct";
import { selectItems } from "../slices/basketSlice";

export default function Checkout() {

  const basketItems = useSelector(selectItems);

  return (
    <div className="bg-gray-100">
      <main
        className="
          lg:flex max-w-screen-2xl mx-auto
        ">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {
                basketItems.length == 0
                ? `Your Shopping Basket`
                : `Shopping Basket`
              }
              </h1>


              {basketItems.map((item:any, i:number) =>{
                return(
                    <CheckoutProduct product={item}key={i}/>

                  )
              })}
          </div>
        </div>


        {/* right */}

        <div></div>
      </main>

    </div>

  )

}