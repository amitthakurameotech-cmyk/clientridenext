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

export const verifyOtp = async (phoneNumber, otp) => {
  try {
    const res = await API.post("/verify-otp", { phoneNumber, otp });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "OTP verification failed" };
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

export const postRide = async (rideData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.post("/createride", rideData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res)// check what is actually returned
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

    console.log(res.data);

    // ✅ Always return the array inside "Objectdata"
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
    console.log(res.data)
    return res.data.data; // booking created
  } catch (err) {
    throw err.response?.data || { message: "Failed to post booking data" };
  }
};

export const getRideById = async (id) => {
  try {
    const res = await API.get(`/getdatabyid/${id}`);
    console.log(res.data)
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
    console.log(res.data)
    return res.data.data
  } catch (error) {
    console.log("error", error);
  }
}


export const getUserdatabyid = async (id) => {
  try {
    const res = await API.get(`/getuser/${id}`);
    //console.log(res.data)
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server Error" };
  }
};
