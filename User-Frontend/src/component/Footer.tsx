import React from "react";
import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { RiFacebookLine } from "react-icons/ri";
import { PiTwitterLogoLight } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { RiLinkedinLine } from "react-icons/ri";

const Footer: React.FC = () => {
  return (
    <>
    <div className="grid md:grid-cols-5 grid-col-2 bg-black text-white lg:px-24 lg:py-16 lg:gap-32 gap-10 px-8 py-8 ">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-bold">E-Commerce</h2>
        <h3 className="text-lg font-normal">Subscribe</h3>
        <p className="text-xs">Get 100% off your first order</p>
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Enter Email"
            className="w-full text-white border border-white bg-black  rounded-sm px-4 py-2 "
          />
          <VscSend
            size={24}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-normal">Support</h3>
        <p className="text-sm font-light">Main road, DHA phase 1</p>
        <p className="text-sm font-light">Smart@example.com</p>
        <p className="text-sm font-light">1234567890</p>
      </div>
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-normal">Account</h3>
        <Link to={"/MyAccount"} className="text-sm font-light hover:opacity-100 opacity-90">My Account</Link>
        <Link to={"/signUp"} className="text-sm font-light hover:opacity-100 opacity-90">Login / Register</Link>
        <Link to={"/cart"} className="text-sm font-light hover:opacity-100 opacity-90">Cart</Link>
        <Link to={"/wishlist"} className="text-sm font-light hover:opacity-100 opacity-90">Wishlist</Link>
        <Link to={""} className="text-sm font-light hover:opacity-100 opacity-90">Shop</Link>
      </div>
      <div className="flex flex-col space-y-4">
        <h3  className="text-lg font-normal">Quick Link</h3>
        <Link to={""} className="text-sm font-light hover:opacity-100 opacity-90">Privacy Policy</Link>
        <Link to={""} className="text-sm font-light hover:opacity-100 opacity-90">Terms Of Use</Link>
        <Link to={""} className="text-sm font-light hover:opacity-100 opacity-90">FAQ</Link>
        <Link to={"/contact"} className="text-sm font-light hover:opacity-100 opacity-90">Contact</Link>
      </div>
      <div >
        <h3  className="text-lg font-normal">Social icons</h3>
        <div className="flex space-x-4 mt-5">
        <RiFacebookLine size={24} className="opacity-90 hover:opacity-100"/>
        <PiTwitterLogoLight size={24} className="opacity-90 hover:opacity-100" />
        <BsInstagram size={24} className="opacity-90 hover:opacity-100"/>
        <RiLinkedinLine size={24} className="opacity-90 hover:opacity-100"/>
        </div>
      </div>
    </div>
    <div className="bg-black text-white text-center py-8 border-t border-gray-50 border-opacity-20">
        <p className="opacity-15">@ copyright 2025. All right reserved</p>
      </div>
    </>
  );
};

export default Footer;
