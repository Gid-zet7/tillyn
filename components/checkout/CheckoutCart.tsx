import React from "react";
import Image from "next/image";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  changeSize,
} from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Prop = {
  item: CartItem;
};

export default function CheckoutCart({ item }: Prop) {
  const dispatch = useDispatch();
  
  // Parse sizes string into array
  const availableSizes = item?.size?.split(",").map(s => s.trim()) || [];

  return (
    <>
      <div
        key={item._id}
        className="flex justify-between md:justify-around mb-3 items-center"
      >
        <div className="flex items-center justify-center gap-4">
          <Image
            src={item?.image_url}
            width={60}
            height={60}
            alt="product image"
          />
          <div className="flex flex-col gap-2">
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
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {/* Size selector */}
            {availableSizes.length > 0 && (
              <Select
                value={item.selectedSize}
                onValueChange={(newSize) =>
                  dispatch(
                    changeSize({
                      itemId: item._id,
                      oldSize: item.selectedSize,
                      newSize,
                    })
                  )
                }
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <h4 className="text-black text-sm md:text-lg">
            GHS {item.price} x {item.quantity}
          </h4>
          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
        </div>
      </div>
      <hr className="bg-slate-700 w-full my-2" />
    </>
  );
}
