import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/login`, data);
      setMsg(res.data.msg + " | Welcome " + res.data.user.name);
      setData({ email: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input name="email" value={data.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={data.password} onChange={handleChange} placeholder="Password" type="password" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
