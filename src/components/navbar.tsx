"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const { theme } = useTheme();
  return (
    <div className="flex px-6 py-4 justify-between border-b shadow-md">
      <div className="flex items-center gap-2">
        <Link href={"/resumes"} prefetch={true}>
          <Image src="/file.svg" width={35} height={35} alt="Logo" />
        </Link>
        <span className="text-xl font-bold tracking-tight">Resumer</span>
      </div>
      {isSignedIn ? (
        <span className="flex gap-4 items-center justify-center">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCardIcon className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </span>
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get started</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
