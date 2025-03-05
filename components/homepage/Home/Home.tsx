"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getUsersession } from "@/lib/actions";
import Categories from "@/components/homepage/Categories";
import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ThriftSection from "@/components/homepage/Thrift/ThriftSection";
import Hero from "@/components/homepage/Hero";
import Count from "@/components/homepage/Count";
import localFont from "next/font/local";
import ParallaxText from "@/components/ParallaxText";
import { AlertHeadsUp } from "@/components/Alert/Alert";
import { AlertHappy } from "@/components/Alert/HappyShopping";
import { motion } from "framer-motion";
import Perfumes from "../Perfumes";
import Mission from "../Mission";
import Link from "next/link";
import { PerfumeCarousel } from "../PerfumeCarousel";

// const poppins = localFont({
//   src: "../../../app/fonts/Poppins-Medium.ttf",
//   variable: "--font-poppins",
//   weight: "100 900",
// });

const zapfHumnst = localFont({
  src: "../../../app/fonts/bodoni.ttf",
  // variable: "--font-zapfHumnst",
  weight: "100 900",
});

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const [error, setError] = useState<any>("");
  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<string>("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userData = await getUsersession();
        await fetch(`${SERVER_URL}/api/users/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        setIsSuccess("Happy Shoping!");
      } catch {
        setError(`Sign up or log in to unlock the best experience!`);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (error) {
      setShowErrorAlert(true);
      const timer = setTimeout(() => {
        setShowErrorAlert(false);
        setError("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessAlert(true);
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setIsSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <main>
      {showErrorAlert && <AlertHeadsUp message={error} />}
      {showSuccessAlert && <AlertHappy message={isSuccess} />}
      <Hero />
      <Count />
      <Mission />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          mass: 1,
          delay: 0.3,
        }}
        className={`${zapfHumnst.className} mt-20 md:mt-40 `}
      >
        <ParallaxText baseVelocity={-3}>Categories</ParallaxText>
        <ParallaxText baseVelocity={3}>Categories</ParallaxText>
      </motion.div>
      <Categories />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          mass: 1,
          delay: 0.3,
        }}
        className={`${zapfHumnst.className} mt-20 md:mt-40`}
      >
        <ParallaxText baseVelocity={-3}>Featured Products</ParallaxText>
        <ParallaxText baseVelocity={3}>Featured Products</ParallaxText>
      </motion.div>
      <div className="flex justify-center items-center mt-32">
        <FeaturedProducts />
      </div>

      <section className="flex justify-center items-center mt-[10rem]">
        <Perfumes />
      </section>
      <section className="flex justify-center items-center mt-10">
        <PerfumeCarousel />
      </section>

      <div className="mt-40 md:mt-[40rem] flex flex-col justify-center items-center px-3">
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
              Stlye without the <span className="text-gray-500">spend...</span>
            </span>
            {/* <span>
              {" "}
              sustainable, and <span className="text-gray-500">empowering</span>
              .
            </span> */}
          </div>
        </motion.div>
      </div>

      <ThriftSection />

      <section className="mt-32 lg:mt-[8rem] flex items-center justify-center">
        <Button>
          <Link href={`${SERVER_URL}/products`}>Shop Now</Link>{" "}
        </Button>
      </section>

      <Footer />
    </main>
  );
}
