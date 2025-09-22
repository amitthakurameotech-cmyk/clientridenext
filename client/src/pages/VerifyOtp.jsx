import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { verifyOtp } from "../services/Auth";

function VerifyOtp() {
  const [phoneNumber, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhone = localStorage.getItem("phoneNumber");
    if (storedPhone) setPhone(storedPhone);
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (loading) return;
    setMessage("");
    setStatus(null);

    try {
      setLoading(true);
      const res = await verifyOtp(phoneNumber, otp);
      const data = res?.data ?? res;

      if (data?.success === true || data?.verified === true) {
        setStatus("success");
        //console.log("Phone Number Verified Successfully!");
           alert("✅ Phone Number Verified Successfully!");
         navigate("/login");
      } else {
        setStatus("error");
        setMessage(data?.message || "Invalid OTP, please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          err?.message ||
          "OTP verification failed, try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Enter OTP Code 🔑
        </h2>

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          {/* Phone input */}
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={phoneNumber}
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
                inputMode="numeric"
                pattern="\d{4,6}"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim())}
                required
                className="w-full outline-none tracking-widest text-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>

        {message && (
          <p
            className={`flex items-center justify-center mt-4 font-semibold text-lg ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "success" ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaTimesCircle className="mr-2" />
            )}
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;
