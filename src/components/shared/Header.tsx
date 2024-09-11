"use client"

import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Header = () => {

  const {isSignedIn} = useAuth()

  return (
    <div className="flex px-4 py-2 justify-between shadow-md">
      <Link href={"/"}>
        <Image src="/logo.svg" width={50} height={50} alt="Logo" />
      </Link>
      {isSignedIn ? (
        <span className="flex gap-4 items-center justify-center">
          <Link href={"/dashboard"}>
            <Button variant="outline">
              Dashboard
            </Button>
          </Link>
          <ModeToggle/>
          <UserButton/>
        </span>
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
