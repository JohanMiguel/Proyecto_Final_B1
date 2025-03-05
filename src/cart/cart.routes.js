import { Router } from "express";
import { addItemToCart, getUserCart, removeItemFromCart, modifyProductQuantity } from "./cart.controller.js";

const router = Router();

router.post("/comprar", addItemToCart);
router.get("/carrito/:userId", getUserCart);
router.delete("/eliminar/:userId", removeItemFromCart);
router.put("/modificar-cantidad/:userId", modifyProductQuantity);

export default router;
