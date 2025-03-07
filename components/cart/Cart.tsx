import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  changeSize,
} from "@/redux/slices/cartSlice";
import CartItemCard from "./CartItemCard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { ShoppingBasket, X } from "lucide-react";

type Props = {
  openCart: boolean;
  cartItem?: CartItem[];
  toggleCart: () => void;
  subTotal: number;
};

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Cart({
  openCart,
  cartItem,
  toggleCart,
  subTotal,
}: Props) {
  const cart = useSelector((state: any) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <Card
        className={`h-screen fixed w-full md:w-[40rem] border z-50 right-0 transform ${
          openCart ? "translate-x-0" : "translate-x-full"
        } bg-white  dark:bg-black flex ${
          cartItem?.length === 0 ? "items-center" : ""
        } flex-col transition-transform duration-300 ease-in-out top-0 overflow-y-auto overflow-x-hidden max-h-screen`}
      >
        <div className="flex justify-between w-full px-5  sticky top-0 bg-white/80 backdrop-blur-[300px] dark:bg-black/80 py-6 border-b border-black/10">
          <h2 className="text-black dark:text-white font-bold">Shopping Bag</h2>
          <X className="cursor-pointer" onClick={toggleCart} />
        </div>

        {/* <hr className="bg-slate-700 w-full my-2" /> */}

        {/* <hr className="bg-slate-700 w-full mt-2" /> */}
        {/* {isLoading && (
          <div className="block md:hidden">
            
            <Loader message={loaderMsg} />
          </div>
        )} */}
        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <CartItemCard
              key={`${item?._id}-${item?.selectedSize}`}
              imageSrc={item?.image_url}
              name={item?.name}
              price={item?.price}
              quantity={item?.quantity}
              size={item?.selectedSize}
              sizes={item?.size}
              incrementQuantity={() => dispatch(incrementQuantity(item))}
              decrementQuantity={() => dispatch(decrementQuantity(item))}
              removeItemFromCart={() => dispatch(removeFromCart(item))}
              onSizeChange={(newSize) =>
                dispatch(
                  changeSize({
                    itemId: item._id,
                    oldSize: item.selectedSize,
                    newSize,
                  })
                )
              }
            />
          ))
        ) : (
          <div className="flex flex-col gap-10 justify-center items-center">
            <ShoppingBasket className="opacity-50 mt-56 h-16 w-16" />
            <h3 className="text-black/50 dark:text-white">Cart is empty</h3>
          </div>
        )}
        {subTotal > 0 && (
          <div className="flex flex-col  text-black dark:text-white px-6 md:px-10 shadow-sm sticky bottom-0 mt-48 md:mt-[30rem] bg-slate-100 dark:bg-black w-full rounded-none border-t border-black/10 dark:border-slate-700">
            <div className="flex justify-between py-8">
              <h2>Sub Total</h2>
              <span className="font-semibold">GHS {subTotal}.00</span>
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
                router.push(`${SERVER_URL}/checkout`);
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
