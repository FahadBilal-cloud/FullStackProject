import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { PiHeadphonesBold } from "react-icons/pi";
import { SiAdguard } from "react-icons/si";

const Deliver: React.FC = () => {
  return (
    <div className=" max-w-3xl mx-auto flex sm:justify-between justify-center gap-8 mb-24 py-5 px-8 flex-wrap">
      <div className="flex items-center flex-col">
        <div className=" bg-gray-300 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6" >
          <span className="p-2 bg-black rounded-full">
            <TbTruckDelivery size={28} className="text-white" />
          </span>{" "}
        </div>
        <p className="font-medium text-sm">FREE AND FAST DELIVERY</p>
        <p className="font-extralight text-xs">Free deliver forn all orders over $140</p>
      </div>
      <div className="flex items-center flex-col">
        <div className=" bg-gray-300 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6" >
          <span className="p-2 bg-black rounded-full">
            <PiHeadphonesBold  size={28} className="text-white" />
          </span>{" "}
        </div>
        <p className="font-medium text-sm">24/7 CUSTOMER SERVICE</p>
        <p className="font-extralight text-xs">Friendly 24/7 customer support </p>
      </div>
      <div className="flex items-center flex-col">
        <div className=" bg-gray-300 p-2 rounded-full w-14 h-14 flex justify-center items-center mb-6" >
          <span className="p-2 bg-black rounded-full">
            <SiAdguard size={24} className="text-white" />
          </span>{" "}
        </div>
        <p className="font-medium text-sm">MONEY BACK GUARANTEE</p>
        <p className="font-extralight text-xs">We return money within 30 days</p>
      </div>
    </div>
  );
};

export default Deliver;
