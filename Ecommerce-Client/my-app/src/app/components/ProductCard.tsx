"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/features/cart";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to clean and generate URL-safe slug
const BestsellingCard = ({
  src,
  alt,
  title,
  description,
  price,
  category,
  slug,

}: {
  src: string;
  alt: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  slug: string;

}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      ProductName: title,
      title: title,
      description: description || "",
      _id: Math.floor(1000 + Math.random() * 9000), // Generate a random ID
      img: src,
      slug: slug,
      price: price,
      category: category || "",
      size: "", // No size selection on card
      qty: 1, // Default quantity is 1
      discount: 0, // Assuming no discount on the card
      color: "", // No color selection on card
      uuid: Math.floor(1000 + Math.random() * 9000),
    };

    dispatch(addToCart(cartItem));

    toast.success("Product Added To Cart Successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
      transition: Flip,
    });
  };

  return ( 
   
    <div className="flex-shrink-0 flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow mb-6 max-w-sm">
      {/* Image Section */}
      <Link href={`/product/${typeof slug === "string" ? slug : ""}`}>
        <div className="w-full h-60 bg-gray-50 rounded-t-lg overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={320}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col w-full">
          {/* Title and Price */}
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800 truncate">{title}</p>
            <p className="text-sm font-semibold text-gray-900">${price}</p>
          </div>

          {/* Category and Description */}
          <div className="mt-2">
            {category && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">{category}</span>
              </p>
            )}
            {description && (
              <p className="text-sm text-gray-500 break-words whitespace-normal">
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex justify-center p-4 pt-0 gap-4">
        <Button
          className="bg-black text-white hover:bg-gray-900 px-4 py-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button className="bg-black text-white hover:bg-gray-900 px-4 py-2">
          Buy Now
        </Button>
      </div>

    </div>
  )
 
  
};

export default BestsellingCard;
