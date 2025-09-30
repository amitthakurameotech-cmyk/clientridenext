import React, { useEffect, useState } from "react";
import { getbookingdata } from "../services/Api";
import {
  FaRoute,
  FaUser,
  FaPhone,
  FaMoneyBill,
  FaCalendarAlt,
  FaCarSide,
} from "react-icons/fa";

function Mybooking() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("passenger"); // default tab
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (userId) {
      getbookingdata(userId)
        .then((res) => {
          setBookings(res || []);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    }
  }, [userId]);

  if (!userId) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        ⚠️ Please log in to view your bookings.
      </p>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500 font-medium">
        No bookings found.
      </p>
    );
  }

  // Split bookings based on role
  const passengerBookings = bookings.filter((b) => b.role === "passenger"); // user booked a ride
  const driverBookings = bookings.filter((b) => b.role === "driver"); // user posted a ride

  const filteredBookings =
    activeTab === "passenger" ? passengerBookings : driverBookings;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🚗 My Bookings & Rides
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-2 rounded-l-lg font-semibold ${
            activeTab === "passenger"
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("passenger")}
        >
          As Passenger
        </button>
        <button
          className={`px-6 py-2 rounded-r-lg font-semibold ${
            activeTab === "driver"
              ? "bg-purple-500 text-white shadow"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("driver")}
        >
          As Driver
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Rides Taken"
          value={passengerBookings.length}
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          label="Rides Hosted"
          value={driverBookings.length}
          color="from-purple-400 to-purple-600"
        />
        <StatCard
          label="Total Spent"
          value={`₹${passengerBookings
            .reduce((sum, b) => sum + (b.totalAmount || 0), 0)
            .toFixed(2)}`}
          color="from-green-400 to-green-600"
        />
        <StatCard
          label="Total Earned"
          value={`₹${driverBookings
            .reduce((sum, b) => sum + (b.totalAmount || 0), 0)
            .toFixed(2)}`}
          color="from-pink-400 to-pink-600"
        />
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No rides found in this tab.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <FaRoute className="text-blue-500" />
                  {b.fromCity} → {b.toCity}
                </h2>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    b.status === "Pending Approval"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Ride Info */}
              <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-purple-500" />
                {new Date(b.departureDate).toLocaleDateString()} •{" "}
                {b.seatsBooked} seats
              </p>

              {/* Details */}
              <div className="space-y-2 text-sm text-gray-700">
                {activeTab === "passenger" ? (
                  <>
                    <p className="flex items-center gap-2">
                      <FaUser className="text-blue-400" />
                      <strong>Driver:</strong> {b.driver?.name || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-green-400" />
                      <strong>Driver Contact:</strong> {b.driver?.phone || "N/A"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center gap-2">
                      <FaUser className="text-blue-400" />
                      <strong>Passenger:</strong> {b.passenger?.name || "N/A"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-green-400" />
                      <strong>Passenger Contact:</strong>{" "}
                      {b.passenger?.phone || "N/A"}
                    </p>
                  </>
                )}

                <p className="flex items-center gap-2">
                  <FaMoneyBill className="text-yellow-500" />
                  <strong>Total:</strong> ₹{b.totalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      b.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.paymentStatus || "Pending"}
                  </span>
                </p>
              </div>

              {/* Special Requests */}
              {b.specialRequests && (
                <p className="mt-3 text-sm text-blue-600 italic bg-blue-50 p-2 rounded">
                  💬 {b.specialRequests}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, color }) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl shadow-lg text-center`}
    >
      <p className="text-2xl font-extrabold">{value}</p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

export default Mybooking;
