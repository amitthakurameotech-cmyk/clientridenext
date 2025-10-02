import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/Auth";

function Login() {
  const navigate = useNavigate();

  // Auto redirect if already logged in
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const uid = localStorage.getItem("userid");
  //   if (token || uid) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, [navigate]);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const payload = response?.data ?? response;

      const token =
        payload?.token ??
        payload?.accessToken ??
        payload?.authToken ??
        response?.token;

      const user = payload?.user ?? payload?.data ?? payload;
      const email = user?.email ?? payload?.email ?? response?.email;
      const fullName =
        user?.fullName ??
        user?.full_name ??
        payload?.fullName ??
        response?.fullName;
      const userId =
        user?.id ??
        user?._id ??
        payload?.id ??
        payload?._id ??
        response?.id;

      if (token) localStorage.setItem("token", token);
      if (email) localStorage.setItem("email", email);
      if (fullName) localStorage.setItem("FullName", fullName);
      if (userId) localStorage.setItem("userid", userId);

      alert("✅ Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.message || "❌ Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10 relative overflow-hidden">
        
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
              <FaEnvelope className="text-blue-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
