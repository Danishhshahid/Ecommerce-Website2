import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import pic from "@/../../public/assets/heropic.png";

const Hero = () => {
  return (
    <section className="w-full h-auto mt-3 mb-6 flex flex-col">
      {/* Top Section */}
      <div className="bg-slate-100 flex flex-col justify-center items-center px-4 py-3">
        <h2 className="font-semibold text-lg md:text-xl text-center">
          Hello Nike App
        </h2>
        <p className="text-sm md:text-base text-center mt-2">
          Download the app to access everything Nike.{" "}
          <Link href="/allproducts" className="font-semibold underline text-blue-600 hover:text-blue-800">
            Get Your Great
          </Link>
        </p>
      </div>

      {/* Hero Image Section */}
      <div className="w-full my-6 px-4 sm:px-8 flex justify-center">
        <Image
          src={pic}
          width={1400}
          height={600}
          alt="Nike Air Max Pulse Hero Image"
          priority // Ensures fast loading
          placeholder="blur" // Adds a blur effect before loading
          className="rounded-xl w-full max-w-[1400px] object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="text-center px-4 sm:px-6">
        <p className="text-sm sm:text-base text-gray-600">First Look</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Nike Air Max Pulse
        </h1>
        <p className="text-sm sm:text-base max-w-2xl text-gray-700 mt-2 mx-auto">
          Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse—designed to push you past your limits and help you go to the max.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Button className="rounded-full px-6 py-2 bg-black text-white hover:bg-gray-800 transition duration-300">
            Notify Me
          </Button>
          <Button className="rounded-full px-6 py-2 bg-gray-300 text-black hover:bg-gray-400 transition duration-300">
            Shop Air Max
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
