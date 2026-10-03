import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import SavedJobs from "../pages/SavedJobs";
import EmployerDashboard from "../pages/EmployerDashboard";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import AIDashboard from "../pages/AIDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/ai-dashboard" element={<AIDashboard />} />

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute role="seeker">
            <SavedJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <ProtectedRoute role="employer">
            <AddJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute role="employer">
            <EditJob />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;