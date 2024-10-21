import fetch from 'node-fetch';
import { Request, Response } from 'express';

/**
 * Place an order on Polymarket API.
 * @param {Object} req - The request object containing order details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const placeOrder = async (req: Request, res: Response) => {
    try {
        const orderDetails = req.body;
        const response = await fetch('https://clob.polymarket.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Error placing order' });
    }
};
