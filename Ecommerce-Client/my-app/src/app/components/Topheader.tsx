'use client';
import Link from "next/link";
import { SiJordan } from "react-icons/si";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const TopHeader = () => {
  return (
    <div className="w-full flex h-[50px] bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full h-full flex justify-between items-center">
        {/* Left Icon */}
        <div>
          <SiJordan className="text-lg sm:text-xl" />
        </div>
        
        {/* Navigation Links */}
        <div>
          <ul className="flex gap-2 sm:gap-4 items-center text-sm sm:text-base">
            <li>
              <Link href="/gethelp" className="hover:underline">
                Find a Store |
              </Link>
            </li>
            <li>
              <Link href="/gethelp" className="hover:underline">
                Help |
              </Link>
            </li>
            
            <SignedOut>
              <li>
                <SignUpButton mode="modal">
                  <button className="hover:underline cursor-pointer">
                    Join Us |
                  </button>
                </SignUpButton>
              </li>
              <li>
                <SignInButton mode="modal">
                  <button className="hover:underline cursor-pointer">
                    Sign in
                  </button>
                </SignInButton>
              </li>
            </SignedOut>
            
            <SignedIn>
              <li>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-6 w-6",
                    }
                  }}
                />
              </li>
            </SignedIn>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;