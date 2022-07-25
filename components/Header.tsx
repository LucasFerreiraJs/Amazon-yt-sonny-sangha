
import { signIn, signOut, useSession } from 'next-auth/client';

//  assets
import amazon_logo from "../public/assets/amazon_logo.png";
import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../src/slices/basketSlice';

export function Header() {

  const basketItems = useSelector(selectItems);

  const router = useRouter()

  const [session] = useSession()



  return (
    <header>
      <div
        className="flex items-center space-x-4 bg-amazon_blue px-4 flex-grow py-2">
        <div
          onClick={() => { router.push('/') }}
          className="
            mt-2 flex items-center flex-grow
            sm:flex-grow-0
          ">
          <Image
            src={amazon_logo}
            // layout="fill"
            // div className="relative"
            width={150}
            height={40}
            objectFit="contain" //aspect ratio
            className="cursor-pointer"
          />
        </div>

        {/* search */}
        <div
          className="
            bg-yellow-400 hidden
            sm:flex items-center h-10 rounded-md flex-grow cursor-pointer
            hover:bg-yellow-500 transition duration-300 ease-out
          ">
          <input
            className="h-full p-2 flex-grow flex-shrink w-6 rounded-l-md focus:outline-none"
            type="text"
            name=""
            id="inputSearch" />
          <SearchIcon
            className="h-12 p-4"
          />

        </div>

        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 whitespace-nowrap">
          <div
            onClick={() => {

              if (!session) {
                signIn();
              } else {
                signOut();
              }

            }}
            className="link">
            <p>
              {session
                ? `Hello, ${session?.user?.name}`
                : "Sign In"
              }

            </p>
            <p className="font-extrabold md:text-sm">Account & List</p>
          </div>

          <div className=" link" onClick={()=> session && router.push('/orders')}>
            <p>Return</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => { router.push('/checkout') }}
            className=" relative link flex items-center ">
            <span className="absolute top-0 right-0 md:right-10 w-4 h-4 bg-yellow-400 text-center font-bold rounded-full text-amazon_blue">

              {basketItems.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p
              className="
                hidden
                md:inline-flex font-extrabold md:text-sm
              "
            > Basket </p>
          </div>


        </div>
      </div>


      <div className="flex items-center space-x-3 p-2 pl-8 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>

        <p className="link">Prime Vídeo</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deal</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Heath & Personal Care</p>
      </div>
    </header>
  );
}
