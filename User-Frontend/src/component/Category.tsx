import React from "react";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { PiHeadphones } from "react-icons/pi";
import { LuGamepad } from "react-icons/lu";

const Category: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4 py-20">
      <div className="flex space-x-3 items-center">
        <div className="w-4 h-6 bg-red-600 rounded-sm shadow-lg"></div>
        <strong className="text-red-500 text-sm">Categories</strong>
      </div>
      <h1 className="text-2xl font-semibold mt-5">Browse By Category</h1>
      <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-1 gap-8">
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <MdOutlinePhoneIphone size={60} />
          <p className="text-sm font-light">Phones</p>
        </div>
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <RiComputerLine size={60} />
          <p className="text-sm font-light">Computers</p>
        </div>
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <BsSmartwatch size={60} />
          <p className="text-sm font-light">SmartWatch</p>
        </div>
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <IoCameraOutline size={60} />
          <p className="text-sm font-light">Camera</p>
        </div>
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <PiHeadphones size={60} />
          <p className="text-sm font-light">HeadPhones</p>
        </div>
        <div className="border-2 border-gray-200 rounded-md  flex flex-col justify-center items-center py-10 space-y-3 mt-10 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-500 ">
          <LuGamepad size={60} />
          <p className="text-sm font-light">Gaming</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-16"></div>
    </div>
  );
};

export default Category;
