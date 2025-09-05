import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const status = params.get("status");
      const token = params.get("token");
      const cartId = params.get("cartId");

      if (status === "success" && token && cartId) {
        try {
          const res = await axios.post(`${BASE_URL}/api/payment/verify`, {
            token,
            cartId,
          });

          if (res.data.success) {
            alert("✅ Payment successful and verified!");
            navigate("/");
          } else {
            alert("❌ Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Something went wrong during verification.");
        }
      } else {
        alert("Invalid payment attempt.");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="mt-24 text-center">
      <h1 className="text-3xl font-bold text-green-600">Processing Payment...</h1>
      <p className="mt-4">Please wait while we verify your transaction.</p>
    </div>
  );
}