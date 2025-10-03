import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authServices"; // ✅ import login
import "../App.css";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await login(form);
      const { data, status } = response;
      if(status === 200){
        setSuccess("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/listing"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center logo-bg px-4">
      <div className="bg-white shadow-xl rounded p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Login to your MegaMart account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-gray-700">
              Show Password
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded-lg font-semibold transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Do not have an account yet?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
