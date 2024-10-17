import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoute from "./routes/orderRoute.js";
import { setupSwagger } from './swagger.js'; // Import the Swagger setup

const app = express();

dotenv.config();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Setup Swagger
setupSwagger(app); // Set up Swagger documentation

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Mount all routes under /api
app.use("/api", orderRoute);

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}. Access API documentation at http://localhost:${PORT}/api-docs`);
});
<<<<<<< HEAD

=======
>>>>>>> origin/main
