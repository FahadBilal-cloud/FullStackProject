import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/productSlice";
import { Product } from "../Types/Product.types";
import LoadingSpinner from "./Loader";

const IMAGE_URL = "http://localhost:13374";
const Allproduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //console.log(products);

  // Helper function to safely get the first image URL
  const getFirstImageUrl = (product: Product) => {
    if (!product.productUrl || product.productUrl.length === 0) {
      return ""; // Return empty string or a placeholder image URL
    }
    return `${IMAGE_URL}${product.productUrl[0].url}`;
  };

  return (
    <div className="md:px-24 sm:px-8 px-4 sm:pt-20 pt-10">
      <div className="flex space-x-3 items-center">
        <div className="w-4 h-6 bg-red-600 rounded-sm shadow-lg"></div>
        <strong className="text-red-500 text-sm">Today's</strong>
      </div>
      <div className="mt-5 flex items-center sm:gap-24 gap-8 flex-wrap">
        <h1 className="text-2xl font-semibold">Flash Sales</h1>
        <div className="flex gap-4">
          <p className="flex flex-col items-end">
            <span className="text-sm font-medium">Days</span>
            <strong className="text-2xl font-bold">03</strong>
          </p>
          <span className="text-red-600 text-2xl">:</span>
          <p className="flex flex-col items-end">
            <span className="text-sm font-medium">Hours</span>
            <strong className="text-2xl font-bold">23</strong>
          </p>
          <span className="text-red-600 text-2xl">:</span>
          <p className="flex flex-col items-end">
            <span className="text-sm font-medium">Minutes</span>
            <strong className="text-2xl font-bold">19</strong>
          </p>
          <span className="text-red-600 text-2xl">:</span>
          <p className="flex flex-col items-end">
            <span className="text-sm font-medium">Seconds</span>
            <strong className="text-2xl font-bold">56</strong>
          </p>
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="col-span-full flex justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full flex justify-center">
            <p>No products available</p>
          </div>
        ) : (
          products.map((product) => (
            <Card
              key={product.id} // Add key prop here
              id={product.id}
              image={getFirstImageUrl(product)}
              title={product.name}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviewCount={product.review}
              isNew={product.isNew}
              imageAlt={product.name}
            />
          ))
        )}
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

export default Allproduct;
