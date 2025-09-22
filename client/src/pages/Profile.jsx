import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaIdCard,
  FaCity,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/update-profile"); // redirect to update profile page
  };

 useEffect(() => {
  const fullName = localStorage.getItem("FullName");
  const email = localStorage.getItem("email");

  setUser({ fullName, email });
}, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Profile 👤
        </h2>

        {/* User Info */}
        <div className="space-y-4" >
          <div className="flex items-center border-b pb-2">
            <FaUser className="text-blue-500 mr-3" />
            <span className="font-semibold w-40">Full Name:</span>
            <span>{user.fullName || "N/A"}</span>
          
          </div>

          <div className="flex items-center border-b pb-2">
            <FaEnvelope className="text-red-500 mr-3" />
            <span className="font-semibold w-40">Email:</span>
            <span>{user.email || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaPhone className="text-green-500 mr-3" />
            <span className="font-semibold w-40">Phone:</span>
            <span>{user.phone || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaCity className="text-purple-500 mr-3" />
            <span className="font-semibold w-40">City:</span>
            <span>{user.city || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaIdCard className="text-yellow-500 mr-3" />
            <span className="font-semibold w-40">Account Type:</span>
            <span>{user.accountType || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaUser className="text-gray-500 mr-3" />
            <span className="font-semibold w-40">Date of Birth:</span>
            <span>
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaUser className="text-pink-500 mr-3" />
            <span className="font-semibold w-40">Bio:</span>
            <span>{user.bio || "No bio added"}</span>
          </div>
        </div>

        {/* Vehicle Info */}
        <h3 className="text-xl font-bold mt-8 mb-4">🚗 Vehicle Information</h3>
        <div className="space-y-4">
          <div className="flex items-center border-b pb-2">
            <FaCar className="text-blue-500 mr-3" />
            <span className="font-semibold w-40">Car Model:</span>
            <span>{user.carModel || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaIdCard className="text-green-600 mr-3" />
            <span className="font-semibold w-40">License Plate:</span>
            <span>{user.licensePlate || "N/A"}</span>
          </div>

          <div className="flex items-center border-b pb-2">
            <FaIdCard className="text-orange-500 mr-3" />
            <span className="font-semibold w-40">Driving License:</span>
            <span>{user.drivingLicense || "N/A"}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
