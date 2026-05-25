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
      const response = await apiPost("/auth/login", {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-tl from-green-900 via-cyan-900 to-slate-950 flex items-center justify-center px-4">

      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400/20 blur-3xl rounded-full"></div>

      {/* Decorative Stars */}
      <div className="absolute -top-40 -left-40 text-[700px] font-black rotate-12 bg-gradient-to-tr from-cyan-700/20 to-green-700/20 bg-clip-text text-transparent select-none pointer-events-none">
        *
      </div>

      <div className="absolute -bottom-52 -right-32 text-[700px] font-black -rotate-12 bg-gradient-to-tr from-cyan-700/20 to-green-700/20 bg-clip-text text-transparent select-none pointer-events-none">
        *
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Sign in to continue managing your CRM dashboard and customer leads.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-3 text-center text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
              required
            />
          </div>

          {/* Password */}
          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-medium text-gray-200">
                Password
              </label>

              <a
                href="#"
                className="text-sm text-cyan-300 hover:text-cyan-200"
              >
                Forgot Password?
              </a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
              required
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-cyan-500"
            />

            <span className="text-sm text-gray-300">
              Remember me
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">

          <p className="text-sm text-gray-300">
            Don&apos;t have an account?{" "}

            <a
              href="https://smart-leads-manager-u3md.vercel.app/register"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}