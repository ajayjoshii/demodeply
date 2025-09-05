import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", inStock: true });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const [usersRes, itemsRes, ordersRes, paymentsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/items"),
        api.get("/admin/orders"),
        api.get("/admin/payments"),
      ]);
      setUsers(usersRes.data);
      setItems(itemsRes.data);
      setOrders(ordersRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) setError("Unauthorized. Please login as admin.");
      else setError("Failed to fetch admin data.");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchAll();
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/admin/items/${id}`);
    fetchAll();
  };

  const updateItem = async (id, updated) => {
    await api.put(`/admin/items/${id}`, updated);
    fetchAll();
  };

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return alert("Name and price required");
    await api.post("/admin/items", newItem);
    setNewItem({ name: "", price: "", category: "", inStock: true });
    fetchAll();
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    await api.delete(`/admin/orders/${id}`);
    fetchAll();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    fetchAll();
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove admin auth token if stored
    navigate("/admin-login"); // redirect to admin login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 flex items-center justify-between px-6 h-16 z-50">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">⚡ Admin Dashboard</h1>
        <div className="flex gap-2 items-center">
          {["users", "items", "orders", "payments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}

          {/* --- Logout Button --- */}
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="p-8 mt-[80px] max-w-6xl mx-auto">
        {error && (
          <p className="mb-6 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg shadow-sm">
            {error}
          </p>
        )}

        {/* --- Users Tab --- */}
        {activeTab === "users" && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👥 Users</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              {users.length ? (
                users.map((u) => (
                  <div
                    key={u._id}
                    className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-4 text-gray-500">No users found</p>
              )}
            </div>
          </section>
        )}

        {/* --- Items Tab --- */}
        {activeTab === "items" && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Items</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              {/* Add Item Row */}
              <div className="flex items-center gap-3 p-4 border-b">
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="p-2 border rounded-lg flex-1 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="p-2 border rounded-lg w-36 focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={addItem}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow-md"
                >
                  Add
                </button>
              </div>

              {/* Existing Items */}
              {items.length ? (
                items.map((i) => (
                  <div
                    key={i._id}
                    className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={i.name}
                        onChange={(e) => updateItem(i._id, { ...i, name: e.target.value })}
                        className="p-2 border rounded-lg w-32 focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="number"
                        value={i.price}
                        onChange={(e) => updateItem(i._id, { ...i, price: e.target.value })}
                        className="p-2 border rounded-lg w-24 focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={i.category || ""}
                        onChange={(e) => updateItem(i._id, { ...i, category: e.target.value })}
                        className="p-2 border rounded-lg w-28 focus:ring-2 focus:ring-green-500"
                      />
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={i.inStock}
                          onChange={(e) =>
                            updateItem(i._id, { ...i, inStock: e.target.checked })
                          }
                          className="w-4 h-4"
                        />
                        In Stock
                      </label>
                    </div>
                    <button
                      onClick={() => deleteItem(i._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-4 text-gray-500">No items found</p>
              )}
            </div>
          </section>
        )}

        {/* --- Orders Tab --- */}
        {activeTab === "orders" && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Orders</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              {orders.length ? (
                orders.map((o) => (
                  <div
                    key={o._id}
                    className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        User: {o.userId?.name || o.userId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: {o.status} | Province: {o.province}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {o.status !== "completed" && (
                        <button
                          onClick={() => updateOrderStatus(o._id, "completed")}
                          className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => deleteOrder(o._id)}
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-gray-500">No orders found</p>
              )}
            </div>
          </section>
        )}

        {/* --- Payments Tab --- */}
        {activeTab === "payments" && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">💳 Payments</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              {payments.length ? (
                payments.map((p) => (
                  <div
                    key={p._id}
                    className="flex justify-between items-center p-4 border-b hover:bg-gray-50 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        User: {p.userId?.name || p.userId}
                      </p>
                      <p className="text-sm text-gray-500">
                        Rs {p.amount} - Status: {p.status} - Method: {p.paymentMethod}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-gray-500">No payments found</p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
