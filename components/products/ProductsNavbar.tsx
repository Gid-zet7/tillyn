import React from "react";

export default function ProductsNavbar() {
  return (
    <div>
      <ul className="flex justify-around items-center border-y border-black/10 py-5 overflow-x-scroll">
        <li>All Products</li>
        <li>New Arrivals</li>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </ul>
    </div>
  );
}
