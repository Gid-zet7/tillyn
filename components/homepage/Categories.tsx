import React from "react";
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
      </section>
    </>
  );
}
