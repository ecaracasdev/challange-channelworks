import express from 'express';
import login from '../controllers/auth/login';

const router = express.Router();

// Create a new asset
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     description: Logs in a user with the specified username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the login was successful
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the login was unsuccessful
 *                   example: Invalid credentials
 */
router.post('/login', login);

export default router;
