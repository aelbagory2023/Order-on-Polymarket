import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Place an order on Polymarket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderDetails:
 *                 type: object
 *                 description: The details of the order to be placed.
 *     responses:
 *       200:
 *         description: Successful response with order confirmation.
 *       500:
 *         description: Internal server error if placing order fails.
 */
router.post('/order', orderController.placeOrder);

export default router;
