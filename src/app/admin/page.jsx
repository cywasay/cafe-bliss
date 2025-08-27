"use client";
import { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data
  const [stats] = useState({
    totalOrders: 142,
    totalRevenue: 8540.5,
    totalProducts: 24,
    totalCustomers: 89,
  });

  const [recentOrders] = useState([
    {
      id: "#ORD-001",
      customer: "John Doe",
      amount: "$24.99",
      status: "Completed",
      time: "2 min ago",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      amount: "$42.50",
      status: "Processing",
      time: "5 min ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      amount: "$18.75",
      status: "Pending",
      time: "12 min ago",
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      amount: "$31.20",
      status: "Completed",
      time: "18 min ago",
    },
  ]);

  const [products] = useState([
    {
      id: 1,
      name: "Ethiopian Single Origin",
      price: 24.99,
      stock: 45,
      category: "Single Origin",
      image: "☕",
    },
    {
      id: 2,
      name: "Colombian Dark Roast",
      price: 22.99,
      stock: 32,
      category: "Dark Roast",
      image: "🫘",
    },
    {
      id: 3,
      name: "French Vanilla Blend",
      price: 19.99,
      stock: 28,
      category: "Flavored",
      image: "☕",
    },
    {
      id: 4,
      name: "Decaf House Blend",
      price: 21.99,
      stock: 15,
      category: "Decaf",
      image: "☕",
    },
  ]);

  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@email.com",
      orders: 12,
      totalSpent: 324.99,
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@email.com",
      orders: 8,
      totalSpent: 198.5,
      joined: "2024-02-03",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@email.com",
      orders: 15,
      totalSpent: 425.75,
      joined: "2023-12-10",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@email.com",
      orders: 6,
      totalSpent: 142.3,
      joined: "2024-03-20",
    },
  ]);

  const [analyticsData] = useState({
    dailySales: [
      { date: "Mon", sales: 450 },
      { date: "Tue", sales: 380 },
      { date: "Wed", sales: 520 },
      { date: "Thu", sales: 600 },
      { date: "Fri", sales: 750 },
      { date: "Sat", sales: 890 },
      { date: "Sun", sales: 680 },
    ],
    topProducts: [
      { name: "Ethiopian Single Origin", sold: 45, revenue: 1124.55 },
      { name: "Colombian Dark Roast", sold: 38, revenue: 873.62 },
      { name: "French Vanilla Blend", sold: 32, revenue: 639.68 },
      { name: "Decaf House Blend", sold: 27, revenue: 593.73 },
    ],
    monthlyGrowth: {
      orders: "+12.5%",
      revenue: "+18.3%",
      customers: "+8.7%",
      products: "+4.2%",
    },
  });

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
      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
        activeTab === id
          ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
          : "bg-white/80 text-rose-700 hover:bg-rose-50 hover:text-rose-600 border border-rose-200 backdrop-blur-sm"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-25 to-orange-50 pt-24"
      style={{
        background:
          "linear-gradient(135deg, #fff1f2 0%, #fef7f7 50%, #fff7ed 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent mb-2">
                Mehartab
              </h1>
              <p className="text-rose-700 text-lg">Welcome back, Mehartab!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-rose-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-200">
                <span className="text-sm text-rose-700">
                  Last updated: Just now
                </span>
              </div>
              <button
                onClick={() => setActiveTab("products")}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                ☕ New Product
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton id="dashboard" label="Dashboard" icon="📊" />
          <TabButton id="orders" label="Orders" icon="📦" />
          <TabButton id="products" label="Products" icon="☕" />
          <TabButton id="customers" label="Customers" icon="👥" />
          <TabButton id="analytics" label="Analytics" icon="📈" />
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Orders",
                  value: stats.totalOrders,
                  icon: "📦",
                },
                {
                  label: "Revenue",
                  value: `${stats.totalRevenue.toLocaleString()}`,
                  icon: "💰",
                },
                {
                  label: "Products",
                  value: stats.totalProducts,
                  icon: "☕",
                },
                {
                  label: "Customers",
                  value: stats.totalCustomers,
                  icon: "👥",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 hover:shadow-xl hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-700 text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-rose-600 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders & Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-rose-600">
                    Recent Orders
                  </h3>
                  <button className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-rose-600">
                          {order.id}
                        </p>
                        <p className="text-sm text-rose-700">
                          {order.customer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-rose-700">
                          {order.amount}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50">
                <h3 className="text-xl font-bold text-rose-600 mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Add Product",
                      icon: "➕",
                      color:
                        "bg-gradient-to-br from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500",
                      action: () => setActiveTab("products"),
                    },
                    {
                      label: "View Orders",
                      icon: "📋",
                      color:
                        "bg-gradient-to-br from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500",
                      action: () => setActiveTab("orders"),
                    },
                    {
                      label: "Manage Stock",
                      icon: "📦",
                      color:
                        "bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500",
                      action: () => setActiveTab("products"),
                    },
                    {
                      label: "Customer Support",
                      icon: "💬",
                      color:
                        "bg-gradient-to-br from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600",
                      action: () => setActiveTab("customers"),
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={action.action}
                      className={`p-6 ${action.color} text-white rounded-xl transition-colors`}
                    >
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="font-semibold">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-pink-300">
                Product Management
              </h3>
              <button className="px-6 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors">
                + Add New Product
              </button>
            </div>

            <div className="grid gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-6 bg-white rounded-xl border border-pink-200"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                      {product.image}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-pink-300">
                        {product.name}
                      </h4>
                      <p className="text-amber-700">{product.category}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-amber-700 font-bold">
                          ${product.price}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock > 20
                              ? "bg-green-100 text-green-800"
                              : product.stock > 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
            <h3 className="text-2xl font-bold text-pink-300 mb-6">
              Order Management
            </h3>
            <div className="space-y-4">
              {recentOrders.map((order, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-white rounded-xl border border-pink-200"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center font-bold text-white">
                      #{i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-pink-300">
                        {order.id}
                      </h4>
                      <p className="text-amber-700">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-xl font-bold text-amber-700">
                        {order.amount}
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-pink-300">
                Customer Management
              </h3>
              <button className="px-6 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors">
                + Add Customer
              </button>
            </div>

            <div className="grid gap-6">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-6 bg-white rounded-xl border border-pink-200"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-pink-300">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-pink-300">
                        {customer.name}
                      </h4>
                      <p className="text-amber-700">{customer.email}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">
                          {customer.orders} orders
                        </span>
                        <span className="text-sm font-bold text-amber-700">
                          ${customer.totalSpent}
                        </span>
                        <span className="text-sm text-gray-500">
                          Joined:{" "}
                          {new Date(customer.joined).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Monthly Order Growth",
                  value: analyticsData.monthlyGrowth.orders,
                  icon: "📈",
                },
                {
                  label: "Revenue Growth",
                  value: analyticsData.monthlyGrowth.revenue,
                  icon: "💰",
                },
                {
                  label: "Customer Growth",
                  value: analyticsData.monthlyGrowth.customers,
                  icon: "👥",
                },
                {
                  label: "Product Growth",
                  value: analyticsData.monthlyGrowth.products,
                  icon: "☕",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="bg-pink-50 rounded-2xl p-6 border border-pink-200 hover:shadow-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-700 text-sm font-medium">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold mt-1 text-green-600">
                        {metric.value}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-700 rounded-xl flex items-center justify-center text-white text-xl">
                      {metric.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Daily Sales Chart */}
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
                <h3 className="text-xl font-bold text-pink-300 mb-6">
                  Daily Sales This Week
                </h3>
                <div className="space-y-4">
                  {analyticsData.dailySales.map((day, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-12 text-amber-700 font-medium">
                        {day.date}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-pink-100 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-pink-300 to-amber-600 h-4 rounded-full transition-all duration-1000"
                            style={{
                              width: `${(day.sales / 900) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-16 text-right font-bold text-amber-700">
                        ${day.sales}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200">
                <h3 className="text-xl font-bold text-pink-300 mb-6">
                  Top Selling Products
                </h3>
                <div className="space-y-4">
                  {analyticsData.topProducts.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-pink-300">
                            {product.name}
                          </p>
                          <p className="text-sm text-amber-700">
                            {product.sold} sold
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-700">
                          ${product.revenue.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Analytics Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h4 className="text-lg font-bold text-pink-300 mb-2">
                  Peak Hours
                </h4>
                <p className="text-amber-700">2PM - 4PM</p>
                <p className="text-sm text-gray-600">Average: 45 orders/hour</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200 text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h4 className="text-lg font-bold text-pink-300 mb-2">
                  Average Rating
                </h4>
                <p className="text-amber-700 text-2xl font-bold">4.8/5</p>
                <p className="text-sm text-gray-600">Based on 234 reviews</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-200 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h4 className="text-lg font-bold text-pink-300 mb-2">
                  Return Rate
                </h4>
                <p className="text-amber-700 text-2xl font-bold">68%</p>
                <p className="text-sm text-gray-600">Customers returning</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
