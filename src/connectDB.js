import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    console.log('DB conexion successfull!');
  } catch (error) {
    console.log('DB connection failed:', error);
  }
};

export default connectDB;
