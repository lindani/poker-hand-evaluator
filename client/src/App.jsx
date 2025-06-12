import { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState('');
  const [result, setResult] = useState(null);

  const evaluateHand = async () => {
    const response = await fetch('http://localhost:5000/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cards: cards.split(',').map(c => c.trim()) }),
    });

    const data = await response.json();
    setResult(data.hand || data.error);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Poker Hand Evaluator</h1>
      <input
        type="text"
        placeholder="Enter 5 cards (e.g. AS,10C,10H,3D,3S)"
        value={cards}
        onChange={(e) => setCards(e.target.value)}
      />
      <button onClick={evaluateHand}>Evaluate</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default App;
