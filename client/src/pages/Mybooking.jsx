// import React, { useEffect, useState } from "react";
// import {
//   getPassengerBookings,
//   getDriverRides,
//   getBookingRequests,
//   approveOrCancelRequest,
//   deleteBooking,
//   deleteRide,
// } from "../services/Api";
// import {
//   FaRoute,
//   FaUser,
//   FaPhone,
//   FaMoneyBill,
//   FaCalendarAlt,
// } from "react-icons/fa";

// function Mybooking() {
//   const [data, setData] = useState({ bookings: [], rides: [], requests: [] });
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("bookings");

//   const userId = localStorage.getItem("userid");

//   useEffect(() => {
//     if (!userId) {
//       setLoading(false);
//       return;
//     }

//     let mounted = true;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [bookingsRes, ridesRes, requestsRes] = await Promise.all([
//           getPassengerBookings(userId), // bookings as passenger
//           getDriverRides(userId), // rides posted by this driver
//           getBookingRequests(userId), // requests for this driver's rides
//         ]);

//         if (!mounted) return;

//         setData({
//           bookings: bookingsRes?.bookings || [],
//           rides: ridesRes?.rides || [], // only driver rides
//           requests: requestsRes?.requests || [], // only bookings for driver's rides
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchData();
//     return () => {
//       mounted = false;
//     };
//   }, [userId]);
// console.log(data.bookings,"booking data")
//   // Cancel Ride or Booking
//   const handleCancel = async (item, type) => {
//     if (!window.confirm("Are you sure you want to cancel this?")) return;
//     try {
//       if (type === "booking") {
//         await deleteBooking(item._id);
//         setData((prev) => ({
//           ...prev,
//           bookings: prev.bookings.filter((b) => b._id !== item._id),
//         }));
//       } else if (type === "ride") {
//         await deleteRide(item._id);
//         setData((prev) => ({
//           ...prev,
//           rides: prev.rides.filter((r) => r._id !== item._id),
//         }));
//       }
//       alert("Cancelled successfully!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to cancel");
//     }
//   };

//   // Approve / Reject booking request
//   const handleRequestAction = async (bookingId, status) => {
//     console.log(bookingId, status);
//     try {
//       await approveOrCancelRequest(bookingId, status);
//       setData((prev) => ({
//         ...prev,
//         requests: prev.requests.filter((r) => r._id !== bookingId),
//       }));
//       alert(`Request ${status} successfully!`);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Failed to update request");
//     }
//   };

//   if (!userId) {
//     return (
//       <p className="text-center mt-10 text-gray-600 font-medium">
//         Please log in to see your bookings.
//       </p>
//     );
//   }

//   if (loading) {
//     return (
//       <p className="text-center mt-10 text-gray-600 font-medium animate-pulse">
//         Loading your bookings...
//       </p>
//     );
//   }

//   // Choose data based on tab
//   const tabData =
//     activeTab === "bookings"
//       ? data.bookings
//       : activeTab === "rides"
//       ? data.rides
//       : data.requests;

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-6">
//       <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
//         🚗 My Bookings & Rides
//       </h1>

//       {/* Tabs */}
//       <div className="flex justify-center mb-10 gap-2">
//         <button
//           className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//             activeTab === "bookings"
//               ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
//               : "bg-gray-100 text-gray-600"
//           }`}
//           onClick={() => setActiveTab("bookings")}
//         >
//           As Passenger
//         </button>
//         <button
//           className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//             activeTab === "rides"
//               ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//               : "bg-gray-100 text-gray-600"
//           }`}
//           onClick={() => setActiveTab("rides")}
//         >
//           As Driver
//         </button>
//         <button
//           className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//             activeTab === "requests"
//               ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
//               : "bg-gray-100 text-gray-600"
//           }`}
//           onClick={() => setActiveTab("requests")}
//         >
//           Requests
//         </button>
//       </div>

//       {/* List */}
//       {tabData.length === 0 ? (
//         <p className="text-center text-gray-500 italic">
//           No{" "}
//           {activeTab === "bookings"
//             ? "bookings"
//             : activeTab === "rides"
//             ? "rides"
//             : "requests"}{" "}
//           found.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {tabData.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-6 border"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
//                   <FaRoute className="text-blue-500" />
//                   {item.fromCity || "-"} → {item.toCity || "-"}
//                 </h2>
//               </div>

//               {/* Info */}
//               <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
//                 <FaCalendarAlt className="text-purple-500" />
//                 {item.departureDate
//                   ? new Date(item.departureDate).toLocaleDateString()
//                   : "N/A"}{" "}
//                 • {item.seatsBooked || item.availableSeats || 0} seats
//               </p>

