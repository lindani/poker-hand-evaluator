import { getBestHand } from '../helpers/handEvaluator.js';

test('returns Two Pair for a hand with two 10s and two 3s', () => {
  const hand = ['AS', '10C', '10H', '3D', '3S'];
  expect(getBestHand(hand)).toBe('Two Pair');
});
