// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute, { PublicRoute } from "./components/ProtectedRoute";

// Layouts
import TenantAdminLayout from "./layouts/TenantAdminLayout";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import LearnerLayout from "./layouts/LearnerLayout";

// Auth
import Login from "./login";

// SuperAdmin Pages
import SuperAdminDashboard from "./pages/superadmin/SuperAdmin";

// Tenant Admin Pages
import TenantDashboard from "./pages/tenant-admin/Dashboard";
import OrgStructure from "./pages/tenant-admin/OrgStructure";
import CreateStructure from "./pages/tenant-admin/CreateStructure";
import AddStructure from "./pages/tenant-admin/AddStructure";
import UserManagement from "./pages/tenant-admin/UserManagement";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import CourseDetails from "./pages/instructor/CourseDetails";

// Learner Pages
import LearnerCourses from "./pages/learner/Courses";
import CourseOverview from "./pages/learner/CourseOverview";
import CourseContent from "./pages/learner/CourseContent";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Super Admin Routes */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="tenants" element={<SuperAdminDashboard />} />
        <Route path="tenants/new" element={<SuperAdminDashboard />} />
      </Route>

      {/* Tenant Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <TenantAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TenantDashboard />} />
        <Route path="dashboard" element={<TenantDashboard />} />
        <Route path="organization" element={<OrgStructure />} />
        <Route path="organization/create" element={<CreateStructure />} />
        <Route path="organization/update" element={<AddStructure />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      {/* Instructor Routes */}
      <Route
        path="/instructor"
        element={
          <ProtectedRoute allowedRoles={["INSTRUCTOR"]}>
            <InstructorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<InstructorDashboard />} />
        <Route path="courses" element={<InstructorDashboard />} />
        <Route path="courses/new" element={<CreateCourse />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
      </Route>

      {/* Learner Routes */}
      <Route
        path="/learner"
        element={
          <ProtectedRoute allowedRoles={["LEARNER"]}>
            <LearnerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LearnerCourses />} />
        <Route path="courses" element={<LearnerCourses />} />
        <Route path="courses/:courseId" element={<CourseOverview />} />
        <Route path="courses/:courseId/content" element={<CourseContent />} />
      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
