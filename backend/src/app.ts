import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import movieRoutes from './routes/movie.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/health', (req, res) => {
  res.send('Healthy');
});

app.use('/api/movies', movieRoutes);

export default app;
