import { Router } from "express";
import { addItemToCart, getUserCart, removeItemFromCart, modifyProductQuantity } from "./cart.controller.js";

const router = Router();

/**
 * @swagger
 * /comprar:
 *   post:
 *     summary: Añadir un artículo al carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...properties...
 *     responses:
 *       200:
 *         description: Artículo añadido al carrito exitosamente
 *       400:
 *         description: Error al añadir el artículo al carrito
 */
router.post("/comprar", addItemToCart);

/**
 * @swagger
 * /carrito/{userId}:
 *   get:
 *     summary: Obtener el carrito de un usuario
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Carrito del usuario
 *       400:
 *         description: Error al obtener el carrito del usuario
 */
router.get("/carrito/:userId", getUserCart);

/**
 * @swagger
 * /eliminar/{userId}:
 *   delete:
 *     summary: Eliminar un artículo del carrito
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Artículo eliminado del carrito exitosamente
 *       400:
 *         description: Error al eliminar el artículo del carrito
 */
router.delete("/eliminar/:userId", removeItemFromCart);

/**
 * @swagger
 * /modificar-cantidad/{userId}:
 *   put:
 *     summary: Modificar la cantidad de un producto en el carrito
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...properties...
 *     responses:
 *       200:
 *         description: Cantidad del producto modificada exitosamente
 *       400:
 *         description: Error al modificar la cantidad del producto
 */
router.put("/modificar-cantidad/:userId", modifyProductQuantity);

export default router;
