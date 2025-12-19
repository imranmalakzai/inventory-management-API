import express from "express";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
} from "../controllers/product.controllers.js";
import {
  createNewProductShema,
  updateProductSchema,
} from "../validations/product.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - selling_price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse
 *               selling_price:
 *                 type: number
 *                 example: 75
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 */
productRouter
  .route("/products")
  .post(protect, validate(createNewProductShema), createProductController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
productRouter.route("/products").get(protect, getAllProductsController);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
productRouter.route("/products/:id").get(protect, getProductByIdController);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               selling_price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Admin access required
 */
productRouter
  .route("/products/:id")
  .patch(
    protect,
    adminOnly,
    validate(updateProductSchema),
    updateProductController
  );

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Admin access required
 */
productRouter
  .route("/products/:id")
  .delete(protect, adminOnly, deleteProductController);

export default productRouter;
