'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BsCart3 } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ProductType } from '../../../type/product';
import { urlFor } from '@/sanity/lib/image';
import { addToCart } from '@/app/store/features/cart';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Cart } from '@/app/utils/type';
import 'react-toastify/dist/ReactToastify.css';

// Color map for color names to hex values
const colorMap: Record<string, string> = {
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#008000',
  // Add other colors as needed
};

interface SlugPageProps {
  product: ProductType;
}

export default function SlugPage({ product }: SlugPageProps) {
  const dispatch = useDispatch();
  const initialColor = product.color && product.color.length > 0 ? product.color[0] : '';
  const initialSize = product.size && product.size.length > 0 ? product.size[0] : '';
  
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1));
  };

  // Convert color name to hex using the colorMap
  const getColorHex = (colorName: string) => {
    return colorMap[colorName.toLowerCase()] || '#000000'; // Default to black if not found
  };

  const handleAddToCart = () => {
    // Prepare the cart item with all selected options
    const cartItem: Cart = {
      ProductName: product.productName,
      title: product.productName,
      description: product.description || '',
      _id: product._id ? parseInt(product._id) : Math.floor(1000 + Math.random() * 9000),
      img: product.image?.asset ? urlFor(product.image.asset).url() || '' : '',
      slug: product.slug.current,
      price: product.price,
      category: product.category,
      size: selectedSize,
      qty: quantity,
      discount: product.discount,
      color: selectedColor,
      uuid: Math.floor(1000 + Math.random() * 9000)
    };

    // Dispatch the item to the cart
    dispatch(addToCart(cartItem));

    // Optional: Show a toast notification
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
    <div className="w-full h-full flex flex-col lg:flex-row justify-around px-6 mb-6">
      {/* Left Div: Image */}
      <div className="w-full lg:w-[40%] h-full flex justify-center mb-6 lg:mb-0">
        {product.image && product.image && (
          <Image
            src={urlFor(product.image.asset).url()}
            alt={product.productName}
            className="w-full h-full object-contain"
            width={500}
            height={500}
            priority
          />
        )}
      </div>

      {/* Right Div: Product Info */}
      <div className="w-full lg:w-[40%] flex flex-col gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {product.productName}
          </h1>
        </div>

        <p className="text-sm sm:text-base lg:text-lg break-words whitespace-normal">
          {product.description}
        </p>

        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          ${product.price}
        </h3>

        {/* Color Selection */}
        <div className="flex gap-3">
          {product.color?.map((item, i) => (
            <Button
              key={i}
              onClick={() => setSelectedColor(item)}
              className={`w-6 h-6 border-2 rounded-full ${selectedColor === item ? 'border-black' : 'border-gray-600'}`}
              style={{ backgroundColor: getColorHex(item) }} 
            />
          ))}
        </div>

        {/* Size Selection */}
        <div className="sm:text-sm flex gap-3">
          <label htmlFor="size-select" className="block font-medium text-gray-700">
            Size
          </label>
          <select
            id="size-select"
            onChange={(e) => setSelectedSize(e.target.value)}
            className="select select-bordered border-2 border-black"
            value={selectedSize}
          >
            {product.size?.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Selection */}
        <div className="flex gap-3 items-center">
          <p>Quantity:</p>
          <Button
            onClick={() => handleQuantityChange(false)}
            className="flex items-center justify-center bg-black text-white w-[20px] h-[25px]"
          >
            <FaMinus />
          </Button>
          <p className="text-xl">{quantity}</p>
          <Button
            onClick={() => handleQuantityChange(true)}
            className="flex items-center justify-center bg-black text-white w-[20px] h-[25px]"
          >
            <FaPlus />
          </Button>
        </div>

        {/* Inventory Info */}
        <p className="mt-2 text-lg text-red-600">
          {product.inventory > 0 ? `${product.inventory} items in stock` : 'Out of stock'}
        </p>

        <Button onClick={handleAddToCart} className="w-full rounded-3xl mt-4">
          <BsCart3 className="mr-2" /> Add to Cart
        </Button>
        
        <Button className="w-full rounded-3xl mt-2">
          <BsCart3 className="mr-2" /> Buy Now!
        </Button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Flip}
      />
    </div>
  );
}
