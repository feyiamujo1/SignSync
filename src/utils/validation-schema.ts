import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const SignupFormSchema = z.object({
  firstname: z.string().min(2, { message: "Must be 2 or more characters long" }),
  lastname: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(11, { message: "Invalid phone number" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    confirm_password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
