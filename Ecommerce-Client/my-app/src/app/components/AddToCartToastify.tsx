// "use client";

// import { Flip, ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "../store/hooks";
// import { addToCart } from "../store/features/cart";
// import { BsCart3 } from "react-icons/bs";

// export interface CartItem {
//   id: any;
//   productName: string;
//   imageUrl: string;
//   slug: string;
//   price: number;
//   category: string;
//   size: string;
//   qty: number;
//   discount: number | undefined;
//   color: string;
// }

// const AddToCartToastify = ({ cartItem }: { cartItem: CartItem }) => {
//   const dispatch = useAppDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart(cartItem));
//     toast.success("Product Added To Cart Successfully!", {
//       position: "bottom-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: false,
//       draggable: false,
//       theme: "light",
//       transition: Flip,
//     });
//   };

//   return (
//     <>
//       <Button onClick={handleAddToCart} className='w-[120px] rounded-3xl mt-4'>
//         <BsCart3 className="mr-2" />
//         Add to Cart
//       </Button>
//       <ToastContainer
//         position="bottom-right"
//         autoClose={1000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable={false}
//         pauseOnHover={false}
//         theme="light"
//         transition={Flip}
//       />
//     </>
//   );
// };

// export default AddToCartToastify;