import { getBestHand } from '../utils/handEvaluatorUtil.js';

export const evaluateHand = (req, res) => {
  const { cards } = req.body;
  try {
    const hand = getBestHand(cards);
    res.json({ hand });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while evaluating the hand.' });
  }
};