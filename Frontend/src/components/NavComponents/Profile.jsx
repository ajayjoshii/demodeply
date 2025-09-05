import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({ user, onLogout }) {
  const [image, setImage] = useState(null);
  const [passwords, setPasswords] = useState({ current: "", newPass: "" });
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  const uploadImage = async () => {
    if (!image) return alert("Please select an image");
    const form = new FormData();
    form.append("profileImage", image);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/upload-image",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",

          },
        }
      );

      alert("✅ Profile image updated. Please refresh.");
      setProfileUser((prev) => ({
        ...prev,
        profileImage: res.data.profileImage,
      }));
    } catch (err) {
      console.error(err.response || err);
      alert("❌ Failed to upload image");
    }
  };

  const changePassword = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/users/reset-password",
        {
          currentPassword: passwords.current,
          newPassword: passwords.newPass,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Password changed");
      setPasswords({ current: "", newPass: "" });
    } catch (err) {
      console.error(err.response || err);
      alert("❌ Failed to change password");
    }
  };

  if (!profileUser) {
    return (
      <div className="text-center mt-32 text-gray-600 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 w-[600px] h-[92vh] mx-auto font-sans text-gray-900 border border-gray-200 mt-[100px]">
      <p className="font-extrabold text-xl mb-4 border-b pb-2 border-yellow-400">
        👤 User Profile
      </p>

      <div className="space-y-2 text-sm leading-relaxed">
        <p>
          <span className="font-semibold">Name:</span> {profileUser.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profileUser.email}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {profileUser.address}
        </p>
        {profileUser.profileImage && (
          <img
            src={`http://localhost:3001${profileUser.profileImage}`}
            alt="Profile"
            className="mt-4 w-24 h-24 rounded-full border border-yellow-400"
          />
        )}
      </div>

      <div className="mt-6">
        <label className="block mb-1 text-yellow-600 font-semibold">
          Upload Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-yellow-600 file:bg-yellow-50 hover:file:bg-yellow-100 cursor-pointer"
        />
        <button
          onClick={uploadImage}
          className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded shadow transition"
        >
          Upload Image
        </button>
      </div>

      <div className="mt-6">
        <p className="font-semibold text-yellow-700 mb-2">Reset Password</p>
        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwords.newPass}
          onChange={(e) =>
            setPasswords({ ...passwords, newPass: e.target.value })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          onClick={changePassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded shadow transition"
        >
          Reset Password
        </button>
      </div>

      <button
        onClick={onLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded shadow transition"
      >
        Logout
      </button>
    </div>
  );
}

