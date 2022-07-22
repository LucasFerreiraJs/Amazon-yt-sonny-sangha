import { Banner } from "./Banner";
import { ProductFeed } from "./ProductFeed";


import { productType } from "../types/types";
interface Iproducts{
  productList: Array<productType>

}


export function ContentHome({productList}:Iproducts ) {

  return (
    <main className="max-w-screen-2xl mx-auto">

      {/* BANNER */}
        <Banner/>

      {/* PRODUCT FEED */}
      <ProductFeed productList={productList}/>

    </main>
  )
}


