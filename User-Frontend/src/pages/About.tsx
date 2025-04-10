import React from "react";
import Banner from "../component/about/Banner";
import Section2 from "../component/about/Section2";
import Deliver from "../component/Deliver";
import Section3 from "../component/about/Section3";

const About: React.FC = () => {
  return (
    <div className="md:px-24 sm:px-8 px-4 mt-20">
      <Banner />
      <Section2/>
      <Section3/>
      <Deliver/>
    </div>
  );
};

export default About;
