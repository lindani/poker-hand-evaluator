import { Card } from './Card/Card';
import { useEffect, useState } from 'react';

export const DropZone = ({
  hand,
  isDraggingOver,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  removeCard,
  flashMessage
}) => {
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (flashMessage) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`min-h-[160px] max-h-[180px] border-4 ${
        isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      } border-dashed p-4 rounded-xl flex flex-wrap gap-2 items-center justify-center overflow-y-auto transition-all duration-300 ease-in-out touch-none relative`}
    >

      {/* Flash Message */}
      {showFlash && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-10">
          {flashMessage}
        </div>
      )}

      {hand.length === 0 && !isDraggingOver && (
        <p className="text-gray-500 text-lg p-4">Tap or drag cards here to build your hand!</p> // Updated text
      )}

      {hand.map((code) => (
        <div key={code} className="w-16 h-auto">
          <Card
            code={code}
            showRemoveButton
            onRemove={removeCard}
            compact
          />
        </div>
      ))}

      {hand.length > 0 && hand.length < 5 && (
        <p className="text-gray-400 text-sm p-2">
          {5 - hand.length} more needed
        </p>
      )}
    </div>
  );
};