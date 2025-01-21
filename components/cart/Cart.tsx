import React from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import CartItemCard from "./CartItemCard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  openCart: boolean;
  cartItem?: CartItem[];
  toggleCart: () => void;
  subTotal: number;
};

export default function Cart({
  openCart,
  cartItem,
  toggleCart,
  subTotal,
}: Props) {
  const cart = useSelector((state: any) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(subTotal);

  return (
    <>
      <Card
        className={`h-screen fixed w-full md:w-[30rem] border z-50 right-0 transform ${
          openCart ? "translate-x-0" : "translate-x-full"
        } bg-white flex ${
          cartItem?.length === 0 ? "items-center" : ""
        } flex-col transition-transform duration-300 ease-in-out top-0 overflow-y-auto overflow-x-hidden max-h-screen`}
      >
        <div className="flex justify-between w-full px-5 py-4 sticky top-0 blur-nav pt-12 border-b border-black/10">
          <h2 className="text-black font-bold">Shopping Bag</h2>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={toggleCart}
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* <hr className="bg-slate-700 w-full mt-2" /> */}
        {/* {isLoading && (
          <div className="block md:hidden">
            
            <Loader message={loaderMsg} />
          </div>
        )} */}
        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <CartItemCard
              key={item?._id}
              imageSrc={item?.image_url}
              name={item?.name}
              price={item?.price}
              quantity={item?.quantity}
              // isLoading={isLoading}
              incrementQuantity={() => dispatch(incrementQuantity(item))}
              decrementQuantity={() => dispatch(decrementQuantity(item))}
              removeItemFromCart={() => dispatch(removeFromCart(item))}
            />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <h3 className="text-black/50">Cart is empty</h3>
          </div>
        )}
        {subTotal > 0 && (
          <div className="flex flex-col text-black px-6 md:px-10 shadow-sm sticky bottom-0 mt-48 md:mt-[30rem] bg-slate-100 w-full rounded-none">
            <div className="flex justify-between py-8">
              <h2>Sub Total</h2>
              GHS {subTotal}.00
            </div>
            <hr className="bg-slate-700 w-full mb-5" />
            <p>Taxes, delivery and discounts codes calculated at checkout</p>
            <p className="text-xs mt-2">
              <em>
                Don&apos;t worry—you can always review or modify your cart at
                checkout before completing your order.
              </em>
            </p>
            <Button
              className="my-5 font-semibold"
              onClick={() => {
                router.push("https://tillyn-update.vercel.app/checkout");
                toggleCart();
              }}
            >
              Check Out
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}
