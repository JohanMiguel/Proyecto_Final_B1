import { Router } from "express";
import { generarBillUser, getBills} from "./bill.controller.js";

const router = Router()

router.post("/generarFactura/:idCart", generarBillUser);
router.post("/listFacturas", getBills);

export default router