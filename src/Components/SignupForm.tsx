"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { SignupFormSchema } from "../utils/validation-schema";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof SignupFormSchema>) => {
    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        "https://sign-language-gc07.onrender.com/api/auth/createAccount",
        {
          firstname: value.firstname,
          lastname: value.lastname,
          email: value.email,
          password: value.password
        }
      );
      if (response.status === 200) {
        navigate("/contribute-video");
      }
    } catch (error) {
      setServerError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        className="space-y-3">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-custom-blue"
                  type="text"
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-custom-blue"
                  type="text"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="focus:ring-1 focus:ring-custom-blue"
                  type="email"
                  placeholder="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative w-full h-full">
                <FormControl>
                  <Input
                    className="focus:ring-1 focus:ring-custom-blue"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <div
                  className="absolute bottom-0 right-0 h-fit text-xl p-2.5"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}>
                  {showPassword ? (
                    <FiEyeOff ye className="cursor-pointer" />
                  ) : (
                    <FiEye className="cursor-pointer" />
                  )}
                </div>
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {serverError && (
          <>
            <br />
            <div className="text-sm font-medium text-red-500">
              {serverError}
            </div>
          </>
        )}
        <br />
        <div className="mt-6">
          <Button
            className={
              "w-full bg-black text-lg font-medium text-white hover:text-black disabled:text-black hover:bg-[#d2d2d2] disabled:bg-[#d2d2d2] duration-300 transition-all"
            }
            disabled={loading}
            type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
