"use client"
import Link from "next/link";
import React, { useState } from "react";
import { SiJordan } from "react-icons/si";
import { FaArrowAltCircleRight, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const TopHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full">
      {/* Desktop Header */}
      <div className="w-full  h-[50px] bg-black px-4 sm:px-6 md:px-8 lg:px-12 md:block hidden">
        <div className="w-full h-full flex justify-between items-center text-white">
          {/* Left Icon */}
          <div>
            <SiJordan className="text-lg sm:text-xl" />
          </div>
          
          {/* Navigation Links */}
          <div>
            <ul className="flex gap-2 sm:gap-4 items-center text-sm sm:text-base">
              <li className="flex gap-2 items-center">
                <Link href="/Login" className="hover:underline">
                  <Button className="bg-white text-black hover:bg-gray-900 px-4 py-2">
                    Login
                  </Button>
                </Link>
                <Link href="/gethelp" className="hover:underline">
                  <Button className="bg-white text-black hover:bg-gray-900 px-4 py-2">
                    Continue to the Website <FaArrowAltCircleRight />
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Header with Hamburger */}
      <div className="w-full flex h-[50px] bg-black px-4 md:hidden">
        <div className="w-full h-full flex justify-between items-center text-white">
          {/* Left Icon */}
          <div>
            <SiJordan className="text-lg" />
          </div>
          
          {/* Hamburger Icon */}
          <div onClick={toggleSidebar} className="cursor-pointer">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}>
          <div 
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-end mb-4">
                <FaTimes onClick={toggleSidebar} className="text-black cursor-pointer" />
              </div>
              
              <div className="flex flex-col space-y-4">
                <Link href="/Login" onClick={toggleSidebar}>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 px-4 py-2">
                    Login
                  </Button>
                </Link>
                <Link href="/gethelp" onClick={toggleSidebar}>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 px-4 py-2">
                    Continue to the Website <FaArrowAltCircleRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopHeader;