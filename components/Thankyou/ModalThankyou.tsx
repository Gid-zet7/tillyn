"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  session: any | undefined;
  modalThankyou: boolean;
  toggleModalThankyou: any;
  //   result: any;
};

export default function ModalThankyou({
  session,
  modalThankyou,
  toggleModalThankyou,
}: //   result,
Props) {
  const router = useRouter();

  // Get the current date and format it as dd/mm/yyyy
  const currentDate = new Date();

  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  //   console.log(result);
  return (
    <>
      <div
        className={` ${
          modalThankyou ? "block" : "hidden"
        } flex flex-col justify-center items-center w-11/12 md:w-fit p-4 md:p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border border-black bg-white shadow-xl rounded-xl`}
      >
        <Image src={"/animation.gif"} width={150} height={150} alt="floating" />
        <div className="flex flex-col text-black gap-2 justify-center items-center max-w-3xl">
          <h1 className="font-semibold">Thank you for your purchase 🎉</h1>
          <p className="text-xs md:text-sm ">
            {session?.user?._doc.first_name} {session?.user?._doc.last_name},
            your order is being processed, and we&apos;ll send you an email once
            it&apos;s confirmed. Thank you for choosing us! Keep an eye on your
            inbox for further updates, and while you wait, feel free to explore
            more products at your convenience. Date ordered:{" "}
            <strong>{formattedDate}</strong>
          </p>
          <button
            type="button"
            className="w-1/2 bg-black/50 py-6 mt-10 rounded-md text-sm"
            onClick={() => router.push("/")}
          >
            Go back Home
          </button>
        </div>
      </div>
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
