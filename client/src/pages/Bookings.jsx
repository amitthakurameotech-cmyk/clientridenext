import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createbooking, getRideById } from "../services/Auth"; // API functions
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

function Bookings() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [formData, setFormData] = useState({
    seatsBooked: 1,
    pickupLocation: "",
    dropLocation: "",
    passengerPhone: "",
    specialRequests: "",
  });

  // ✅ Fetch ride details by ID
  useEffect(() => {
    if (rideId) {
      getRideById(rideId)
        .then((res) => setRide(res))
        .catch((err) => console.error("Error fetching ride:", err));
    }
  }, [rideId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userid");
      if (!userId) throw new Error("User not logged in");
      if (!ride) throw new Error("Ride details not loaded");

      // ✅ Include all required schema fields
      const bookingPayload = {
        ride: rideId,
        userid: userId,
        fromCity: ride.fromCity,
        toCity: ride.toCity,
        departureDate: ride.departureDate,
        departureTime: ride.departureTime,
        pricePerSeat: ride.pricePerSeat,
        seatsBooked: Number(formData.seatsBooked),
        totalAmount: Number(formData.seatsBooked) * ride.pricePerSeat,
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        passengerPhone: formData.passengerPhone,
        specialRequests: formData.specialRequests,
        status: "Booked",
      };

      await createbooking(bookingPayload);
      alert("Booking successful!");
      navigate("/mybooking");
    } catch (err) {
      console.error("Error creating booking:", err);
      alert(err.message || "Failed to create booking");
    }
  };

  if (!ride) return <p className="text-center mt-10">Loading ride details...</p>;
const totalAmount = Number(formData.seatsBooked) * ride.pricePerSeat;
  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6">📍 Book Your Ride</h1>

      {/* Trip Details Card */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">
            <FaMapMarkerAlt className="inline mr-2 text-green-600" />
            {ride.fromCity} → {ride.toCity}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(ride.departureDate).toLocaleDateString()} at {ride.departureTime}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">{ride.driver?.name}</p>
          <p className="text-sm text-gray-500">{ride.driver?.carModel}</p>
        </div>
      </div>

      
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seats Selection */}
        <div>
          <label className="font-semibold">Number of Seats</label>
          <select
            name="seatsBooked"
            value={formData.seatsBooked}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            {[...Array(ride.availableSeats || 5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} seat - ₹{ride.pricePerSeat * (i + 1)}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup & Drop */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-semibold">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Drop-off Location</label>
            <input
              type="text"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="font-semibold">Your Phone Number</label>
          <div className="flex items-center border rounded mt-1">
            <FaPhone className="ml-2 text-gray-500" />
            <input
              type="text"
              name="passengerPhone"
              value={formData.passengerPhone}
              onChange={handleChange}
              className="flex-1 p-2 rounded"
              placeholder="+91 9876543210"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            The driver will use this to coordinate pickup details
          </p>
        </div>

        {/* Special Requests */}
        <div>
          <label className="font-semibold">Special Requests (Optional)</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            rows={3}
          />
        </div>

         {/* ✅ Price Breakdown */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Price Breakdown</h3>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Price per seat</span>
            <span>₹{ride.pricePerSeat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Number of seats</span>
            <span>{formData.seatsBooked}</span>
          </div>
          <div className="flex justify-between font-semibold text-green-700 mt-2">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
          {/* ✅ Approval Required Notice */}
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded-lg text-sm flex items-start gap-2">
          ⚠️ <span>The driver will review your request and respond within 24 hours.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Bookings;
