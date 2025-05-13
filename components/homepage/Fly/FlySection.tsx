import React from "react";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import ParallaxText from "@/components/ParallaxText";
import Link from "next/link";
import Image from "next/image";

const minera = localFont({
  src: "../../../app/fonts/Minera-Extrabold.otf",
  // weight: "100 900",
});

export default function FlySection() {
  return (
    <>
      {/* <div className="snap-y snap-mandatory overflow-hidden bg-black rounded-t-3xl">
        <div className="snap-start flex flex-col md:flex-row justify-center items-center bg-black overflow-hidden px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              mass: 1,
              delay: 0.3,
            }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
          >
            <div className="space-y-6 sm:space-y-8 py-12 sm:py-8">
              <div className="flex">
                <h1
                  className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight`}
                >
                  FLY GUYS
                  <br />
                  MOVE ON DIFFERENT FREQUENCIES
                </h1>
              </div>

              <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4 text-white/70 italic border-l-4 border-emerald-400 pl-4">
                <p className="text-base sm:text-lg">
                  "Our outfit costs less than your ego,
                  <span className="text-emerald-400">
                    {" "}
                    but we still look priceless."
                  </span>
                  <br />— Fly Folks
                </p>
              </div>

              <div className=",space-x-12 sm:space-x-16 md:space-x-20 lg:space-x-24 pt-8 sm:pt-12 hidden md:flex">
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    150<span className="text-emerald-400">+</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70">
                    Premium clothing pieces
                    <br />
                    curated with style and authenticity
                  </p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                    98<span className="text-emerald-400">%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70">
                    Customer satisfaction — they
                    <br />
                    love our unique fashion selection
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="block md:hidden w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto">
              <Image
                src="/fly.png"
                alt="BeBot Robot"
                fill
                className="object-contain h-screen "
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              mass: 1,
              delay: 0.3,
            }}
          >
            <div>
              <Image
                src={"/fly.png"}
                width={500}
                height={600}
                className="hidden md:block rounded-2xl mt-10"
                alt="fly pic"
              ></Image>
            </div>
          </motion.div>

          <div className="block md:hidden p-4">
            <div className="flex space-x-12 sm:space-x-16 md:space-x-20 lg:space-x-24 pt-8 sm:pt-12 ">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">
                  150<span className="text-emerald-400">+</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70">
                  Premium clothing pieces
                  <br />
                  curated with style and authenticity
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">
                  98<span className="text-emerald-400">%</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70">
                  Customer satisfaction — they
                  <br />
                  love our unique fashion selection
                </p>
              </div>
            </div>
          </div>

          
        </div>
        <div className="p-10 h-screen w-screen flex flex-col-reverse md:flex-row justify-center items-center gap-4 md:gap-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 0.5,
              mass: 1,
              delay: 0.3,
            }}
          >
            <div>
              <Image
                src={"/feeel.png"}
                width={600}
                height={700}
                className="hidden md:block rounded-2xl mt-10"
                alt="fly pic"
              ></Image>
            </div>
          </motion.div>
          <div className="block md:hidden w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto">
              <Image
                src="/feeel.png"
                alt="BeBot Robot"
                fill
                className="object-contain h-screen "
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              />
            </div>
          </div>
         
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                duration: 0.5,
                mass: 1,
                delay: 0.3,
              }}
              className="flex flex-col gap-4"
            >
              <h1
                className={`${minera.className} text-[1.8rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-white`}
              >
                
                SWAG COMES
                <br />
                WITH A <span className="text-red-600">LIFETIME</span> WARRANTY
              </h1>
              
              <div className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4 text-white/70 italic border-l-4 border-red-600 h-20 pl-4">
                <p className="text-base sm:text-lg">
                  "They follow trends, We set 'em.😎
                  <span className="text-red-600"> We are not the same.</span>"
                  <br />— Fly Folks
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="flex flex-col w-screen text-center">
          <h1
            className={`${minera.className} text-[1.4rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-white w-full`}
          >
            FLY GIRLS DESERVE TO LIVE TWICE
          </h1>
          <h1
            className={`${minera.className} text-[1.4rem] sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-white w-full`}
          >
            FLY GIRLS DESERVE TO LIVE TWICE
          </h1>
        </div>
        <div className="p-10 h-screen w-screen flex  justify-center items-center gap-4 md:gap-8 overflow-hidden">
          <div className="bg-[url('/flylady.jpeg')] bg-cover bg-center h-full w-full md:w-1/2 my-20 md:rounded-3xl"></div>
        </div>
      </div> */}

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
