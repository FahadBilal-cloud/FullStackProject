import React from "react";
import Card from "./Card";
import product1 from "/images/product1.png";
import product2 from "/images/product2.png";
import product3 from "/images/product3.png";
import product4 from "/images/product4.png";
import product5 from "/images/product5.png";
import product6 from "/images/product6.png";
import product7 from "/images/product7.png";
import product8 from "/images/product8.png";

const ExploreProduct: React.FC = () => {
  const images = [product1, product2, product3, product4, product5, product6, product7, product8];
  const text = [
    "HAVIT HV-G92 GamePad",
    "AK-900 Wired Keyboard",
    "IPS LCD Gaming Computer",
    "S-Series Comfort Chair",
    "The north coat",
    "Gucci duffle bag",
    "RGB liquid CPU cooler",
    "Small Bookself",
  ];
  const discountedPrice = ["120", "960", "370", "375","120", "960", "370", "375"];
  const originalPrice = ["320", "1100", "400", "400","320", "1100", "400", "400"];
  return (
    <div className="md:px-24 sm:px-8 px-4 sm:pt-20 pt-10 ">
      <div className="flex space-x-3 items-center">
        <div className="w-4 h-6 bg-red-600 rounded-sm shadow-lg"></div>
        <strong className="text-red-500 text-sm">Our Products</strong>
      </div>
      <div className="mt-5 flex items-center space-x-24">
        <h1 className="text-2xl font-semibold ">Explore Our Products</h1>
      </div>
      <div className="mt-10 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
        {images.map((image, index) => (
          <Card
            image={image}
            title={text[index]}
            originalPrice={originalPrice[index]}
            discountedPrice={discountedPrice[index]}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <button className="bg-red-500 text-white px-10 py-4 rounded-md hover:bg-red-600 mt-20 transition-all duration-300">
          View All Products
        </button>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-12"></div>
    </div>
  );
};

export default ExploreProduct;
