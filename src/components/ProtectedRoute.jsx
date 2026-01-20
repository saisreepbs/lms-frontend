import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute - Wraps routes that require authentication
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} props.allowedRoles - Array of roles allowed to access this route
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user's role
    const rolePaths = {
      SUPER_ADMIN: "/superadmin",
      ADMIN: "/admin",
      INSTRUCTOR: "/instructor",
      LEARNER: "/learner",
    };
    const redirectPath = rolePaths[user?.role] || "/login";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

/**
 * PublicRoute - Wraps routes that should only be accessible when NOT authenticated
 * Redirects authenticated users to their dashboard
 */
export const PublicRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const rolePaths = {
      SUPER_ADMIN: "/superadmin",
      ADMIN: "/admin",
      INSTRUCTOR: "/instructor",
      LEARNER: "/learner",
    };
    const redirectPath = rolePaths[user.role] || "/learner";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
