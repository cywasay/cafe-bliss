'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics?days=${timeRange}`);
      const result = await response.json();
      
      if (result.success) {
        setAnalytics(result.data);
      } else {
        setError(result.error || 'Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
              <div className="animate-pulse">
                <div className="h-4 bg-pink-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-pink-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-pink-300 text-base sm:text-lg">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-pink-50 border border-pink-200 rounded-xl sm:rounded-2xl p-6 text-center">
        <div className="text-4xl mb-4">☕</div>
        <div className="text-pink-300 text-lg sm:text-xl font-bold mb-2">Error Loading Analytics</div>
        <p className="text-amber-700 mb-4">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Coffee shop themed colors
  const COFFEE_COLORS = ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F5DEB3'];

  // Prepare data for charts
  const pieChartData = analytics?.popularProducts?.slice(0, 5).map((product, index) => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    value: product.totalSold || 0,
    revenue: product.revenue || 0,
    fill: COFFEE_COLORS[index % COFFEE_COLORS.length]
  })) || [];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Analytics Dashboard
          </h2>
          <p className="text-amber-700 mt-1 text-base sm:text-lg">
            Insights from the last {timeRange} days • Updated just now
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="border border-pink-300 rounded-full px-4 py-2 bg-pink-50 focus:ring-2 focus:ring-rose-500 focus:border-transparent text-pink-300 font-medium"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-700 text-xs sm:text-sm font-medium">Total Revenue</h3>
              <p className="text-xl sm:text-2xl font-bold text-pink-300 mt-1">
                Rs. {analytics?.totalRevenue?.toLocaleString() || '0'}
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">{analytics?.revenueGrowth || '0%'} vs last period</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
              💰
            </div>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-700 text-xs sm:text-sm font-medium">Total Orders</h3>
              <p className="text-xl sm:text-2xl font-bold text-pink-300 mt-1">
                {analytics?.totalOrders?.toLocaleString() || '0'}
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">{analytics?.orderGrowth || '0%'} vs last period</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
              📦
            </div>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-700 text-xs sm:text-sm font-medium">Avg. Order Value</h3>
              <p className="text-xl sm:text-2xl font-bold text-pink-300 mt-1">
                Rs. {analytics?.averageOrderValue?.toLocaleString() || '0'}
              </p>
              <p className="text-xs sm:text-sm text-amber-700 mt-1">Per order average</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
              📈
            </div>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-700 text-xs sm:text-sm font-medium">Daily Average</h3>
              <p className="text-xl sm:text-2xl font-bold text-pink-300 mt-1">
                {analytics?.totalOrders ? Math.round(analytics.totalOrders / timeRange) : 0}
              </p>
              <p className="text-xs sm:text-sm text-amber-700 mt-1">Orders per day</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
              ☕
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Daily Sales Chart */}
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
          <h3 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 sm:mb-6">Daily Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.dailySales || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8d7da" />
              <XAxis 
                dataKey="date" 
                stroke="#8B4513"
                fontSize={12}
                tick={{ fill: '#8B4513' }}
              />
              <YAxis 
                stroke="#8B4513" 
                fontSize={12}
                tick={{ fill: '#8B4513' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fdf2f8',
                  border: '1px solid #f9a8d4',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: '#8B4513'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `Rs. ${value}` : value,
                  name === 'revenue' ? 'Revenue' : 'Orders'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#d97706" 
                strokeWidth={2}
                dot={{ fill: '#d97706', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Products Chart */}
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
          <h3 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 sm:mb-6">Popular Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} sold`,
                  props.payload.name
                ]}
                contentStyle={{ 
                  backgroundColor: '#fdf2f8',
                  border: '1px solid #f9a8d4',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  color: '#8B4513'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Top Products Table */}
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
          <h3 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 sm:mb-6">Top Selling Products</h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics?.popularProducts?.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-pink-200">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-pink-300 text-sm sm:text-base">
                      {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-amber-700">{product.totalSold || 0} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-700 text-sm sm:text-base">Rs. {(product.revenue || 0).toFixed(0)}</p>
                </div>
              </div>
            )) || (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">☕</div>
                <p className="text-pink-300 text-center">No product data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200">
          <h3 className="text-lg sm:text-xl font-bold text-pink-300 mb-4 sm:mb-6">Recent Orders</h3>
          <div className="space-y-3 sm:space-y-4">
            {analytics?.recentOrders?.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-pink-200">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    #{order.id}
                  </div>
                  <div>
                    <p className="font-semibold text-pink-300 text-sm sm:text-base">Order #{order.id}</p>
                    <p className="text-xs sm:text-sm text-amber-700">
                      {new Date(order.createdAt).toLocaleDateString()} - {order.items?.length || 0} items
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-700 text-sm sm:text-base">Rs. {order.total?.toFixed(0) || '0'}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) || (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📦</div>
                <p className="text-pink-300 text-center">No recent orders</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 text-center">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⏰</div>
          <h4 className="text-base sm:text-lg font-bold text-pink-300 mb-2">Peak Hours</h4>
          <p className="text-amber-700 text-xl sm:text-2xl font-bold">2PM - 4PM</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Highest order volume</p>
        </div>

        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 text-center">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⭐</div>
          <h4 className="text-base sm:text-lg font-bold text-pink-300 mb-2">Avg. Rating</h4>
          <p className="text-amber-700 text-xl sm:text-2xl font-bold">4.8/5</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Customer satisfaction</p>
        </div>

        <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-200 text-center">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔄</div>
          <h4 className="text-base sm:text-lg font-bold text-pink-300 mb-2">Return Rate</h4>
          <p className="text-amber-700 text-xl sm:text-2xl font-bold">68%</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Customers returning</p>
        </div>
      </div>
    </div>
  );
}