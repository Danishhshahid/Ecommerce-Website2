"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import {  useAppSelector } from "../store/hooks";
import { urlFor } from "@/sanity/lib/image";
// import { Customerinfo } from "../../type/checkout";
import checkOut from "@/actions/checkOut";
import { Flip, toast, ToastContainer } from "react-toastify";

const Checkoutpage = () => {
  const cartArray = useAppSelector((state) => state.cart);
  const [customerInfo,setCustomerInfo] =useState({
    firstName: "",
    lastName: "",
    email :"",
    number :"",
    address : "",
    country : "",
    state : "",
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCustomerInfo((customerInfo) => ({
        ...customerInfo,
        [name]: value,
      }));
    };
   
  const handleCheckout =()=>{
    checkOut(cartArray,customerInfo)

    toast.success("Order Placed SuccessFully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
      transition: Flip,
    });
  }


  const total = cartArray.reduce((total, array) => {
    const discount = array.discount ?? 0; // Use 0 if discount is undefined
    return total + (array.price - (array.price * discount) / 100) * array.qty;
  }, 0);




  return (
    <div className="w-full min-h-screen  flex justify-center items-center p-4 sm:p-8 text-black">
      <div className="w-full max-w-screen-lg h-full  flex flex-col md:flex-row rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Order Details */}
        <div className="w-full md:w-1/2 h-full  flex flex-col gap-4 p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">
            How would you like to get your order?
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Customs regulation for India require a copy of the recipient&#39;s
            KYC. The address on the KYC needs to match the shipping address. Our
            courier will contact you via SMS/email to obtain a copy of your KYC.
            The KYC will be stored securely and used solely for the purpose of
            clearing customs (including sharing it with customs officials) for
            all orders and returns. If your KYC does not match your shipping
            address, please click the link for more information.
            <Link href={"/"} className="text-blue-300 underline">
              Learn More
            </Link>
          </p>
          <div className="w-full h-[70px] border-2 p-4 rounded-lg flex items-center gap-3 text-black">
            <TbTruckDelivery className="text-2xl" />
            <p className="text-xl">Deliver It</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg sm:text-xl text-black">
              Enter your name and address:
            </h2>
            <Input name="firstName" type="text" value={customerInfo.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full my-2" />
            <Input name="lastName" type="text" value={customerInfo.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full my-2" />
            <Input name="address" type="text" value={customerInfo.address} onChange={handleInputChange} placeholder="Address" className="w-full my-2" />
          </div>
          <div className="w-full">
            <div className="flex w-full space-x-4 mb-4 text-black">
              <Input
                placeholder="Postal Code"
                className="w-1/2 px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-black"
              />
              <Input
              name="state" type="text" value={customerInfo.state} onChange={handleInputChange}
                placeholder="State"
                className="w-1/2 px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="w-full mb-4 text-black">
              <div className="flex gap-4 items-center justify-start max-w-sm mx-auto text-black">
                {/* Dropdown for countries */}
                <div className="w-1/2 text-black">
                <Input name="country" type="text" value={customerInfo.country} onChange={handleInputChange} placeholder="Country" className="w-full my-2" />

                </div>
                
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 text-black border-gray-300 rounded focus:ring-black"
                />
                Keep me signed in
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 text-black bg-gray-600 border-gray-300 rounded focus:ring-black"
                />
                Make this my preferred address
              </label>
            </div>
            <div className="mt-6">
              <div className="max-w-lg mx-auto p-4">
                {/* Contact Information Section */}
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    What&#39;s your contact information?
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm sm:text-base font-medium "
                    >
                      Email
                    </label>
                    <Input name="email" type="email" value={customerInfo.email} onChange={handleInputChange} placeholder="Email" className="w-full my-2" />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm sm:text-base font-medium "
                    >
                      Phone Number
                    </label>
                    <Input name="number" type="text" value={customerInfo.number} onChange={handleInputChange} placeholder="Phone Numbber" className="w-full my-2" />

                    <p className="text-xs text-gray-500 mt-1">
                      A carrier might contact you to confirm delivery.
                    </p>
                  </div>
                </div>
                {/* PAN Section */}
                <div className="mb-6">
                 
                  </div>
                  <div className="flex items-center mb-4">
                    
                    
                  </div>
                </div>
                {/* Consent Section */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 text-sm sm:text-base"
                    >
                      I have read and consent to eShopWorld processing my
                      information in accordance with the{" "}
                      <a href="#" className="text-blue-500 underline">
                        Privacy Statement
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-500 underline">
                        Cookie Policy
                      </a>
                      . eShopWorld is a trusted Nike partner.
                    </label>
                  </div>
                </div>
                {/* Submit Button */}
                <Button onClick={handleCheckout} className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-gray-400 focus:ring-2 focus:ring-blue-500">
                  Submit Order
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full md:w-1/2 h-full p-4 sm:p-8">
          <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Delivery/Shipping</p>
                <p>Free</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>${total}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                (The total reflects the price of your order, including all
                duties and taxes)
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-800">
                Arrives Mon, 27 Mar - Wed, 12 Apr
              </p>
            </div>

            <div className="space-y-6">
              {/* Product List */}
              {cartArray.map((item,i) => (
                <div key={i} className="flex items-start space-x-4">
                  {item.img && Array.isArray(item.img) ? (
                    <Image
                      src={item.img[0]} // Access the first image if it's an array
                      alt={item.title}
                      width={200}
                      height={200}
                      className="max-w-[150px] max-h-[150px] object-contain"
                    />
                  ) : (
                    <Image
                      src={urlFor(item.img).url()} 
                      alt={item.title}
                      width={200}
                      height={200}
                      className="max-w-[150px] max-h-[150px] object-contain"
                    />
                  )}
                  <div>
                    <h2 className="text-sm font-medium">
                     {item.title}
                    </h2>
                    <p className="text-sm text-gray-300">{item.qty}</p>
                    <p className="text-sm text-gray-300">{item.size}</p>
                    <p className="text-sm font-medium ">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
};

export default Checkoutpage;
