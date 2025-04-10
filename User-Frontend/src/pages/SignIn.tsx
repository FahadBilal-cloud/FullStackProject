import React, { useState } from "react";
import LoginImage from "/images/login.png";
import Eye from "/svg/eye.svg";
import Invisible from "/svg/invisible.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

// interface FormData{
//     email:string,
//     password:string
// }

const SignInForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { loading } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    dispatch(loginUser(formData)).then((res)=>{
      if(res.meta.requestStatus === "fulfilled"){
        navigate("/")
      }
    });
    setFormData({
      email: "",
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

  return (
    <div className="grid md:grid-cols-2 py-20 ">
      <div className="md:block hidden">
        <img src={LoginImage} alt="login" className="h-screen" />
      </div>
      <div className="w-full px-6 py-8 h-full flex items-center justify-center">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl font-medium mb-6">Log in to E-commerce</h2>
          <p className="font-semibold mb-6 ">
          Enter your details below
          </p>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          {/* Username Field */}
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
          <div className="flex justify-center items-center gap-32">
          <button
            type="button"
            className="mt-6 focus:outline-none font-normal text-white rounded-lg text-lg w-full py-4 text-center bg-red-600 hover:bg-red-500"
            onClick={handleSignIn}
          >
            {loading ? "loading..." : "Log In"}
          </button>
          <button
            type="button"
            className="mt-6 focus:outline-none font-normal rounded-lg text-lg px-5 py-4 w-full text-center text-red-600"
            onClick={handleSignIn}
          >
            {"Forget Password?"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
