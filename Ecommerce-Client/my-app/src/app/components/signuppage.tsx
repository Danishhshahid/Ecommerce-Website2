import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { SiNike } from "react-icons/si";

const Signuppage = () => {
  return (
    <div className="flex items-center justify-center w-full h-[1000px] bg-gray-50">
      <div className="flex flex-col w-full max-w-md px-6 py-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Nike Icon */}
        <div className="flex justify-center">
          <SiNike className="text-[50px] text-black" />
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">BECOME A NIKE MEMBER</h1>
          <p className="mt-2 text-sm text-gray-500">
            Create your Nike Member profile and get
          </p>
          <p className="text-sm text-gray-500">
            first access to the very best of Nike products, inspiration, and
            community.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Input
            placeholder="Password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Input
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Input
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Input
            placeholder="Date of Birth"
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-sm text-gray-500">
            Get a Nike Member Reward every year on your Birthday.
          </p>
        </div>

        {/* Country Dropdown and Gender Selection */}
        <div className="flex flex-col items-center w-full space-y-4">
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>India</option>
            <option>USA</option>
            <option>Canada</option>
            <option>UK</option>
          </select>
          <div className="flex w-full space-x-4">
            <button className="w-1/2 px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-black">
              Male
            </button>
            <button className="w-1/2 px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-black">
              Female
            </button>
          </div>
        </div>

        {/* Email Opt-in */}
        <div className="flex items-center w-full text-sm text-gray-500">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            className="w-4 h-4 mr-2 border-gray-300 rounded focus:ring-2 focus:ring-black"
          />
          <label htmlFor="agree">
            Sign up for emails to get updates from Nike on products, offers, and
            your Member benefits.
          </label>
        </div>

        {/* Terms and Signup Button */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-center text-gray-500">
            By creating your account, you agree to Nike&#39;s{" "}
            <Link href="/" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline">
              Terms of Use.
            </Link>
          </p>
          <Button className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800">
            JOIN US
          </Button>
          <p className="text-sm">
            Already a Member?{" "}
            <Link
              href="/signin"
              className="underline text-black hover:text-gray-800"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signuppage;
