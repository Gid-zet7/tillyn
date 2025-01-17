"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { PartyPopper } from "lucide-react";

type Props = {
  modalThankyou: boolean;
  toggleModalThankyou: any;
};

export default function ModalThankyou({
  modalThankyou,
  toggleModalThankyou,
}: //   result,
Props) {
  const router = useRouter();

  console.log(modalThankyou);
  return (
    <>
      <Card
        className={` ${
          modalThankyou ? "block" : "hidden"
        } max-w-2xl rounded-3xl py-4 blur-nav w-11/12 md:w-fit p-4 md:p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}
      >
        <div className="flex flex-col items-center justify-center">
          <PartyPopper className="h-14 w-14" />
          <h1 className="text-2xl font-bold">Your order is placed!</h1>
          <p>Thank you for your purchase</p>
          <button
            type="button"
            className="w-full bg-black text-white rounded-full py-6 mt-10 text-sm"
            onClick={() => router.push("/")}
          >
            Return to shop
          </button>
        </div>
      </Card>

      <div
        onClick={() => {
          toggleModalThankyou();
          router.push("/");
        }}
        className={`overlay ${modalThankyou ? "block" : "hidden"}`}
      ></div>
    </>
  );
}
