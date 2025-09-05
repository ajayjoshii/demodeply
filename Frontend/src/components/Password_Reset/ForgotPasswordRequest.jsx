import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function ForgotPasswordRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert(error.response?.data?.msg || "Error sending reset request");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h2 className="text-2xl mb-6 font-semibold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-3 rounded w-full max-w-md mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button
        onClick={submit}
        disabled={loading}
        className={`bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      {message && <p className="mt-4 text-green-600 max-w-md text-center">{message}</p>}
    </div>
  );
}
