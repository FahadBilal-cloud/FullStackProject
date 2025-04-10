import React, { useState } from "react";
import payment1 from "/images/payment1.png";
import payment2 from "/images/payment2.png";
import payment3 from "/images/payment3.png";
import payment4 from "/images/payment4.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import { placeOrderThunk } from "../store/orderSlice";
import { OrderFormData } from "../Types/Order.types";
import { clearCart } from "../store/cartSlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const CheckOut: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const cartItems = cart?.data;
  // console.log(cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem("token")!);

  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNo: "",
    emailAddress: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const orderDetails: OrderFormData = {
      ...formData,
      paymentMethod,
      saveInfo,
    };
  
    try {
      // 1. Place Order
      const result = await dispatch(
        placeOrderThunk({ token, orderData: orderDetails })
      ).unwrap();
  
      const orderId = result.data._id;
      dispatch(clearCart());
  
      // 2. Load Stripe
      const stripe = await loadStripe(
        "pk_test_51RBv0sQq20yp6LjMjvKYTw2JTfiBIk1xfJF9RlSIc7EUgKG3xcnxettlef0DfomrVFLwUzHNrCz563qN08dUJHtq00MPkeBDjN"
      );
  
      if (!stripe) {
        toast.error("Stripe failed to load");
        return;
      }
  
      // 3. Create Payment Session
      const paymentResponse = await axios.post(
        "http://localhost:8000/api/v1/payment/make", // ✅ use HTTP in local dev
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const { id } = paymentResponse.data.data;
  
      // 4. Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || "Something went wrong";
      toast.error(message);
    } finally {
      // 5. Reset form state
      setFormData({
        firstName: "",
        streetAddress: "",
        apartment: "",
        city: "",
        phoneNo: "",
        emailAddress: "",
      });
      setPaymentMethod("Bank"); // Default to Bank or any default method you want
      setSaveInfo(false);
    }
  };
  

  return (
    <div className="md:px-24 sm:px-8 px-4 py-20">
      <h1 className="text-3xl font-medium">Billing Details</h1>
      <div className="mt-16 grid sm:grid-cols-2 grid-cols-1 lg:gap-40 md:gap-20 gap-10">
        {/* Billing form */}
        <form className="space-y-6">
          {/** Input Fields */}
          {[
            { label: "First Name", name: "firstName" },
            { label: "Street Address", name: "streetAddress" },
            { label: "Apartment", name: "apartment" },
            { label: "City/Town", name: "city" },
            { label: "Phone No", name: "phoneNo" },
            { label: "Email Address", name: "emailAddress" },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-1 text-gray-400 block">
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="text-gray-900 text-base block w-full py-3 bg-gray-100 rounded-md px-3"
                required
              />
            </div>
          ))}

          {/** Save Info */}
          <div>
            <input
              type="checkbox"
              className="mr-4"
              checked={saveInfo}
              onChange={(e) => setSaveInfo(e.target.checked)}
            />
            <span className="text-sm font-normal">
              Save this information for faster check-out next time
            </span>
          </div>
        </form>
        {/* Payment */}
        <div className="space-y-6 sm:mt-10">
          {cartItems?.items?.length ? (
            <div className="space-y-4">
              {cartItems.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-12 h-10 ml-2 rounded"
                    />
                    <span className="font-medium text-sm">
                      {item.product.title}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">${item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}

          <div>
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
          </div>

          {/** Payment Method */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Bank"
                  checked={paymentMethod === "Bank"}
                  onChange={() => setPaymentMethod("Bank")}
                  className="mr-3"
                />
                <span className="text-sm font-normal">Bank</span>
              </label>
              <div className="flex gap-2">
                <img
                  src={payment1}
                  alt="Bank"
                  className="w-8 h-8 object-contain"
                />
                <img
                  src={payment2}
                  alt="Bank"
                  className="w-8 h-8 object-contain"
                />
                <img
                  src={payment3}
                  alt="Bank"
                  className="w-8 h-8 object-contain"
                />
                <img
                  src={payment4}
                  alt="Bank"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on delivery"
                checked={paymentMethod === "Cash on delivery"}
                onChange={() => setPaymentMethod("Cash on delivery")}
                className="mr-3"
              />
              <span className="text-sm font-normal">Cash on delivery</span>
            </label>
          </div>

          {/** Place Order Button */}
          <div className="flex justify-start">
            <button
              disabled={!cartItems}
              className={`border px-10 py-3 rounded-md ${
                cartItems ? "cursor-pointer" : "cursor-not-allowed"
              } text-white border-red-500 transition-all duration-300 bg-red-500 hover:bg-red-600`}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
