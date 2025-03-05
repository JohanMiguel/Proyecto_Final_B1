import { Router } from "express";
import { saveCategory, getCategorys, getCategoryByName, updateCategory, deleteCategory } from "./category.controller.js";
import { saveCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validatos.js";

const router = Router();

/**
 * @swagger
 * /saveCategory:
 *   post:
 *     summary: Save a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category saved successfully
 */
router.post("/saveCategory", saveCategoryValidator, saveCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get("/", getCategorys);

/**
 * @swagger
 * /buscarCategory/{name}:
 *   get:
 *     summary: Get category by name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 */
router.get("/buscarCategory/:name", getCategoryByName);

/**
 * @swagger
 * /updateCategoria/{idCategory}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/updateCategoria/:idCategory", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /deleteCategory/{idCategory}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/deleteCategory/:idCategory", deleteCategoryValidator, deleteCategory);

export default router;