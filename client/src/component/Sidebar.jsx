import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserdatabyid } from "../services/Auth"; // axios instance

const Sidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userid");
    //console.log(userId)
    if (id) {
      getUserdatabyid(`/getuser/${id}`)
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.data);
          }
        })
        //console.log(res.data)
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, []);

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "🏠",
      showFor: ["driver", "passenger"],
    },
    {
      path: "/search-rides",
      label: "Search Rides",
      icon: "🔍",
      showFor: ["driver", "passenger"],
    },
    { path: "/post-ride", label: "Post Ride", icon: "➕", showFor: ["driver"] },
    {
      path: "/mybooking",
      label: "My Bookings",
      icon: "📅",
      showFor: ["passenger"],
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "👤",
      showFor: ["driver", "passenger"],
    },
  ];

  if (!user) {
    return (
      <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
        <div className="p-6">Loading...</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">🚗</div>
          <div>
            <h1 className="font-bold text-xl text-blue-600">RideShare</h1>
            <p className="text-sm text-gray-500">Premium Carpooling</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul>
          {navItems
            .filter((item) => item.showFor.includes(user.accountType))
            .map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 hover:bg-blue-100 ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* Account Status */}
      <div className="px-6 py-4 border-t">
        <h2 className="text-sm font-semibold text-gray-500 mb-2">
          Accout Status
        </h2>
        <div className="space-y-2 text-sm">
          {/* Role */}
          <div className="flex justify-between">
            <span>Role</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
              {user.accountType}
            </span>
          </div>

          {/* Phone - only show if verified */}
          {user.isVerified && user.phoneNumber && (
            <div className="flex justify-between">
              <span>Phone</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                Verified
              </span>
            </div>
          )}

          {/* KYC */}
          {user.kycStatus && (
            <div className="flex justify-between">
              <span>KYC Status</span>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  user.kycStatus === "verified"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {user.kycStatus}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 py-4 border-t flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
          <span className="text-blue-700 font-bold">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">{user.fullName}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
