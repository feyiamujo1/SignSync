import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { EmailVerificationFormSchema } from "../utils/validation-schema";

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
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmailVerficationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const form = useForm<z.infer<typeof EmailVerificationFormSchema>>({
    resolver: zodResolver(EmailVerificationFormSchema)
  });

  const onSubmit = async (
    value: z.infer<typeof EmailVerificationFormSchema>
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://sign-language-gc07.onrender.com/api/auth/emailVerification",
        {
          email: value.email
        }
      );
      if (response?.status === 200) {
        setError("Verification email sent!");
      }
    } catch (error: any) {
      // setError("Something went wrong. Please try again later.");
      console.log(error?.response.status);
      if (error?.response.status === 404) {
        setError("User doesn't exist!");
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
        {error && (
          <>
            <div
              className={`text-sm font-medium py-1 ${
                error === "Verification email sent!" ? "text-green-500" : "text-red-500"
              }`}>
              {error}
            </div>
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
              "Verify"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
