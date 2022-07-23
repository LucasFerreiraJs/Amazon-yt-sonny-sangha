import { Banner } from "./Banner";
import { ProductFeed } from "./ProductFeed";


// export function ContentHome({productList}:Iproducts ) {
export function ContentHome() {

  return (

    <main className="max-w-screen-2xl mx-auto">
      {/* BANNER */}
      <Banner />

      {/* PRODUCT FEED */}
      <ProductFeed />
    </main>
  )
}


