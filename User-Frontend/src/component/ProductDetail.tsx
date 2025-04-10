import React from "react";
import productdetail1 from "/images/productdetail1.png";
import productdetail2 from "/images/productdetail2.png";
import productdetail3 from "/images/productdetail3.png";
import productdetail4 from "/images/productdetail4.png";
import productdetail5 from "/images/productdetail5.png";
import { IoIosStar } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";


const ProductDetail: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 gap-10">
      {/* section1  */}
      <div className="md:gap-20 lg:col-span-2 flex lg:flex-col lg:gap-4 gap-4  ">
        <div className="px-4 py-4 bg-gray-200 rounded-sm flex justify-center items-center">
          {" "}
          <img src={productdetail1} alt="" />
        </div>
        <div className="px-4 py-4 bg-gray-200 rounded-sm flex justify-center items-center">
          {" "}
          <img src={productdetail2} alt="" />
        </div>
        <div className="px-4 py-4 bg-gray-200 rounded-sm flex justify-center items-center">
          {" "}
          <img src={productdetail3} alt="" />
        </div>
        <div className="px-4 py-4 bg-gray-200 rounded-sm flex justify-center items-center">
          {" "}
          <img src={productdetail4} alt="" />
        </div>
      </div>
      {/* section2 */}
      <div className="2xl:col-span-6 lg:col-span-4 flex justify-center items-center bg-gray-200 rounded-sm ">
        <img src={productdetail5} alt="" />
      </div>

      {/* section3 */}
      <div className="2xl:col-span-4 lg:col-span-6 space-y-5 px-4">
        <h4 className="font-medium text-xl">HAVIC HV G-92 Gamepad</h4>
        <p className="flex space-x-3">
          <span className="flex space-x-1 text-yellow-400">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </span>
          <span className="text-xs font-normal text-gray-400">
            (150 Reviews)
          </span>
          <span className="text-xs font-normal text-[#00ff00]">In Stock</span>
        </p>
        <h5 className="text-xl font-normal">$192.00</h5>
        <p className="text-sm">
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </p>
        <div className="w-full h-0.5 bg-gray-300"></div>
        <p className="text-lg font-normal flex items-center gap-4">
          Colors:
          <span className="w-4 h-4  rounded-full bg-sky-400"></span>
          <span className="w-4 h-4  rounded-full bg-red-500"></span>
        </p>
        <p className="text-lg font-normal flex items-center gap-4">
          Size:
          <span className="w-8 h-8 flex justify-center items-center text-sm border rounded-md active:border-red-500 active:text-white active:bg-red-500">
            XS
          </span>
          <span className="w-8 h-8 flex justify-center items-center text-sm border rounded-md active:border-red-500 active:text-white active:bg-red-500">
            S
          </span>
          <span className="w-8 h-8 flex justify-center items-center text-sm border rounded-md active:border-red-500 active:text-white active:bg-red-500">
            M
          </span>
          <span className="w-8 h-8 flex justify-center items-center text-sm border rounded-md active:border-red-500 active:text-white active:bg-red-500">
            L
          </span>
          <span className="w-8 h-8 flex justify-center items-center text-sm border rounded-md active:border-red-500 active:text-white active:bg-red-500">
            XL
          </span>
        </p>
        <div className="flex sm:space-x-4 space-x-2">
          <div className="border rounded-lg border-black">
            <button className="sm:px-4 px-2 border-r border-black sm:text-3xl text-xl sm:py-2 py-1">
              -
            </button>
            <span className="2xl:px-8 sm:px-4 px-2 sm:text-2xl text-xl sm:py-2 py-1 ">2</span>
            <button className="sm:px-4 px-2 sm:text-3xl text-xl sm:py-2 py-1 bg-red-500 text-white border-r border-r-red-500 rounded-r-lg">
              +
            </button>
          </div>
          <button className="border text-white 2xl:px-6 px-4  sm:py-2 py-1 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-300">
            Buy now
          </button>
          <p className="sm:p-3 p-1 border rounded-md border-black">
            {" "}
            <IoMdHeartEmpty size={28} />
          </p>
        </div>
        
        <div className="border border-black rounded-md">
          <p className="flex gap-4 items-center border-b border-black sm:py-4 py-2 px-4">
            <TbTruckDelivery size={32} />
            <span className="flex flex-col gap-3">
              <strong className="text-lg font-medium">Free Delivery</strong>
              <span className="text-sm underline">
                Enter your postal code for Delivery Avialability
              </span>
            </span>
          </p>
          <p className="flex gap-4 items-center sm:py-4 py-2 px-4">
            <HiArrowPathRoundedSquare size={32} />
            <span className="flex flex-col gap-3">
              <strong className="text-lg font-medium">Return Delivery</strong>
              <span className="text-sm ">
                Free 30 Days Delivery Returns. <span className="underline">Details</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
