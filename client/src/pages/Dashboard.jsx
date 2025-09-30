// src/pages/Dashboard.jsx
import DashboardCard from "../component/DashboardCard";
import QuickActionCard from "../component/QuickActionCard";

const Dashboard = () => {
  const userName = localStorage.getItem("FullName") || "User";

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DashboardCard name={userName} />
        </div>

        <div className="space-y-4">
          <QuickActionCard label="Post a Ride"/>
          <QuickActionCard label="Search Rides"/>
          <QuickActionCard label="My Bookings"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
