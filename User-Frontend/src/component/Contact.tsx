import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <>
      <div className="md:px-24 sm:px-8 px-4 py-20 grid md:grid-cols-12 gap-6">
        <div className="bg-white shadow-md px-10 py-10 space-y-8 md:col-span-3 rounded-md">
          <div className="flex flex-col space-y-5 ">
            <div className="flex space-x-4 items-center">
              <span className="bg-red-500 p-2 rounded-full">
                {" "}
                <LuPhone size={20} className="text-white text-opacity-75" />
              </span>
              <span className="font-medium">Call To Us</span>
            </div>
            <p className="text-sm font-normal">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm font-normal">Phone: +92-3209641608</p>
          </div>
          <div className="w-full h-0.5 bg-gray-300"></div>
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-4 items-center">
              <span className="bg-red-500 p-2 rounded-full">
                {" "}
                <MdMailOutline
                  size={20}
                  className="text-white text-opacity-75"
                />
              </span>
              <span className="font-medium">Write To Us</span>
            </div>
            <p className="text-sm font-normal">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm font-normal">Emails: smartio@g.com</p>
            <p className="text-sm font-normal">Emails: smartio@gmail.com</p>
          </div>
        </div>

        <div className="bg-white shadow-md px-10 py-10 space-y-8 md:col-span-9 rounded-md">
          <div className="flex md:flex-row flex-col gap-4">
            <input
              type="text"
              id="name"
              name="name"
              value={""}
              className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              value={""}
              className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
              placeholder="Your Email"
              required
            />
            <input
              type="text"
              id="phone"
              name="phone"
              value={""}
              className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3 "
              placeholder="Your Phone"
              required
            />
          </div>
          <textarea
            name="mesagge"
            rows={8}
            id=""
            placeholder="Your Message"
            className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3"
          />
          <div className="flex justify-end">
            {" "}
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
