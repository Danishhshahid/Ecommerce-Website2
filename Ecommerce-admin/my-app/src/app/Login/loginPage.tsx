"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiNike } from "react-icons/si";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

// Zod validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Signinpage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Important for cookie handling
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok) {
        // Show success toast
        toast.success("Login successful!", {
          position: "top-center",
          duration: 2000,
          icon: (
            <div className="h-6 w-6 bg-green-500 flex items-center justify-center rounded-full">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          ),
          style: {
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1px solid #22c55e",
          },
        });

        // Force a hard reload after delay to ensure middleware picks up the cookie
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setError(responseData.message || "Invalid credentials. Please try again.");
        toast.error(responseData.message || "Login failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Something went wrong. Please try again later.");
      toast.error("Connection error. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <Toaster position="top-center" richColors expand={false} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-md px-6 py-8 space-y-8 bg-white rounded-lg shadow-md"
      >
        <div className="flex justify-center">
          <SiNike className="text-[70px] text-black" />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">YOUR ADMIN DASHBOARD</h1>
        </div>

        {error && (
          <div className="p-2 text-center text-red-500 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Input
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 text-black border-gray-300 rounded focus:ring-black"
              {...register("rememberMe")}
            />
            Keep me signed in
          </label>
          <Link href="/" className="text-gray-600 hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <p className="text-sm">
            Not a Member?{" "}
            <Link
              href="/signup"
              className="underline text-black hover:text-gray-800"
            >
              Join Us.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signinpage;