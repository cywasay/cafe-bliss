"use client";
import { useState, useEffect } from "react";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    roastLevel: "",
    origin: "",
    category: "",
    inStock: true,
    featured: false,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    } else if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProducts();
        setShowProductForm(false);
        setEditingProduct(null);
        setFormData({
          name: "",
          price: "",
          image: "",
          description: "",
          roastLevel: "",
          origin: "",
          category: "",
          inStock: true,
          featured: false,
        });
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image || "",
      description: product.description || "",
      roastLevel: product.roastLevel || "",
      origin: product.origin || "",
      category: product.category || "",
      inStock: product.inStock,
      featured: product.featured,
    });
    setShowProductForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducts();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const [stats] = useState({
    totalOrders: 142,
    totalRevenue: 8540.5,
    totalProducts: 24,
    totalCustomers: 89,
  });

  const [recentOrders] = useState([
    { id: "#ORD-001", customer: "John Doe", amount: "$24.99", status: "Completed", time: "2 min ago" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "$42.50", status: "Processing", time: "5 min ago" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: "$18.75", status: "Pending", time: "12 min ago" },
    { id: "#ORD-004", customer: "Sarah Wilson", amount: "$31.20", status: "Completed", time: "18 min ago" },
  ]);

  const [customers] = useState([
    { id: 1, name: "John Doe", email: "john@email.com", orders: 12, totalSpent: 324.99, joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", orders: 8, totalSpent: 198.5, joined: "2024-02-03" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", orders: 15, totalSpent: 425.75, joined: "2023-12-10" },
    { id: 4, name: "Sarah Wilson", email: "sarah@email.com", orders: 6, totalSpent: 142.3, joined: "2024-03-20" },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base ${
        activeTab === id
          ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
          : "bg-white text-rose-700 hover:bg-rose-50 hover:text-rose-600 border border-rose-200"
      }`}
    >
      <span className="text-base sm:text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden text-xs">{label.split(' ')[0]}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-orange-50 pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-2">
                Mehartab
              </h1>
              <p className="text-rose-700 text-base sm:text-lg">Welcome back, Mehartab!</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="bg-rose-50 px-3 sm:px-4 py-2 rounded-full border border-rose-200 text-center">
                <span className="text-xs sm:text-sm text-rose-700">Last updated: Just now</span>
              </div>
              <button
                onClick={() => setActiveTab("products")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg text-sm sm:text-base"
              >
                <span className="hidden sm:inline">☕ New Product</span>
                <span className="sm:hidden">+ Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          <TabButton id="dashboard" label="Dashboard" icon="📊" />
          <TabButton id="orders" label="Orders" icon="📦" />
          <TabButton id="products" label="Products" icon="☕" />
          <TabButton id="customers" label="Customers" icon="👥" />
          <TabButton id="analytics" label="Analytics" icon="📈" />
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Total Orders", value: stats.totalOrders, icon: "📦" },
                { label: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: "💰" },
                { label: "Products", value: stats.totalProducts, icon: "☕" },
                { label: "Customers", value: stats.totalCustomers, icon: "👥" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-200/50 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-700 text-xs sm:text-sm font-medium">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-rose-600 mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders & Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-200/50">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-rose-600">Recent Orders</h3>
                  <button className="text-rose-600 hover:text-rose-700 font-medium transition-colors text-sm sm:text-base">
                    View All
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {recentOrders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 sm:bg-white rounded-lg sm:rounded-xl border sm:border-0 border-gray-200">
                      <div>
                        <p className="font-semibold text-rose-600 text-sm sm:text-base">{order.id}</p>
                        <p className="text-xs sm:text-sm text-rose-700">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-rose-700 text-sm sm:text-base">{order.amount}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-rose-200/50">
                <h3 className="text-lg sm:text-xl font-bold text-rose-600 mb-4 sm:mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { label: "Add Product", icon: "➕", color: "bg-gradient-to-br from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500", action: () => setActiveTab("products") },
                    { label: "View Orders", icon: "📋", color: "bg-gradient-to-br from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500", action: () => setActiveTab("orders") },
                    { label: "Manage Stock", icon: "📦", color: "bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500", action: () => setActiveTab("products") },
                    { label: "Customer Support", icon: "💬", color: "bg-gradient-to-br from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600", action: () => setActiveTab("customers") },
                  ].map((action, i) => (
                    <button key={i} onClick={action.action} className={`p-4 sm:p-6 ${action.color} text-white rounded-lg sm:rounded-xl transition-colors`}>
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{action.icon}</div>
                      <div className="font-semibold text-xs sm:text-sm">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-300">Product Management</h3>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: "", price: "", image: "", description: "", roastLevel: "", origin: "", category: "", inStock: true, featured: false,
                  });
                  setShowProductForm(true);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors text-sm sm:text-base"
              >
                <span className="hidden sm:inline">+ Add New Product</span>
                <span className="sm:hidden">+ Add Product</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-base sm:text-lg text-pink-300">Loading products...</div>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-pink-200 gap-4">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
                        {product.image ? (
                          <img src={`/images/${product.image}`} alt={product.name} className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
                        ) : (
                          "☕"
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base sm:text-lg font-bold text-pink-300 truncate">{product.name}</h4>
                        <p className="text-amber-700 text-sm sm:text-base">{product.category || "Coffee"}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                          <span className="text-amber-700 font-bold text-sm sm:text-base">${product.price}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                          {product.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Featured</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                      <button onClick={() => handleEdit(product)} className="px-3 sm:px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="px-3 sm:px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-base sm:text-lg text-pink-300">No products found</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-300">Order Management</h3>
              <button onClick={fetchOrders} className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
                Refresh Orders
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-base sm:text-lg text-pink-300">Loading orders...</div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-lg font-semibold text-pink-300 mb-2">No orders yet</h3>
                    <p className="text-gray-600">Orders will appear here when customers make purchases</p>
                  </div>
                ) : (
                  orders.map((order, i) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-pink-200 gap-4">
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm flex-shrink-0">
                          #{order.id}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base sm:text-lg font-bold text-pink-300 truncate">Order #{order.id}</h4>
                          <p className="text-amber-700 text-sm sm:text-base">{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                        <div className="text-left sm:text-right">
                          <p className="text-lg sm:text-xl font-bold text-amber-700">${order.total?.toFixed(2) || '0.00'}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status || 'received'}
                          </span>
                        </div>
                        <button className="px-3 sm:px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors text-sm flex-shrink-0">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-300">Customer Management</h3>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors text-sm sm:text-base">
                + Add Customer
              </button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {customers.map((customer) => (
                <div key={customer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-pink-200 gap-4">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-base sm:text-xl font-bold text-pink-300">
                        {customer.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-pink-300 truncate">{customer.name}</h4>
                      <p className="text-amber-700 text-sm sm:text-base truncate">{customer.email}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                        <span className="text-xs sm:text-sm text-gray-600">{customer.orders} orders</span>
                        <span className="text-xs sm:text-sm font-bold text-amber-700">${customer.totalSpent}</span>
                        <span className="text-xs sm:text-sm text-gray-500">Joined: {new Date(customer.joined).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                    <button className="px-3 sm:px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab - NOW USES THE ANALYTICS DASHBOARD COMPONENT */}
        {activeTab === "analytics" && (
          <AnalyticsDashboard />
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-rose-600">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowProductForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Single Origin, Dark Roast, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roast Level</label>
                  <select
                    value={formData.roastLevel}
                    onChange={(e) => setFormData({ ...formData, roastLevel: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">Select roast level</option>
                    <option value="Light">Light</option>
                    <option value="Medium">Medium</option>
                    <option value="Dark">Dark</option>
                    <option value="Extra Dark">Extra Dark</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Ethiopia, Colombia, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Product description..."
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProductForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}