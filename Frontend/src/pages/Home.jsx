import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/user/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to FoodOrderNP</h1>
        {user && <UserProfile user={user} onUpdate={setUser} />}
      </div>
    </div>
  );
};

export default Home;
