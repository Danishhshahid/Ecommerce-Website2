"use client";
import Link from "next/link";
import React from "react";

import { RiFacebookFill } from "react-icons/ri";
import { PiTwitterLogoBold } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { TfiLocationPin } from "react-icons/tfi";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white p-6">
      <div className="max-w-[1440px] h-auto mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
        {/* Section 1 */}
        <div className="flex-1 mt-6">
          <h2 className="text-xl mb-4">Find A Store</h2>
          <ul className="text-gray-400 flex flex-col gap-6">
            <li>
              <Link href={"/"}>Become A Member</Link>
            </li>
            <li>
              <Link href={"/"}>Sign Up for Email</Link>
            </li>
            <li>
              <Link href={"/"}>Send Us Feedback</Link>
            </li>
            <li>
              <Link href={"/"}>Student Discounts</Link>
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="flex-1 mt-6">
          <h2 className="text-xl mb-4">Get Help</h2>
          <ul className="text-gray-400 flex flex-col gap-6">
            <li>
              <Link href={"/"}>Order Status</Link>
            </li>
            <li>
              <Link href={"/"}>Delivery</Link>
            </li>
            <li>
              <Link href={"/"}>Returns</Link>
            </li>
            <li>
              <Link href={"/"}>Payment Options</Link>
            </li>
            <li>
              <Link href={"/"}>Contact Us On Nike.com Inquiries</Link>
            </li>
            <li>
              <Link href={"/"}>Contact Us On All Other Inquiries</Link>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="flex-1 mt-6">
          <h2 className="text-xl mb-4">About Nike</h2>
          <ul className="text-gray-400 flex flex-col gap-6">
            <li>
              <Link href={"/"}>News</Link>
            </li>
            <li>
              <Link href={"/"}>Careers</Link>
            </li>
            <li>
              <Link href={"/"}>Investors</Link>
            </li>
            <li>
              <Link href={"/"}>Sustainability</Link>
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="flex-1 mt-6">
          <div className="flex gap-6 mt-4">
            <li>
              <Link href={"/"}>
                <RiFacebookFill className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <PiTwitterLogoBold className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <BsInstagram className="text-2xl" />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <FaLinkedinIn className="text-2xl" />
              </Link>
            </li>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center flex flex-col lg:flex-row justify-between items-center text-gray-500">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <TfiLocationPin className="text-white text-xl" />
          <p className="text-xl font-bold">Pakistan</p>
          <p>© Copyright Rimel 2022. All rights reserved</p>
        </div>

        <div>
          <ul className="flex flex-row gap-2 justify-center">
            <li>
              <Link href={"/"} className="hover:underline ">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={"/"} className="underline">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link href={"/"} className="underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href={"/"} className="underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
