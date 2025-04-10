import React from "react";
import Card from "./Card";
import product5 from "/images/product5.png";
import product6 from "/images/product6.png";
import product7 from "/images/product7.png";
import product8 from "/images/product8.png";

const SellingProduct: React.FC = () => {
  const images = [product5, product6, product7, product8];
  const text = [
    "The north coat",
    "Gucci duffle bag",
    "RGB liquid CPU cooler",
    "Small Bookself",
  ];
  const discountedPrice = ["260", "960", "160", "360"];
  const originalPrice = ["320", "1100", "200", "400"];
  return (
    <div className="md:px-24 sm:px-8 px-4">
      <div className="flex space-x-3 items-center">
        <div className="w-4 h-6 bg-red-600 rounded-sm shadow-lg"></div>
        <strong className="text-red-500 text-sm">Today's</strong>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Best Selling Products</h1>
        <button className="bg-red-500 text-white sm:px-10 px-6 sm:py-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300">
          View All
        </button>
      </div>
      <div className="mt-8 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {images.map((image, index) => (
          <Card
            image={image}
            title={text[index]}
            originalPrice={originalPrice[index]}
            discountedPrice={discountedPrice[index]}
          />
        ))}
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-12"></div>
    </div>
  );
};

export default SellingProduct;
