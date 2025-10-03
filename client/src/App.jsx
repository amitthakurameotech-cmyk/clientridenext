import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./component/Sidebar";
//import Header from "./component/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostRide from "./pages/PostRide";
import RideDetail from "./pages/RideDetail";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SearchRides from "./pages/SearchRides";
import Mybooking from "./pages/Mybooking";
import HelpSupport from "./pages/HelpSupport";

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="p-6 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post-ride" element={<PostRide />} />
            <Route path="/ride/:id" element={<RideDetail />} />
            <Route path="/booking/:rideId" element={<Bookings />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/search-rides" element={<SearchRides />} />
            <Route path="/mybooking" element={<Mybooking />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userid")
  );

  // Listen for login/logout changes using storage event (optional for multi-tab)
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("userid"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" replace />}
        />

        {/* Root fallback */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
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
