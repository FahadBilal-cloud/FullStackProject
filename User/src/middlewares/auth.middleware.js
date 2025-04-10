import { ApiError } from "../utils/ApiError.js";
import JWT from 'jsonwebtoken'
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWt = asyncHandler(async (req, _, next)=>{
    try {
        const token = await req.cookies?.Token || req.header("Authorization")?.replace("Bearer ","") 

        // console.log("Token",token);
        
        if(!token){
            throw new ApiError(401,"Unauthorized Request")
        }

        const decodedToken = JWT.verify(token,process.env.TOKEN_SECRET)

        // console.log("DecodedToken",decodedToken);
        

        const user = await User.findById(decodedToken._id).select('-password')

        // console.log(user);
        

        if(!user || user.isLoggedIn === false){
            throw new ApiError(400,"Invalid Token")
        }

        req.user = user;
        next();


    } catch (error) {
        console.log(error?.message);
        throw new ApiError(401,"Unauthorized Token")
    }
})