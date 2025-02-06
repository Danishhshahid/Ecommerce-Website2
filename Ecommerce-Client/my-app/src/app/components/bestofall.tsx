"use client";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import BestsellingCard from "./ProductCard";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { ProductType } from "../../type/product";
import { client } from "@/sanity/lib/client";
import { bestofall } from "@/sanity/lib/queries";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Flip, ToastContainer } from "react-toastify";

const Bestofall = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [api, setApi] = useState<CarouselApi | undefined>(); // Carousel API instance
  const [selectedIndex, setSelectedIndex] = useState(0); // Active slide index

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProduct: ProductType[] = await client.fetch(bestofall);
        setProducts(fetchedProduct);
        // console.log(fetchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext(); // Move to the next slide
    }, 2500); // 2 seconds interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [api]);

  // Handle slide change
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap()); // Update active slide index
    });
  }, [api]);

  return (
    <div className="w-full h-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Best of Air Max</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-base">Shop</p>
        </div>
      </div>

      {/* Shadcn Carousel */}
      <Carousel
        setApi={setApi} // Set the carousel API instance
        opts={{
          align: "start",
          loop: true,
          dragFree: true, // Enable smooth scrolling on touch devices
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {products.map((item) => {
            const imageUrl = item.image
              ? urlFor(item.image).url()
              : "/assets/default-placeholder.png"; // Fallback to a placeholder image

            return (
              <CarouselItem
                key={item._id}
                className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4" // Adjust for mobile screens
              >
                <div className="transition-transform transform hover:scale-105 h-auto">
                  <BestsellingCard
                    src={imageUrl}
                    alt={item.productName}
                    title={item.productName}
                    price={item.price}
                    category={item.description}
                    slug={item.slug.current}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {/* Navigation Buttons */}
        <CarouselPrevious className="hidden sm:flex">
          <IoIosArrowBack />
        </CarouselPrevious>
        <CarouselNext className="hidden sm:flex">
          <IoIosArrowForward />
        </CarouselNext>
      </Carousel>

      {/* Custom Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)} // Scroll to the selected slide
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
          {/* Toast Notifications */}
  <ToastContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar={false}
    closeOnClick
    draggable={false}
    pauseOnHover={false}
    theme="light"
    transition={Flip}
  />
    </div>
  );
};

export default Bestofall;