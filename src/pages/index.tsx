import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Image from "next/image";
import { ContextType, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ContentHome } from "../../components/ContentHome";
import { Header } from "../../components/Header";
import { ProductFeed } from "../../components/ProductFeed";
import { productType } from "../../types/types";
import { addToProductInitial } from "../slices/InitialProducts";


interface Iproducts {
  productList: Array<productType>

}


export default function Home({ productList }: Iproducts) {

  const dispatch = useDispatch()

  const setInitialProduct = () => {
    dispatch(addToProductInitial(productList))
  }

  productList.length && setInitialProduct()

  return (

    <div className="bg-gray-100" style={{ backgroundColor: "rgb(243 244 246)" }} >
      <Head>
        <title>Amazon 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <ContentHome />
      {/* <ProductFeed productList={productList}/> */}
      {/* <ProductFeed /> */}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getSession(context);
  const products: Iproducts = await fetch('https://fakestoreapi.com/products').then((res) => res.json())

  return {
    props: {
      productList: products,
      session
    }
  }
}