import React, { useState } from "react";

const Auth = ({ onAuth }) => {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("nf_users") || "[]");

    if (mode === "register") {
      if (!form.name || !form.email || !form.phone || !form.password) {
        return alert("All fields required!");
      }
      const exists = users.find((u) => u.email === form.email);
      if (exists) return alert("User already exists!");
      users.push(form);
      localStorage.setItem("nf_users", JSON.stringify(users));
      onAuth(form, true);
    } else {
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (!user) {
        return alert("Invalid credentials!");
      }
      onAuth(user, false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{mode === "register" ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="email" placeholder="Email" type="email" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded" />
          </>
        )}
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {mode === "register" ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {mode === "register" ? "Already have account?" : "Need to register?"}{" "}
        <button className="text-blue-600" onClick={() => setMode(mode === "register" ? "login" : "register")}>
          {mode === "register" ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
