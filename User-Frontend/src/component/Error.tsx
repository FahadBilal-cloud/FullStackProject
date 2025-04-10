import React from "react";
import { Link } from "react-router-dom";
const Error: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4  py-20 flex justify-center items-center flex-col gap-10">
      <h1 className="sm:text-7xl text-4xl font-medium">404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <button className="border px-6 py-3 rounded-md bg-red-500 hover:bg-red-600 text-white border-red-500 transition-all duration-300 sm:mt-10 mt-5">
        <Link to={"/"}>Back to home page</Link>
      </button>
    </div>
  );
};

export default Error;
