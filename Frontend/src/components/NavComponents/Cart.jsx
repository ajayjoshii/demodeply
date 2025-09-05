// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
// const ESEWA_GATEWAY = import.meta.env.VITE_ESEWA_GATEWAY || "https://esewa.com.np";
// const PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE || "your_product_code";

// export default function Cart({ updateQty, deleteItem, clearCart, user, province, cartItems }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   const saveOrderAndItems = async (transaction_uuid) => {
//     try {
//       if (!user?._id) throw new Error("User not logged in");

//       const savedItems = await Promise.all(cartItems.map(async (item) => {
//         const res = await axios.post(`${BASE_URL}/api/admin/items`, {
//           name: item.name,
//           price: item.price,
//           category: item.category || "General",
//           inStock: true,
//         }, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
//         });
//         return res.data;
//       }));

//       const orderRes = await axios.post(`${BASE_URL}/api/order/submit`, {
//         userId: user._id,
//         items: cartItems.map(i => ({ id: i._id || i.id, name: i.name, price: i.price, qty: i.qty, img: i.img })),
//         totalPrice: total,
//         province,
//         name: user.name,
//         email: user.email,
//         transaction_uuid,
//       }, {
//         headers: { "x-auth-token": localStorage.getItem("token") || "" }
//       });

//       return orderRes.data.order;
//     } catch (err) {
//       console.error("Error saving order/items:", err);
//       throw err;
//     }
//   };

//   const handleEsewaPayment = async () => {
//     if (!cartItems.length) return alert("Cart is empty.");
//     if (!user?._id) return alert("Please login before checkout.");

//     try {
//       setLoading(true);

//       // Initialize eSewa payment
//       const initRes = await axios.post(`${BASE_URL}/initialize-esewa`, {
//         items: cartItems.map(item => ({
//           itemId: item._id || item.id,
//           name: item.name,
//           price: item.price,
//           qty: item.qty,
//         })),
//         totalPrice: total,
//         userId: user._id,
//       });

//       if (!initRes.data.success) {
//         alert("Payment initialization failed.");
//         setLoading(false);
//         return;
//       }

//       const { signature, signed_field_names } = initRes.data.payment;
//       const transaction_uuid = initRes.data.purchasedItemData._id;

//       // Save items and order in backend before redirecting
//       await saveOrderAndItems(transaction_uuid);

//       // Store cart temporarily
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       localStorage.setItem("province", province);

//       // Create form and redirect to eSewa
//       const form = document.createElement("form");
//       form.method = "POST";
//       form.action = `${ESEWA_GATEWAY}/api/epay/main/v2/form`;

//       const fields = {
//         amount: total,
//         tax_amount: 0,
//         failure_url: `${window.location.origin}/payment-failure`,
//         product_delivery_charge: 0,
//         product_service_charge: 0,
//         product_code: PRODUCT_CODE,
//         signature,
//         signed_field_names,
//         success_url: `${window.location.origin}/payment-success?transaction_uuid=${transaction_uuid}`,
//         total_amount: total,
//         transaction_uuid,
//       };

//       Object.entries(fields).forEach(([key, value]) => {
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.name = key;
//         input.value = value;
//         form.appendChild(input);
//       });

//       document.body.appendChild(form);
//       form.submit();
//     } catch (err) {
//       console.error("eSewa payment error:", err);
//       alert("Failed to process eSewa payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-[90px]">
//       <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <button
//             onClick={clearCart}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
//           >
//             Clear Cart
//           </button>

//           <table className="w-full border-collapse border border-gray-300 text-center">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Item</th>
//                 <th className="border border-gray-300 p-2">Price (Rs.)</th>
//                 <th className="border border-gray-300 p-2">Quantity</th>
//                 <th className="border border-gray-300 p-2">Total</th>
//                 <th className="border border-gray-300 p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id || item.id}>
//                   <td className="border border-gray-300 p-2">{item.name}</td>
//                   <td className="border border-gray-300 p-2">{item.price}</td>
//                   <td className="border border-gray-300 p-2">
//                     <div className="flex justify-center items-center gap-2">
//                       <button
//                         className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                         onClick={() => updateQty(item.id || item._id, -1)}
//                         disabled={item.qty === 1}
//                       >
//                         -
//                       </button>
//                       <span>{item.qty}</span>
//                       <button
//                         className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                         onClick={() => updateQty(item.id || item._id, 1)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="border border-gray-300 p-2">{item.price * item.qty}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       onClick={() => deleteItem(item.id || item._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="text-right mt-4 text-lg font-bold">Total: Rs. {total}</div>

