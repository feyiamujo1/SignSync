import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginFormSchema } from "../utils/validation-schema";

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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://sign-language-gc07.onrender.com/api/auth/signin",
        {
          email: value.email,
          password: value.password
        }
      );

      if (response?.status === 200) {
        navigate("/create-video");
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      console.log(error?.response.status);
      if (error?.response.status === 404) {
        setError("User doesn't exist!");
      }
      // if (error?.response.status === 404){
      //   setError("Invalid email or password!")
      // }
      setError("Invalid email or password!");
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
        {error && (
          <>
            <br />
            <div className="text-sm font-medium text-red-500">
              {error}
            </div>
          </>
        )}
        <br />
        <div className="mt-6">
          <Button
            className="w-full bg-black text-lg font-medium text-white hover:bg-[#d2d2d2] disabled:text-black disabled:bg-[#d2d2d2] duration-300 transition-all hover:text-black "
            disabled={loading}
            type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
