// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";

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

const router = createBrowserRouter([
  // ============ PUBLIC ROUTES ============
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  // ============ SUPERADMIN ROUTES ============
  {
    path: "/superadmin",
    element: <SuperAdminLayout />,
    children: [
      {
        index: true,
        element: <SuperAdminDashboard />,
      },
      {
        path: "tenants",
        element: <SuperAdminDashboard />,
      },
      {
        path: "tenants/new",
        element: <SuperAdminDashboard />,
      },
    ],
  },

  // ============ TENANT ADMIN ROUTES ============
  {
    path: "/admin",
    element: <TenantAdminLayout />,
    children: [
      {
        index: true,
        element: <TenantDashboard />,
      },
      {
        path: "dashboard",
        element: <TenantDashboard />,
      },
      {
        path: "organization",
        element: <OrgStructure />,
      },
      {
        path: "organization/create",
        element: <CreateStructure />,
      },
      {
        path: "organization/update",
        element: <AddStructure />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },

  // ============ INSTRUCTOR ROUTES ============
  {
    path: "/instructor",
    element: <InstructorLayout />,
    children: [
      {
        index: true,
        element: <InstructorDashboard />,
      },
      {
        path: "courses",
        element: <InstructorDashboard />,
      },
      {
        path: "courses/new",
        element: <CreateCourse />,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetails />,
      },
    ],
  },

  // ============ LEARNER ROUTES ============
  {
    path: "/learner",
    element: <LearnerLayout />,
    children: [
      {
        index: true,
        element: <LearnerCourses />,
      },
      {
        path: "courses",
        element: <LearnerCourses />,
      },
      {
        path: "courses/:courseId",
        element: <CourseOverview />,
      },
      {
        path: "courses/:courseId/content",
        element: <CourseContent />,
      },
    ],
  },
]);

export default router;
