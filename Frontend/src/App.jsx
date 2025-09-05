import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/NavComponents/Header";
import About from "./components/NavComponents/About";
import Cart from "./components/NavComponents/Cart";
import Contact from "./components/NavComponents/Contact";
import Home from "./components/NavComponents/Home";
import Login from "./components/NavComponents/Login";
import Profile from "./components/NavComponents/Profile";
import PaymentGateway from "./components/NavComponents/PaymentGateway";
import Delivery_Charges from "./components/Footer/Delivery_Charges";
import Faqs from "./components/Footer/Faqs";
import Footer from "./components/Footer/Footer";
import HowToOrder from "./components/Footer/HowToOrder";
import SuccessPage from "./components/Success_Failure_page/SuccessPage";
import FailurePage from "./components/Success_Failure_page/FailurePage";
import ForgotPasswordRequest from "./components/Password_Reset/ForgotPasswordRequest";
import ResetPassword from "./components/Password_Reset/ResetPassword";
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import { defaultFoodItems } from "./data/foodData";

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin-login" />;
  return children;
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const PROVINCES = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];


export default function App() {
  const [user, setUser] = useState(null);
  const [province, setProvince] = useState("");
  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setProvince(res.data.province || "");
      } catch { }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (province) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        let prov = "Unknown";
        if (lat >= 26.6 && lat <= 27.4 && lng >= 87.0 && lng <= 88.3) prov = "Koshi";
        else if (lat >= 26.4 && lat <= 27.0 && lng >= 85.0 && lng <= 86.5) prov = "Madhesh";
        else if (lat >= 27.0 && lat <= 28.5 && lng >= 85.0 && lng <= 85.9) prov = "Bagmati";
        else if (lat >= 27.5 && lat <= 28.3 && lng >= 83.5 && lng <= 85.5) prov = "Gandaki";
        else if (lat >= 27.5 && lat <= 28.0 && lng >= 82.5 && lng <= 83.8) prov = "Lumbini";
        else if (lat >= 28.3 && lat <= 30.0 && lng >= 80.5 && lng <= 82.5) prov = "Karnali";
        else if (lat >= 28.7 && lat <= 30.0 && lng >= 80.0 && lng <= 81.5) prov = "Sudurpashchim";
        setProvince(prov);
      },
      () => { }
    );
  }, []);

  const foodItemsWithProvince = defaultFoodItems.map(item => ({
    ...item,
    province: province || "Unknown"
  }));

  // Inside App.jsx
  useEffect(() => {
  const fetchRecommendations = async () => {
    if (!user || !province) {
      setRecommendations([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/order/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId: user._id, province }
      });
      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      setRecommendations([]);
    }
  };
  fetchRecommendations();
}, [user, province]);




  const addToCart = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!province || province === "Unknown") return;
    const exists = cart.find(c => c.id === item.id);
    let updatedCart = exists
      ? cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      : [...cart, { ...item, qty: 1 }];
    setCart(updatedCart);
    try {
      await axios.post(`${BASE_URL}/api/cart/add`, {
        userId: user._id,
        itemId: item.id,
        name: item.name,
        price: item.price,
        qty: exists ? exists.qty + 1 : 1,
        province,
      });
    } catch { }
  };

  const updateQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item).filter(item => item.qty > 0));
  const deleteItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  const submitOrder = async () => {
    if (!user || !province || cart.length === 0) return;
    try {
      const payload = { user: { name: user.name, email: user.email }, items: cart, province, orderDate: new Date() };
      const res = await axios.post(`${BASE_URL}/api/orders/submit`, payload);
      clearCart();
      navigate("/cart");
    } catch { }
  };

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem("token", loggedUser.token);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredFoodItems = foodItemsWithProvince.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header user={user} cart={cart} province={province} setProvince={setProvince} onLogout={handleLogout} onSearch={setSearchTerm} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="flex-grow container mx-auto p-6">
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="/" element={<><ImageCarousel /><Home addToCart={addToCart} province={province} setProvince={setProvince} provinces={PROVINCES} recs={recommendations} defaultFoodItems={filteredFoodItems} /><About /></>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cart} updateQty={updateQty} deleteItem={deleteItem} clearCart={clearCart} user={user} province={province} submitOrder={submitOrder} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} onRegister={setUser} />} />
          <Route path="/delivery-charges" element={<Delivery_Charges />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/payment-success" element={<SuccessPage onLogin={setUser} />} />
          <Route path="/payment-failure" element={<FailurePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
