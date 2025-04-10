import React, { useEffect } from "react";
import Table from "./Table";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { fetchCart } from "../store/cartSlice";
import {  useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store/store";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem("token")!);
  const {cart} =useSelector((state:RootState)=>state.cart)

  const cartItems = cart?.data
  // console.log(cartItems);
  

  // useEffect(() => {
  //   const getFetchCart = () => {     
  //     console.log("fahad");
       
  //     if (!token) {
  //       toast.error("You are not loggedIn");
  //       return;
  //     }
  //     dispatch(fetchCart(token))
  //   };
  //   getFetchCart()
  // }, [dispatch,token]);

  return (
    <div className=" md:px-24 sm:px-8 px-4 py-28">
      <Table intialItems={cartItems?.items || []}/>
      <div className="flex justify-between gap-5">
        <button className="border border-gray-700 sm:px-10 px-6 py-3 rounded-md hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300">
          Retrun To Shop
        </button>
        <button className="border border-gray-700 sm:px-10 px-6 py-3 rounded-md hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300">
          Update Cart
        </button>
      </div>
      <div className="border-2 border-black rounded-md px-6 py-4 mt-20">
        <h4 className="font-semibold mb-4">Cart Total</h4>
        <p className="flex justify-between py-4 border-b border-gray-400">
          <span>Subtotal:</span>
          <span>${cartItems?.totalAmount}</span>
        </p>
        <p className="flex justify-between py-4 border-b border-gray-400">
          <span>Shipping:</span>
          <span>Free</span>
        </p>
        <p className="flex justify-between py-4">
          <span>Total:</span>
          <span>${cartItems?.totalAmount}</span>
        </p>
        <div className="flex justify-center mt-4">
          <button className="border px-10 py-3 rounded-md bg-red-500 hover:bg-red-600 text-white border-red-500 transition-all duration-300">
            <Link to={"/checkOut"}>Process to checkout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
