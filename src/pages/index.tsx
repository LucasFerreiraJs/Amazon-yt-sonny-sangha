import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ContextType, useEffect, useState } from "react";
import { ContentHome } from "../../components/ContentHome";
import { Header } from "../../components/Header";
import { productType } from "../../types/types";


interface Iproducts {
  productList: Array<productType>

}


export default function Home({ productList }: Iproducts) {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)

      console.log('productList', productList)
  }, [])

  return (

    <div className="bg-gray-100" style={{backgroundColor: "rgb(243 244 246)"}} >
      <Head>
        <title>Amazon 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <ContentHome productList={productList} />

    </div>
  );
};

export async function getServerSideProps(context: ContextType<any>) {
  const products: Iproducts = await fetch('https://fakestoreapi.com/products').then((res) => res.json())

  return {
    props: {
      productList: products
    }
  }
}