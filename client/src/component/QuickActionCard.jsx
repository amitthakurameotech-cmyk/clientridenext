const QuickActionCard = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white shadow-sm rounded-xl p-4 hover:bg-gray-50 transition flex items-center justify-between"
      aria-label={label}
    >
      <span className="text-gray-800 font-medium">{label}</span>
      <span className="text-sm text-gray-400">›</span>
    </button>
  );
};

export default QuickActionCard;
