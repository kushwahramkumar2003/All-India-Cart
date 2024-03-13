"use client";

import Link from "next/link";
import React, {ReactNode, useEffect, useState} from "react";
import { Input } from "@/components/ui/input";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RxHamburgerMenu } from "react-icons/rx";

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
  return (
    <div className="flex items-center space-x-2 lg:space-x-6 justify-between w-full transition-all scroll-smooth">
        <ResponsiveNav/>
      <div className={`gap-12 ${isResponsiveNavVisible ?"hidden":"flex"}`}>
        {links.map((link): ReactNode => {
          return (
            <Link href={link.href} key={link.href}>
              {link.title}
            </Link>
          );
        })}
      </div>
      <div className={`items-center gap-4 ${isResponsiveNavVisible ?"hidden":"flex"}`}>
        <Input placeholder={"Search something ?"}/>
        <IoMdHeartEmpty size={37}/>
        <IoCartOutline size={37}/>
      </div>
    </div>
  );
}

function ResponsiveNav():React.JSX.Element{
  return (
      <div className={"sm:hidden"}>


      <Sheet >
          <SheetTrigger ><RxHamburgerMenu size={30}/></SheetTrigger>
          <SheetContent side={"left"}>
              <div className="flex gap-6 flex-col items-center justify-center">
                  <Input placeholder={"Search something ?"}/>
                  {links.map((link): ReactNode => {
                      return (
                          <Link href={link.href} key={link.href}>
                              {link.title}
                          </Link>
                      );
                  })}
                  <IoMdHeartEmpty size={37}/>
                  <IoCartOutline size={37}/>
              </div>
          </SheetContent>
      </Sheet>
      </div>

  )
}
