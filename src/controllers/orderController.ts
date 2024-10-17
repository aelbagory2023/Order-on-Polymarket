import fetch from 'node-fetch';
import { clobClient } from 'path/to/clobClient'; // Import clobClient

/**
 * Place an order on Polymarket API.
 * @param {Object} req - The request object containing order details.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
export const placeOrder = async (req, res) => {
    try {
        // Create API key
        const creds = await clobClient.createApiKey(); // Create the API key
        const apiKey = creds.apiKey; // Assuming the API key is returned in creds

        // Private key authentication logic
        const domain = {
            name: "ClobAuthDomain",
            version: "1",
            chainId: 137, // Polygon ChainID 137
        };

        const types = {
            ClobAuth: [
                { name: "address", type: "address" },
                { name: "timestamp", type: "string" },
                { name: "nonce", type: "uint256" },
                { name: "message", type: "string" },
            ],
        };

        const value = {
            address: signingAddress, // the Signing address
            timestamp: ts, // The CLOB API server timestamp
            nonce: nonce, // The nonce used
            message: "This message attests that I control the given wallet", // A static message indicating that the user controls the wallet
        };

        const sig = await signer._signTypedData(domain, types, value);

        // Proceed with order placement
        const orderDetails = req.body;
        const response = await fetch('https://clob.polymarket.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sig}`, // Include the signature in the headers
                'x-api-key': apiKey, // Include the API key in the headers
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
