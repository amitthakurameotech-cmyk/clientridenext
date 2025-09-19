import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/Auth"; // make sure path is correct

function SignUp() {
  const navigate = useNavigate(); // to redirect after successful signup
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

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData; // remove confirmPassword before sending
      const response = await registerUser(userData); // API call
      console.log("User registered:", response);
      alert("✅ Signup successful!");
      navigate("/"); // redirect to login page
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.message || "❌ Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create an Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-blue-500 mr-2" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-purple-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaPhone className="text-green-500 mr-2" />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div> */}

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-orange-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-red-500 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
