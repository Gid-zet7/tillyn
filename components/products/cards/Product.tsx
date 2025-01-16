"use client";
import { Button } from "@/components/ui/button";
import { EntityId } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { useDispatch } from "react-redux";
import { addToCart, incrementQuantity } from "@/redux/slices/cartSlice";
import { decrementQuantity } from "@/redux/slices/cartSlice";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import {
  CircleCheckBig,
  Eye,
  Package2,
  Package2Icon,
  PackageOpen,
  PartyPopper,
} from "lucide-react";
import { ProductSkeletonCard } from "@/components/skeleton/ProductSkeleton";
import RelatedProducts from "../RelatedProducts";

type Props = {
  productId: EntityId;
};

// const prod = {
//   name: "Forest Art Shirt And Black Pants Set",
//   image_url: "/forest-art-shirt-and-black-pants-set.jpeg",
//   description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam culpa veritatis tempora. Delectus assumenda vitae neque ex! Quia fugiat accusantium, nam aut nisi quis porro ratione provident expedita ducimus commodi! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, commodi. Doloremque deserunt quidem quam, ipsa laudantium velit quas libero esse magnam voluptates! Unde minima maiores ipsa dignissimos veritatis temporibus quos!",
//   price: 420,
//   ratings: 4.5,
//   size: "M, XL, L",
//   brand: "Tillyn",
//   stock: 10,
//   category: "Men Top and Down set",
// };

const poppins = localFont({
  src: "../../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Product({ productId }: Props) {
  const { product } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });

  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className=" flex items-center justify-center mt-10">
        <ProductSkeletonCard />
      </div>
    );
  }

  return (
    <>
      <section>
        <div className="flex flex-col md:flex-row justify-around p-5 md:p-10 lg:px-20 gap-8">
          {product.image_url && (
            <Image
              src={product.image_url}
              width={600}
              height={600}
              alt="product image"
              className="rounded-2xl"
            />
          )}
          <div className="flex flex-col gap-3">
            <h3>{product.category.name || "Category Unavailable"}</h3>
            <h1 className={`${poppins.className} text-5xl`}>
              {product.name || "No Name"}
            </h1>
            <div className="flex gap-1">
              {[...Array(Math.floor(product.ratings || 0))].map((_, i) => (
                <Image
                  key={i}
                  src="/star.png"
                  width={15}
                  height={15}
                  alt="review stars"
                />
              ))}
            </div>
            <div className="text-6xl relative flex items-center gap-2">
              <span className="text-sm absolute top-0">₵</span>
              <h1 className={`${poppins.className} font-extrabold ml-2`}>
                {product.price || 0}
              </h1>
              <span className="text-sm">Delivery excluded</span>
            </div>
            <p>{product.description || "No description available."}</p>
            <div className=" flex flex-col gap-2">
              <h1 className={`${poppins.className}`}>Product size</h1>
              <div className="flex gap-3">
                {["Medium", "Large", "Extra Large"].map((size) => (
                  <Button key={size} className="rounded-full">
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-10">
              <button
                className="w-full bg-black text-white py-6 font-bold rounded-full"
                disabled={product.stock === 0}
                onClick={() => dispatch(addToCart(product))}
              >
                {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
              </button>
            </div>
            <div className={`${poppins.className} flex flex-col gap-4 mt-4`}>
              <div className="flex gap-2">
                <Eye /> Available as seen
              </div>
              <div className="flex gap-2">
                <PackageOpen /> Delivery right to your door
              </div>
              <div className="flex gap-2">
                <PartyPopper /> Exclusive discounts, early access to new
                arrivals and birthday/anniversary rewards.
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts
        category={product.category.name}
        productId={product._id}
      />
    </>
  );
}
