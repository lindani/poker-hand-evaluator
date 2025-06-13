import { getBestHand } from '../utils/handEvaluatorUtil.js';

export const evaluateHand = (req, res) => {
  const { cards } = req.body;

  if (!Array.isArray(cards)) {
    return res.status(400).json({ error: "'cards' must be an array." });
  }

  if (cards.length !== 5) {
    return res.status(400).json({ error: 'You must provide exactly 5 cards.' });
  }

  const validRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const validSuits = ['S', 'H', 'D', 'C'];
  const cardRegex = /^(10|[2-9]|[AJQK])[SHDC]$/;

  for (let card of cards) {
    if (!cardRegex.test(card)) {
      return res.status(400).json({ error: `Invalid card format: "${card}". Use format like 'AS' or '10H'.` });
    }

    const rank = card.slice(0, -1);
    const suit = card.slice(-1);

    if (!validRanks.includes(rank) || !validSuits.includes(suit)) {
      return res.status(400).json({ error: `Invalid card value: "${card}".` });
    }
  }

  try {
    const hand = getBestHand(cards);
    res.json({ hand });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while evaluating the hand.' });
  }
};