import express from 'express'
import evaluateRoute from './routes/evaluate.js';

const app = express();
app.use(express.json());
app.use('/api/evaluate', evaluateRoute);

export default app;
