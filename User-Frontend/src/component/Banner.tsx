import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import banner from "/images/banner.png"

const Banner: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-12 md:px-24 sm:px-8 px-4 py-8 gap-8">
      <div className="flex flex-col space-y-5 sm:col-span-3">
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Woman's Fashion
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Men's Fashion
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Electonics
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Home & Lifestyle
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Medicine
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Sports & Outdoor
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
         Bays's & Toys
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Groceries & Pets
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
        <Link
          to={"/"}
          className="group flex items-center text-gray-900 transition-all duration-300"
        >
          Health & Beauty
          <FaAngleRight className="ml-2 transform translate-x-0 opacity-0 group-hover:translate-x-[50px] group-hover:opacity-100 transition-all duration-300" />
        </Link>
      </div>
      <div className="sm:col-span-9 sm:block hidden">
        <img src={banner} alt="" className="w-[1050px] h-[380px]" />
      </div>
    </div>
  );
};

export default Banner;
