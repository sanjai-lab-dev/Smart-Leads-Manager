import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, setToken, setUser } from "../api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Sales User",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await apiPost("/api/auth/register", formData);

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        setUser(data.data);

        navigate("/home");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
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

      {/* Register Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Register to access your CRM dashboard and manage customer leads.
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

          {/* Name */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-200">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
            />
          </div>

          {/* Email */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
            />
          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
            />
          </div>

          {/* Role */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-200">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
            >
              <option className="bg-slate-900" value="Sales User">
                Sales User
              </option>

              <option className="bg-slate-900" value="Admin">
                Admin
              </option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">

          <p className="text-sm text-gray-300">
            Already have an account?{" "}

            <Link
              to="/"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}