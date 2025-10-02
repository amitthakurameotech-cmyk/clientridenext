import React from "react";
import { useNavigate } from "react-router-dom";

function QuickActionCard({ label, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Save recent activity to localStorage
    let recent = JSON.parse(localStorage.getItem("recentActivity")) || [];
    const newActivity = { label, to, date: new Date().toLocaleString() };

    // keep only last 5 activities
    recent = [newActivity, ...recent].slice(0, 5);
    localStorage.setItem("recentActivity", JSON.stringify(recent));

    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl p-4 shadow-md hover:shadow-lg transition text-center"
    >
      {label}
    </div>
  );
}

export default QuickActionCard;
