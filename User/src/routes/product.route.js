import { Router } from "express";
import { verifyJWt } from "../middlewares/auth.middleware.js";
import { getAllProducts } from "../controllers/product.controller.js";

const router=Router()

router.use(verifyJWt)

router.route("/all").get(getAllProducts)

export default router