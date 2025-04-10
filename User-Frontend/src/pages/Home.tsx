import React from "react";
// import Navbar from "../component/Navbar";
// import Footer from "../component/Footer";
import Banner from "../component/Banner";
import Allproduct from "../component/Allproduct";
import Category from "../component/Category";
import SellingProduct from "../component/SellingProduct";
import Music from "../component/Music";
import ExploreProduct from "../component/ExploreProducts";
import NewArrival from "../component/NewArrival";
import Deliver from "../component/Deliver";


const Home: React.FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Banner/>
      <Allproduct/>
      <Category/>
      <SellingProduct/>
      <Music/>
      <ExploreProduct/>
      <NewArrival/>
      <Deliver/>
      {/* <Footer/> */}
    </>
  );
};

export default Home;
