import { Card } from './Card';

export const CardDeck = ({ cards, onDragStart }) => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-13 gap-2 overflow-x-auto pb-4">
      {cards.map((code) => (
        <Card
          key={code}
          code={code}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};