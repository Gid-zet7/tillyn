import React from "react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <>
      <section className="my-40 md:my-[10rem] flex flex-col justify-center items-center">
        <motion.div
          className="flex flex-col md:flex-row h-screen w-screen"
          initial={{ opacity: 0, y: 100 }} // Start 50px below the final position
          whileInView={{ opacity: 1, y: 0 }} // Slide up to the final position
          transition={{
            type: "spring", // Use spring animation for bounce effect
            // stiffness: 100, // Controls the "tightness" of the spring
            damping: 10, // Controls the bounciness (lower = more bouncy)
            mass: 1, // Controls the weight of the object
            delay: 0.3, // Delay before the animation starts
          }}
          // viewport={{ once: true }}
        >
          <Card className="bg-[url('/oladimeji-odunsi5.jpg')] flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <span className="text-7xl md:text-9xl text-white">Bold </span>
            <span className="text-7xl md:text-9xl text-white">& </span>
            <span className="text-7xl md:text-9xl text-white">Edgy</span>
          </Card>
          <Card className="bg-[url('/oladimeji-odunsi3.jpg')] flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <span className="text-7xl md:text-9xl text-white">Timeless </span>
            <span className="text-7xl md:text-9xl text-white">Classics</span>
          </Card>
        </motion.div>
        <motion.div
          className="flex flex-col md:flex-row h-screen w-screen"
          initial={{ opacity: 0, y: 100 }} // Start 50px below the final position
          whileInView={{ opacity: 1, y: 0 }} // Slide up to the final position
          transition={{
            type: "spring", // Use spring animation for bounce effect
            stiffness: 30, // Controls the "tightness" of the spring
            damping: 10, // Controls the bounciness (lower = more bouncy)
            mass: 0.7, // Controls the weight of the object
            delay: 0.3, // Delay before the animation starts
          }}
          // viewport={{ once: true }}
        >
          <Card className="bg-[url('/pavlo.jpg')] flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <span className="text-7xl md:text-9xl text-white">Aura</span>
            <span className="text-7xl md:text-9xl text-white">Alchemy</span>
          </Card>
          <Card className="bg-[url('/mel-poole.jpg')] flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <span className="text-7xl md:text-9xl text-black">Vintage </span>
            <span className="text-7xl md:text-9xl bg-gradient-to-b from-black to-white text-transparent bg-clip-text">
              &
            </span>
            <span className="text-7xl md:text-9xl text-white">Thrift</span>
          </Card>
        </motion.div>
      </section>
      <section className="my-40 md:my-[40rem] flex flex-col justify-center items-center px-3">
        <motion.div
          className=" flex flex-col justify-center items-center "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring", // Use spring animation for bounce effect
            // stiffness: 100, // Controls the "tightness" of the spring
            damping: 10, // Controls the bounciness (lower = more bouncy)
            mass: 1, // Controls the weight of the object
            delay: 0.3, // Delay before the animation starts
          }}
        >
          <div className="max-w-7xl text-4xl md:text-6xl">
            <span>
              Perfectly matched for every{" "}
              <span className="text-gray-500">personality...</span>
            </span>
            {/* <span>
              {" "}
              sustainable, and <span className="text-gray-500">empowering</span>
              .
            </span> */}
          </div>
        </motion.div>
      </section>
    </>
  );
}
