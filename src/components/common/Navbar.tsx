import React from "react";
import BrandLogo from "./BrandLogo";
import { Button } from "../ui/button";
import Link from "next/link";

type TNavbarProps = {
  authButtonTitle: "Sign Up" | "Login";
  authButtonRedirection: "login" | "register";
};

const Navbar: React.FC<TNavbarProps> = ({ authButtonTitle, authButtonRedirection }) => {
  return (
    <nav className="flex justify-between items-center">
      <BrandLogo name="brand-logo.svg" title="Taskforge" height={50} width={50} alt="brand-logo" />
      <Button variant="secondary" asChild>
        <Link href={authButtonRedirection}>{authButtonTitle}</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
