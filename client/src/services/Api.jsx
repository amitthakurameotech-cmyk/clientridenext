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


