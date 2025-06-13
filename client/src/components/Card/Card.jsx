import { cardImageStyle } from '../../styles/cardStyles'

export const Card = ({ code, onDragStart, onClick, showRemoveButton, onRemove, compact }) => {
  const displayCode = code.replace('0', '10');

  return (
    <div className="relative group">
      <img
        src={`https://deckofcardsapi.com/static/img/${code}.png`}
        alt={`${displayCode} playing card`}
        draggable={!!onDragStart}
        onDragStart={onDragStart && ((e) => onDragStart(e, code))}
        onClick={onClick}
        className={cardImageStyle({ showRemoveButton, compact })}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/64x89/cccccc/333333?text=${displayCode}`;
        }}
        aria-label={`Card ${displayCode}`}
        tabIndex="0"
        style={{ cursor: 'pointer' }} // Add pointer cursor
      />
      {showRemoveButton && (
        <button
          onClick={() => onRemove(code)}
          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label={`Remove ${displayCode} from hand`}
        >
          ×
        </button>
      )}
    </div>
  );
};