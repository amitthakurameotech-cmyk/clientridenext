import React, { useState, useEffect } from "react";
import { updateProfile } from "../services/Auth";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    accountType: "",
    dateOfBirth: "",
    bio: "",
    carModel: "",
    licensePlate: "",
    drivingLicense: "",
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const fullName = localStorage.getItem("FullName");
    const email = localStorage.getItem("email");

    setUser({ fullName, email });
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(form);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("✅ Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "❌ Failed to update profile");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          ❌ You must be logged in to update profile
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          👤 Update Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              readOnly
              value={user.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              readOnly
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-gray-700 mb-2">Account Type</label>
            <input
              type="text"
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              placeholder="Enter account type"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 mb-2">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Write something about yourself"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            🚗 Vehicle Information
          </h3>

          {/* Car Model */}
          <div>
            <label className="block text-gray-700 mb-2">Car Model</label>
            <input
              type="text"
              name="carModel"
              value={form.carModel}
              onChange={handleChange}
              placeholder="Enter car model"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-gray-700 mb-2">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={form.licensePlate}
              onChange={handleChange}
              placeholder="Enter license plate number"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Driving License */}
          <div>
            <label className="block text-gray-700 mb-2">Driving License</label>
            <input
              type="text"
              name="drivingLicense"
              value={form.drivingLicense}
              onChange={handleChange}
              placeholder="Enter driving license number"
              className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            ✅ Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
