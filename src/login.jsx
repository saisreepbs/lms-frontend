import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import bgImage from "./assets/lms-image.jpeg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) return;

    const result = await login(email, password);
    
    if (result.success) {
      const from = location.state?.from?.pathname || result.redirectPath;
      navigate(from, { replace: true });
    } else {
      setError(result.error);
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
          <form onSubmit={handleLogin} className="bg-white w-96 p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Login
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              disabled={loading}
              required
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
                placeholder="Enter your password"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
