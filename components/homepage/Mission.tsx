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
      <div className="max-w-7xl text-4xl md:text-6xl">
        <span>
          We believe <span className="text-gray-500">fashion</span> should be{" "}
          <span className="text-gray-500">accessible,</span>
        </span>
        <span>
          {" "}
          sustainable, and <span className="text-gray-500">empowering</span>.
        </span>
      </div>
    </motion.div>
  );
}
