import React, { useState } from "react";
import { FaMapMarkerAlt, FaUsers, FaCar, FaMusic, FaBolt } from "react-icons/fa";
//import { FaPaw } from "react-icons/fa6";
import { BsCalendarDate, BsCurrencyDollar } from "react-icons/bs";
import { postRide } from "../services/Auth"; // import your API function

function PostRide() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    car: "",
    smoking: false,
    music: true,
    pets: false,
    instantBooking: true,
    additional: "",
  });

  const [loading, setLoading] = useState(false); // for submit button
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setForm({ ...form, [key]: !form[key] });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const driver = localStorage.getItem("userid"); // get logged-in user's ID
    if (!driver) throw { message: "User not logged in" };

    // Backend expects `driver` field (not driverId)
    const rideData = { ...form, driver };

    const response = await postRide(rideData); // call API
    console.log("Ride Posted:", response);
    alert("✅ Ride posted successfully!");

    // Reset form
    setForm({
      fromCity: "",
      toCity: "",
      pickupLocation: "",
      dropLocation: "",
      departureDate: "",
      departureTime: "",
      availableSeats: "",
      pricePerSeat: "",
      carModel: "",
      smokingAllowed: false,
      musicAllowed: true,
      petsAllowed: false,
      instantBooking: true,
      notes: "",
    });
  } catch (err) {
    console.error(err);
    setError(err.message || "Failed to post ride");
    alert(`⚠️ ${err.message || "Failed to post ride"}`);
  } finally {
    setLoading(false);
  }
};

  const travelPrefs = [
    { key: "smoking", label: "Smoking Allowed", desc: "Allow smoking in the vehicle" },
    { key: "music", label: "Music Allowed", desc: "Play music during the ride" },
    { key: "pets", label: "Pets Allowed", desc: "Allow pets in the vehicle" },
    { key: "instantBooking", label: "Instant Booking", desc: "Allow immediate bookings" },
  ];

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
          🚗 Post New Ride
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Route Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" /> Route Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fromCity"
                placeholder="From City *"
                value={form.fromCity}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="toCity"
                placeholder="To City *"
                value={form.toCity}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="text"
                name="pickupLocation"
                placeholder="Specific Pickup Location"
                value={form.pickupLocation}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full col-span-1 md:col-span-2"
              />
              <input
                type="text"
                name="dropLocation"
                placeholder="Specific Drop Location"
                value={form.dropLocation}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full col-span-1 md:col-span-2"
              />
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BsCalendarDate className="text-green-500" /> Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="departureDate"
                value={form.departureDate}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="time"
                name="departureTime"
                value={form.departureTime}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
            </div>
          </div>

          {/* Seats & Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BsCurrencyDollar className="text-purple-500" /> Seats & Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="availableSeats"
                placeholder="Available Seats *"
                value={form.availableSeats}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
              <input
                type="number"
                name="pricePerSeat"
                placeholder="Price per Seat ($) *"
                value={form.pricePerSeat}
                onChange={handleChange}
                required
                className="border p-3 rounded-lg w-full"
              />
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FaCar className="text-blue-500" /> Vehicle Information
            </h3>
            <input
              type="text"
              name="carModel"
              placeholder="Car Model & Year"
              value={form.carModel}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Travel Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              ⚙️ Travel Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelPrefs.map((p) => (
                <div
                  key={p.key}
                  className="flex items-center justify-between border rounded-xl p-4 shadow-sm bg-white"
                >
                  <div className="flex items-center gap-3">
                    {p.icon}
                    <div>
                      <p className="font-medium text-gray-800">{p.label}</p>
                      <p className="text-sm text-gray-500">{p.desc}</p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggle(p.key)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      form[p.key] ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        form[p.key] ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📝 Additional Information</h3>
            <textarea
              name="notes"
              placeholder="Write any additional notes here..."
              value={form.notes}
              onChange={handleChange}
              rows="3"
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Posting..." : "🚀 Post Ride"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default PostRide;

