import { Router } from "express";
import { login, logout, registerUser } from "../controllers/user.controller.js";
import { verifyJWt } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(verifyJWt, logout);

export default  router ;
