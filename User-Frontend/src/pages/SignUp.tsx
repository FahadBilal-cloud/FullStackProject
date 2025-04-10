import React, { useState } from "react";
import signUpImage from "/images/login.png";
import google from "/images/google.png";
import Eye from "/svg/eye.svg";
import Invisible from "/svg/invisible.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

// interface FormData{
//     email:string,
//     password:string
// }

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
  });

  const handleSignIn = () => {
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/signIn");
      }
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      password: "",
    });
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleAuth = () => {
    window.open(
      "http://localhost:8000/auth/google",
      "_blank",
      "width=500,height=600"
    );
  };

  return (
    <div className="grid md:grid-cols-2 py-20 ">
      <div className="md:block hidden">
        <img src={signUpImage} alt="login" className="h-screen" />
      </div>
      <div className="w-full px-6 py-8 h-full flex items-center justify-center">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-medium mb-6 ">Create an account</h2>
          <p className="font-semibold mb-6 ">Enter your details below</p>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          {/* Name Field */}
          <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6">
            <div className="mb-4 border-b border-gray-300">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-white  text-gray-900 text-base block w-full py-2 focus:outline-none"
                placeholder="First Name"
                required
              />
            </div>
            <div className="mb-4 border-b border-gray-300">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-white  text-gray-900 text-base block w-full py-2 focus:outline-none"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4 border-b border-gray-300">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white  text-gray-900 text-base block w-full py-2 focus:outline-none"
              placeholder="Email"
              required
            />
          </div>

          {/* address */}
          <div className="mb-4 border-b border-gray-300">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-white  text-gray-900 text-base block w-full py-2 focus:outline-none"
              placeholder="Address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative border-b border-gray-300">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white  text-gray-900 text-base block w-full py-2 focus:outline-none"
                placeholder="Password"
                required
              />
              {/* Eye Icon for Show/Hide Password */}
              {formData.password && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src={Invisible} alt="invisible" className="w-6" />
                  ) : (
                    <img src={Eye} alt="Eye" className="w-7" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="mt-6 focus:outline-none font-normal text-white rounded-lg text-lg px-5 py-4 w-full text-center bg-red-600 hover:bg-red-500"
            onClick={handleSignIn}
          >
            {loading ? "loading..." : "Create Account"}
          </button>
          <button
            className="mt-6 focus:outline-none font-normal rounded-lg text-lg px-5 py-1 w-full text-center border border-gray-300 hover:bg-gray-100"
            onClick={handleGoogleAuth}
          >
            <img src={google} alt="google icon" className="inline-block" />
            Sign Up with Google
          </button>
          <p className="text-center mt-6 font-medium">
            Already have an account?{" "}
            <Link to={"/SignIn"} className="font-semibold hover:underline">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
