import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import { useSelector } from "react-redux";


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = false
  
  return (
    <div className="sticky h-24 top-0 z-10 bg-white">
      <div className="h-20 p-2 flex items-center justify-between ">

        {/* LOGO */}
        <div className="flex gap-44">
          <div className="w-16 h-14 py-2">
            <Link href="/">
              <Image src = "/images/pizza-logo.png" alt = "Pizza Logo" width = {50} height = {50} />
            </Link>
          </div>
            
          <div className="w-24 h-20">
            <Image src="/images/pizza_header.png" alt="Pizza header" width={110} height={60} />
          </div>

        </div>

        {/* MEDIUM SCREEN MENU */}
        <div className = "hidden md:flex gap-4 justify-center items-center h-8 mt-4 p-2 text-center font-semibold text-sm uppercase">
            <Link href="/"> Home </Link>
            <Link href="/products"> Products </Link>
            <Link href="/pages"> Pages </Link>
            <Link href="/blog"> Blog </Link>
            <Link href="/contacts"> Contact </Link>
          
            <SearchIcon />
            
            <div className="flex flex-1 items-center">
              <Link href="/cart">
                <div className="relative">
                  <Image src="/images/cart_logo_dark.png" alt="" width={30} height={30} />
                  
                  <div className="absolute -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-[50%] bg-red-500 text-white p-[3px] flex items-center justify-center font-bold"> 
                    {quantity} 
                  </div>
                  
                </div>
              </Link>
                
            </div>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
            <MenuIcon />
        </div>
      </div>
    </div>
  )
}

export default Navbar