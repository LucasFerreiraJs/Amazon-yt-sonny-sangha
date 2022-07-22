
import { productType } from "../types/types";
import { ProductCard } from "./ProductCard";
interface Iproducts {
  productList: Array<productType>

}

export function ProductFeed({ productList }: Iproducts) {
  return (
    <div
      className="
        grid grid-flow-row-dense mx-auto
        md:grid-cols-2 md:-mt-52
        lg:grid-cols-3
        xl:grid-cols-4
        "
    >
      {
        productList.slice(0, 4).map(product => {
          return (
            <ProductCard key={product.image} product={product} />
          )
        })
      }

      <img className="md:col-span-full" src="http://links.papareact.com/dyz" alt="" />

      <div
        className="
          md:col-span-2
        ">
        {
          productList.slice(4, 5).map(product => {
            return (
              <ProductCard key={product.image} product={product} />
            )
          })
        }
      </div>

      {
        productList.slice(5, productList.length - 1 ).map(product => {
          return (
            <ProductCard key={product.image} product={product} />
          )
        })
      }

    </div>

  )
}