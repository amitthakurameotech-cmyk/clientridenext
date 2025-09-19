import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { verifyOtp } from "../services/Auth"; // make sure verifyOtp exists in Auth.js

function VerifyOtp() {
  const [phone, setPhone] = useState(""); // still capture phone
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      // calling your backend service
      const res = await verifyOtp(phone, otp);

      if (res.success) {
        setMessage("✅ Phone Number Verified Successfully!");
        // redirect after short delay
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("❌ Invalid OTP, please try again.");
      }
    } catch (err) {
      setMessage(err.message || "❌ OTP verification failed, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Enter OTP Code 🔑
        </h2>

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          {/* Phone number input */}
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-lg outline-none"
            />
          </div>

          {/* OTP input */}
          <div>
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaKey className="text-green-500 mr-2" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full outline-none tracking-widest text-lg"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>

        {/* Show message after submit */}
        {message && (
          <p className="text-center mt-4 font-semibold text-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;
