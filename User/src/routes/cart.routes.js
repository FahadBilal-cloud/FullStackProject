import { Router } from "express";
import { verifyJWt } from "../middlewares/auth.middleware.js";
import { getCart,updateCartItem,removeFromCart, addToCart } from "../controllers/cart.controler.js";


const router = Router()

router.use(verifyJWt)

router.route("/").get(getCart);
router.route("/update/:itemId").put(updateCartItem);
router.route("/remove/:itemId").delete(removeFromCart);
router.route("/add").post(addToCart);

export default router