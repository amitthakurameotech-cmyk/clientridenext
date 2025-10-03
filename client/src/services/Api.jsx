import axios from "axios";

const API = axios.create({
	baseURL: "https://ridenext-12.onrender.com",
	headers: { "Content-Type": "application/json" },
});

export const postRide = async (rideData) => {
	try {
		const token = localStorage.getItem("token");
		const res = await API.post("/createride", rideData, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data;
	} catch (err) {
		throw err.response?.data || { message: "Failed to post ride" };
	}
};

export const getallRidedata = async () => {
	try {
		const token = localStorage.getItem("token");
		const res = await API.get("/getride", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data.data;
	} catch (err) {
		throw err.response?.data || { message: "Failed to get ride data" };
	}
};

export const createbooking = async (bookingData) => {
	try {
		const token = localStorage.getItem("token");
		const res = await API.post("/createbooking", bookingData, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data.data;
	} catch (err) {
		throw err.response?.data || { message: "Failed to post booking data" };
	}
};

export const getRideById = async (id) => {
	try {
		const res = await API.get(`/getdatabyid/${id}`);
		return res.data.data;
	} catch (err) {
		throw err.response?.data || { message: "Server Error" };
	}
};

export const getbookingdata = async () => {
	try {
		const token = localStorage.getItem("token");
		const res = await API.get("/getbookingdata", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data.data;
	} catch (err) {
		throw err.response?.data || { message: "Failed to get booking data" };
	}
};

// Fetch both bookings (where user is passenger) and rides posted by user (driver) and return combined result
export const getAllUserData = async (userId) => {
	try {
		const token = localStorage.getItem("token");

		// Fire both requests in parallel
		const [bookingsRes, ridesRes] = await Promise.all([
			API.get("/getbookingdata", { headers: { Authorization: `Bearer ${token}` } }),
			API.get(`/getdatabyid/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
		]);

		const bookings = bookingsRes?.data?.data || [];
		const rides = Array.isArray(ridesRes?.data?.data) ? ridesRes.data.data : ridesRes?.data || [];

		// Tag sources so callers can differentiate
		const taggedBookings = bookings.map((b) => ({ ...b, __source: "booking" }));
		const taggedRides = rides.map((r) => ({ ...r, __source: "postedRide" }));

		return { bookings: taggedBookings, rides: taggedRides, combined: [...taggedBookings, ...taggedRides] };
	} catch (err) {
		throw err.response?.data || { message: "Failed to fetch combined user data" };
	}
};


// Api.js
export const deleteBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.delete(`/deletebooking/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete booking data" };
  }
};

export const deleteRide = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.delete(`/deleteride/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to delete ride data" };
  }
};

export const getPassengerBookings = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get(`/pasengertab/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch passenger bookings" };
  }
};


export const getDriverRides = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get(`/drivertab/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch driver rides" };
  }
};
//booking request for the driver
export const getBookingRequests = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get(`/bookingrequest/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch driver requests" };
  }
};

//aprove to cancel request..
export const approveOrCancelRequest = async (bookingId, status) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.patch(
      `/bookings/${bookingId}`,
      { status }, // must be "approved" or "cancelled"
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update booking status" };
  }
};