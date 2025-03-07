import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ProductsNavbar() {
  return (
    <div>
      <ul className="flex gap-2 justify-around items-center border-y border-black/10 py-5 overflow-x-scroll px-1">
        <li>
          <Link href={`${SERVER_URL}/products`}>
            <Button variant={"outline"}>All Products</Button>{" "}
          </Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/new-arrivals`}>
            {" "}
            <Button variant={"outline"}>New Arrivals</Button>
          </Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/men`}>
            {" "}
            <Button variant={"outline"}>Men</Button>
          </Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/women`}>
            {" "}
            <Button variant={"outline"}>Women</Button>
          </Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/kids`}>
            {" "}
            <Button variant={"outline"}>Kids</Button>
          </Link>
        </li>
        <li>
          <Link href={`${SERVER_URL}/products/perfumes`}>
            {" "}
            <Button variant={"outline"}>Perfumes</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
