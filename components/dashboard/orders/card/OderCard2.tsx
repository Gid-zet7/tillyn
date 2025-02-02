import React from "react";
import SpinnerSmall from "@/components/Loader/Loader-two/page";
import {
  BaggageClaim,
  Bike,
  Mail,
  Phone,
  ReceiptCent,
  User2,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function OrderCard({
  id,
  firstname,
  lastname,
  email,
  phoneNumber,
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
  firstname: string;
  lastname: string;
  //   address: string;
  email: string;
  phoneNumber: string | undefined;
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
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <User2 />
            <h3 className="overflow-x-auto">
              {firstname} {lastname}
            </h3>
          </div>
          <div className="flex gap-2 items-center">
            <Mail />
            <h3 className="overflow-x-auto">{email}</h3>
          </div>
          <div className="flex gap-2 items-center">
            <Phone />
            <h3>{phoneNumber}</h3>
          </div>

          <div className="flex gap-2 items-center">
            <ReceiptCent />
            <h3>GHS {totalAmount}</h3>
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
                      <img
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
