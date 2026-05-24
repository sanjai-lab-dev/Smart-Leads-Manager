import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost, setToken, setUser } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await apiPost('/auth/login', {
        email,
        password,
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setUser(data.data);
        navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200/40 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-600 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            Sign in to continue managing your CRM dashboard and customer leads.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />

            <span className="text-sm text-gray-600">
              Remember me
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}