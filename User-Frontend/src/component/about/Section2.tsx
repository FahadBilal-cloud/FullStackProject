import React from "react";
import { CgShoppingBag } from "react-icons/cg";
import { AiOutlineDollar } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";

const Section2: React.FC = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-40 gap-10 mt-24">
      <div className="flex items-center flex-col border px-6 py-6 justify-center hover:bg-red-500 rounded-md transition-all duration-500 group hover:text-white">
        <div className=" bg-gray-100 group-hover:bg-opacity-50 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6">
          <span className="p-2 bg-black group-hover:bg-white rounded-full">
            <CgShoppingBag
              size={28}
              className="text-white group-hover:text-black"
            />
          </span>{" "}
        </div>
        <p className="font-bold text-2xl">10.5k</p>
        <p className="font-extralight text-xs mt-4">Sallers active our site</p>
      </div>
      <div className="flex items-center flex-col border px-6 py-6 justify-center hover:bg-red-500 rounded-md transition-all duration-500 group hover:text-white">
        <div className=" bg-gray-100 group-hover:bg-opacity-50 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6">
          <span className="p-2 bg-black group-hover:bg-white rounded-full">
            <AiOutlineDollar
              size={28}
              className="text-white group-hover:text-black"
            />
          </span>{" "}
        </div>
        <p className="font-bold text-2xl">33k</p>
        <p className="font-extralight text-xs mt-4">Monthly product Sale </p>
      </div>
      <div className="flex items-center flex-col border px-6 py-6 justify-center hover:bg-red-500 rounded-md transition-all duration-500 group hover:text-white">
        <div className=" bg-gray-100 group-hover:bg-opacity-50 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6">
          <span className="p-2 bg-black group-hover:bg-white rounded-full">
            <RiShoppingBagLine
              size={24}
              className="text-white group-hover:text-black"
            />
          </span>{" "}
        </div>
        <p className="font-bold text-2xl">45.5k</p>
        <p className="font-extralight text-xs mt-4">
          Customer active in our site{" "}
        </p>
      </div>
      <div className="flex items-center flex-col border px-6 py-6 justify-center hover:bg-red-500 rounded-md transition-all duration-500 group hover:text-white">
        <div className=" bg-gray-100 group-hover:bg-opacity-50 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6">
          <span className="p-2 bg-black group-hover:bg-white rounded-full">
            <TbMoneybag
              size={24}
              className="text-white group-hover:text-black"
            />
          </span>{" "}
        </div>
        <p className="font-bold text-2xl">25k</p>
        <p className="font-extralight text-xs mt-4">
          Annual gross sale in our site
        </p>
      </div>
    </div>
  );
};

export default Section2;
