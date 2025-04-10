import { Router } from "express";
import { verifyJWt } from "../middlewares/auth.middleware.js";
import { placeOrder } from "../controllers/order.contoller.js";


const router = Router()

router.use(verifyJWt)

router.route("/checkout").post(placeOrder);


export default router