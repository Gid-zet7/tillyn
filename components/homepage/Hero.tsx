import Image from "next/image";
import React from "react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import localFont from "next/font/local";

const helvetica = localFont({
  src: "../../app/fonts/bodoni.ttf",
  weight: "100 900",
});

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center w-full">
      <div className="px-4 sm:px-6 lg:px-8 md:mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
            <div className="mb-2 sm:mb-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                02/44
              </p>
            </div>
            <h1
              className={`${helvetica.className} text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight z-40`}
            >
              BECAUSE
              <br />
              EVERY THREAD
              <br />
              TELLS A BOLD
              <br />
              AND QUIET STORY
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-8 z-40">
              <span className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-200">
                AURA
              </span>
              <div className="h-1 sm:h-2 w-6 sm:w-12 bg-red-600"></div>
              <span className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-200 ">
                09
              </span>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto z-0">
              <Image
                src="/aura.png"
                alt="aura"
                fill
                className="object-contain h-screen"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
