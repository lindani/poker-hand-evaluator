export const getBestHand = (cards) => {

  // Rank order for straight checks (A can be low or high)
  const RANK_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const ranks = cards.map(card => card.slice(0, -1)); // Strip suit
  const suits = cards.map(card => card.slice(-1));

  const rankCount = {};
  const suitCount = {};

  // Count ranks and suits
  for (let i = 0; i < cards.length; i++) {
    rankCount[ranks[i]] = (rankCount[ranks[i]] || 0) + 1;
    suitCount[suits[i]] = (suitCount[suits[i]] || 0) + 1;
  }

  const counts = Object.values(rankCount);
  const isFlush = Object.values(suitCount).some(count => count === 5);

  // Check for Straight (including low Ace: A-2-3-4-5)
  const uniqueRanks = [...new Set(ranks)];
  const rankIndices = uniqueRanks.map(rank => RANK_ORDER.indexOf(rank)).sort((a, b) => a - b);

  let isStraight = false;
  // Check normal straight (e.g., 5-6-7-8-9)
  if (rankIndices.length === 5 && rankIndices[4] - rankIndices[0] === 4) {
    isStraight = true;
  }
  // Check low Ace straight (A-2-3-4-5)
  if (rankIndices.join(',') === [0, 1, 2, 3, 12].join(',')) {
    isStraight = true;
  }

  const numOfPairs = counts.filter(count => count === 2).length;
  const hasThree = counts.includes(3);
  const hasFour = counts.includes(4);

  // Check Straight Flush first (highest priority)
  if (isStraight && isFlush) return 'Straight Flush';
  if (hasThree && numOfPairs === 1) return 'Full House';
  if (hasFour) return 'Four of a Kind';
  if (isFlush) return 'Flush';
  if (hasThree) return 'Three of a Kind';
  if (numOfPairs === 2) return 'Two Pair';
  if (numOfPairs === 1) return 'One Pair';

  return 'High Card'
};
