import React from "react";
import about1 from "/images/about1.png";
import about2 from "/images/about2.png";
import about3 from "/images/about3.png";
import { PiTwitterLogoLight } from "react-icons/pi";
import { BsInstagram } from "react-icons/bs";
import { RiLinkedinLine } from "react-icons/ri";

const Section3: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-20">
      <div className="flex flex-col">
        <div className="pt-4 bg-gray-100 mb-4 flex justify-center items-center rounded-md">
          <img src={about1} alt="" />
        </div>
        <h2 className="font-medium text-2xl">Tom Cruise</h2>
        <p className="text-sm">Founder & Chairman</p>
        <div className="flex space-x-3 mt-2">
          <PiTwitterLogoLight size={16} />
          <BsInstagram size={16} />
          <RiLinkedinLine size={16} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="pt-4 bg-gray-100 mb-4 flex justify-center items-center rounded-md">
          <img src={about2} alt="" />
        </div>
        <h2 className="font-medium text-2xl">Emma Watson</h2>
        <p className="text-sm">Managing Director</p>
        <div className="flex space-x-3 mt-2">
          <PiTwitterLogoLight size={16} />
          <BsInstagram size={16} />
          <RiLinkedinLine size={16} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="pt-4 bg-gray-100 mb-4 flex justify-center items-center rounded-md">
          <img src={about3} alt="" />
        </div>
        <h2 className="font-medium text-2xl">Will Smith</h2>
        <p className="text-sm">Product Designer</p>
        <div className="flex space-x-3 mt-2">
          <PiTwitterLogoLight size={16} />
          <BsInstagram size={16} />
          <RiLinkedinLine size={16} />
        </div>
      </div>
    </div>
  );
};

export default Section3;
