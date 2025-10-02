import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";
import { getallRidedata } from "../services/Api"; 
import { useNavigate } from "react-router-dom";

function SearchRides() {
  const [filters, setFilters] = useState({
    fromCity: "",
    toCity: "",
    availableSeats: "",
    minPrice: "",
    maxPrice: "",
    date: "",
  });

  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);

  const handleNavigate = (rideId) => {
    if (!rideId) return;
    navigate(`/booking/${rideId}`);
  };

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const data = await getallRidedata();
        setRides(data);
        setFilteredRides(data);
      } catch (err) {
        console.error("Error fetching rides:", err);
      }
    };
    fetchRides();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const results = rides.filter((ride) => {
      const matchesFrom =
        !filters.fromCity ||
        ride.fromCity?.toLowerCase().includes(filters.fromCity.toLowerCase());
      const matchesTo =
        !filters.toCity ||
        ride.toCity?.toLowerCase().includes(filters.toCity.toLowerCase());
      const matchesSeats =
        !filters.availableSeats ||
        ride.availableSeats >= parseInt(filters.availableSeats);
      const matchesMinPrice =
        !filters.minPrice || ride.pricePerSeat >= parseInt(filters.minPrice);
      const matchesMaxPrice =
        !filters.maxPrice || ride.pricePerSeat <= parseInt(filters.maxPrice);
      const matchesDate =
        !filters.date ||
        new Date(ride.departureDate).toISOString().split("T")[0] ===
          filters.date;

      return (
        matchesFrom &&
        matchesTo &&
        matchesSeats &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesDate
      );
    });
    setFilteredRides(results);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Find Your Perfect Ride
        </h1>
        <p className="text-gray-500">Search and book rides with ease</p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-lg rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          🔍 Search Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* From City */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="fromCity"
              value={filters.fromCity}
              onChange={handleChange}
              placeholder="From"
              className="w-full p-2 outline-none"
            />
          </div>

          {/* To City */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="toCity"
              value={filters.toCity}
              onChange={handleChange}
              placeholder="To"
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Min Price */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaDollarSign className="text-gray-400 mr-2" />
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price"
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Max Price */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaDollarSign className="text-gray-400 mr-2" />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
              className="w-full p-2 outline-none"
            />
          </div>

          {/* Available Seats */}
          <div className="flex items-center border rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition">
            <FaUsers className="text-gray-400 mr-2" />
            <input
              type="number"
              name="availableSeats"
              value={filters.availableSeats}
              onChange={handleChange}
              placeholder="Min Seats"
              className="w-full p-2 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Search Rides
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Available Rides ({filteredRides.length})
        </h2>

        {filteredRides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRides.map((ride) => (
              <div
                key={ride._id}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <h3 className="text-md font-bold text-gray-800 mb-1">
                  {ride.fromCity} → {ride.toCity}
                </h3>
                <p className="text-sm text-gray-600">Pickup: {ride.pickupLocation}</p>
                <p className="text-sm text-gray-600">Drop: {ride.dropLocation}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(ride.departureDate).toLocaleDateString()} at {ride.departureTime}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Car:</span> {ride.carModel || "Not specified"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {ride.availableSeats} seats left | ₹{ride.pricePerSeat} per seat
                </p>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => handleNavigate(ride._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No rides found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchRides;
