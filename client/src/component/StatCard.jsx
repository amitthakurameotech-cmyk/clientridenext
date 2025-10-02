import React from "react";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between border hover:shadow-lg transition">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div
        className={`p-3 rounded-lg text-white`}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
