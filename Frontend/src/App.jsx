import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">MERN Auth</h1>
      <Register />
      <Login />
    </div>
  );
}

export default App;
