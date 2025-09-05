import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verify = async () => {
    if (!email || !otp) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/verify-otp`, { email, otp });
      setMessage("OTP verified! You may now reset your password.");
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (error) {
      alert(error.response?.data?.msg || "OTP verification failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl mb-6 font-semibold">Verify OTP</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-3 rounded w-full max-w-md mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        placeholder="Enter OTP"
        className="border p-3 rounded w-full max-w-md mb-6"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={verify}
        disabled={loading}
        className={`bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {message && <p className="mt-4 text-green-600 max-w-md text-center">{message}</p>}
    </div>
  );
}
