import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header({ user, cart, province, setProvince, onLogout, onSearch }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:3001/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data && res.data.profileImage) {
          setProfileImage(`http://localhost:3001${res.data.profileImage}`);
        } else {
          setProfileImage("/default-profile.png");
        }
      } catch {
        setProfileImage("/default-profile.png");
      }
    };
    fetchProfileImage();
  }, [user]);

  const logout = () => {
    fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      onLogout();
      navigate("/login");
    });
  };

  const provinces = [
    "Koshi",
    "Madhesh",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpashchim",
  ];

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-red-600 via-blue-500 to-yellow-500 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-blue-700 hover:text-blue-900 transition-colors duration-300 ease-in-out select-none"
          >
            <span
              className={`block w-8 h-1 bg-blue-700 mb-1 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-blue-700 mb-1 rounded transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"
                }`}
            ></span>
            <span
              className={`block w-8 h-1 bg-blue-700 rounded transition-transform duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
            ></span>
          </button>

          <h1 className="text-2xl sm:text-3xl font-extrabold cursor-pointer">
            <Link to="/">FoodOrderNP</Link>
          </h1>

          <select
            className="hidden md:block bg-white text-black rounded px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            title="Select Province"
          >
            <option value="">Select Province</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>

          {province && (
            <div className="hidden md:inline-block ml-2 sm:ml-4 font-semibold bg-green-700 px-4 sm:px-6 py-1 sm:py-2 rounded text-sm sm:text-base">
              Province: {province}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search food..."
              value={searchInput}
              onChange={handleSearchChange}
              className="bg-white h-9 sm:h-10 px-10 sm:px-12 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black shadow-md w-full max-w-xs"
            />
            <FaSearch
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
              size={16}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              Home
            </Link>



            <Link
              to="/cart"
              className="hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              Cart
            </Link>


            <Link
              to="/about"
              className="hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-300 font-semibold transition-colors duration-300"
            >
              Contact
            </Link>

            {user ? (
              <>
                <img
                  src={profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  onClick={() => navigate("/profile")}
                  title={`Hello, ${user.name}`}
                />
                <button
                  onClick={logout}
                  className="bg-white text-red-500 px-4 py-1 rounded font-semibold text-base hover:bg-red-100 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-red-500 px-6 py-2 rounded font-semibold text-base hover:bg-red-100 transition-colors duration-300"
              >
                Login
              </Link>
            )}

            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center text-white font-bold">
                  {cart.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </nav>
        </div>
      </div>

      <nav
        className={`md:hidden fixed top-14 left-0 w-full bg-gradient-to-r bg-blue-500 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-6">
          <Link
            to="/"
            className="text-xl font-bold px-3 py-1 rounded bg-yellow-500 text-gray-900 w-[90px]"

            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out w-[150px]"

            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          <Link
            to="/about"
            className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out"

            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-xl font-bold px-3 py-3 rounded hover:text-yellow-500 transition-colors duration-[1200ms] ease-in-out w-[150px]"

            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {user ? (
            <>
              <img
                src={profileImage || "/default-profile.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer mb-2 mx-2"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                title={`Hello, ${user.name}`}
              />
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-white text-black text-xl px-3 py-3 my-2 rounded font-semibold hover:bg-blue-600 transition-colors duration-[1200ms] w-[100px] ease-in-out"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className=" text-white text-2xl px-3 py-3 rounded font-bold hover:text-red-600 transition-colors duration-[1200ms] w-[100px] ease-in-out my-2"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}

        </div>
      </nav>
    </header>



  );
}

