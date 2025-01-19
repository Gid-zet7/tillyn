import React from "react";
import Image from "next/image";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";

type Prop = {
  item: CartItem;
};

export default function CheckoutCart({ item }: Prop) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        key={item._id}
        className="flex justify-between md:justify-around mb-3 items-center"
      >
        <div className="flex items-center justify-center gap-2">
          <Image
            src={item?.image_url}
            width={60}
            height={60}
            alt="product image"
          />
          <div className="flex gap-2">
            <div className="flex">
              <button
                onClick={() => dispatch(decrementQuantity(item))}
                className="px-3 py-1"
              >
                -
              </button>
              <p className="text-black/50 px-3 py-1">{item.quantity}</p>
              <button
                onClick={() => dispatch(incrementQuantity(item))}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
            <button onClick={() => dispatch(removeFromCart(item))}>
              {" "}
              <Trash2 className="h-4 w-4 " />
            </button>
          </div>
        </div>
        <h4 className="text-black text-sm md:text-lg">
          GHS {item.price} x {item.quantity}{" "}
        </h4>
      </div>
      <hr className="bg-slate-700 w-full my-2" />
    </>
  );
}
