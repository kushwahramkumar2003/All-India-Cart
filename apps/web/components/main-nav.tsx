"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

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
  return (
    <div className="flex items-center space-x-2 lg:space-x-6">
      <div className="flex gap-12">
        {links.map((link): ReactNode => {
          return (
            <Link href={link.href} key={link.href}>
              {link.title}
            </Link>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      {/* <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
            
          </p>
        </a>
      </NavigationMenuLink> */}
    </li>
  );
});
ListItem.displayName = "ListItem";
