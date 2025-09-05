import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^9\d{9}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.withCredentials = true;

export default function Login({ onLogin, onRegister = () => {} }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateRegister = () => {
    if (!name.trim()) return "Name is required.";
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!phoneRegex.test(phone)) return "Invalid Nepali phone number.";
    if (!passwordRegex.test(password)) return "Password must be 6+ chars with letters and numbers.";
    if (!address.trim()) return "Address is required.";
    return null;
  };

  const validateLogin = () => {
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!password) return "Password is required.";
    return null;
  };

  const submit = async () => {
    setLoading(true);
    const url =
      mode === "register"
        ? `${BASE_URL}/api/users/register`
        : `${BASE_URL}/api/users/login`;

    const body =
      mode === "register"
        ? { name, email, phone, password, address }
        : { email, password };

    const err = mode === "register" ? validateRegister() : validateLogin();
    if (err) {
      alert(err);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(url, body);
      const user = res.data.user;

      if (!user || !user.token) {
        throw new Error("Token missing in response");
      }

      localStorage.setItem("token", user.token);

      if (mode === "register") {
        alert("Registration successful");
        onRegister(user);
      } else {
        alert("Login successful");
        onLogin(user);
      }

      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || "Server error");
      } else if (error.request) {
        alert("No response from server. Possible CORS issue.");
      } else {
        alert("Request setup error.");
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 mt-[48px]"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/image-photo/variety-nepalese-traditional-dumpling-momos-600w-1844667388.jpg')",
      }}
    >
      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl p-10 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700 tracking-wide">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {mode === "register" && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 outline-none"
              disabled={loading}
            />
            <input
              placeholder="Phone (e.g. 98xxxxxxxx)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 outline-none"
              disabled={loading}
            />
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mb-4 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 outline-none"
              disabled={loading}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 outline-none"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 outline-none"
          disabled={loading}
        />

        {mode === "login" && (
          <div className="text-right text-sm mb-4">
            <Link to="/forgot-password" className="text-green-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded text-white text-lg font-medium transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 shadow-md"
          }`}
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-green-700 underline cursor-pointer"
                onClick={() => setMode("register")}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span
                className="text-green-700 underline cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
