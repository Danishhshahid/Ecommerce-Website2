"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import BestsellingCard from "./ProductCard";
import { ProductType } from "../../type/product";
import { client } from "@/sanity/lib/client";
import { mens, womens } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,  
} from "@/components/ui/carousel";
import { Flip, ToastContainer } from "react-toastify";

const Gearup = () => {
  const [mensProducts, setMensProducts] = useState<ProductType[]>([]);
  const [womensProducts, setWomensProducts] = useState<ProductType[]>([]);
  const [mensApi, setMensApi] = useState<CarouselApi | undefined>();
  const [womensApi, setWomensApi] = useState<CarouselApi | undefined>();
  const [mensSelectedIndex, setMensSelectedIndex] = useState(0);
  const [womensSelectedIndex, setWomensSelectedIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const [mensData, womensData] = await Promise.all([
          client.fetch(mens),
          client.fetch(womens)
        ]);
        setMensProducts(mensData);
        setWomensProducts(womensData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Autoplay for Men's Carousel
  useEffect(() => {
    if (!mensApi || mensProducts.length === 0) return;

    const interval = setInterval(() => {
      if (mensProducts.length > 1) {
        mensApi.scrollNext();
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [mensApi, mensProducts.length]);

  // Autoplay for Women's Carousel
  useEffect(() => {
    if (!womensApi || womensProducts.length === 0) return;

    const interval = setInterval(() => {
      if (womensProducts.length > 1) {
        womensApi.scrollNext();
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [womensApi, womensProducts.length]);

  // Men's Carousel index tracking
  useEffect(() => {
    if (!mensApi) return;
    mensApi.on("select", () => {
      setMensSelectedIndex(mensApi.selectedScrollSnap());
    });
  }, [mensApi]);

  // Women's Carousel index tracking
  useEffect(() => {
    if (!womensApi) return;
    womensApi.on("select", () => {
      setWomensSelectedIndex(womensApi.selectedScrollSnap());
    });
  }, [womensApi]);

  return (
    <div className="w-full h-auto flex flex-col mt-6 px-4 sm:px-6 lg:px-12 mb-6">
      <div className="w-full flex flex-col">
        <div className="w-full h-auto flex items-center mb-4">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            Gear Up
          </p>
        </div>

        <div className="w-full flex flex-wrap justify-between gap-6">
          {/* Men's Section */}
          <div className="w-full md:w-[48%]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center gap-2">
                <p className="text-sm sm:text-base font-semibold">Shop Men&#39;s</p>
                <div className="flex gap-6">
                  <button
                    onClick={() => mensApi?.scrollPrev()}
                    className="bg-gray-100 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex justify-center items-center text-lg sm:text-2xl hover:bg-gray-200"
                  >
                    <IoIosArrowBack />
                  </button>
                  <button
                    onClick={() => mensApi?.scrollNext()}
                    className="bg-gray-100 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex justify-center items-center text-lg sm:text-2xl hover:bg-gray-200"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>

              <Carousel
                setApi={setMensApi}
                opts={{ align: "start", loop: true, dragFree: true }}
                className="w-full"
              >
                <CarouselContent>
                  {mensProducts.map((item, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-[80%] sm:basis-1/1 md:basis-1/2 lg:basis-1/2"
                    >
                      <div className="transition-transform transform hover:scale-105">
                        <BestsellingCard
                          src={urlFor(item.image).url()}
                          alt={item.productName}
                          title={item.productName}
                          price={item.price}
                          category={item.description}
                          slug={item.slug.current}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="flex justify-center gap-2 mt-4">
                {mensProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => mensApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      mensSelectedIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Women's Section */}
          <div className="w-full md:w-[48%]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center gap-6">
                <p className="text-sm sm:text-base font-semibold ml-4">Shop Women&#39;s</p>
                <div className="flex gap-6">
                  <button
                    onClick={() => womensApi?.scrollPrev()}
                    className="bg-gray-100 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex justify-center items-center text-lg sm:text-2xl hover:bg-gray-200"
                  >
                    <IoIosArrowBack />
                  </button>
                  <button
                    onClick={() => womensApi?.scrollNext()}
                    className="bg-gray-100 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex justify-center items-center text-lg sm:text-2xl hover:bg-gray-200"
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>

              <Carousel
                setApi={setWomensApi}
                opts={{ align: "start", loop: true, dragFree: true }}
                className="w-full"
              >
                <CarouselContent>
                  {womensProducts.map((item, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-[80%] sm:basis-1/1 md:basis-1/2 lg:basis-1/2"
                    >
                      <div className="transition-transform transform hover:scale-105">
                        <BestsellingCard
                          src={urlFor(item.image).url()}
                          alt={item.productName}
                          title={item.productName}
                          price={item.price}
                          category={item.description}
                          slug={item.slug.current}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="flex justify-center gap-2 mt-4">
                {womensProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => womensApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      womensSelectedIndex === index ? "bg-black" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Gearup;