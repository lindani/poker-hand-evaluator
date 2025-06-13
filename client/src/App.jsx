import React, { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useCardUtils } from './utils/cardUtils';
import { CardDeck } from './components/CardDeck';
import { DropZone } from './components/DropZone';
import { Modal } from './components/Modal';
import { ActionButton } from './components/ActionButton';

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

  return (
    <div className="p-4 max-w-screen-2xl mx-auto font-sans min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        🃏 Poker Hand Evaluator 🃏
      </h1>

      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Available Cards</h2>
        <CardDeck cards={allCards} onDragStart={handleDragStart} />
      </section>

      <section className="mb-8 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Drop Your Cards Here (5 Max)</h2>
        <DropZone
          hand={hand}
          isDraggingOver={isDraggingOver}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          removeCard={removeCard}
        />
      </section>

      <ActionButton
        hand={hand}
        isSubmitting={isSubmitting}
        onSubmit={submitHand}
        onClear={clearHand}
      />

      <Modal
        show={showModal}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;