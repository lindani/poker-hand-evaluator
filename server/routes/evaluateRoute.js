import express from 'express';
import { validateCards } from '../middlewares/validateCards.js';
import { evaluateHand } from '../controllers/evaluateController.js';

const router = express.Router();

router.post('/evaluate', validateCards, evaluateHand);

export default router;
