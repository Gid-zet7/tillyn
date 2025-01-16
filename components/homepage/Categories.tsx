import Image from "next/image";
import React, { useState } from "react";
import { getProductByCategory } from "@/lib/actions";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Categories() {
  return (
    <>
      <section className="mt-20 flex justify-center items-center">
        <div className="flex flex-col md:flex-row h-screen w-screen">
          <Card className="bg-[url('/oladimeji-odunsi5.jpg')] flex justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <h1 className="text-7xl md:text-9xl text-white">Men</h1>
          </Card>
          <Card className="bg-[url('/oladimeji-odunsi3.jpg')] flex justify-center items-center bg-no-repeat bg-cover bg-center md:w-1/2 h-full cursor-pointer hover_translate">
            <h1 className="text-7xl md:text-9xl text-white">Women</h1>
          </Card>
        </div>

        {/* <Image
            src={"/chestnut-brown-corduroy-shacket.jpeg"}
            width={220}
            height={220}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-4 lg:col-end-6 row-start-1 row-end-6"
          />
          <Image
            src={"/forest-green-corduroy-shacket.jpeg"}
            width={220}
            height={220}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-6 lg:col-end-8 row-start-1 row-end-6"
          />
          <Image
            src={"/midnight-black-corduroy-shacket.jpeg"}
            width={220}
            height={220}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-8 lg:col-end-10 row-start-1 row-end-6"
          />
          <Image
            src={"/mosaic-heritage-print-ensemble.jpeg"}
            width={220}
            height={220}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-10 lg:col-end-12 row-start-1 row-end-6"
          /> */}
      </section>
      {/* <section className="mt-20">
        <div className=" flex flex-col md:grid md:grid-cols-12 md:grid-rows-12">
          <Image
            src={"/karsten-winegeart-x.jpg"}
            width={220}
            height={120}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-3 lg:col-end-5 row-start-1 row-end-2"
          />
          <Image
            src={"/karsten-winegeart.jpg"}
            width={220}
            height={120}
            alt="hero-image"
            layout="responsive"
            // placeholder="men tops"
            className="lg:col-start-5 lg:col-end-7 row-start-1 row-end-2"
          />
          <Image
            src={"/joren-aranas.jpg"}
            width={220}
            height={120}
            alt="hero-image"
            layout="responsive"
            // placeholder="men tops"
            className="lg:col-start-7 lg:col-end-9 row-start-1 row-end-2"
          />
          <Image
            src={"/karsten-winegeart-x.jpg"}
            width={220}
            height={120}
            alt="hero-image"
            layout="responsive"
            className="lg:col-start-9 lg:col-end-12 row-start-1 row-end-2"
          />
        </div>
      </section> */}
    </>
  );
}
