import express from 'express';
import { evaluateHand } from '../controllers/evaluateController.js';

const router = express.Router();
router.post('/', evaluateHand);

export default router;