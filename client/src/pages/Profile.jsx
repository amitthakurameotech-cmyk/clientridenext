import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaIdCard,
  FaCity,
} from "react-icons/fa";
import { getUserdatabyid, updateProfile } from "../services/Auth";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch user profile by ID
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const userid = localStorage.getItem("userid");
        if (!userid) return;

        const res = await getUserdatabyid(userid);
       
        if (!mounted) return;

        const u = res?.data?.user || res?.user || res?.data || {};
        setUser(u);

        // Prepare form values (only editable fields)
        setForm({
          id:userid,
          phoneNumber: u.phoneNumber || "",
          city: u.city || "",
          accountType: u.accountType || "",
          dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth).toISOString().split("T")[0] : "",
          bio: u.bio || "",
          carModel: u.carModel || "",
          licensePlate: u.licensePlate || "",
          drivingLicenseNumber: u.drivingLicenseNumber || u.drivingLicense || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading profile...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProfile(form);
      const updatedUser = res?.data?.user || res || {};
      setUser({ ...user, ...updatedUser });
      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl relative">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 border-4 border-white">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <h2 className="mt-4 text-xl font-extrabold text-gray-800">{user.fullName || "User"}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField icon={<FaUser />} label="Full Name" value={user.fullName} readOnly />
          <ProfileField icon={<FaEnvelope />} label="Email" value={user.email} readOnly />
          <ProfileField icon={<FaPhone />} label="Phone" value={form.phoneNumber} editable={isEditing} name="phoneNumber" onChange={handleChange} />
          <ProfileField icon={<FaCity />} label="City" value={form.city} editable={isEditing} name="city" onChange={handleChange} />
          <ProfileField icon={<FaIdCard />} label="Account Type" value={form.accountType} editable={isEditing} name="accountType" onChange={handleChange} />
          <ProfileField icon={<FaUser />} label="Date of Birth" value={form.dateOfBirth} editable={isEditing} name="dateOfBirth" onChange={handleChange} type="date" />
          <ProfileField icon={<FaUser />} label="Bio" value={form.bio} editable={isEditing} name="bio" onChange={handleChange} textarea />
          <ProfileField icon={<FaCar />} label="Car Model" value={form.carModel} editable={isEditing} name="carModel" onChange={handleChange} />
          <ProfileField icon={<FaIdCard />} label="License Plate" value={form.licensePlate} editable={isEditing} name="licensePlate" onChange={handleChange} />
          <ProfileField icon={<FaIdCard />} label="Driving License" value={form.drivingLicenseNumber} editable={isEditing} name="drivingLicenseNumber" onChange={handleChange} />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {!isEditing && (
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition transform"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
          {isEditing && (
            <>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition transform"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-xl font-semibold shadow hover:scale-105 transition transform"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Field Component
function ProfileField({ icon, label, value, editable, name, onChange, textarea, type, readOnly }) {
  return (
    <div className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow hover:shadow-lg transition">
      <div className="text-xl text-blue-600">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        {readOnly ? (
          <p className="font-semibold text-gray-800">{value || "---"}</p>
        ) : editable ? (
          textarea ? (
            <textarea name={name} value={value} onChange={onChange} className="w-full mt-1 px-2 py-1 border rounded-md" />
          ) : (
            <input type={type || "text"} name={name} value={value} onChange={onChange} className="w-full mt-1 px-2 py-1 border rounded-md" />
          )
        ) : (
          <p className="font-semibold text-gray-800">{value || "---"}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
