import { Router } from "express";
import { saveProduct,getProducts, updateProduct, deleteProduct,getProductsFiltered} from "./product.controller.js";
import { createProductValidator,updateProductValidator,deleteProductValidator } from "../middlewares/product-validator.js";

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added successfully
 */
router.post("/addProduct", createProductValidator, saveProduct);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/", getProducts);

/**
 * @swagger
 * /update/{idProduct}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put("/update/:idProduct",updateProductValidator, updateProduct);

/**
 * @swagger
 * /delete/{idProduct}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete("/delete/:idProduct",deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /filtros:
 *   get:
 *     summary: Get products with filters
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of filtered products
 */
router.get("/filtros", getProductsFiltered);

export default router