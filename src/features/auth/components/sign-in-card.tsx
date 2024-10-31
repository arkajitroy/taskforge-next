"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, TLoginFormSchema } from "@/validations/schemas/auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import DottedSeperator from "@/components/custom/dotted-seperator";
import { useLogin } from "../api/use-login";

export default function SignInCard() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useLogin();

  const loginForm = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmitHandler = (formData: TLoginFormSchema) => {
    console.log("DEBUG-LOGIN-SUBMIT : ", formData);
    mutate({ json: formData });
    loginForm.reset();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome to Taskforge</CardTitle>
        <CardDescription className="text-center">Quickly login to access the tool</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(formSubmitHandler)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <FormField<TLoginFormSchema>
                name="email"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="email"
                        placeholder="mike@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <FormField<TLoginFormSchema>
                  name="password"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isPending}
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
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button disabled={isPending} className="w-full" type="submit">
              Login
              {isPending && <Loader className="px-2 size-8 animate-spin text-gray-400" />}
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
          <Button disabled={isPending} variant="outline">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button disabled={isPending} variant="outline">
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600">
          By signing in, you agree to our{" "}
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
          Don&apos;t have an account{" "}
          <Link className="underline text-blue-600 font-semibold" href="/register">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
