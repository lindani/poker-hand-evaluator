export const getBestHand = (cards) => {

  const ranks = cards.map(card => card.slice(0, -1)); // Strip suit
  const rankCount = {};

  for (const rank of ranks) {
    rankCount[rank] = (rankCount[rank] || 0) + 1; // get count of each rank
  }

  const counts = Object.values(rankCount);
  const numOfPairs = counts.filter(count => count === 2).length;
  const hasThree = counts.includes(3);
  const hasFour = counts.includes(4);

  if (numOfPairs === 1) return 'One Pair';
  if (numOfPairs === 2) return 'Two Pair';
  if (hasThree) return 'Three of a Kind';
  if (hasThree && numOfPairs === 1) return 'Full House';
  if (hasFour) return 'Four of a Kind';

  return 'High Card'
};
