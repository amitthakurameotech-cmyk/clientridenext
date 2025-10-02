import { useEffect, useState } from "react";
import DashboardCard from "../component/DashboardCard";
import Header from "../component/Header";
import QuickActionCard from "../component/QuickActionCard";
import StatCard from "../component/StatCard";
import { FaRoute, FaCalendarAlt, FaMoneyBill, FaStar, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getbookingdata, getallRidedata } from "../services/Api";

const Dashboard = () => {
  const userName = localStorage.getItem("FullName") || "User";
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    ridesTaken: 0,
    totalSpent: 0,
    totalBookings: 0,
    avgRating: "N/A",
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const bookings = await getbookingdata();
        const rides = await getallRidedata();

        const ridesTaken = bookings.length;
        const totalSpent = bookings.reduce(
          (sum, b) => sum + (b.totalAmount || 0),
          0
        );
        const totalBookings = bookings.length;
        const avgRating = rides.length > 0 ? "4.5 ★" : "N/A"; // placeholder

        setStats({
          ridesTaken,
          totalSpent,
          totalBookings,
          avgRating,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();

    // load recent activity
    const recent = JSON.parse(localStorage.getItem("recentActivity")) || [];
    setRecentActivity(recent);
  }, []);

  return (
    <div className="p-6">
      {/* <Header /> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Welcome / Profile */}
        <div className="md:col-span-2">
          <DashboardCard name={userName} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <QuickActionCard label="Post a Ride" to={"/post-ride"} />
          <QuickActionCard label="Search Rides" to={"/search-rides"} />
          <QuickActionCard label="My Bookings" to={"/mybooking"} />
          <QuickActionCard label="Help & Support" to={"/help-support"} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Rides Taken"
          value={stats.ridesTaken}
          icon={<FaRoute />}
          color="#34d399"
        />
        <StatCard
          title="Total Spent"
          value={`$${stats.totalSpent.toFixed(2)}`}
          icon={<FaMoneyBill />}
          color="#a78bfa"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<FaCalendarAlt />}
          color="#60a5fa"
        />
        <StatCard
          title="Average Rating"
          value={stats.avgRating}
          icon={<FaStar />}
          color="#fbbf24"
        />
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaHistory className="text-indigo-500" /> Recent Activity
        </h2>
        {recentActivity.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentActivity.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.to)}
                className="bg-white border shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="font-semibold text-gray-800">{item.label}</h3>
                <p className="text-sm text-gray-500">Visited at: {item.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
