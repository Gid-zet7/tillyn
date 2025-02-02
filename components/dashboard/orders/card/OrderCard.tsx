import React from "react";
import SpinnerSmall from "@/components/Loader/Loader-two/page";
import {
  BaggageClaim,
  Bike,
  Calendar1,
  Edit,
  ReceiptCent,
  User2,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function OrderCard({
  id,
  user,
  totalAmount,
  paymentStatus,
  orderStatus,
  orderDate,
  toggleEdit,
  orderedItems,
  viewOrderItems,
  toggleViewOrderItems,
  isLoading,
}: {
  id: string;
  user: User;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  orderDate: Date;
  toggleEdit?: () => void;
  orderedItems?: any;
  viewOrderItems?: boolean;
  toggleViewOrderItems?: () => void;
  isLoading?: boolean;
}) {
  return (
    <>
      <Card className={` border px-8 py-6 flex flex-col gap-3 max-w-7xl`}>
        <div className="flex justify-between">
          <BaggageClaim />
          <div className="flex gap-2 cursor-pointer" onClick={toggleEdit}>
            <Edit />
            edit
          </div>
          {/* <p>{format(orderDate, "dd/MM/yyyy")}</p> */}
        </div>
        <div className="flex flex-col gap-4 mt-5">
          <Link href={`${SERVER_URL}/dashboard/users/${user.email}`}>
            <div className="flex gap-2 items-center">
              <User2 />
              <h3 className="overflow-x-auto hover:text-blue-400">
                {user.first_name} {user.last_name}
              </h3>
            </div>
          </Link>

          <div className="flex gap-2 items-center">
            <ReceiptCent />
            <h3>GHS {totalAmount}</h3>
          </div>

          <div className="flex gap-2 items-center">
            <Calendar1 />
            <h3>
              {new Date(orderDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <Wallet />
            <button
              className={`${
                paymentStatus === "paid" ? "bg-emerald-300" : "bg-yellow-300"
              } px-2 py-1 rounded-md`}
            >
              {paymentStatus}
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Bike />
            <button
              className={`${
                orderStatus === "delivered"
                  ? "bg-emerald-300"
                  : orderStatus === "confirmed"
                  ? "bg-black text-white"
                  : "bg-yellow-300"
              } px-2 py-1 rounded-md`}
            >
              {orderStatus}
            </button>
          </div>
        </div>

        <div className=" flex justify-center items-center">
          <button
            className="text-sm hover:underline flex"
            onClick={toggleViewOrderItems}
          >
            View order items
            <svg
              width="10px"
              height="10px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {isLoading ? (
          <SpinnerSmall />
        ) : (
          viewOrderItems && (
            <div>
              {orderedItems.map((item: any) => {
                return (
                  <div key={1}>
                    <div
                      key={item._id}
                      className="flex justify-between md:justify-around mb-3"
                    >
                      <Image
                        src={item.product.image_url}
                        width={60}
                        height={60}
                        alt="product image"
                      />
                      <p>{item.orderItemQuantity} </p>
                      <h4 className="text-black">GHS {item.product.price} </h4>
                    </div>
                    <hr className="bg-slate-700 w-full my-2" />
                  </div>
                );
              })}
            </div>
          )
        )}
      </Card>
    </>
  );
}
