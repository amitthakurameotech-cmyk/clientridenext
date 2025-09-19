// src/pages/Dashboard.jsx
import DashboardCard from "../component/DashboardCard";
import QuickActionCard from "../component/QuickActionCard";

const Dashboard = () => {
  return (
    <div className="p-6">
      <DashboardCard name="Amitthakur" />
      <QuickActionCard/>
    </div>
  );
};

export default Dashboard;
