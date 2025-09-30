// src/component/DashboardCard.jsx
import { FaCarSide } from "react-icons/fa";

const DashboardCard = ({ name }) => {
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <section
      aria-label="Welcome"
      className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between items-start gap-6"
    >
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          {greeting}, {name} 👋
        </h2>
        <p className="mt-2 text-gray-600">Welcome back — find or post rides easily.</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg border border-blue-100 hover:bg-blue-100 transition">
            I'm a Passenger
          </button>
          <button className="px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg border border-green-100 hover:bg-green-100 transition">
            I'm a Driver
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-24 h-24 bg-blue-50 rounded-lg">
        <FaCarSide className="text-blue-500 text-3xl" />
      </div>
    </section>
  );
};

export default DashboardCard;
