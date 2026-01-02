import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/lms-image.jpeg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("learner"); // For demo purposes

  const handleLogin = () => {
    // TODO: Replace with actual API authentication
    // For now, navigate based on selected role
    switch (role) {
      case "superadmin":
        navigate("/superadmin");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "instructor":
        navigate("/instructor");
        break;
      case "learner":
      default:
        navigate("/learner");
        break;
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full bg-black/40 flex flex-col">
        <header className="flex justify-end px-12 py-6">
          <div className="text-right">
            <h1 className="text-white text-lg font-semibold tracking-wide">
              LMS
            </h1>
            <p className="text-white/80 text-sm">
              For Corporates, Educators and Training Institutes
            </p>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-end px-16">
          <div className="bg-white w-96 p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Login
            </h2>

            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Demo: Role selector - Remove after backend integration */}
            <label className="block text-sm text-gray-600 mb-1">
              Login as (Demo)
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Tenant Admin</option>
              <option value="instructor">Instructor</option>
              <option value="learner">Learner</option>
            </select>

            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-600">
                Remember me for 1 week
              </span>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
