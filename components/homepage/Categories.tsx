import React from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import Image from "next/image";

const helvetica = localFont({
  src: "../../app/fonts/bodoni.ttf",
  weight: "100 900",
});

export default function Categories() {
  const router = useRouter();
  return (
    <section className="bg-white text-black w-full">
      {/* Bold & Edgy Section */}
      <motion.div
        className="min-h-screen w-full flex items-center relative overflow-hidden py-8 sm:py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 z-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              01/04
            </p>
            <h2
              className={`${helvetica.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}
            >
              BOLD
              <br />
              & EDGY
              <br />
              COLLECTION
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                B&E
              </span>
              <div className="h-1 sm:h-2 w-8 sm:w-12 bg-red-600"></div>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                01
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div
                className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto cursor-pointer"
                onClick={() => router.push("/products")}
              >
                <Image
                  src="/oladimeji-odunsi5.jpg"
                  alt="Bold & Edgy Collection"
                  fill
                  className="object-contain h-screen "
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Timeless Classics Section */}
      <motion.div
        className="min-h-screen w-full flex items-center relative overflow-hidden py-8 sm:py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 z-10"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              02/04
            </p>
            <h2
              className={`${helvetica.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}
            >
              TIMELESS
              <br />
              CLASSICS
              <br />
              REDEFINED
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                CLS
              </span>
              <div className="h-1 sm:h-2 w-8 sm:w-12 bg-red-600"></div>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                02
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div
                className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto cursor-pointer"
                onClick={() => router.push("/products")}
              >
                <Image
                  src="/oladimeji-odunsi3.jpg"
                  alt="Timeless Classics"
                  fill
                  className="object-contain h-screen "
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>
            {/* <Card className="aspect-[3/4] w-full max-w-[500px] mx-auto overflow-hidden">
              <div className="w-full h-full bg-[url('/oladimeji-odunsi3.jpg')] bg-cover bg-center transform hover:scale-105 transition-transform duration-700" />
            </Card> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Aura Alchemy Section */}
      <motion.div
        className="min-h-screen w-full flex items-center relative overflow-hidden py-8 sm:py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 z-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              03/04
            </p>
            <h2
              className={`${helvetica.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}
            >
              AURA
              <br />
              ALCHEMY
              <br />
              SERIES
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                ALC
              </span>
              <div className="h-1 sm:h-2 w-8 sm:w-12 bg-red-600"></div>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                03
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div
                className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto cursor-pointer"
                onClick={() => router.push("/products")}
              >
                <Image
                  src="/pavlo.jpg"
                  alt="Aura Alchemy"
                  fill
                  className="object-contain h-screen "
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>
            {/* <Card className="aspect-[3/4] w-full max-w-[500px] mx-auto overflow-hidden">
              <div className="w-full h-full bg-[url('/pavlo.jpg')] bg-cover bg-center transform hover:scale-105 transition-transform duration-700" />
            </Card> */}
          </motion.div>
        </div>
      </motion.div>

      {/* Vintage & Thrift Section */}
      <motion.div
        className="min-h-screen w-full flex items-center relative overflow-hidden py-8 sm:py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-4 sm:space-y-6 z-10"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              04/04
            </p>
            <h2
              className={`${helvetica.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}
            >
              VINTAGE
              <br />
              & THRIFT
              <br />
              ESSENCE
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-8">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                V&T
              </span>
              <div className="h-1 sm:h-2 w-8 sm:w-12 bg-red-600"></div>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-200">
                04
              </span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div
                className="relative w-full aspect-square max-w-[500px] sm:max-w-[600px] lg:w-[2400px] mx-auto cursor-pointer"
                onClick={() => router.push("/products")}
              >
                <Image
                  src="/vintage.png"
                  alt="Vintage & Thrift"
                  fill
                  className="object-contain h-screen "
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
