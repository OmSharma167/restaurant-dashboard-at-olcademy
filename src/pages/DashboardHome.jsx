// import React from "react";

// export default function DashboardHome() {
//   // Sample data for demonstration
//   const stats = [
//     {
//       label: "Today’s Orders",
//       value: 78,
//       bg: "bg-pink-600",
//     },
//     {
//       label: "Revenue (Today)",
//       value: "₹ 14,500",
//       bg: "bg-blue-600",
//     },
//     {
//       label: "Active Items",
//       value: 112,
//       bg: "bg-green-600",
//     },
//     {
//       label: "Pending Orders",
//       value: 9,
//       bg: "bg-yellow-600",
//     },
//   ];

//   const recentActivity = [
//     {
//       id: "#1423",
//       customer: "John Doe",
//       total: "₹ 450",
//       status: "Delivered",
//       time: "10 mins ago",
//     },
//     {
//       id: "#1422",
//       customer: "Jane Smith",
//       total: "₹ 1200",
//       status: "Processing",
//       time: "20 mins ago",
//     },
//     {
//       id: "#1421",
//       customer: "Ravi Kumar",
//       total: "₹ 800",
//       status: "Delivered",
//       time: "30 mins ago",
//     },
//     {
//       id: "#1420",
//       customer: "Ayesha Khan",
//       total: "₹ 650",
//       status: "Cancelled",
//       time: "45 mins ago",
//     },
//   ];

//   return (
//     <div className="p-4 space-y-6">
//       {/* Title */}
//       <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className={`flex items-center justify-between p-4 rounded shadow text-white ${stat.bg}`}
//           >
//             <div className="flex flex-col">
//               <span className="text-sm font-medium opacity-90">
//                 {stat.label}
//               </span>
//               <span className="text-xl font-bold mt-1">{stat.value}</span>
//             </div>
//             {/* Icon placeholder (replace with actual icons if you like) */}
//             <svg
//               className="w-8 h-8 opacity-75"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M11 5l-7 7 7 7M5 12h14"
//               />
//             </svg>
//           </div>
//         ))}
//       </div>

//       {/* Analytics or Chart Placeholder */}
//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//           Order Analytics
//         </h2>
//         <p className="text-sm text-gray-500 mb-4">
//           Here you could display a chart of daily/weekly orders, revenue trends,
//           etc.
//         </p>
//         <div className="border-2 border-dashed border-gray-300 rounded h-40 flex items-center justify-center text-gray-400">
//           Chart Placeholder
//         </div>
//       </div>

//       {/* Recent Activity or Orders */}
//       <div className="bg-white rounded shadow p-4">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
//           <button className="text-sm text-blue-500 hover:underline">
//             View All
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-sm">
//             <thead>
//               <tr className="text-gray-500 border-b">
//                 <th className="py-2">Order ID</th>
//                 <th className="py-2">Customer</th>
//                 <th className="py-2">Total</th>
//                 <th className="py-2">Status</th>
//                 <th className="py-2">Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentActivity.map((order) => (
//                 <tr key={order.id} className="border-b last:border-0">
//                   <td className="py-2">{order.id}</td>
//                   <td className="py-2">{order.customer}</td>
//                   <td className="py-2">{order.total}</td>
//                   <td className="py-2">
//                     <span
//                       className={`
//                         text-xs font-semibold px-2 py-1 rounded
//                         ${
//                           order.status === "Delivered"
//                             ? "bg-green-100 text-green-800"
//                             : ""
//                         }
//                         ${
//                           order.status === "Processing"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : ""
//                         }
//                         ${
//                           order.status === "Cancelled"
//                             ? "bg-red-100 text-red-800"
//                             : ""
//                         }
//                       `}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="py-2 text-gray-500">{order.time}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  ShoppingBag,
  DollarSign,
  PercentSquare,
  Users,
  Utensils,
  Star,
  Filter,
} from "lucide-react";

