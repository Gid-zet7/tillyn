"use client";
import React from "react";
import { useEffect } from "react";
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

const poppins = localFont({
  src: "../../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userData = await getUsersession();
        await fetch("http://localhost:3000/api/users/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  return (
    <main>
      <Hero />
      <Count />
      <div className={`${poppins.className} mt-20 md:mt-40 bg-slate-50`}>
        <ParallaxText baseVelocity={-3}>Categories</ParallaxText>
        <ParallaxText baseVelocity={3}>Categories</ParallaxText>
      </div>
      <Categories />
      <div className={`${poppins.className} mt-20 md:mt-40`}>
        <ParallaxText baseVelocity={-3}>Featured Products</ParallaxText>
        <ParallaxText baseVelocity={3}>Featured Products</ParallaxText>
      </div>
      <div className=" flex justify-center items-center mt-32">
        <FeaturedProducts />
      </div>
      <ThriftSection />
      <section className="mt-32 lg:mt-[10rem] flex items-center justify-center">
        <Button>Shop Now</Button>
      </section>
      <Footer />
    </main>
  );
}
