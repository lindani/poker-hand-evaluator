import { useCallback } from 'react';

export const useCardUtils = () => {
  const getCardCodes = useCallback(() => {
    const suits = ['S', 'H', 'D', 'C'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
    return suits.flatMap((suit) => values.map((value) => `${value}${suit}`));
  }, []);

  const getCardImageUrl = useCallback((code) =>
    `https://deckofcardsapi.com/static/img/${code}.png`,
    []
  );

  return { getCardCodes, getCardImageUrl };
};