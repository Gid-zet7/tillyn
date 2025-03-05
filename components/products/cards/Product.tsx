"use client";
import { Button } from "@/components/ui/button";
import { EntityId } from "@reduxjs/toolkit";
import Image from "next/image";
import localFont from "next/font/local";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { Eye, PackageOpen, PartyPopper } from "lucide-react";
import { ProductSkeletonCard } from "@/components/skeleton/ProductSkeleton";
import RelatedProducts from "../RelatedProducts";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewForm from "../reviews/ReviewForm";
import ReviewList from "../reviews/ReviewList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

type Props = {
  productId: EntityId;
};

const poppins = localFont({
  src: "../../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Product({ productId }: Props) {
  const { toast } = useToast();
  const { user } = useKindeBrowserClient();
  const { product } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId] as Product | undefined,
    }),
  });
  const last_name_initial = product?.seller.last_name
    .split(" ")
    .filter((word: string) => word.length > 0)
    .map((word: string) => word[0].toUpperCase())
    .join("");

  const first_name_initial = product?.seller.first_name
    .split(" ")
    .filter((word: string) => word.length > 0)
    .map((word: string) => word[0].toUpperCase())
    .join("");

  // Parse sizes string into array
  const availableSizes = product?.size?.split(",").map((s) => s.trim()) || [];
  const dispatch = useDispatch();
  const [refreshReviews, setRefreshReviews] = useState(0);

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
            <div className="flex flex-col gap-2 bg-gray-50 dark:bg-slate-950 p-4 rounded-lg">
              <h2 className={`${poppins.className} text-lg font-semibold`}>
                Seller Information
              </h2>
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 items-center">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`${product?.seller?.picture}`}
                      alt="profile"
                    />
                    <AvatarFallback>
                      {first_name_initial} {last_name_initial}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    {/* <span className="font-medium">Seller Name:</span>{" "} */}
                    {product.seller?.first_name || "Anonymous Seller"}
                  </p>
                </div>
                <p className="text-sm">
                  <span className="font-medium">email:</span>{" "}
                  {product.seller?.email || "No contact information"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {product.seller?.phone_number || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Joined:</span>{" "}
                  {product.seller?.createdAt
                    ? new Date(product.seller.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className={`${poppins.className}`}>Available sizes</h1>
              <div className="flex gap-3">
                {availableSizes.map((size) => (
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
                onClick={() => {
                  dispatch(addToCart(product));
                  toast({
                    title: "Added product to cart ",
                    action: (
                      <ToastAction altText="check">
                        <CheckCircle2 />
                      </ToastAction>
                    ),
                  });
                }}
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
                <PartyPopper className="h-14 w-14 md:h-6 md:w-6" />{" "}
                <span className="">
                  Exclusive discounts, early access to new arrivals and
                  birthday/anniversary rewards.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 md:px-10 lg:px-20 mb-10">
        <div className="max-w-2xl mx-auto">
          <h2 className={`${poppins.className} text-2xl font-semibold mb-6`}>
            Seller Reviews
          </h2>
          {user ? (
            <div className="mb-8">
              <h3 className={`${poppins.className} text-lg mb-4`}>
                Write a Review
              </h3>
              <ReviewForm
                sellerId={product?.seller._id}
                userEmail={user?.email}
                onReviewSubmitted={() => setRefreshReviews((prev) => prev + 1)}
              />
            </div>
          ) : (
            <p className="text-gray-500 mb-8">
              Please sign in to write a review
            </p>
          )}
          <ReviewList
            sellerId={product.seller._id}
            refreshTrigger={refreshReviews}
          />
        </div>
      </section>
      <RelatedProducts
        category={product.category.name}
        productId={product._id}
      />
    </>
  );
}
