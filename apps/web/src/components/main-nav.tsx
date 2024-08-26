"use client";

import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function MainNav() {
  const router = useRouter();
  const [isResponsiveNavVisible, setResponsiveNavVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      // Check window width and update state accordingly
      if (window.innerWidth < 640) {
        setResponsiveNavVisible(true);
      } else {
        setResponsiveNavVisible(false);
      }
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for visibility on component mount
    handleResize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target.search.value;
    console.log("value", value);
    router.push(`/products/${value}`);
  };

  return (
    <div className="flex text-primary items-center space-x-2 lg:space-x-6 justify-between w-full transition-all scroll-smooth">
      <ResponsiveNav handleSearchSubmit={handleSearchSubmit} />

      <div className={`gap-12 ${isResponsiveNavVisible ? "hidden" : "flex"}`}>
        {links.map((link): ReactNode => {
          return (
            <Link href={link.href} key={link.href}>
              {link.title}
            </Link>
          );
        })}
      </div>
      <div
        className={`items-center gap-4 ${isResponsiveNavVisible ? "hidden" : "flex"}`}
      >
        <form onSubmit={handleSearchSubmit}>
          <Input name="search" placeholder="Search something?" />
        </form>

        <Link href="/wishlist">
          <IoMdHeartEmpty size={37} />
        </Link>
        <Link href="/cart">
          <IoCartOutline size={37} />
        </Link>
      </div>
    </div>
  );
}

function ResponsiveNav({
  handleSearchSubmit,
}: {
  //eslint-disable-next-line
  handleSearchSubmit: (e: any) => void;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger>
          <RxHamburgerMenu size={30} />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex gap-6 flex-col items-center justify-center mt-6">
            <form onSubmit={handleSearchSubmit}>
              <Input name="search" placeholder="Search something?" />
            </form>
            {links.map((link): ReactNode => {
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {link.title}
                </Link>
              );
            })}
            <IoMdHeartEmpty size={37} />
            <IoCartOutline size={37} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
