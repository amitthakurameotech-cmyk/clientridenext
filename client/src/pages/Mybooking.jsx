import React, { useEffect, useState } from "react";
import { getbookingdata } from "../services/Auth"; // API call

function Mybooking() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (userId) {
      getbookingdata(userId)
        .then((res) => {
          setBookings(res);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    }
  }, [userId]);

  if (!userId) {
    return <p className="text-center mt-10">⚠️ Please log in to view your bookings.</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-center mt-10">No bookings found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings & Rides</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="font-bold text-lg">{bookings.length}</p>
          <p className="text-sm text-gray-500">Rides Taken</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="font-bold text-lg">0</p>
          <p className="text-sm text-gray-500">Passengers Served</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="font-bold text-lg">
            ₹
            {bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Total Spent</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="font-bold text-lg">₹0.00</p>
          <p className="text-sm text-gray-500">Total Earned</p>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.map((b, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">
              {b.fromCity} → {b.toCity}
            </h2>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                b.status === "Pending Approval"
                  ? "bg-yellow-100 text-yellow-800"
                  : b.status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {b.status}
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Booked {new Date(b.departureDate).toLocaleDateString()} • {b.seatsBooked} seats
          </p>

          <div className="mt-2 text-sm text-gray-700">
            <p>
              <strong>Driver:</strong> {b.driver?.name || "N/A"}
            </p>
            <p>
              <strong>Contact:</strong> {b.passengerPhone}
            </p>
            <p>
              <strong>Total:</strong> ₹{b.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Payment:</strong> {b.paymentStatus || "pending"}
            </p>
          </div>

          {b.specialRequests && (
            <p className="mt-2 text-sm text-blue-600">
              <strong>Special Requests:</strong> {b.specialRequests}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Mybooking;
