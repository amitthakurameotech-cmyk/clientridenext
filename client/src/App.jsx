import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostRide from "./pages/PostRide";
import RideDetail from "./pages/RideDetail";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import SearchRides from "./pages/SearchRides";
import Mybooking from "./pages/Mybooking";

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Pages */}
        <main className="p-6 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-ride" element={<PostRide />} />
            <Route path="/ride/:id" element={<RideDetail />} />
            <Route path="/booking/:rideId" element={<Bookings />} />

            <Route path="/search-rides" element={<SearchRides />} />
            <Route path="/mybooking" element={<Mybooking />} />
            {/* If logged in and go to "/", send to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const userId = localStorage.getItem("userid");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={userId ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={userId ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        {/* Protected area - all authenticated pages live under AppLayout */}
        <Route
          path="/*"
          element={userId ? <AppLayout /> : <Navigate to="/login" replace />}
        />

        {/* Root: send user to dashboard if logged in, otherwise to login */}
        <Route
          path="/"
          element={
            userId ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
