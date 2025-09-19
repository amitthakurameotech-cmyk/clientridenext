// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./component/Sidebar";
// import Header from "./component/Header";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import PostRide from "./pages/PostRide";
// import RideDetail from "./pages/RideDetail";  
// import Bookings from "./pages/Bookings";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import VerifyOtp from "./pages/VerifyOtp";
// import Updateprofile from "./pages/Updateprofile";
// import SearchRides from "./pages/SearchRides";
// import { useParams } from "react-router-dom";
// import Mybooking from "./pages/Mybooking";
// function App() {
//   const { rideId } = useParams(); 
//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-gray-100">
//         {/* Sidebar */}
//         <Sidebar />
 
//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <Header />

//           {/* Pages */}
//           <main className="p-6 overflow-y-auto">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/post-ride" element={<PostRide />} />
//               <Route path="/ride/:id" element={<RideDetail />} />
//               <Route path="/booking/:rideId" element={<Bookings />} />
//               <Route path="/" element={<Login />} />
//               <Route path="/signup" element={<SignUp />} />
//               <Route path="/verify-otp" element={<VerifyOtp />} />
//               <Route path="/update-profile" element={<Updateprofile />} />
//               <Route path="/search-rides" element={<SearchRides/>} />
//               <Route path="/mybooking" element={<Mybooking />} />

             
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

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
import VerifyOtp from "./pages/VerifyOtp";
import Updateprofile from "./pages/Updateprofile";
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
            <Route path="/update-profile" element={<Updateprofile />} />
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
        {/* Public routes */}
        <Route
          path="/"
          element={userId ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={userId ? <AppLayout /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
