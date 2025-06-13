import React, { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useCardUtils } from './utils/cardUtils';
import { CardDeck } from './components/Card/CardDeck';
import { DropZone } from './components/DropZone';
import { Modal } from './components/Modal';
import { ActionButton } from './components/Button/ActionButton';

const App = () => {
  // Custom hook for card-related utilities
  const { getCardCodes, getCardImageUrl } = useCardUtils();

  // Memoized list of all possible card codes (AS, KH, QC, etc.)
  const allCards = useMemo(() => getCardCodes(), [getCardCodes]);

  // State management
  const [hand, setHand] = useState([]); // Current selected cards
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal content
  const [isDraggingOver, setIsDraggingOver] = useState(false); // Drag state
  const [isSubmitting, setIsSubmitting] = useState(false); // API call state
  const [flashMessage, setFlashMessage] = useState(null);


  // Handles card drop event
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

  // Handles drag over event (visual feedback)
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  // Handles drag leave event (visual feedback)
  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  // Initiates drag event for cards
  const handleDragStart = useCallback((e, code) => {
    e.dataTransfer.setData('cardCode', code);
  }, []);

  // Submits hand to backend for evaluation
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
      // Replace '0' with '10' for API compatibility
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

  // Removes specific card from hand
  const removeCard = useCallback((code) => {
    setHand((prev) => prev.filter((card) => card !== code));
  }, []);

  // Clears entire hand
  const clearHand = useCallback(() => {
    setHand([]);
  }, []);

  // Closes modal dialog
  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalMessage('');
  }, []);

  const handleCardClick = useCallback((code) => {
    if (hand.length >= 5) {
      setModalMessage('Maximum 5 cards allowed in hand');
      setShowModal(true);
      return;
    }

    if (!hand.includes(code)) {
      setHand((prev) => [...prev, code]);
      setFlashMessage(`Added ${code.replace('0', '10')}`);
      setTimeout(() => setFlashMessage(null), 1500); // Auto-dismiss after 1.5s
    }
  }, [hand]);

  // Main component render
  return (
    <div className="p-4 max-w-screen-2xl mx-auto font-sans min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        🃏 Poker Hand Evaluator 🃏
      </h1>

      {/* Available cards section */}
      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Available Cards</h2>
        <CardDeck cards={allCards} onDragStart={handleDragStart}   onCardClick={handleCardClick}/>
      </section>

      {/* Card drop zone section */}
      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Drop Your Cards Here (5 Max)</h2>
        <DropZone
          hand={hand}
          isDraggingOver={isDraggingOver}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          removeCard={removeCard}
          flashMessage={flashMessage}
        />
      </section>

      {/* Action buttons */}
      <ActionButton
        hand={hand}
        isSubmitting={isSubmitting}
        onSubmit={submitHand}
        onClear={clearHand}
      />

      {/* Evaluation result modal */}
      <Modal
        show={showModal}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;