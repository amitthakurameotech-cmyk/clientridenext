// src/component/DashboardCard.jsx
import { FaCarSide } from "react-icons/fa";

const DashboardCard = ({ name }) => {
  // Get current hour to set greeting
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg shadow-lg p-6 flex justify-between items-center">
      {/* Left side */}
      <div>
        <h2 className="text-2xl font-bold">
          {greeting}, {name}! 👋
        </h2>
        <p className="mt-2 text-lg">Ready for your next journey?</p>
        <button className="mt-4 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          🚗 Passenger
        </button>
      </div>

      {/* Right side (icon bubble) */}
      <div className="bg-green-400/40 rounded-xl p-4">
        <FaCarSide className="text-white text-3xl" />
      </div>
    </div>
  );
};

export default DashboardCard;
