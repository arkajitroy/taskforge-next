import React from "react";
import BrandLogo from "./BrandLogo";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center">
      <BrandLogo name="brand-logo.svg" title="Taskforge" height={50} width={50} alt="brand-logo" />
      <Button variant="secondary">Sign Up</Button>
    </nav>
  );
};

export default Navbar;
