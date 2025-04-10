import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store"
import { fetchUser } from "../store/authSlice";
// import axios from "axios";

const GoogleAuthHandler = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      dispatch(fetchUser({rejectValue:{message:"Unauthorized"}})).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/dashboard");
        }
      });
    };
  
    authenticateUser();
  }, [dispatch, navigate]);
  

  return <p>Authenticating...</p>;
};

export default GoogleAuthHandler;
