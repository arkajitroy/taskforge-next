"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { registerFormSchema, TRegisterFormSchema } from "@/validations/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import DottedSeperator from "@/components/custom/dotted-seperator";

export default function SignUpCard() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const registerForm = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const formSubmitHandler = (formData: TRegisterFormSchema) => {
    if (formData.password !== confirmPassword) {
      alert("please check the password!");
      return;
    }
    console.log("SUBMIT : ", formData);
    registerForm.reset();
    setConfirmPassword("");
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(formSubmitHandler)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <FormField<TRegisterFormSchema>
                name="name"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="name" placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <FormField<TRegisterFormSchema>
                name="email"
                control={registerForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="email" placeholder="mike@example.com" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <FormField<TRegisterFormSchema>
                  name="password"
                  control={registerForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  variant="ghost"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline">
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600">
          By signing up, you agree to our{" "}
          <Link className="underline hover:text-primary" href="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="underline hover:text-primary" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
        <DottedSeperator className="w-full" />
        <p className="text-center text-sm text-gray-600">
          Don&apos;t create account{" "}
          <Link className="underline text-blue-600 font-semibold" href="/login">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
