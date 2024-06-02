// MÓDULOS
import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// IMPORTACIONES DE OTROS ARCHIVOS
import connectDB from './connectDB.js';
import authRoutes from './routes/auth/auth.routes.js';
import tasksRoutes from './routes/tasks/tasks.routes.js';

const port = process.env.PORT || 3002;
const app = express();
const client = process.env.VITE_CLIENT_URL;

app.use(cors({ origin: client, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
// RUTAS
app.use('/api', authRoutes);
app.use('/api', tasksRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Server Running!');
});

app.listen(port);
console.log(`Server on port ${port}`);
