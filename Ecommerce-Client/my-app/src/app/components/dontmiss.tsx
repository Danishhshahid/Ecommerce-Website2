"use client"
import React, { memo } from "react";
import Image from "next/image";
import featuredpic from "./../../../public/assets/dm1.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dontmiss = memo(() => {
  return (
    <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 lg:px-12">
      <div className="m-6 w-full flex flex-col">
        {/* Header */}
        <div className="w-full h-auto flex items-center mb-4">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            Don&#39;t Miss
          </p>
        </div>
        {/* Content */}
        <div className="w-full flex flex-col gap-6">
          {/* Image Section */}
          <div className="w-full h-auto flex justify-center">
            <Image
              src={featuredpic}
              alt="Flight essentials collection featuring Jordan Brand apparel"
              className="w-full h-auto rounded-lg"
              priority={true}
              quality={75}
              loading="eager"
              onLoad={(event) => {
                event.currentTarget.classList.add('loaded');
              }}
            />
          </div>
          {/* Text Section */}
          <div className="w-full flex flex-col items-center gap-3 text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-[50px] font-bold">
              FLIGHT ESSENTIALS
            </h1>
            <p className="text-sm sm:text-base lg:text-lg">
              Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.
            </p>
            <Link href="/DynamicRoutes/allproducts" prefetch={false}>
              <Button className="rounded-3xl px-6 py-2 transform transition-transform hover:scale-105">
                Shop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Dontmiss.displayName = 'Dontmiss';

export default Dontmiss;