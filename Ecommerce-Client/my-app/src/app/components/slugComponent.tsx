import Image from "next/image";
import React from "react";
import pic from "./../../../public/assets/pdpic.png";
import { Button } from "@/components/ui/button";
import { BsCart3 } from "react-icons/bs";

const Productdetail = () => {
  return (
    <div className="w-full h-full py-6">
      <div className="w-full h-full flex flex-col lg:flex-row justify-around px-6">
        {/* Left Div: Image */}
        <div className="w-full lg:w-[40%] h-full flex justify-center mb-6 lg:mb-0">
          <Image src={pic} alt="pic" className="w-full h-full object-contain" />
        </div>

        {/* Right Div: Product Info */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Nike Air Force 1
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              PLT.AF.ORM
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg">
            Turn style on its head with this crafted take on the Air Jordan 1
            Mid. Its &#39;inside out&#39;-inspired construction, including
            unique layering and exposed foam accents, ups the ante on this
            timeless Jordan Brand silhouette. Details like the deco stitching on
            the Swoosh add coveted appeal, while the unexpected shading, rich
            mixture of materials and aged midsole aesthetic give this release an
            artisan finish.
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            ₹8695.00
          </h3>

          <Button className="w-[120px] rounded-3xl mt-4">
            <BsCart3 /> Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
