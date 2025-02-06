import React from "react";
import Image from "next/image";
import e1 from "./../../../public/assets/E1.png";
import e2 from "./../../../public/assets/E2.png";
import e3 from "./../../../public/assets/E3.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = () => {
  return (
    <div className="w-full h-auto flex items-center px-4 sm:px-6 lg:px-6 ">
      <div className="w-full m-6">
        {/* Header */}
        <div className="text-center flex mb-6">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            The Essentials
          </p>
        </div>
        {/* Items */}
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-6 justify-between">
          {/* Men's Section */}
          <div className="w-full sm:w-[48%] lg:w-[32%] relative flex duration-300 hover:scale-105">
            <Image
              src={e1}
              alt="E1"
              className="w-full h-auto rounded-xl "
              priority
            />
            <div className="absolute bottom-6 left-6">
              <Link href={"/mens"}>
                {" "}
                <Button className="bg-white rounded-3xl text-black hover:bg-transparent hover:text-black">
                  Men&#39;s
                </Button>
              </Link>
            </div>
          </div>
          {/* Women's Section */}
          <div className="w-full sm:w-[48%] lg:w-[32%] relative flex duration-300 hover:scale-105">
            <Image src={e2} alt="E2" className="w-full h-auto rounded-xl" />
            <div className="absolute bottom-6 left-6">
              <Link href={"/womens"}>
                <Button className="bg-white rounded-3xl text-black hover:bg-transparent hover:text-black">
                  Women&#39;s
                </Button>
              </Link>
            </div>
          </div>
          {/* Kid's Section */}
          <div className="w-full sm:w-[48%] lg:w-[32%] relative flex duration-300 hover:scale-105">
            <Image src={e3} alt="E3" className="w-full h-auto rounded-xl" />
            <div className="absolute bottom-6 left-6">
              <Link href={"/kids"}>
                <Button className="bg-white rounded-3xl text-black hover:bg-transparent hover:text-black">
                  Kid&#39;s
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default categories;
