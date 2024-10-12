"use client";
import React from "react";
import DottedSeperator from "@/components/custom/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const SignUpCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Registeration</CardTitle>
        <CardDescription>
          By signing up, you aggreed to our{" "}
          <Link href="/privacy">
            <span className="text-blue-600">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/privacy">
            <span className="text-blue-600">Terms of service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4" action="">
          <Input
            required
            type="text"
            value={""}
            onChange={() => null}
            placeholder="Enter your name"
          />
          <Input
            required
            type="email"
            value={""}
            onChange={() => null}
            placeholder="Enter email address"
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => null}
            placeholder="Enter password"
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => null}
            placeholder="Confirm password"
          />
          <Button size="lg" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button variant="secondary" size="lg" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          Login with google
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          <FaGithub className="mr-2 size-5" />
          Login with github
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
