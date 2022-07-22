import Image from "next/image";
import { productType } from "../types/types";
import { StarIcon } from '@heroicons/react/solid'
import { useState } from "react";
import Currency from 'react-currency-formatter'

import PrimeTag from '../public/assets/Prime-tag-.png'

interface IProductProps {
  product: productType
}

export function ProductCard({ product }: IProductProps) {
  const { id, title, price, description, category, image, rating } = product

  const [ratingCount] = useState(Math.ceil(rating.rate))
  const [hasPrime] = useState(Math.random() < 0.5)

  return (
    <>
      <div
        className="
          relative flex flex-col m-5 bg-white z-30 p-10

        ">
        <p className="absolute top-2 right-2 text-sm italic text-gray-400">{category}</p>

        <div className="relative h-52 w-52 mx-auto">
          <Image src={image} layout="fill" objectFit="contain" />
        </div>

        <h4 className="my-3">{title}</h4>

        <div className="flex">

          {
            Array(ratingCount)
              .fill(ratingCount)
              .map((_, i) => (
                <StarIcon className="h-5 text-yellow-500" />
              ))
          }
        </div>

        <p className="text-xs my-2 line-clamp-2">{description}</p>

        <div className="mb-5">
          <Currency quantity={price} currency="GBP" />
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img  className="w-12" src={PrimeTag.src} alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
        <button className="mt-auto button">Add to Basket</button>
      </div>
    </>

  )
}