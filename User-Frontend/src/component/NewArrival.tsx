import React from "react";
import arrival1 from "/images/arrival1.png";
import arrival2 from "/images/arrival2.png";
import arrival3 from "/images/arrival3.png";
import arrival4 from "/images/arrival4.png";

const NewArrival: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4 py-20">
      <div className="flex space-x-3 items-center">
        <div className="w-4 h-6 bg-red-600 rounded-sm shadow-lg"></div>
        <strong className="text-red-500 text-sm">Featured</strong>
      </div>
      <div className="mt-5 flex items-center space-x-24">
        <h1 className="text-2xl font-semibold ">New Arrival</h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-16">
        {/* Arrival 1 */}
        <div className="bg-black text-white relative rounded-md">
          <div className="sm:h-full h-[200px]">
          <img src={arrival1} alt="" className="md:pl-20 pl-40 h-full  object-cover" />
          </div>
          <div className="absolute bottom-6 left-6 space-y-2">
            <h3 className="text-lg font-medium">Play Stattion 5</h3>
            <p className="text-xs font-light w-60">
              Black and white version of the PS5 coming out on sale.
            </p>
            <button className="border-b border-gray-50 border-opacity-45 hover:border-opacity-100">
              Shop Now
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* Arrival 2 */}

          <div className="bg-black text-white relative rounded-md">
          <div className="sm:h-full h-[200px]">
            <img src={arrival2} alt="" className="md:pl-20 pl-40 h-full object-cover"/>
            </div>
            <div className="absolute bottom-6 left-6 space-y-2">
              <h3 className="text-lg font-medium">Women's Collection</h3>
              <p className="text-xs font-light w-60">
                Featured woman collectionthat give you another vibe.
              </p>
              <button className="border-b border-gray-50 border-opacity-45 hover:border-opacity-100">
                Shop Now
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Arrival 3 */}

            <div className="bg-black text-white relative rounded-md">
            <div className="sm:h-full h-[200px]">
              <img src={arrival3} alt="" className="md:pl-20 pl-40 h-full object-cover"/>
              </div>
              <div className="absolute bottom-6 left-6 space-y-2">
                <h3 className="text-lg font-medium">Speakers</h3>
                <p className="text-xs font-light">
                  Amazon wireless speakers
                </p>
                <button className="border-b border-gray-50 border-opacity-45 hover:border-opacity-100">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Arrival 4 */}

            <div className="bg-black text-white relative rounded-md">
            <div className="sm:h-full h-[200px]">
              <img src={arrival4} alt="" className="md:pl-20 pl-40 h-full"/>
              </div>
              <div className="absolute bottom-6 left-6 space-y-2">
                <h3 className="text-lg font-medium">Perfume</h3>
                <p className="text-xs font-light">
                  GUCCI INTENSE OUD EDP
                </p>
                <button className="border-b border-gray-50 border-opacity-45 hover:border-opacity-100">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
