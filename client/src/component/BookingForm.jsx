// src/component/BookingForm.jsx
import { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickup: "",
    drop: "",
    date: "",
    seats: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    // 👉 Here you can integrate with backend API later
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ride</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Pickup Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Pickup Location
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <input
              type="text"
              name="pickup"
              value={formData.pickup}
              onChange={handleChange}
              placeholder="Enter pickup location"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Drop Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Drop Location
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaMapMarkerAlt className="text-green-500 mr-2" />
            <input
              type="text"
              name="drop"
              value={formData.drop}
              onChange={handleChange}
              placeholder="Enter drop location"
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Date of Journey
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaCalendarAlt className="text-purple-500 mr-2" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Number of Seats
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUsers className="text-orange-500 mr-2" />
            <input
              type="number"
              name="seats"
              min="1"
              max="6"
              value={formData.seats}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Search Ride
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
