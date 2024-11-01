import React from "react";
import BrandLogo from "./BrandLogo";
import { Button } from "../ui/button";
import Link from "next/link";
import UserAuthButton from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";

type TNavbarProps = {};

const Navbar: React.FC<TNavbarProps> = () => {
  return (
    <nav className="pt-4 px-6 flex justify-between items-center">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">Monitor all of your projects and task</p>
      </div>
      <MobileSidebar />
      <UserAuthButton />
    </nav>
  );
};

export default Navbar;
