import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/Auth";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   alert("❌ Passwords do not match!");
    //   return;
    // }

    try {
      const { confirmPassword: _confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);

      // if (response?.phoneNumber) {
      //   localStorage.setItem("phoneNumber", response.phoneNumber);
      // }

      console.log("User registered:", response);
      alert("✅ Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.message || "❌ Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10 relative overflow-hidden">
        
        {/* Decorative Circle */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20"></div>

        <h2 className="text-2xl font-extrabold text-gray-800 mb-5 text-center">
          Create an Account ✨
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-500 transition">
              <FaUser className="text-blue-500 mr-3" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-500 transition">
              <FaEnvelope className="text-purple-500 mr-3" />
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

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-500 transition">
              <FaPhone className="text-green-500 mr-3" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
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
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-500 transition">
              <FaLock className="text-orange-500 mr-3" />
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

          {/* Confirm Password
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-lg px-3 py-2 focus-within:border-purple-500 transition">
              <FaLock className="text-red-500 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transform hover:-translate-y-0.5 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-5">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
