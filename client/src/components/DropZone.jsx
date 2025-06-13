import { Card } from './Card/Card';

export const DropZone = ({
  hand,
  isDraggingOver,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  removeCard
}) => {
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`min-h-[160px] max-h-[180px] border-4 ${
        isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      } border-dashed p-4 rounded-xl flex flex-wrap gap-2 items-center justify-center overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {hand.length === 0 && !isDraggingOver && (
        <p className="text-gray-500 text-lg p-4">Drag cards here to build your hand!</p>
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