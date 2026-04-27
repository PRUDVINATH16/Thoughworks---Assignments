import express from 'express';
import rootRoutes from './src/routes/root.route.js';
import { connectDB } from './src/utils/db.js';

const app = express();

app.use('/api/root', rootRoutes)

app.listen(3000, () => {
  connectDB();
  console.log(`⚡Server is running on PORT: http://localhost:3000`)
})