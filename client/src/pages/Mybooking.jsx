import React, { useEffect, useState } from "react";
import { getbookingdata, getallRidedata, deleteBooking, deleteRide } from "../services/Api";
import { FaRoute, FaUser, FaPhone, FaMoneyBill, FaCalendarAlt } from "react-icons/fa";

function Mybooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  // Get logged-in user ID from localStorage
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, ridesRes] = await Promise.all([getbookingdata(), getallRidedata()]);

        if (!mounted) return;

        // Filter bookings/rides for this user
        const filteredBookings = (bookingsRes?.data || bookingsRes || [])
          .filter(b => b.userid?._id === userId)
          .map(b => ({ ...b, __type: "booking" }));

        const filteredRides = (ridesRes?.data || ridesRes || [])
          .filter(r => r.userid?._id === userId)
          .map(r => ({ ...r, __type: "ride" }));

        setBookings([...filteredBookings, ...filteredRides]);
      } catch (err) {
        console.error("Error fetching bookings or rides:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [userId]);

  const handleCancel = async (item) => {
    if (!window.confirm("Are you sure you want to cancel this?")) return;

    try {
      if (item.__type === "booking") {
        await deleteBooking(item._id);
      } else {
        await deleteRide(item._id);
      }
      // Remove deleted item from state
      setBookings(prev => prev.filter(b => b._id !== item._id));
      alert("Cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel");
    }
  };

  if (!userId) {
    return <p className="text-center mt-10 text-gray-600 font-medium">Please log in to see your bookings.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-600 font-medium animate-pulse">Loading your bookings...</p>;
  }

  const allBookings = bookings.filter(b => b.__type === "booking");
  const allRides = bookings.filter(b => b.__type === "ride");
  const filteredData = activeTab === "bookings" ? allBookings : allRides;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        🚗 My Bookings & Rides
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <button
          className={`px-6 py-2 rounded-l-lg font-semibold transition-all duration-300 ${
            activeTab === "bookings"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          As Passenger
        </button>
        <button
          className={`px-6 py-2 rounded-r-lg font-semibold transition-all duration-300 ${
            activeTab === "rides"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("rides")}
        >
          As Driver
        </button>
      </div>

      {/* List */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No {activeTab === "bookings" ? "bookings" : "rides"} found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-6 border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <FaRoute className="text-blue-500" />
                  {item.fromCity || "-"} → {item.toCity || "-"}
                </h2>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    item.__type === "booking"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.__type === "booking" ? "Booking" : "Ride"}
                </span>
              </div>

              {/* Ride Info */}
              <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-purple-500" />
                {item.departureDate ? new Date(item.departureDate).toLocaleDateString() : "N/A"} •{" "}
                {item.seatsBooked || item.availableSeats || 0} seats
              </p>

              {/* User/Driver Details */}
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <strong>{item.__type === "booking" ? "Passenger:" : "Driver:"}</strong>{" "}
                  {item.userid?.fullName || item.driver?.fullName || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-green-400" />
                  <strong>Contact:</strong>{" "}
                  {item.userid?.phoneNumber || item.driver?.phoneNumber || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBill className="text-yellow-500" />
                  <strong>Total:</strong> ₹{(item.totalAmount || 0).toFixed(2)}
                </p>
              </div>

              {/* Special Requests */}
              {item.specialRequests && (
                <p className="mt-3 text-sm text-blue-600 italic bg-blue-50 p-2 rounded-lg">
                  💬 {item.specialRequests}
                </p>
              )}

              {/* Cancel Button */}
              <button
                onClick={() => handleCancel(item)}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mybooking;

