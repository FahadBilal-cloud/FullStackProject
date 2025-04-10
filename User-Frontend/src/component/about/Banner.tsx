import React from "react";
import about from "/images/about.png";

const Banner: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-medium ">Our Story</h1>
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, amet.
          Dolorem laboriosam blanditiis nostrum quibusdam ea maiores temporibus
          quis molestias debitis labore maxime voluptas, doloremque magnam,
          veritatis pariatur, quaerat iste.
        </p>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          beatae aliquid nulla? Vel, impedit? Dolor ipsum explicabo amet.
          Commodi, minima.
        </p>
      </div>
      <div>
        <img src={about} alt="about" />
      </div>
    </div>
  );
};

export default Banner;
