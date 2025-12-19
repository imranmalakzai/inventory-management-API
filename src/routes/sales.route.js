import express from "express";
import {
  createSalesController,
  updateSalesController,
  deleteSalesRecord,
  getAllSalesRecordControllers,
  getSalesRecordByIdController,
} from "../controllers/sales.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createSelasSchema,
  updateSelasSchema,
} from "../validations/sales.schema.js";

const salesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales transactions
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 description: List of sold products
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                     - selling_price
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     selling_price:
 *                       type: number
 *                       example: 75
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Insufficient stock
 */
salesRouter
  .route("/sales")
  .post(protect, validate(createSelasSchema), createSalesController);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales records
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sales records
 */
salesRouter.route("/sales").get(protect, getAllSalesRecordControllers);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Sale record found
 *       404:
 *         description: Sale not found
 */
salesRouter.route("/sales/:id").get(protect, getSalesRecordByIdController);

/**
 * @swagger
 * /sales/{id}:
 *   patch:
 *     summary: Update sale record
 *     tags: [Sales]
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
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     selling_price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Sale updated successfully
 */
salesRouter
  .route("/sales/:id")
  .patch(protect, validate(updateSelasSchema), updateSalesController);

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete sale record
 *     tags: [Sales]
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
 *         description: Sale deleted successfully
 */
salesRouter.route("/sales/:id").delete(protect, deleteSalesRecord);

export default salesRouter;