export default function RestaurantDashboard() {
  // Time period state
  const [timePeriod, setTimePeriod] = useState("daily");
  // Service type state
  const [serviceType, setServiceType] = useState("takeaway");
  // Review filter state
  const [reviewFilter, setReviewFilter] = useState("all");

  // Stats cards data
  // const stats = [
  //   {
  //     label: "Total Orders",
  //     value: "246",
  //     change: "+16%",
  //     icon: ShoppingBag,
  //     bg: "bg-blue-500",
  //   },
  //   {
  //     label: "Daily Revenue",
  //     value: "₹ 32,450",
  //     change: "+12%",
  //     icon: DollarSign,
  //     bg: "bg-green-500",
  //   },
  //   {
  //     label: "Order Acceptance Rate",
  //     value: "92%",
  //     change: "+4%",
  //     icon: PercentSquare,
  //     bg: "bg-yellow-500",
  //   },
    
  // ];

  const stats = [
    { label: "Total Orders", value: "1,250", change: "+12%", icon: Star },
    { label: "Revenue", value: "$45,000", change: "+8%", icon: Star },
    { label: "New Customers", value: "320", change: "+5%", icon: Star },
    { label: "Total Reviews", value: "780", change: "+15%", icon: Star },
  ];

  

  const orderAnalyticsData = {
    daily: [
      { name: "8 AM", orders: 12 },
      { name: "10 AM", orders: 25 },
      { name: "12 PM", orders: 45 },
      { name: "2 PM", orders: 32 },
      { name: "4 PM", orders: 28 },
      { name: "6 PM", orders: 43 },
      { name: "8 PM", orders: 35 },
    ],
    weekly: [
      { name: "Mon", orders: 120 },
      { name: "Tue", orders: 145 },
      { name: "Wed", orders: 135 },
      { name: "Thu", orders: 160 },
      { name: "Fri", orders: 180 },
      { name: "Sat", orders: 210 },
      { name: "Sun", orders: 190 },
    ],
    monthly: [
      { name: "Week 1", orders: 850 },
      { name: "Week 2", orders: 920 },
      { name: "Week 3", orders: 880 },
      { name: "Week 4", orders: 950 },
    ],
    yearly: [
      { name: "Jan", orders: 3200 },
      { name: "Feb", orders: 3100 },
      { name: "Mar", orders: 3400 },
      { name: "Apr", orders: 3300 },
      { name: "May", orders: 3500 },
      { name: "Jun", orders: 3800 },
      { name: "Jul", orders: 4000 },
      { name: "Aug", orders: 4100 },
      { name: "Sep", orders: 3900 },
      { name: "Oct", orders: 3700 },
      { name: "Nov", orders: 3600 },
      { name: "Dec", orders: 4200 },
    ],
  };

  // Restructured service time data to match orderAnalyticsData format
  const serviceTimeData = {
    takeaway: {
      daily: [
        { name: "Morning", orders: 75 },
        { name: "Noon", orders: 95 },
        { name: "Afternoon", orders: 55 },
        { name: "Evening", orders: 25 },
      ],
      weekly: [
        { name: "Mon", orders: 230 },
        { name: "Tue", orders: 245 },
        { name: "Wed", orders: 260 },
        { name: "Thu", orders: 290 },
        { name: "Fri", orders: 325 },
        { name: "Sat", orders: 245 },
        { name: "Sun", orders: 155 },
      ],
      monthly: [
        { name: "Week 1", orders: 1750 },
        { name: "Week 2", orders: 1820 },
        { name: "Week 3", orders: 1880 },
        { name: "Week 4", orders: 1950 },
      ],
      yearly: [
        { name: "Jan", orders: 7100 },
        { name: "Feb", orders: 6800 },
        { name: "Mar", orders: 7200 },
        { name: "Apr", orders: 7400 },
        { name: "May", orders: 7600 },
        { name: "Jun", orders: 7800 },
        { name: "Jul", orders: 8200 },
        { name: "Aug", orders: 8400 },
        { name: "Sep", orders: 8100 },
        { name: "Oct", orders: 7900 },
        { name: "Nov", orders: 7700 },
        { name: "Dec", orders: 8500 },
      ],
    },
    dinein: {
      daily: [
        { name: "Morning", orders: 35 },
        { name: "Noon", orders: 85 },
        { name: "Afternoon", orders: 65 },
        { name: "Evening", orders: 60 },
      ],
      weekly: [
        { name: "Mon", orders: 145 },
        { name: "Tue", orders: 160 },
        { name: "Wed", orders: 175 },
        { name: "Thu", orders: 195 },
        { name: "Fri", orders: 240 },
        { name: "Sat", orders: 260 },
        { name: "Sun", orders: 205 },
      ],
      monthly: [
        { name: "Week 1", orders: 1350 },
        { name: "Week 2", orders: 1400 },
        { name: "Week 3", orders: 1450 },
        { name: "Week 4", orders: 1500 },
      ],
      yearly: [
        { name: "Jan", orders: 6200 },
        { name: "Feb", orders: 6300 },
        { name: "Mar", orders: 6500 },
        { name: "Apr", orders: 6700 },
        { name: "May", orders: 7000 },
        { name: "Jun", orders: 7300 },
        { name: "Jul", orders: 7600 },
        { name: "Aug", orders: 7800 },
        { name: "Sep", orders: 7500 },
        { name: "Oct", orders: 7200 },
        { name: "Nov", orders: 7100 },
        { name: "Dec", orders: 7900 },
      ],
    },
  };

  // Recent reviews data
  const recentReviews = [
    {
      id: "#R123",
      customer: "Amit Sharma",
      rating: 5,
      comment: "Excellent food quality and fast delivery!",
      status: "Positive",
      time: "2 hours ago",
    },
    {
      id: "#R122",
      customer: "Priya Patel",
      rating: 3,
      comment: "Food was good but delivery was delayed",
      status: "Neutral",
      time: "3 hours ago",
    },
    {
      id: "#R121",
      customer: "Rahul Singh",
      rating: 5,
      comment: "Amazing experience as always",
      status: "Positive",
      time: "Yesterday",
    },
    {
      id: "#R120",
      customer: "Neha Gupta",
      rating: 2,
      comment: "Order was incomplete and cold",
      status: "Negative",
      time: "Yesterday",
    },
    {
      id: "#R119",
      customer: "Kiran Mehta",
      rating: 4,
      comment: "Great taste, packaging could be better",
      status: "Positive",
      time: "2 days ago",
    },
  ];

  // Function to handle time period change
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  // Function to handle service type change
  const handleServiceTypeChange = (type) => {
    setServiceType(type);
  };

  // Function to handle review filter change
  const handleReviewFilterChange = (filter) => {
    setReviewFilter(filter);
  };

  const getTabStyle = (tab) => {
    return tab === timePeriod
      ? "px-3 py-1 bg-white rounded-md shadow-sm text-indigo-600 font-medium"
      : "px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md";
  };

  const getServiceTabStyle = (tab) => {
    return tab === serviceType
      ? "px-3 py-1 bg-white rounded-md shadow-sm font-medium " +
          (tab === "takeaway" ? "text-emerald-600" : "text-purple-600")
      : "px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md";
  };

  // Review filter tab button style generator
  const getReviewFilterStyle = (filter) => {
    return `px-4 py-2 text-sm font-medium ${
      reviewFilter === filter
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    } rounded-md transition-colors duration-200`;
  };

  // Filtered reviews based on review filter
  const filteredReviews =
    reviewFilter === "all"
      ? recentReviews
      : recentReviews.filter((review) => review.status === reviewFilter);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Restaurant Dashboard Layout
        </h1>
        <Utensils className="w-6 h-6 text-gray-600" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600">
                {stat.label}
              </h2>
              <stat.icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {/* Average Rating */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Average Rating
          </h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-800 mr-2">4.2</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">+0.3 from last month</p>
        </div>

        {/* Repeat Customers */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Repeat Customer %
          </h3>
          <p className="text-3xl font-bold text-gray-800">68%</p>
          <p className="text-xs text-green-500 mt-2">+5% from last month</p>
        </div>

        {/* Order Accuracy */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Order Accuracy Rate
          </h3>
          <p className="text-3xl font-bold text-gray-800">96%</p>
          <p className="text-xs text-green-500 mt-2">+1% from last month</p>
        </div>
      </div>

      {/* Charts Row */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Analytics Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Order Analytics
            </h2>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                className={getTabStyle("daily")}
                onClick={() => handleTimePeriodChange("daily")}
              >
                Daily
              </button>
              <button
                className={getTabStyle("weekly")}
                onClick={() => handleTimePeriodChange("weekly")}
              >
                Weekly
              </button>
              <button
                className={getTabStyle("monthly")}
                onClick={() => handleTimePeriodChange("monthly")}
              >
                Monthly
              </button>
              <button
                className={getTabStyle("yearly")}
                onClick={() => handleTimePeriodChange("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderAnalyticsData[timePeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Total Orders"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Time Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Service Time Distribution
              </h2>
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  className={getTabStyle("daily")}
                  onClick={() => handleTimePeriodChange("daily")}
                >
                  Daily
                </button>
                <button
                  className={getTabStyle("weekly")}
                  onClick={() => handleTimePeriodChange("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={getTabStyle("monthly")}
                  onClick={() => handleTimePeriodChange("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={getTabStyle("yearly")}
                  onClick={() => handleTimePeriodChange("yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  className={getServiceTabStyle("takeaway")}
                  onClick={() => handleServiceTypeChange("takeaway")}
                >
                  Takeaway
                </button>
                <button
                  className={getServiceTabStyle("dinein")}
                  onClick={() => handleServiceTypeChange("dinein")}
                >
                  Dine-in
                </button>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serviceTimeData[serviceType][timePeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name={`${
                    serviceType === "takeaway" ? "Takeaway" : "Dine-in"
                  } Orders`}
                  stroke={serviceType === "takeaway" ? "#10b981" : "#8884d8"}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Service Comparison -{" "}
          {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={serviceTimeData.takeaway[timePeriod]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                data={serviceTimeData.takeaway[timePeriod]}
                name="Takeaway Orders"
                stroke="#10b981"
                strokeWidth={2}
              />
              {/* <Line
                type="monotone"
                dataKey="orders"
                data={serviceTimeData.dinein[timePeriod]}
                name="Dine-in Orders"
                stroke="#8884d8"
                strokeWidth={2}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reviews Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Reviews Section (Top 5 reviews)
          </h2>
          <div className="flex space-x-2">
            <button
              className={getReviewFilterStyle("all")}
              onClick={() => handleReviewFilterChange("all")}
            >
              All
            </button>
            <button
              className={getReviewFilterStyle("Positive")}
              onClick={() => handleReviewFilterChange("Positive")}
            >
              Positive
            </button>
            <button
              className={getReviewFilterStyle("Neutral")}
              onClick={() => handleReviewFilterChange("Neutral")}
            >
              Neutral
            </button>
            <button
              className={getReviewFilterStyle("Negative")}
              onClick={() => handleReviewFilterChange("Negative")}
            >
              Negative
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {filteredReviews.slice(0, 5).map((review) => (
            <div
              key={review.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.customer}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">{review.time}</span>
                  <span
                    className={`
                      text-xs font-semibold px-2 py-1 rounded
                      ${
                        review.status === "Positive"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        review.status === "Neutral"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                      ${
                        review.status === "Negative"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                    `}
                  >
                    {review.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}