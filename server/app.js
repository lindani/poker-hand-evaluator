import express from 'express';
import cors from 'cors';
import evaluateRoutes from './routes/evaluateRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount API routes with correct base path
app.use('/api', evaluateRoutes);

export default app;
