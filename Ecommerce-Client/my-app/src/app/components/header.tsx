"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SiNike } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { FaRegHeart } from "react-icons/fa6";
import { IoBagHandleOutline } from "react-icons/io5";
import * as Dialog from "@radix-ui/react-dialog";
import { HiMenu } from "react-icons/hi"; // For Hamburger Menu Icon
import { useAppSelector } from "../store/hooks";

const Header = () => {
  const [open, setOpen] = useState(false); // Track dialog open state
  const cart = useAppSelector((state)=> state.cart);

  return (
    <div className="w-full flex h-[60px] text-black mt-3 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full h-full">
        <div className="w-full h-full flex justify-between items-center">
          {/* Left Nike Icon */}
          <div className="text-4xl sm:text-5xl lg:text-6xl">
            <Link href={"/"}>
              {" "}
              <SiNike />
            </Link>
          </div>

          {/* Navigation Links for Large Screens */}
          <div className="hidden sm:block">
            <ul className="flex gap-4 md:gap-6 lg:gap-8 text-sm md:text-base lg:text-lg">
              <li>
                <Link href="/featuredPage">News & Featured</Link>
              </li>
              <li>
                <Link href="/Men's-Shoes">Men</Link>
              </li>
              <li>
                <Link href="/Women's-Shoes">Women</Link>
              </li>
              <li>
                <Link href="/kid's-Shoes">Kids</Link>
              </li>
              <li>
                <Link href="/mens">Sale</Link>
              </li>
              <li>
                <Link href="/shoes">SNKRS</Link>
              </li>
              <li>
                <Link href="/allproducts">Store</Link>
              </li>
            </ul>
          </div>

          {/* Search, Heart, and Cart for Large Screens */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center rounded-3xl bg-gray-100 px-2 sm:px-4 py-1">
              <Link href="/">
                <CiSearch className="text-xl sm:text-2xl" />
              </Link>
              <Input
                placeholder="Search"
                className="outline-0 bg-transparent border-0 text-sm sm:text-base w-[80px] sm:w-[150px] lg:w-[200px]"
              />
            </div>

            <Link href="/">
              <FaRegHeart className="text-xl sm:text-2xl" />
            </Link>

            <Link href="/cart" className="relative flex items-center">
              <IoBagHandleOutline className="text-xl sm:text-2xl" />
              {cart.length >0 && 
              (<span className="absolute top-0 right-0 translate-x-2/4 -translate-y-2/4 text-[10px] sm:text-xs bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>)}
             
            </Link>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="block sm:hidden">
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button className="text-xl">
                  <HiMenu />
                </button>
              </Dialog.Trigger>

              {/* Dialog/Sidebar for Mobile */}
              <Dialog.Content
                className={`lg:w-[20%] w-[50%] h-full bg-white shadow-md p-4 fixed top-0 left-0 z-10 lg:block transition-all duration-500 ease-out transform ${
                  open ? "translate-x-0" : "translate-x-[-100%]"
                }`}
                onClick={() => setOpen(false)} // Close on click
              >
                <Dialog.Title className="font-bold mb-10">
                  Mobile Navigation
                </Dialog.Title>

                <Dialog.Description className="sr-only">
                  Use the menu to navigate through the website sections like
                  Men, Women, Kids, and more.
                </Dialog.Description>

                <div className="flex flex-col gap-4">
                  <Link href="/allproducts">All Products</Link>
                  <Link href="/DynamicRoutes/featuredPage">
                    News & Featured
                  </Link>
                  <Link href="/mens">Men</Link>
                  <Link href="/womens">Women</Link>
                  <Link href="/kids">Kids</Link>
                  <Link href="/sale">Sale</Link>
                  <Link href="/SNKRS">SNKRS</Link>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
