import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth/auth.routes.js';
import tasksRoutes from './routes/tasks/tasks.routes.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const client = process.env.VITE_CLIENT_URL
 console.log(client)
 
app.use(
  cors({
    origin: process.env.VITE_CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// RUTAS
app.use('/api', authRoutes);
app.use('/api', tasksRoutes);


export default app;
