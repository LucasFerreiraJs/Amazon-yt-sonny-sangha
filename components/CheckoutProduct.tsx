import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import { productType } from "../types/types";
import Currency from 'react-currency-formatter'
interface IProductProps {
  product: productType
}

import PrimeTag from '../public/assets/Prime-tag-.png'
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../src/slices/basketSlice";

export function CheckoutProduct({ product }: IProductProps) {

  const { id, title, price, description, category, image, rating, hasPrime } = product
  const [ratingCount] = useState(Math.ceil(rating.rate))

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const productToAdd = {
      id, title, price, description, category, image, rating, hasPrime
    }

    // push item to basket
    dispatch(addToBasket({productToAdd}))
  }

  const removeItemFromBasket = () => {

    dispatch(removeFromBasket({id}))
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>


        <div className="flex">
          {
            Array(ratingCount)
              .fill(ratingCount)
              .map((_, i) => {
                return (
                  <StarIcon key={i} className="h-5 text-yellow-500" />
                )
              })
          }
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />

        {
          hasPrime && (
            <div className="flex items-center space-x-2">
              <img loading="lazy" src={PrimeTag.src} alt="prime tag" className="w-12" />
              <p className="text-xs text-gray-500"> FREE Next-day delivery</p>
            </div>
          )
        }
      </div>

      {/* right */}
      <div className="flex flex-col space-y-2 my-auto justify-end">
        <button onClick={addItemToBasket} className="button my-auto">Add to Basket</button>
        <button onClick= {removeItemFromBasket}className="button my-auto">Remove from Basket</button>
      </div>
    </div>
  )

}