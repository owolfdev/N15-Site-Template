"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { isDevMode } from "@/lib/utils/is-dev-mode";

const navItems = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavComponent() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <div className="flex items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <HamburgerMenuIcon className="h-[18px] w-[18px]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="flex flex-col space-y-4 mt-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg ${
                  isActive(item.href) ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center">
        <h1 className="text-4xl font-black mr-6">
          <Link href="/">LOGO</Link>
        </h1>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary ${
                isActive(item.href) ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default NavComponent;
