import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateTokenSecret = async (userId) => {
  try {
    const user = await User.findById(userId);

    const token = user.generateToken();

    return token;
  } catch (error) {
    throw new ApiError(500, "Error when generating a token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get the all fields
  // check the all field are requried
  // check the email already existed
  //create the new student
  //return the response

  const { firstName, lastName, address, email, password } = req.body;

  if (
    [firstName, lastName, address, email, password].some(
      (field) => field === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedEmail = await User.findOne({ email });

  if (existedEmail) {
    throw new ApiError(400, "Email already existed");
  }

  const student = await User.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    address,
    password,
  });

  if (!student) {
    throw new ApiError(500, "Error when creating a new student");
  }

  //   const registeredStudent = await Student.findById(student._id).select('-password')
  return res
    .status(200)
    .json(new ApiResponse(201, student, "Student created Sucessfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Credentials are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not existed");
  }

  const isPasswordValidate = await user.isPasswordCorrect(password);

  if (!isPasswordValidate) {
    throw new ApiError(401, "Invalid Credientials");
  }

  const token = await generateTokenSecret(user._id);

  const loggedIn = await User.findById(user._id).select("-password");

  loggedIn.isLoggedIn=true;

  await loggedIn.save({validateBeforeSave:false})

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("Token", token, options)
    .json(new ApiResponse(200, {user:loggedIn,token}, "Student logged In Sucessfully"));
});

const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(400, "You can't Logout");
  }

  user.isLoggedIn=false;
  await user.save({validateBeforeSave:false});

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("Token", options)
    .json(new ApiResponse(200, {}, "You Logout Successfully"));
});

export { registerUser, login, logout };
