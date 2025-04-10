import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const cartItems = cart?.data?.items || [];

  const closeMenu = () => {
    setOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="flex flex-wrap items-center justify-between md:px-24 sm:px-8 px-4 py-4">
        <h1 className="text-xl font-bold">
          <Link to={"/"}>E-commerce</Link>
        </h1>

        <div className="flex md:order-2 items-center space-x-4">
          {/* <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button> */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <button
            onClick={() => setOpen(!open)}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {user && (
            <div className="flex space-x-3 items-center">
              <Link to={"/wishlist"}>
                <IoMdHeartEmpty size={28} />
              </Link>
              <Link to="/cart" className="relative">
                <IoCartOutline size={28} />
                {cartItems && cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <div className="relative inline-block">
                {/* User Icon */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-full transition-colors  ${
                    isOpen
                      ? "bg-red-500 text-white transition-all duration-500"
                      : "text-gray-700"
                  }`}
                >
                  <FiUser size={28} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-600 bg-opacity-50 border rounded-lg shadow-lg">
                    <ul className="py-2">
                      {[
                        { icon: <FiUser size={24} />, label: "My Account" },
                        {
                          icon: <LuShoppingBag size={24} />,
                          label: "My Orders",
                        },
                        {
                          icon: <MdOutlineCancel size={24} />,
                          label: "My Cancellations",
                        },
                        {
                          icon: <MdOutlineStarOutline size={24} />,
                          label: "My Reviews",
                        },
                        { icon: <TbLogout2 size={24} />, label: "Logout" },
                      ].map((item, index) => (
                        <li
                          onClick={closeMenu}
                          key={index}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-black cursor-pointer text-white"
                        >
                          <Link to={"/MyAccount"}></Link>
                          {item.icon}
                          {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            open ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <ul className="flex flex-col mt-4 pl-1 font-medium md:space-x-20 rtl:space-x-reverse md:space-y-0 space-y-4 md:flex-row md:mt-0 md:pl-0 md:bg-white">
            <li onClick={closeMenu}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative text-gray-900 pb-2 
                   after:content-[''] after:absolute after:left-0 after:bottom-1 
                   after:w-full after:h-[2px] after:bg-gray-400
                   ${
                     isActive
                       ? "after:opacity-100"
                       : "after:opacity-0 hover:after:opacity-100"
                   }`
                }
              >
                Home
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative text-gray-900 pb-2 
                   after:content-[''] after:absolute after:left-0 after:bottom-1
                   after:w-full after:h-[2px] after:bg-gray-400
                   ${
                     isActive
                       ? "after:opacity-100"
                       : "after:opacity-0 hover:after:opacity-100"
                   }`
                }
              >
                About
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative text-gray-900 pb-2 
                   after:content-[''] after:absolute after:left-0 after:bottom-1 
                   after:w-full after:h-[2px] after:bg-gray-400
                   ${
                     isActive
                       ? "after:opacity-100"
                       : "after:opacity-0 hover:after:opacity-100"
                   }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <NavLink
                to="/signUp"
                className={({ isActive }) =>
                  `relative text-gray-90 pb-2 
                   after:content-[''] after:absolute after:left-0 after:bottom-1 
                   after:w-full after:h-[2px] after:bg-gray-400 
                   ${
                     isActive
                       ? "after:opacity-100"
                       : "after:opacity-0 hover:after:opacity-100"
                   }`
                }
              >
                SignUp
              </NavLink>
            </li>
          </ul>
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
