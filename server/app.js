import express from 'express'
import cors from 'cors';
import evaluateRoute from './routes/evaluateRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/evaluate', evaluateRoute);

export default app;
