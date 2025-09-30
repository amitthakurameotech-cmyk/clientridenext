import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "https://ridenext-12.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


// Register (Sign Up)
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/register", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Signup failed" };
  }
};

// Login
export const loginUser = async (userData) => {
  try {
    const res = await API.post("/login", userData);
    console.log(res); // check what is actually returned
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // assume token saved at login
    const res = await API.get("/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch profile" };
  }
};


// ✏️ Update Profile
export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.put("/updateregister", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update profile" };
  }
};
// Auth.js now only contains authentication related helpers
export const getUserdatabyid = async (id) => {
	try {
		const res = await API.get(`/getuser/${id}`);
		return res.data;
	} catch (err) {
		throw err.response?.data || { message: "Server Error" };
	}
};