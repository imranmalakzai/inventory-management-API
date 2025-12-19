import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getAllSalesItemsController,
  getSaleItemByIdController,
  createSaleItemController,
  updateSaleItemController,
  deleteSaleItemController,
} from "../controllers/saleItems.controllers.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createSaleItemSchema,
  updateSaleItemSchema,
} from "../validations/saleItem.schema.js";

const saleItemRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sale Items
 *   description: Individual items within a sale
 */

/**
 * @swagger
 * /sale-items:
 *   post:
 *     summary: Create a sale item
 *     tags: [Sale Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sale_id
 *               - product_id
 *               - quantity
 *               - selling_price
 *               - cost_price
 *             properties:
 *               sale_id:
 *                 type: integer
 *                 example: 5
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               selling_price:
 *                 type: number
 *                 example: 75
 *               cost_price:
 *                 type: number
 *                 example: 60
 *     responses:
 *       201:
 *         description: Sale item created successfully
 */
saleItemRouter
  .route("/sale-items")
  .post(protect, validate(createSaleItemSchema), createSaleItemController);

/**
 * @swagger
 * /sale-items:
 *   get:
 *     summary: Get all sale items
 *     tags: [Sale Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sale items
 */
saleItemRouter.route("/sale-items").get(protect, getAllSalesItemsController);

/**
 * @swagger
 * /sale-items/{id}:
 *   get:
 *     summary: Get sale item by ID
 *     tags: [Sale Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Sale item found
 *       404:
 *         description: Sale item not found
 */
saleItemRouter.route("/sale-items/:id").get(protect, getSaleItemByIdController);

/**
 * @swagger
 * /sale-items/{id}:
 *   patch:
 *     summary: Update sale item
 *     tags: [Sale Items]
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
 *               quantity:
 *                 type: integer
 *               selling_price:
 *                 type: number
 *               cost_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Sale item updated successfully
 */
saleItemRouter
  .route("/sale-items/:id")
  .patch(protect, validate(updateSaleItemSchema), updateSaleItemController);

/**
 * @swagger
 * /sale-items/{id}:
 *   delete:
 *     summary: Delete sale item
 *     tags: [Sale Items]
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
 *         description: Sale item deleted successfully
 */
saleItemRouter
  .route("/sale-items/:id")
  .delete(protect, deleteSaleItemController);

export default saleItemRouter;
