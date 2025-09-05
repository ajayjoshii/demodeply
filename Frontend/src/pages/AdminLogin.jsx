import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/admin/login", { email, password });
      const token = res.data.user.token;
      localStorage.setItem("adminToken", token);
      alert("Admin logged in");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-white to-green-100 mt-[40px] rounded-2xl">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Admin Login
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Welcome back 👋 Please sign in to continue
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-right text-xs text-green-600 mt-2 cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300 ease-in-out"
          onClick={submit}
        >
          Sign In
        </button>

        {/* Extra Info */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}
