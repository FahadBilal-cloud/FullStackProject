import { Router } from "express";
import { payment } from "../controllers/payment.controller.js";
import { verifyJWt } from "../middlewares/auth.middleware.js";

const router=Router()

router.use(verifyJWt)

router.route("/make").post(payment)
export default router