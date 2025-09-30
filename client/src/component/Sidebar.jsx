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
    { path: "/", label: "Dashboard", icon: "🏠", showFor: ["Driver", "Passenger"] },
    { path: "/search-rides", label: "Search Rides", icon: "🔍", showFor: ["Driver", "Passenger"] },
    { path: "/post-ride", label: "Post Ride", icon: "➕", showFor: ["Driver", "Passenger"] },
    { path: "/mybooking", label: "My Bookings", icon: "📅", showFor: ["Passenger"] },
    { path: "/profile", label: "Profile", icon: "👤", showFor: ["Driver", "Passenger"] },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("FullName");
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
    <aside className="w-64 bg-gradient-to-b from-blue-50 to-white shadow-xl flex flex-col h-screen">
      {/* Logo / Brand */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center space-x-3">
          <div className="bg-white text-blue-600 p-2 rounded-lg shadow-md">🚗</div>
          <div>
            <h1 className="font-bold text-xl text-white">RideShare</h1>
            <p className="text-sm text-blue-100">Premium Carpooling</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul>
          {navItems
            .filter((item) => item.showFor.includes(user.accountType))
            .map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-base font-semibold transition-all duration-200 
                      ${active
                        ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* User Profile + Logout */}
      <div className="px-6 py-5 border-t bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
