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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSignIn } from "react-auth-kit";

export default function LoginForm() {
  const signIn = useSignIn();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const { setAuth } = useAuth();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/translate-text";
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema)
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://sign-language-gc07.onrender.com/api/auth/signin",
        {
          email: value.email,
          password: value.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response?.status === 200) {
        console.log(response.data.detail);
        // const fName = response?.data?.detail?.fName;
        // const role = response?.data?.detail?.role;
        // const token = response?.data?.detail?.token;

        if (response?.data?.detail?.verified === false) {
          sendVerificationEmail(value.email);
          navigate("/email-verification");
        } else {
          // setAuth({ fName, role, token });
          // sessionStorage.setItem("auth", JSON.stringify({ fName, role, token }));
          signIn({
            token: response?.data?.detail?.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {
              fName: response?.data?.detail?.fName,
              role: response?.data?.detail?.role,
            }
          })
          navigate(from, { replace: true });
        }
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      if (error?.response.status === 404) {
        setError("User not found!");
      } else if (error?.response.status === 401) {
        setError("Invalid email or password!");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      const response = await axios.post(
        "https://sign-language-gc07.onrender.com/api/auth/emailVerification",
        {
          email: email
        }
      );
      if (response?.status === 200) {
        setError("Verification email sent!");
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      console.log(error?.response.status);
      if (error?.response.status === 404) {
        setError("User not found!");
      } else if (error?.response.status === 401) {
        setError("Invalid email or password!");
      } else {
        setError("Something went wrong. Please try again later.");
      }
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
            <div className="text-sm font-medium text-red-500 py-1">{error}</div>
          </>
        )}
        <div className="mt-6">
          <Button
            className="w-full bg-custom-blue text-lg font-medium text-white hover:bg-[#d2d2d2] disabled:text-black disabled:bg-[#d2d2d2] duration-300 transition-all hover:text-black "
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
