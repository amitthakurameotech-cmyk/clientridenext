import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaCalendarAlt,
} from "react-icons/fa";
import { getallRidedata } from "../services/Api"; // API function
import { Link, useNavigate } from "react-router-dom";
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
  if (!rideId) {
    console.error("Ride ID is missing!");
    return;
  }
  navigate(`/booking/${rideId}`);
};
  // Fetch all rides on mount
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

  // Handle filter change
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
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
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          🔍 Search Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* From City */}
          <div className="flex items-center border rounded-lg px-3">
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
          <div className="flex items-center border rounded-lg px-3">
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
          <div className="flex items-center border rounded-lg px-3">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="w-full p-2 outline-none"
              min={new Date().toISOString().split("T")[0]} // ✅ disables past dates
            />
          </div>

          {/* Min Price */}
          <div className="flex items-center border rounded-lg px-3">
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
          <div className="flex items-center border rounded-lg px-3">
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
          <div className="flex items-center border rounded-lg px-3">
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride) => (
              <div
                key={ride._id}
                className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {ride.fromCity} → {ride.toCity}
                </h3>
                <p className="text-gray-500">From: {ride.pickupLocation}</p>
                <p className="text-gray-500">To: {ride.dropLocation}</p>
                <p className="text-gray-500 mt-2">
                  {new Date(ride.departureDate).toLocaleDateString()} at{" "}
                  {ride.departureTime}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Car:</span>{" "}
                  {ride.carModel || "Not specified"}
                </p>
                <p className="text-gray-600">
                  {ride.availableSeats} seats left | ₹{ride.pricePerSeat} per
                  seat
                </p>
                <div className="mt-4 text-right">
                  {/* <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleNavigate(ride._id);
                    }}
                  > */}
                    {/* <input type="hidden" name="ride" value={ride._id} /> */}
                    {/* <Link to={`/booking/${ride._id}`}> */}
                      <button
                        type="submit"
                        onClick={()=>handleNavigate(ride._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Book Now
                      </button>
                    {/* </Link> */}
                  {/* </form> */}
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
