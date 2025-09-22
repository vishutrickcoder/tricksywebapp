// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/SignUp";
// import Dashboard from "./pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute";
// import VerifyOtp from "./pages/VerifyOtp";

// export default function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//        <Route path="/verify-otp" element={<VerifyOtp />} /> 

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Route>
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Home"; // for guests + users
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminServices from "./pages/admin/AdminServices";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AboutSectionAdmin from "./components/AboutSectionAdmin"

export default function App() {
  return (
    <Routes>
      {/* Public - Dashboard acts as homepage */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected Admin Route */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/users" element={<ManageUsers />} />
        <Route path="/admin-dashboard/about" element={<AboutSectionAdmin />} />
        <Route path="/admin-dashboard/services" element={<AdminServices />} />
      </Route>
    </Routes>
  );
}
