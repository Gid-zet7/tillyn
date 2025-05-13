import React from "react";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <motion.div
      className="my-40 md:my-[40rem] flex flex-col justify-center items-center px-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
        delay: 0.3,
      }}
    >
      <blockquote className="max-w-5xl text-center text-3xl md:text-5xl lg:text-6xl font-semibold italic text-gray-800 dark:text-gray-200 relative">
        <span className="absolute -top-10 left-0 text-8xl text-gray-300 dark:text-gray-600">
          “
        </span>
        <p>
          We believe <span className="text-gray-500">fashion</span> should be{" "}
          <span className="text-gray-500">accessible,</span> sustainable, and{" "}
          <span className="text-gray-500">empowering</span>.
        </p>
        <span className="absolute -bottom-10 right-0 text-8xl text-gray-300 dark:text-gray-600">
          ”
        </span>
      </blockquote>
      <cite className="mt-6 text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-400">
        — Fashion Stans
      </cite>
    </motion.div>
  );
}
