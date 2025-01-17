import React from "react";

type Prop = {
  subTotal: number;
};

export default function OrderSummary({ subTotal }: Prop) {
  return (
    <div className="text-black mt-10 flex flex-col gap-5">
      <div className="flex ">
        <h1 className="font-bold">Order Summary</h1>
      </div>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          className="p-2 border-black border rounded text-black w-3/5"
          placeholder="apply discount code"
        />
        <button
          type="button"
          className="px-4 py-2 my-5 bg-black text-white rounded-md"
        >
          Apply
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-sm w-full">
          <h4>Delivery</h4>
          <h2>GHS 50.00 </h2>
        </div>
        <div className="flex justify-between text-sm w-full">
          <h4>Discount</h4>
          <h2>GHS 00.00 </h2>
        </div>
        <div className="flex justify-between text-sm w-full">
          <h4>Tax</h4>
          <h2>GHS 00.00 </h2>
        </div>
        <hr className="bg-slate-700 w-full my-2" />
        <div className="flex justify-between text-sm">
          <h4>Subtotal</h4>
          <h2>GHS {subTotal}.00 </h2>
        </div>
        <div className="flex justify-between">
          <h4 className="font-bold text-xl">Total</h4>
          <h2 className="font-bold text-xl">GHS {subTotal + 50}.00 </h2>
        </div>
      </div>
    </div>
  );
}
