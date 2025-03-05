import React from "react";
import localFont from "next/font/local";
import { Canvas } from "@react-three/fiber";
import Perfume from "./Perfume";
import { motion } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";

const zapfHumnst = localFont({
  src: "../../app/fonts/bodoni.ttf",
  weight: "100 900",
});

export default function Perfumes() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2 + 0.1,
        }}
        className="flex flex-col-reverse justify-center items-center w-screen h-[60vh] md:h-[80vh]"
      >
        <h1 className="text-3xl lg:text-6xl">Perfumes</h1>{" "}
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Environment preset="studio" />
          <Perfume />
          <OrbitControls />
        </Canvas>
      </motion.div>
    </>
  );
}
