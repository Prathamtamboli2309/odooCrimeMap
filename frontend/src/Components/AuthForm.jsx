import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as per your file structure

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen"); // Default role as "citizen"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
        console.log("Logged in successfully!");
      } else {
        await register(username, email, password, role); // Pass role to register function
        console.log("Registered successfully!");
      }

      // Redirect to home page after successful login/signup
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setError("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full bg-[#a5abd4] max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Role Dropdown */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="police">Police</option>
              </select>
            </div>
          )}
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {/* Toggle Auth Mode Button */}
        <div className="mt-4 text-center">
          <button
            onClick={toggleAuthMode}
            className="text-indigo-500 hover:underline focus:outline-none"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
