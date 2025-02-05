import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CartItemCard({
  imageSrc,
  name,
  price,
  quantity,
  size,
  sizes,
  incrementQuantity,
  decrementQuantity,
  removeItemFromCart,
  onSizeChange,
}: {
  imageSrc: string;
  name: string;
  price?: number;
  quantity?: number;
  size?: string;
  sizes?: string;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  removeItemFromCart?: () => void;
  onSizeChange?: (newSize: string) => void;
}) {
  // Parse sizes string into array
  const availableSizes = sizes?.split(",").map(s => s.trim()) || [];

  return (
    <>
      <div className="w-full flex px-8 py-4 gap-4">
        <Image
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
              GHS {price} x {quantity}
            </h2>
            <div className="flex flex-col gap-2">
              {/* Size selector */}
              {availableSizes.length > 0 && (
                <Select
                  value={size}
                  onValueChange={onSizeChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {availableSizes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              
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
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
