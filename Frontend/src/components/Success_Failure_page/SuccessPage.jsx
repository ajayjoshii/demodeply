
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function SuccessPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionUUID, setTransactionUUID] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transaction_uuid = searchParams.get("transaction_uuid");
    if (!transaction_uuid) {
      alert("Payment data missing. Redirecting to home.");
      navigate("/");
      return;
    }
    setTransactionUUID(transaction_uuid);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const savePayment = async () => {
      try {
        const { data: user } = await axios.get(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (onLogin) onLogin(user);

        const { data: order } = await axios.get(
          `${BASE_URL}/api/order/transaction/${transaction_uuid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!order || !order.items) throw new Error("Order not found");

        await axios.post(
          `${BASE_URL}/api/payments/save`,
          {
            user: { _id: user._id, name: user.name, email: user.email },
            items: order.items,
            totalAmount: order.totalPrice,
            province: order.province,
            transaction_uuid,
            dataFromVerificationReq: {},
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

      } catch (err) {
        console.error("Error saving payment:", err.response?.data || err.message);
      }
    };

    savePayment();
  }, [location, navigate, onLogin]);

  const handleCopy = () => {
    if (!transactionUUID) return;
    navigator.clipboard.writeText(transactionUUID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadReceipt = () => {
    if (!transactionUUID) return;
    const content = `Payment Receipt
Transaction ID: ${transactionUUID}
Date: ${new Date().toLocaleString()}
Thank you for your purchase!`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${transactionUUID}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto mt-[90px] p-6 bg-white rounded shadow text-center">
      <h2 className="text-3xl text-green-600 font-semibold mb-6">✅ Payment Successful!</h2>
      <div className="mb-4 flex flex-wrap gap-2 justify-center items-center text-sm sm:text-base">
        <span>Transaction ID:</span>
        <strong className="break-all">{transactionUUID}</strong>
        <button onClick={handleCopy} className="text-blue-500 hover:text-blue-700" title="Copy Transaction ID">
          <FaRegCopy />
        </button>
        {copied && <span className="text-green-500 text-sm">Copied!</span>}
      </div>
      <p className="mb-6">Thank you for your order. Your payment was processed successfully.</p>
      <button onClick={downloadReceipt} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Download Receipt
      </button>
    </div>
  );
}
