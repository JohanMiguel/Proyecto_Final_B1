import { Router } from "express";
import { generarBillUser, getBills} from "./bill.controller.js";

const router = Router();

/**
 * @swagger
 * /generarFactura/{idCart}:
 *   post:
 *     summary: Generar factura para un usuario
 *     parameters:
 *       - in: path
 *         name: idCart
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Factura generada exitosamente
 *       400:
 *         description: Error al generar la factura
 */
router.post("/generarFactura/:idCart", generarBillUser);

/**
 * @swagger
 * /listFacturas:
 *   post:
 *     summary: Listar todas las facturas
 *     responses:
 *       200:
 *         description: Lista de facturas
 *       400:
 *         description: Error al listar las facturas
 */
router.post("/listFacturas", getBills);

export default router;