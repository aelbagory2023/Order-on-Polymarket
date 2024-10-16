import express from 'express';
import orderRoutes from '../routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
