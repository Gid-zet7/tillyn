"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import Search from "../Search/Search";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getUsersession, search } from "@/lib/actions";
import { useSelector } from "react-redux";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "./mode-toggle";
import { SearchIcon, ShoppingBagIcon, UserCircle2 } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All",
    href: "/products",
    description: "Shop the latest collection ",
  },
  {
    title: "Men",
    href: "/products/men",
    description: "Shop the latest men's collection ",
  },
  {
    title: "Women",
    href: "/products/women",
    description: "Explore our stylish women's collection",
  },
  {
    title: "Kids",
    href: "/products/kids",
    description: "Discover our adorable kids' collection ",
  },
  {
    title: "Perfumes",
    href: "/products/perfumes",
    description: "Explore our luxurious perfume collection ",
  },
  // {
  //   title: "New Arrivals",
  //   href: "/products/new-arrivals",
  //   description: "Products - Explore Our Latest Collection",
  // },
];

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
    } catch {
      // const errorMessage =
      //   error instanceof Error ? error.message : "An unexpected error occurred";
    } finally {
      setLoadSearch(false);
    }
  };

  return (
    <>
      <header className="py-5 px-4 md:px-8 gap-4 top-0 z-[99] bg-white/80 backdrop-blur-[300px] dark:bg-black/80">
        <section
          className={`flex lg:px-20 items-center justify-between relative navbarContent`}
        >
          <div>
            <button
              id="hamburger-button"
              className="relative flex flex-col h-8 w-8 cursor-pointer md:hidden hamburger "
            >
              <div className="dark:bg-white  bg-black/80"></div>
              <div className="dark:bg-white  bg-black/80"></div>
              <div className="dark:bg-white  bg-black/80"></div>
            </button>

            <NavigationMenu
              className="hidden space-x-8 text-xl md:block"
              aria-label="main"
            >
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Image
                            src={"/oladimeji-odunsi-W.jpg"}
                            width={300}
                            height={300}
                            alt="woman in sleek spectacles"
                            className="rounded-lg"
                          />
                        </NavigationMenuLink>
                      </li>
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/products/new-arrivals" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      New Arrivals
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* <nav
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
                <li>
                  <Link href={"/products/new-arrivals"}>New Arrivals</Link>
                </li>
              </ul>
            </nav> */}
          </div>

          <Link href="/">
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="aura logo"
              className="hidden md:block"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />
            <SearchIcon className="cursor-pointer" onClick={toggleSearchForm} />

            <div
              className={`relative cartIconWrapper `}
              data-count={totalCartItems > 0 ? totalCartItems : "0"}
            >
              <ShoppingBagIcon
                className="cursor-pointer"
                onClick={toggleCart}
              />
            </div>
            {session ? (
              <ProfileMenu session={session} />
            ) : (
              <LoginLink>
                <UserCircle2 className="cursor-pointer" />
              </LoginLink>
            )}
          </div>
        </section>
        <section
          id="mobile-menu"
          className="top-[4.5rem] justify-center absolute hidden w-full origin-left animate-open-menu left-0 flex-col bg-white  dark:bg-black text-5xl z-[98]"
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
            <Link
              href="/products/new-arrivals"
              className="w-full py-6 text-center hover:opacity-90"
            >
              New arrivals
            </Link>

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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
