import React from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Logout: React.FC = () => {

    const dispatch =  useDispatch<AppDispatch>()
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const logout =()=>{
        if(token){
            dispatch(logoutUser(token)).then((res)=>{
                if(res.meta.requestStatus === 'fulfilled'){
                    navigate("/signIn")
                }
            })
        }else{
            toast.error("Student not authenticated")
        }
    }

  return (
    <div>
      <button
      onClick={logout}
      className="px-4 py-2 rounded-lg hover:bg-sky-500 hover:text-white transition-all duration-200 ease-in-out border border-sky-500">
        Logout
      </button>
    </div>
  );
};

export default Logout;
