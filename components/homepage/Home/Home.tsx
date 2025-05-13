"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getUsersession } from "@/lib/actions";
import Categories from "@/components/homepage/Categories";
import Footer from "@/components/Footer";
import Hero from "@/components/homepage/Hero";
import localFont from "next/font/local";
import { AlertHeadsUp } from "@/components/Alert/Alert";
import { AlertHappy } from "@/components/Alert/HappyShopping";
import { motion } from "framer-motion";
import Perfumes from "../Perfumes";
import Mission from "../Mission";
import FlySection from "../Fly/FlySection";

const helvetica = localFont({
  src: "../../../app/fonts/bodoni.ttf",
  weight: "100 900",
});

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const [error, setError] = useState<any>("");
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
      <Mission />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight z-50 ${helvetica.className}`}
        >
          CATEGORIES
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 sm:h-2 w-12 sm:w-40 mt-5 md:mt-10 bg-red-600 mx-auto"
        />
      </motion.div>
      <Categories />
      <section className="flex justify-center items-center my-[10rem] ">
        <Perfumes />
      </section>
      <FlySection />
      <Footer />
    </main>
  );
}
