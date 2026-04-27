import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB - Connected ~ ${connection.connection.host}`);
  } catch(error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}