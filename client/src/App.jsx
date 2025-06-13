// src/App.jsx
import React, { useState, useMemo, useCallback } from 'react';
import axios from 'axios';

// Memoized card generation to prevent unnecessary recalculations
const useCardUtils = () => {
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

 const App = () => {
  const { getCardCodes, getCardImageUrl } = useCardUtils();
  const allCards = useMemo(() => getCardCodes(), [getCardCodes]);
  const [hand, setHand] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const code = e.dataTransfer.getData('cardCode');

    if (hand.length >= 5) {
      setModalMessage('Maximum 5 cards allowed in hand');
      setShowModal(true);
      return;
    }

    if (!hand.includes(code)) {
      setHand((prev) => [...prev, code]);
    }
  }, [hand]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const handleDragStart = useCallback((e, code) => {
    e.dataTransfer.setData('cardCode', code);
  }, []);

  const submitHand = useCallback(async () => {
    if (hand.length !== 5) {
      setModalMessage('Please select exactly 5 cards');
      setShowModal(true);
      return;
    }

    setIsSubmitting(true);
    setModalMessage('Evaluating hand...');
    setShowModal(true);

    try {
      const res = await axios.post('http://localhost:5000/api/evaluate', {
        cards: hand.map((c) => c.replace('0', '10')),
      });
      setModalMessage(`Best Hand: ${res.data.hand}`);
    } catch (err) {
      console.error('Evaluation error:', err);
      const errorMessage = err.response?.data?.message ||
                         err.message ||
                         'Failed to evaluate hand. Please try again.';
      setModalMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [hand]);

  const removeCard = useCallback((code) => {
    setHand((prev) => prev.filter((card) => card !== code));
  }, []);

  const clearHand = useCallback(() => {
    setHand([]);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalMessage('');
  }, []);

  // Memoize card components for better performance
  const cardElements = useMemo(() => (
    allCards.map((code) => (
      <img
        key={code}
        src={getCardImageUrl(code)}
        alt={`${code.replace('0', '10')} playing card`}
        draggable
        onDragStart={(e) => handleDragStart(e, code)}
        className="w-16 h-auto cursor-grab hover:scale-105 transition-transform duration-200 ease-in-out rounded-md shadow-sm hover:shadow-md hover:z-10"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/64x89/cccccc/333333?text=${code.replace('0', '10')}`;
        }}
        aria-label={`Card ${code.replace('0', '10')}`}
        tabIndex="0"
      />
    ))
  ), [allCards, getCardImageUrl, handleDragStart]);

  const handCards = useMemo(() => (
    hand.map((code) => (
      <div key={code} className="relative group">
        <img
          src={getCardImageUrl(code)}
          alt={`${code.replace('0', '10')} in hand`}
          className="w-24 h-auto rounded-lg shadow-md transition-transform duration-200 ease-in-out group-hover:scale-105 hover:shadow-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/96x134/cccccc/333333?text=${code.replace('0', '10')}`;
          }}
        />
        <button
          onClick={() => removeCard(code)}
          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label={`Remove ${code.replace('0', '10')} from hand`}
        >
          ×
        </button>
      </div>
    ))
  ), [hand, getCardImageUrl, removeCard]);

  return (
    <div className="p-4 max-w-screen-2xl mx-auto font-sans min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        🃏 Poker Hand Evaluator 🃏
      </h1>

      {/* Available Cards Section */}
      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Available Cards</h2>
        <div
          className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-13 gap-2 overflow-x-auto pb-4"
          role="grid"
          aria-label="Available playing cards"
        >
          {cardElements}
        </div>
      </section>

      {/* Drop Zone Section */}
      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Drop Your Cards Here (5 Max)</h2>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`min-h-[160px] border-4 ${
            isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
          } border-dashed p-6 rounded-xl flex gap-4 flex-wrap items-center justify-center transition-all duration-300 ease-in-out`}
          role="region"
          aria-label="Card drop zone"
        >
          {hand.length === 0 && !isDraggingOver && (
            <p className="text-gray-500 text-xl">Drag cards here to build your hand!</p>
          )}
          {handCards}
          {hand.length > 0 && hand.length < 5 && (
            <p className="text-gray-400 text-lg ml-4">
              {5 - hand.length} more card(s) needed...
            </p>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button
          onClick={submitHand}
          disabled={hand.length !== 5 || isSubmitting}
          className={`px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg ${
            hand.length !== 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          } ${isSubmitting ? 'animate-pulse' : ''}`}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Evaluating...' : 'Submit Hand'}
        </button>
        <button
          onClick={clearHand}
          disabled={hand.length === 0}
          className={`px-8 py-3 bg-gray-300 text-gray-800 font-bold rounded-full shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-lg ${
            hand.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
          }`}
        >
          Clear Hand
        </button>
      </div>

      {/* Message Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full text-center animate-fade-in">
            <h3 id="modal-title" className="sr-only">Evaluation Result</h3>
            <p className="text-xl font-semibold mb-6 text-gray-800">
              {modalMessage}
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;