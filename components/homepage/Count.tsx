"use client";
import React from "react";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import CurvedText from "../CurvedText";

const poppins = localFont({
  src: "../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Count() {
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const counterElement = document.getElementById("counter");
      if (!counterElement) return;

      const oTop = counterElement.offsetTop - window.innerHeight;

      if (!counted && window.scrollY > oTop) {
        const counters = document.querySelectorAll<HTMLElement>(".count");

        counters.forEach((counter) => {
          const updateCount = () => {
            const target = +counter.getAttribute("data-count")!;
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
              counter.innerText = `${Math.ceil(count + increment)}`;
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = `${target}`;
            }
          };

          updateCount();
        });

        setCounted(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [counted]);

  return (
    <section className="flex justify-around md:grid md:grid-cols-10 border-b border-black/50 rounded-b-2xl pb-[1.8rem]">
      <div
        className={`${poppins.className} flex gap-5 md:gap-10 px-10 mt-8 md:mt-16 lg:mt-32 justify-start items-center md:ml-24`}
      >
        <div>
          <span
            className="clamp-text_count font-bold mb-4 count"
            data-count="100"
          >
            0
          </span>
          <span className="clamp-text_count font-bold ml-0">k+</span>{" "}
          <span className="text-black text-2xl font-bold mb-4">products</span>
        </div>
        <div>
          <span
            className="clamp-text_count font-bold mb-4 count"
            data-count="100"
          >
            0
          </span>
          <span className="clamp-text_count font-bold ml-0">+</span>{" "}
          <span className="text-black text-2xl font-bold mb-4">
            collections
          </span>
        </div>
      </div>
      <div className="col-start-8 hidden md:block">
        <CurvedText />
      </div>
    </section>
  );
}
