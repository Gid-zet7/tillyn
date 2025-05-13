import React from "react";
import localFont from "next/font/local";
import ParallaxText from "@/components/ParallaxText";
import Image from "next/image";

const minera = localFont({
  src: "../../../app/fonts/Minera-Extrabold.otf",
  // weight: "100 900",
});

export default function FlySection() {
  return (
    <>
      <section className="w-screen bg-[#ccff00] p-5 flex flex-col justify-center items-center gap-4 md:gap-8 overflow-hidden md:rounded-t-3xl">
        <div className="flex border border-black/50 w-full justify-center items-center gap-4 md:gap-8 overflow-hidden p-2">
          <h1
            className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight border border-black/50 text-center p-4  rounded-sm`}
          >
            FLY GUYS MOVE ON
            <br />
            DIFFERENT FREQUENCIES
          </h1>
        </div>
        <div className="w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 overflow-hidden">
          <div className="bg-[url('/fly.png')] bg-contain bg-no-repeat bg-center h-full w-3/4 md:w-full md:rounded-t-full flex flex-col justify-between ">
            <div className="flex justify-between md:gap-8 overflow-hidden px-2">
              <div className="flex gap-4 md:gap-8 overflow-hidden border border-black/50 w-fit px-2">
                <Image
                  src={"/barcode.png"}
                  width={100}
                  height={0}
                  className="hidden md:block "
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  01
                </h1>
              </div>
              <div className="flex gap-4 md:gap-8 overflow-hidden  w-fit px-2">
                <Image
                  src={"/code.svg"}
                  width={150}
                  height={100}
                  className="hidden md:block"
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  001
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center z-50 text-white text-5xl">
              <button>Explore</button>
            </div>
            <div
              className={`flex flex-col gap-4 md:gap-8 overflow-hidden ${minera.className}`}
            >
              <ParallaxText baseVelocity={1}>
                EXPLORE OUR PUFFER JACKET COLLECTION
              </ParallaxText>
              <ParallaxText baseVelocity={-1}>
                STAY WARM, STAY STYLISH!
              </ParallaxText>
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen bg-red-600 p-5 flex flex-col justify-center items-center gap-4 md:gap-8 overflow-hidden md:rounded-t-3xl">
        <div className="flex border border-black/50 w-full justify-center items-center gap-4 md:gap-8 overflow-hidden p-2">
          <h1
            className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight border border-black/50 text-center p-4  rounded-sm`}
          >
            SWAG COMES WITH A
            <br />
            LIFETIME WARRANTY
          </h1>
        </div>
        <div className="w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 overflow-hidden">
          <div className="bg-[url('/feeel.png')] bg-contain bg-no-repeat bg-center h-full w-3/4 md:w-full md:rounded-t-full flex flex-col justify-between ">
            <div className="flex justify-between md:gap-8 overflow-hidden px-2">
              <div className="flex gap-4 md:gap-8 overflow-hidden border border-black/50 w-fit px-2">
                <Image
                  src={"/barcode.png"}
                  width={100}
                  height={0}
                  className="hidden md:block "
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  02
                </h1>
              </div>
              <div className="flex gap-4 md:gap-8 overflow-hidden  w-fit px-2">
                <Image
                  src={"/code.svg"}
                  width={150}
                  height={100}
                  className="hidden md:block"
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  002
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center z-50 text-white text-5xl">
              <button>Explore</button>
            </div>
            <div
              className={`flex flex-col gap-4 md:gap-8 overflow-hidden ${minera.className}`}
            >
              <ParallaxText baseVelocity={1}>
                They follow trends, We set 'em.
              </ParallaxText>
              <ParallaxText baseVelocity={-1}>We are not the same</ParallaxText>
            </div>
          </div>
        </div>
      </section>

      <section className="w-screen bg-[#AABEFE] p-5 flex flex-col justify-center items-center gap-4 md:gap-8 overflow-hidden md:rounded-t-3xl">
        <div className="flex border border-black/50 w-full justify-center items-center gap-4 md:gap-8 overflow-hidden p-2">
          <h1
            className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight border border-black/50 text-center p-4  rounded-sm`}
          >
            FLY GIRLS DESERVE TO LIVE TWICE
            <br />
            FLY GIRLS DESERVE TO LIVE TWICE
          </h1>
        </div>
        <div className="w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 overflow-hidden">
          <div className="bg-[url('/flylady.jpeg')] bg-contain bg-no-repeat bg-center h-full w-3/4 md:w-full md:rounded-t-full flex flex-col justify-between ">
            <div className="flex justify-between md:gap-8 overflow-hidden px-2">
              <div className="flex gap-4 md:gap-8 overflow-hidden border border-black/50 w-fit px-2">
                <Image
                  src={"/barcode.png"}
                  width={100}
                  height={0}
                  className="hidden md:block "
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  03
                </h1>
              </div>
              <div className="flex gap-4 md:gap-8 overflow-hidden  w-fit px-2">
                <Image
                  src={"/code.svg"}
                  width={150}
                  height={100}
                  className="hidden md:block"
                  alt="fly pic"
                ></Image>
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-[14rem] leading-none tracking-tight`}
                >
                  003
                </h1>
              </div>
            </div>
            <div className="flex justify-center items-center z-50 text-white text-5xl">
              <button>Explore</button>
            </div>
            <div
              className={`flex flex-col gap-4 md:gap-8 overflow-hidden ${minera.className}`}
            >
              <ParallaxText baseVelocity={1}>
                FASHION STANS AND FLY KINGS ? *
              </ParallaxText>
              <ParallaxText baseVelocity={-1}>
                FASHION STANS AND FLY KINGS ? *
              </ParallaxText>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
