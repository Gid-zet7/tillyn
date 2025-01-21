"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import Search from "../Search/Search";
import Image from "next/image";
import styles from "@/components/Header/nav.module.css";
import ProfileMenu from "./ProfileMenu";
import { getUsersession, search } from "@/lib/actions";
import { useSelector } from "react-redux";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Navbar() {
  const [session, setSession] = useState();
  const [openCart, setOpenCart] = useState(false);
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [loadSearch, setLoadSearch] = useState(false);
  const [searchItems, setSearchItems] = useState(false);
  const cart = useSelector((state: any) => state.cart.items);
  const totalCartItems = cart.length;

  const subTotal = cart.reduce((acc: number, item: CartItem) => {
    return acc + (item?.price || 0) * (item?.quantity || 0);
  }, 0);

  const toggleCart = () => {
    setOpenCart((prevState) => !prevState);
  };

  const toggleSearchForm = () => {
    setOpenSearchForm((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getUsersession();
        setSession(userSession);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const hamburgerBtn = document.getElementById("hamburger-button");
    const mobileMenu = document.getElementById("mobile-menu");

    const toggleMenu = () => {
      mobileMenu?.classList.toggle("hidden");
      mobileMenu?.classList.toggle("flex");
      hamburgerBtn?.classList.toggle("toggle-btn");
    };

    // Add event listeners
    hamburgerBtn?.addEventListener("click", toggleMenu);
    mobileMenu?.addEventListener("click", toggleMenu);

    // Cleanup event listeners on unmount
    return () => {
      hamburgerBtn?.removeEventListener("click", toggleMenu);
      mobileMenu?.removeEventListener("click", toggleMenu);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadSearch(true);

    try {
      const response = await search(productName);
      setSearchItems(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.log(errorMessage);
    } finally {
      setLoadSearch(false);
    }
  };

  return (
    <>
      <header className="py-5 px-4 md:px-8 border-b gap-4 sticky top-0 z-50 blur-nav">
        <section
          className={`mx-auto flex md:px-20 items-center justify-between relative ${styles.navbarContent}`}
        >
          <div>
            <button
              id="hamburger-button"
              className="relative flex flex-col h-8 w-8 cursor-pointer md:hidden hamburger"
            >
              <div></div>
              <div></div>
              <div></div>
            </button>

            <nav
              className="hidden space-x-8 text-xl md:block"
              aria-label="main"
            >
              <ul className="flex gap-2 text-sm">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>
                  <Link href={"/products"}>Products</Link>
                </li>
                {/* <li>
                  <Link href={"/about"}>About</Link>
                </li> */}
              </ul>
            </nav>
          </div>
          <Link href="/">
            <Image
              src={"/tillyn-logo.svg"}
              width={50}
              height={50}
              alt="tillyn logo"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <svg
              width="28px"
              height="28px"
              viewBox="0 0 24 24"
              fill="none"
              className="cursor-pointer"
              onClick={toggleSearchForm}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_15_152)">
                <rect width="24" height="24" fill="none" />
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="6.5"
                  stroke="#000000"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                  fill="#000000"
                />
              </g>
              <defs>
                <clipPath id="clip0_15_152">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div
              className={`relative ${styles.cartIconWrapper}`}
              data-count={totalCartItems > 0 ? totalCartItems : "0"}
            >
              <svg
                fill="#000000"
                width="28px"
                height="28px"
                viewBox="0 0 256 256"
                id="Flat"
                className="relative cursor-pointer "
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleCart}
              >
                <path d="M216,44H40A12.01343,12.01343,0,0,0,28,56V200a12.01312,12.01312,0,0,0,12,12H216a12.01312,12.01312,0,0,0,12-12V56A12.01343,12.01343,0,0,0,216,44Zm4,156a4.00427,4.00427,0,0,1-4,4H40a4.00427,4.00427,0,0,1-4-4V56a4.00427,4.00427,0,0,1,4-4H216a4.00427,4.00427,0,0,1,4,4ZM172,88a44,44,0,0,1-88,0,4,4,0,0,1,8,0,36,36,0,0,0,72,0,4,4,0,0,1,8,0Z" />
              </svg>
            </div>
            {session ? (
              <ProfileMenu session={session} />
            ) : (
              <LoginLink>
                <svg
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    opacity="0.4"
                    d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.34"
                    d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </LoginLink>
            )}
          </div>
        </section>
        <section
          id="mobile-menu"
          className="top-24 justify-center absolute hidden w-full origin-left animate-open-menu left-0 flex-col bg-white text-5xl"
        >
          {/* <button className="text-8xl self-end px-6">
                &times;
            </button>  */}
          <nav
            className="flex min-h-screen flex-col items-center py-8 w-screen"
            aria-label="mobile"
          >
            <Link href="/" className="w-full py-6 text-center hover:opacity-90">
              Home
            </Link>
            <Link
              href="/products"
              className="w-full py-6 text-center hover:opacity-90"
            >
              Products
            </Link>
            {/* <Link
              href="/about"
              className="w-full py-6 text-center hover:opacity-90"
            >
              About
            </Link> */}
            {/* <a href="#contact" className="w-full py-6 text-center hover:opacity-90"
            >Contact Us</a
          >
          <a href="#footer" className="w-full py-6 text-center hover:opacity-90"
            >Legal</a
          > */}
          </nav>
        </section>
      </header>
      {/* End of nav bar */}

      <Search
        productName={productName}
        setProductName={setProductName}
        openSearchForm={openSearchForm}
        loadSearch={loadSearch}
        searchItems={searchItems}
        toggleSearchForm={toggleSearchForm}
        handleSearch={handleSearch}
      />

      <Cart openCart={openCart} toggleCart={toggleCart} subTotal={subTotal} />
    </>
  );
}
