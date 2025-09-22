import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserdatabyid } from "../services/Auth";
import { FiLogOut } from "react-icons/fi";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userid");
    if (id) {
      getUserdatabyid(id)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user:", err));
    } else {
      console.warn("No user ID found in localStorage");
    }
  }, []);

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "🏠",
      showFor: ["Driver", "Passenger"],
    },
    {
      path: "/search-rides",
      label: "Search Rides",
      icon: "🔍",
      showFor: ["Driver", "Passenger"],
    },
    { path: "/post-ride", label: "Post Ride", icon: "➕", showFor: ["Driver"] },
    {
      path: "/mybooking",
      label: "My Bookings",
      icon: "📅",
      showFor: ["Passenger"],
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "👤",
      showFor: ["Driver", "Passenger"],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token"); // if you're storing token
    localStorage.removeItem("email");
    localStorage.removeItem("FullName"); // if you're storing token
    navigate("/login");
  };

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

      {/* User Profile + Logout */}
      <div className="px-6 py-4 border-t flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-blue-700 font-bold">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {user.fullName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
