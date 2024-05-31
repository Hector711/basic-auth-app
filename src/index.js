import app from './app.js';
import { connectDB } from './db.js';
import 'dotenv/config';

const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.listen(port);
console.log(`Server on port ${port}`);
