import express from "express";
import {
  addItemsToStockController,
  getAllStockItms,
  getSingleStockItem,
  updateStockItemById,
  deleteRecordById,
} from "../controllers/stock.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  addItemToStocSchema,
  updateItemToStocSchema,
} from "../validations/stock.schema.js";

const stockRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Stock management (Add, Update, View stock)
 */

/**
 * @swagger
 * /stock:
 *   post:
 *     summary: Add items to stock (Stock In)
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *               - cost_price
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 50
 *               cost_price:
 *                 type: number
 *                 example: 60
 *     responses:
 *       201:
 *         description: Stock added successfully
 */
stockRouter
  .route("/stock")
  .post(protect, validate(addItemToStocSchema), addItemsToStockController);

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: Get all stock records
 *     tags: [Stock]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stock items
 */
stockRouter.route("/stock").get(protect, getAllStockItms);

/**
 * @swagger
 * /stock/{id}:
 *   get:
 *     summary: Get single stock record by ID
 *     tags: [Stock]
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
 *         description: Stock record found
 *       404:
 *         description: Stock not found
 */
stockRouter.route("/stock/:id").get(protect, getSingleStockItem);

/**
 * @swagger
 * /stock/{id}:
 *   patch:
 *     summary: Update stock record
 *     tags: [Stock]
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
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               cost_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock updated successfully
 */
stockRouter
  .route("/stock/:id")
  .patch(protect, validate(updateItemToStocSchema), updateStockItemById);

/**
 * @swagger
 * /stock/{id}:
 *   delete:
 *     summary: Delete stock record
 *     tags: [Stock]
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
 *         description: Stock deleted successfully
 */
stockRouter.route("/stock/:id").delete(protect, deleteRecordById);

export default stockRouter;
