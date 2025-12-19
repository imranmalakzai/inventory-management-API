import express from "express";
import {
  login,
  logout,
  changePassword,
  me,
} from "../controllers/auth.controllers.js";
import { updateUserController } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  changePasswordSchema,
  updateProfileSchema,
} from "../validations/auth.schema.js";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & user profile
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful (JWT returned)
 *       401:
 *         description: Invalid credentials
 */
authRouter.route("/login").post(validate(loginSchema), login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.route("/logout").get(logout);

/**
 * @swagger
 * /auth/password:
 *   patch:
 *     summary: Change user password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Incorrect current password
 */
authRouter
  .route("/password")
  .patch(protect, validate(changePasswordSchema), changePassword);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
authRouter.route("/me").get(protect, me);

/**
 * @swagger
 * /auth/me:
 *   patch:
 *     summary: Update logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
authRouter
  .route("/me")
  .patch(protect, validate(updateProfileSchema), updateUserController);

export default authRouter;
