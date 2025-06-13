import { getBestHand } from '../helpers/handEvaluator.js';

describe('getBestHand', () => {

  test('returns High Card for a hand with no pair', () => {
    const hand = ['AS', 'KC', '10H', '3D', '5S'];
    expect(getBestHand(hand)).toBe('High Card');
  });

  test('returns One Pair for a hand with two As', () => {
    const hand = ['AS', 'AC', '10H', '3D', '5S'];
    expect(getBestHand(hand)).toBe('One Pair');
  });

  test('returns Two Pair for a hand with two 10s and two 3s', () => {
    const hand = ['AS', '10C', '10H', '3D', '3S'];
    expect(getBestHand(hand)).toBe('Two Pair');
  });

  test('returns Three of a Kind for a hand with three 4s' , () => {
    const hand = ['4H', '4D', '4S', '8C', '9D'];
    expect(getBestHand(hand)).toBe('Three of a Kind');
  });

  test('returns Flush for a hand with same suit', () => {
    const hand = ['5H', '6H', '8H', '9H', '10H'];
    expect(getBestHand(hand)).toBe('Flush');
  });

  test('returns Full House for a hand with three 3s and two 2s', () => {
    const hand = ['3H', '3D', '3S', '2C', '2H'];
    expect(getBestHand(hand)).toBe('Full House');
  });

  test('returns Four of a Kind for a hand with four 10s and one 2s', () => {
    const hand = ['10H', '10D', '10S', '10C', '2D'];
    expect(getBestHand(hand)).toBe('Four of a Kind');
  });

  test('returns Flush for a hand with same suit', () => {
    const hand = ['5D', '6D', '7D', '8D', '9D'];
    expect(getBestHand(hand)).toBe('Straight Flush');
  });
})
