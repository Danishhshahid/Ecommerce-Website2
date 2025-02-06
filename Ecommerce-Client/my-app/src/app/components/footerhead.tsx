import Link from "next/link";
import React from "react";

const Footerhead = () => {
  return (
    <div className="w-full h-auto flex items-center py-8">
      <div className="w-full flex flex-wrap justify-center items-center px-4 sm:px-6 lg:px-12">
        <div className="w-full md:w-[80%] flex flex-wrap justify-between gap-8">
          {/* Icons Section */}
          <div className="w-full sm:w-[45%] md:w-[20%] flex flex-col gap-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Icons
            </h1>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>
                <Link href={"/"}>Air Force 1</Link>
              </li>
              <li>
                <Link href={"/"}>Huarache</Link>
              </li>
              <li>
                <Link href={"/"}>Air Max 90</Link>
              </li>
              <li>
                <Link href={"/"}>Air Max 95</Link>
              </li>
            </ul>
          </div>

          {/* Shoes Section */}
          <div className="w-full sm:w-[45%] md:w-[20%] flex flex-col gap-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Shoes
            </h1>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>
                <Link href={"/"}>All Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Custom Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Jordan Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Running Shoes</Link>
              </li>
            </ul>
          </div>

          {/* Clothing Section */}
          <div className="w-full sm:w-[45%] md:w-[20%] flex flex-col gap-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Clothing
            </h1>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>
                <Link href={"/"}>All Clothing</Link>
              </li>
              <li>
                <Link href={"/"}>Modest Wear</Link>
              </li>
              <li>
                <Link href={"/"}>Hoodies & Pullovers</Link>
              </li>
              <li>
                <Link href={"/"}>Shirts & Tops</Link>
              </li>
            </ul>
          </div>

          {/* Kid's Section */}
          <div className="w-full sm:w-[45%] md:w-[20%] flex flex-col gap-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              Kid&#39;s
            </h1>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>
                <Link href={"/"}>Infant & Toddler Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Kid&#39;s Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Kid&#39;s Jordan Shoes</Link>
              </li>
              <li>
                <Link href={"/"}>Kid&#39;s Basketball Shoes</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footerhead;
