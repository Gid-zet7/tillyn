import { Delete, Trash2 } from "lucide-react";
import React from "react";

export default function CartItemCard({
  imageSrc,
  name,
  price,
  quantity,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
}: {
  imageSrc: string;
  name: string;
  price?: number;
  quantity?: number;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  removeItemFromCart?: () => void;
}) {
  return (
    <>
      <div className="w-full flex px-8 py-4 gap-4">
        <img
          width={300}
          height={300}
          src={imageSrc}
          alt={name}
          className="h-36 w-28 object-cover"
        />

        <div className="text-black flex flex-col justify-center gap-4 items-center">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between mt-4 items-center text-black">
              <h3 className="text-sm font-semibold">{name}</h3>
            </div>
            <h2>
              GHS {price} x {quantity}{" "}
            </h2>
            <div className="flex gap-2">
              <div className="flex">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 border"
                >
                  -
                </button>
                <p className="text-black/50 border px-3 py-1">{quantity}</p>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 border"
                >
                  +
                </button>
              </div>
              <button onClick={removeItemFromCart}>
                {" "}
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
