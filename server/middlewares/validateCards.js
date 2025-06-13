export const validateCards = (req, res, next) => {
  const { cards } = req.body;

  // Basic array validation
  if (!Array.isArray(cards)) {
    return res.status(400).json({ error: "'cards' must be an array." });
  }

  // Exact card count check
  if (cards.length !== 5) {
    return res.status(400).json({ error: 'You must provide exactly 5 cards.' });
  }

  const validRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const validSuits = ['S', 'H', 'D', 'C']; // Spades, Hearts, Diamonds, Clubs
  const cardRegex = /^(10|[2-9]|[AJQK])[SHDC]$/; // Regex for valid card patterns

  // Validate each card
  for (let card of cards) {
    // Check basic format with regex
    if (!cardRegex.test(card)) {
      return res.status(400).json({
        error: `Invalid card format: "${card}". Use format like 'AS' or '10H'.`,
      });
    }

    const rank = card.slice(0, -1); // Everything except last character
    const suit = card.slice(-1);    // Last character only

    // Verify valid rank/suit combinations
    if (!validRanks.includes(rank) || !validSuits.includes(suit)) {
      return res.status(400).json({
        error: `Invalid card value: "${card}".`,
        validRanks,
        validSuits
      });
    }
  }
  next();
};