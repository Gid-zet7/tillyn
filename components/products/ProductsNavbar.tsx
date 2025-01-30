import Link from "next/link";
import React from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ProductsNavbar() {
  return (
    <div>
      <ul className="flex justify-around items-center border-y border-black/10 py-5 overflow-x-scroll">
        <li>
          <Link href={`${SERVER_URL}/products`}>All Products</Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/new-arrivals`}>New Arrivals</Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/men`}>Men</Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/women`}>Women</Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/kids`}>Kids</Link>
        </li>
      </ul>
    </div>
  );
}