//               <div className="space-y-2 text-sm text-gray-700">
//                 <p className="flex items-center gap-2">
//                   <FaUser className="text-blue-400" />
//                   <strong>
//                     {activeTab === "bookings"
//                       ? "Passenger:"
//                       : activeTab === "rides"
//                       ? "Driver:"
//                       : "Passenger:"}
//                   </strong>{" "}
//                   {item.userid?.fullName || "N/A"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FaPhone className="text-green-400" />
//                   <strong>Contact:</strong> {item.userid?.phoneNumber || "N/A"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <FaMoneyBill className="text-yellow-500" />
//                   <strong>Total:</strong> ₹{(item.totalAmount || 0).toFixed(2)}
//                 </p>
//               </div>

//               {/* Requests Actions */}
//               {activeTab === "requests" ? (
//                 <div className="flex gap-2 mt-4">
//                   <button
//                     onClick={() => handleRequestAction(item._id, "approved")}
//                     className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleRequestAction(item._id, "cancelled")}
//                     className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() =>
//                     handleCancel(
//                       item,
//                       activeTab === "bookings" ? "booking" : "ride"
//                     )
//                   }
//                   className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Mybooking;

import React, { useEffect, useState } from "react";
import {
  getPassengerBookings,
  getDriverRides,
  getBookingRequests,
  approveOrCancelRequest,
  deleteBooking,
  deleteRide,
} from "../services/Api";
import {
  FaRoute,
  FaUser,
  FaPhone,
  FaMoneyBill,
  FaCalendarAlt,
} from "react-icons/fa";

function Mybooking() {
  const [data, setData] = useState({ bookings: [], rides: [], requests: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

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
        const [bookingsRes, ridesRes, requestsRes] = await Promise.all([
          getPassengerBookings(userId), // bookings as passenger
          getDriverRides(userId), // rides posted by this driver
          getBookingRequests(userId), // requests for this driver's rides
        ]);

        if (!mounted) return;

        setData({
          bookings: bookingsRes?.bookings || [],
          rides: ridesRes?.rides || [],
          requests: requestsRes?.requests || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [userId]);

  // Cancel Ride or Booking
  const handleCancel = async (item, type) => {
    if (!window.confirm("Are you sure you want to cancel this?")) return;
    try {
      if (type === "booking") {
        await deleteBooking(item._id);
        setData((prev) => ({
          ...prev,
          bookings: prev.bookings.filter((b) => b._id !== item._id),
        }));
      } else if (type === "ride") {
        await deleteRide(item._id);
        setData((prev) => ({
          ...prev,
          rides: prev.rides.filter((r) => r._id !== item._id),
        }));
      }
      alert("Cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel");
    }
  };

  // Approve / Reject booking request
  const handleRequestAction = async (bookingId, status) => {
    try {
      await approveOrCancelRequest(bookingId, status);
      setData((prev) => ({
        ...prev,
        requests: prev.requests.filter((r) => r._id !== bookingId),
      }));
      alert(`Request ${status} successfully!`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update request");
    }
  };

  if (!userId) {
    return (
      <p className="text-center mt-10 text-gray-600 font-medium">
        Please log in to see your bookings.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 font-medium animate-pulse">
        Loading your bookings...
      </p>
    );
  }

  // Choose data based on tab
  const tabData =
    activeTab === "bookings"
      ? data.bookings
      : activeTab === "rides"
      ? data.rides
      : data.requests;

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-400";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-400";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        🚗 My Bookings & Rides
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 gap-2">
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === "bookings"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          As Passenger
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === "rides"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("rides")}
        >
          As Driver
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === "requests"
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Requests
        </button>
      </div>

      {/* List */}
      {tabData.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No{" "}
          {activeTab === "bookings"
            ? "bookings"
            : activeTab === "rides"
            ? "rides"
            : "requests"}{" "}
          found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tabData.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-6 border relative"
            >
              {/* Status badge (only for passenger bookings) */}
              {activeTab === "bookings" && (
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                    item.bookingStatus
                  )}`}
                >
                  {item.bookingstatus ? item.bookingstatus.toUpperCase() : "N/A"}
                </span>
              )}

              {/* Header */}
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                  <FaRoute className="text-blue-500" />
                  {item.fromCity || "-"} → {item.toCity || "-"}
                </h2>
              </div>

              {/* Info */}
              <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                <FaCalendarAlt className="text-purple-500" />
                {item.departureDate
                  ? new Date(item.departureDate).toLocaleDateString()
                  : "N/A"}{" "}
                • {item.seatsBooked || item.availableSeats || 0} seats
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  <strong>
                    {activeTab === "bookings"
                      ? "Passenger:"
                      : activeTab === "rides"
                      ? "Driver:"
                      : "Passenger:"}
                  </strong>{" "}
                  {item.userid?.fullName || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-green-400" />
                  <strong>Contact:</strong> {item.userid?.phoneNumber || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBill className="text-yellow-500" />
                  <strong>Total:</strong> ₹{(item.totalAmount || 0).toFixed(2)}
                </p>
              </div>

              {/* Requests Actions */}
              {activeTab === "requests" ? (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleRequestAction(item._id, "approved")}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequestAction(item._id, "cancelled")}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    handleCancel(
                      item,
                      activeTab === "bookings" ? "booking" : "ride"
                    )
                  }
                  className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mybooking;