//           <button
//             className={`mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//             onClick={handleEsewaPayment}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Checkout with eSewa"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const ESEWA_GATEWAY = import.meta.env.VITE_ESEWA_GATEWAY || "https://esewa.com.np";
const PRODUCT_CODE = import.meta.env.VITE_ESEWA_PRODUCT_CODE || "your_product_code";

export default function Cart({ updateQty, deleteItem, clearCart, user, province, cartItems }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const saveOrderAndItems = async (transaction_uuid) => {
    try {
      if (!user?._id) throw new Error("User not logged in");

      // Only call admin endpoint if token exists
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        await Promise.all(
          cartItems.map(async (item) => {
            await axios.post(
              `${BASE_URL}/api/admin/items`,
              {
                name: item.name,
                price: item.price,
                category: item.category || "General",
                inStock: true,
              },
              {
                headers: { Authorization: `Bearer ${adminToken}` },
              }
            );
          })
        );
      }

      // Save order
      const orderRes = await axios.post(
        `${BASE_URL}/api/order/submit`,
        {
          userId: user._id,
          items: cartItems.map((i) => ({
            id: i._id || i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
            img: i.img,
          })),
          totalPrice: total,
          province,
          name: user.name,
          email: user.email,
          transaction_uuid,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      return orderRes.data.order;
    } catch (err) {
      console.error("Error saving order/items:", err.response?.data || err.message);
      throw err;
    }
  };

  const handleEsewaPayment = async () => {
    if (!cartItems.length) return alert("Cart is empty.");
    if (!user?._id) return alert("Please login before checkout.");

    try {
      setLoading(true);

      console.log("Initializing eSewa payment...", {
        items: cartItems,
        totalPrice: total,
        userId: user._id,
      });

      const initRes = await axios.post(`${BASE_URL}/initialize-esewa`, {
        items: cartItems.map((item) => ({
          itemId: item._id || item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
        })),
        totalPrice: total,
        userId: user._id,
      });

      if (!initRes.data.success) {
        console.error("Payment initialization failed:", initRes.data);
        alert("Payment initialization failed.");
        setLoading(false);
        return;
      }

      const { signature, signed_field_names } = initRes.data.payment;
      const transaction_uuid = initRes.data.purchasedItemData._id;

      await saveOrderAndItems(transaction_uuid);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("province", province);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = `${ESEWA_GATEWAY}/api/epay/main/v2/form`;

      const fields = {
        amount: total,
        tax_amount: 0,
        failure_url: `${window.location.origin}/payment-failure`,
        product_delivery_charge: 0,
        product_service_charge: 0,
        product_code: PRODUCT_CODE,
        signature,
        signed_field_names,
        success_url: `${window.location.origin}/payment-success?transaction_uuid=${transaction_uuid}`,
        total_amount: total,
        transaction_uuid,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("eSewa payment error:", err.response?.data || err.message);
      alert("Failed to process eSewa payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-[90px]">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Clear Cart
          </button>

          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Item</th>
                <th className="border border-gray-300 p-2">Price (Rs.)</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Total</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id || item.id}>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.price}</td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => updateQty(item.id || item._id, -1)}
                        disabled={item.qty === 1}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => updateQty(item.id || item._id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2">{item.price * item.qty}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => deleteItem(item.id || item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-4 text-lg font-bold">Total: Rs. {total}</div>

          <button
            className={`mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleEsewaPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Checkout with eSewa"}
          </button>
        </>
      )}
    </div>
  );
}
