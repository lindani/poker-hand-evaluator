import { getBestHand } from '../helpers/handEvaluator.js';

export const evaluateHand = (req, res) => {
  const { cards } = req.body;

  if (!Array.isArray(cards) || cards.length !== 5) {
    return res.status(400).json({ error: 'Please provide exactly 5 cards.' });
  }

  try {
    const hand = getBestHand(cards);
    res.json({ hand });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while evaluating the hand.' });
  }
};