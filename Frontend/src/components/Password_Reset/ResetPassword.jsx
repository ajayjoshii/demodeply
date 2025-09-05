import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!newPassword) {
      alert("Please enter your new password");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/reset-password`, { token, newPassword });
      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Error resetting password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl mb-6 font-semibold">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="border p-3 rounded w-full max-w-md mb-6"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={submit}
        disabled={loading}
        className={`bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
