import Image from "next/image";
import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import localFont from "next/font/local";

const poppins = localFont({
  src: "../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Hero() {
  return (
    <section id="counter" className="flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row px-3 lg:px-0 justify-around custom-width mt-10 lg:mt-20 gap-14 lg:gap-0">
        <div className="flex flex-col justify-center items-center gap-10 lg:gap-20 flex-1">
          <div>
            <h1 className={`clamp-text font-bold ${poppins.className}`}>
              Vintage Vibes, Modern Finds
            </h1>
          </div>
          <div className="border-2 border-orange-800 rounded-full flex w-full p-1">
            <input
              type="text"
              placeholder="Create an account to get 20% off"
              className="px-3 lg:px-4 py-4 lg:py-6 w-[65%] lg:w-3/4 border-none rounded-l-full outline-none text-xs lg:text-xl bg-white"
              aria-label="Create an account"
              disabled
            />
            <button className="bg-orange-800 w-[35%] lg:w-3/12 rounded-full text-xl lg:text-2xl">
              <RegisterLink className={poppins.className}>Sign up</RegisterLink>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-row justify-center items-center gap-6">
          <Image
            src={"/joren-aranas.jpg"}
            width={250}
            height={250}
            alt="hero-image"
            className="rounded-full custom-image_width"
          />
          <Image
            src={"/oladimeji-odunsi2.jpg"}
            width={250}
            height={250}
            alt="hero-image"
            className="rounded-full custom-image_width -mt-[4rem]"
          />
        </div>
      </div>
    </section>
  );
}
