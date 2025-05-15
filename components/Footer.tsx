"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Facebook } from "lucide-react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="static bottom-0 left-0 w-full bg-gray-900">
      <div className="pt-10 md:pt-20 md:pb-10 px-5 rounded-b-none w-full bg-gray-900">
        <ul
          role="menu"
          className="flex flex-col md:flex-row justify-around gap-10 md:gap-0 bg-gray-900 list-none m-auto w-full"
        >
          <li className="list_item">
            <div className="flex gap-2 md:justify-center items-center">
              <Image
                src={"/logo.png"}
                width={50}
                height={50}
                className="object-contain"
                alt="aura logo"
              />
              <div>
                <a href={"/"} className="text-white font-semibold">
                  Aura
                </a>
              </div>
            </div>
          </li>
          <div className="flex flex-col text-white">
            <h1 className="font-bold text-lg">Quick links</h1>
            <li className="list_item">
              <a href={"/"} className="text-gray-300 hover:text-white">
                Home
              </a>
            </li>
            <li className="list_item">
              <a
                href={`${SERVER_URL}/terms`}
                className="text-gray-300 hover:text-white"
              >
                Terms & Conditions
              </a>
            </li>
            <li className="list_item">
              <a
                href={`${SERVER_URL}/accessibility`}
                className="text-gray-300 hover:text-white"
              >
                Accessibility statement
              </a>
            </li>
            <li className="list_item">
              <a
                href={`${SERVER_URL}/privacy-policy`}
                className="text-gray-300 hover:text-white"
              >
                Privacy policy
              </a>
            </li>
          </div>

          <div className="flex gap-4 items-center">
            <input
              type="text"
              className="p-2 border-gray-600 border rounded text-gray-300 bg-gray-800 w-3/5"
              placeholder="Enter your email"
            />
            <button
              type="button"
              className="px-4 py-2 my-5 hover:bg-red-400 bg-red-500 text-white rounded-md"
            >
              Subscribe
            </button>
          </div>
        </ul>
        <hr className="border-gray-700 my-10" />
        <div className="flex flex-wrap justify-around items-center text-gray-400 mt-10 text-sm">
          <p>Copyright © 2025 Aura</p>
          <p className="hidden md:block">All rights reserved</p>
          <p className="text-sm text-gray-400">Powered by Gidzet</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
