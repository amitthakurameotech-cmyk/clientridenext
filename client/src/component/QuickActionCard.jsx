const QuickActionCard = ({ label }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 cursor-pointer text-center">
      <p className="text-blue-600 font-semibold">{label}</p>
    </div>
  );
};

export default QuickActionCard;
