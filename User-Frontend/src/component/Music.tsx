import React from "react";
import radio from "/images/radio.png";

const Music: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4 sm:py-20 py-10">
      <div className="bg-black grid sm:grid-cols-2 grid-cols-1 px-10 items-center py-10 gap-20">
        <div className="text-white space-y-10">
          <span className="text-[#00ff00] text-sm font-semibold">
            Categories
          </span>
          <h1 className="md:text-7xl text-3xl">Enhance Your Music Expierence</h1>
          <div className="flex md:space-x-6 space-x-2">
            <p className="bg-white text-black w-16 h-16 rounded-full flex flex-col -space-y-1 items-center justify-center">
              <span className="font-semibold">23</span>
              <span className="text-xs font-light">Days</span>
            </p>
            <p className="bg-white text-black w-16 h-16 rounded-full flex flex-col -space-y-1 items-center justify-center">
              <span className="font-semibold">18</span>
              <span className="text-xs font-light">Hours</span>
            </p>
            <p className="bg-white text-black w-16 h-16 rounded-full flex flex-col -space-y-1 items-center justify-center">
              <span className="font-semibold">56</span>
              <span className="text-xs font-light">Minutes</span>
            </p>
            <p className="bg-white text-black w-16 h-16 rounded-full flex flex-col -space-y-1 items-center justify-center">
              <span className="font-semibold">23</span>
              <span className="text-xs font-light">Seconds</span>
            </p>
          </div>
          <button className="bg-[#00ff00] px-10 py-3 rounded-md text-center hover:bg-[#00ff04]">
            Buy Now!
          </button>
        </div>
        <div>
          <img src={radio} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Music;
