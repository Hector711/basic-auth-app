import { connect } from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
  try {
    await connect(`${MONGO_URI}`);
    console.log('DB conexion successfull !');
  } catch (error) {
    console.log(error);
  }
};
