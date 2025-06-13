export const ActionButton = ({
  hand,
  isSubmitting,
  onSubmit,
  onClear
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <button
        onClick={onSubmit}
        disabled={hand.length !== 5 || isSubmitting}
        className={`px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg ${
          hand.length !== 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        } ${isSubmitting ? 'animate-pulse' : ''}`}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Evaluating...' : 'Submit Hand'}
      </button>
      <button
        onClick={onClear}
        disabled={hand.length === 0}
        className={`px-8 py-3 bg-gray-300 text-gray-800 font-bold rounded-full shadow-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-lg ${
          hand.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
        }`}
      >
        Clear Hand
      </button>
    </div>
  );
};