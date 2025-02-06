"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/features/cart";
import { useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCart3 } from "react-icons/bs";

const BSCaddToCart = ({ slug }: { slug: string }) => {
  const product = useAppSelector((state) => state.products.products).find(
    (val) => val.slug === slug
  );

  // Ensure product and arrays are not undefined before accessing their values
  const defaultSize = product?.size?.[0] || ''; // Set default empty string if size is empty or undefined
  const defaultColor = product?.color?.[0] || ''; // Set default empty string if color is empty or undefined

  const [cartItem, setCartItem] = useState({
    id: product?._id,
    title: product?.productName,
    img: product?.imageUrl,
    slug: product?.slug,
    price: product?.price,
    category: product?.category,
    size: defaultSize,
    qty: product?.qty,
    discount: product?.discount,
    color: defaultColor,
  });

  const dispatch = useAppDispatch();

  const notify = () =>
    toast.success("Product Added To Cart Successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

  const handleAddToCart = () => {
    dispatch(addToCart(cartItem));
    notify(); // Trigger the toast notification after adding to cart
  };

  return (
    <>
      {/* ToastContainer moved outside of Popover but still in the component */}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Flip}
      />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-black text-white hover:bg-gray-900 px-4 py-2">
            Add to Cart
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[15rem]">
          <div className="sm:text-sm flex gap-3 mt-5">
            <label
              htmlFor="size-select"
              className="block font-medium text-gray-700"
            >
              Size
            </label>
            <select
              name=""
              id="size-select"
              onChange={(e) =>
                setCartItem({ ...cartItem, size: e.target.value })
              }
              className="select select-bordered border-2 border-black"
            >
              <option disabled defaultValue={"Select Size"}>
                Select Size
              </option>
              {product?.size?.map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 mt-5">
            Color:
            {product?.color?.map((item, i) => (
              <div key={i}>
                <Button
                  onClick={() => setCartItem({ ...cartItem, color: item })}
                  className="w-6 h-6 border-2 rounded-full border-gray-600 focus:outline-none active:border-black focus:border-black"
                  style={{ backgroundColor: item }}
                ></Button>
              </div>
            ))}
          </div>
          <div className="w-fit">
            <Button
              onClick={handleAddToCart}
              className="w-[120px] rounded-3xl mt-4"
            >
              <BsCart3 />
              Add to cart
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default BSCaddToCart;
