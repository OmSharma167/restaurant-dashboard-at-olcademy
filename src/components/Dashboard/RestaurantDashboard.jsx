

// import React, { useState } from "react";
// import { Utensils, ShoppingBag, Users, Star } from "lucide-react";
// import StatCard from "./StatCard";
// import OrderAnalyticsChart from "./OrderAnalyticsChart";
// import ComparisonChart from "./ComparisonChart";
// import RecentReviews from "./RecentReviews";
// import { useNavigate } from "react-router-dom";

// // Static data (added from your original code)
// const stats = [
//   { label: "Total Orders", value: "1,250", change: "+12%", icon: ShoppingBag },
//   { label: "Total Customers", value: "10000", change: "+8%", icon: Users },
//   { label: "Total Review", value: "320", change: "+5%", icon: Users },
//   { label: "Order Accuracy rate ", value: "90%", change: "+0.1", icon: Star },
// ];

// const serviceTimeData = {
//   takeaway: {
//     daily: [
//       { name: "Sunday", orders: 155 },
//       { name: "Monday", orders: 230 },
//       { name: "Tuesday", orders: 245 },
//       { name: "Wednesday", orders: 260 },
//       { name: "Thursday", orders: 290 },
//       { name: "Friday", orders: 325 },
//       { name: "Saturday", orders: 245 },
//     ],
//     weekly: [
//       { name: "Week 1", orders: 1750 },
//       { name: "Week 2", orders: 1820 },
//       { name: "Week 3", orders: 1880 },
//       { name: "Week 4", orders: 1950 },
//     ],
//     monthly: [
//       { name: "January", orders: 7100 },
//       { name: "February", orders: 6800 },
//       { name: "March", orders: 7200 },
//       { name: "April", orders: 7400 },
//       { name: "May", orders: 7600 },
//       { name: "June", orders: 7800 },
//       { name: "July", orders: 8200 },
//       { name: "August", orders: 8400 },
//       { name: "September", orders: 8100 },
//       { name: "October", orders: 7900 },
//       { name: "November", orders: 7700 },
//       { name: "December", orders: 8500 },
//     ],
//     yearly: [
//       { name: "2020", orders: 85000 },
//       { name: "2021", orders: 92000 },
//       { name: "2022", orders: 98000 },
//       { name: "2023", orders: 105000 },
//       { name: "2024", orders: 112000 },
//       { name: "2025", orders: 89000 },
//     ],
//   },
//   dinein: {
//     daily: [
//       { name: "Sunday", orders: 205 },
//       { name: "Monday", orders: 145 },
//       { name: "Tuesday", orders: 160 },
//       { name: "Wednesday", orders: 175 },
//       { name: "Thursday", orders: 195 },
//       { name: "Friday", orders: 240 },
//       { name: "Saturday", orders: 260 },
//     ],
//     weekly: [
//       { name: "Week 1", orders: 1350 },
//       { name: "Week 2", orders: 1400 },
//       { name: "Week 3", orders: 1450 },
//       { name: "Week 4", orders: 1500 },
//     ],
//     monthly: [
//       { name: "January", orders: 6200 },
//       { name: "February", orders: 6300 },
//       { name: "March", orders: 6500 },
//       { name: "April", orders: 6700 },
//       { name: "May", orders: 7000 },
//       { name: "June", orders: 7300 },
//       { name: "July", orders: 7600 },
//       { name: "August", orders: 7800 },
//       { name: "September", orders: 7500 },
//       { name: "October", orders: 7200 },
//       { name: "November", orders: 7100 },
//       { name: "December", orders: 7900 },
//     ],
//     yearly: [
//       { name: "2020", orders: 75000 },
//       { name: "2021", orders: 82000 },
//       { name: "2022", orders: 88000 },
//       { name: "2023", orders: 95000 },
//       { name: "2024", orders: 102000 },
//       { name: "2025", orders: 79000 },
//     ],
//   },
// };

// // export { serviceTimeData };
// const recentReviews = [
//   {
//     id: "#R123",
//     customer: "Amit Sharma",
//     rating: 5,
//     comment: "Excellent food quality and fast delivery!",
//     status: "Positive",
//     time: "2 hours ago",
//   },
//   {
//     id: "#R122",
//     customer: "Priya Patel",
//     rating: 3,
//     comment: "Food was good but delivery was delayed",
//     status: "Neutral",
//     time: "3 hours ago",
//   },
//   {
//     id: "#R121",
//     customer: "Rahul Singh",
//     rating: 5,
//     comment: "Amazing experience as always",
//     status: "Positive",
//     time: "Yesterday",
//   },
//   {
//     id: "#R120",
//     customer: "Neha Gupta",
//     rating: 2,
//     comment: "Order was incomplete and cold",
//     status: "Negative",
//     time: "Yesterday",
//   },
//   {
//     id: "#R119",
//     customer: "Kiran Mehta",
//     rating: 4,
//     comment: "Great taste, packaging could be better",
//     status: "Positive",
//     time: "2 days ago",
//   },
// ];

// export default function RestaurantDashboard() {
//   const [orderTimePeriod, setOrderTimePeriod] = useState("daily");
//   const [comparisonTimePeriod, setComparisonTimePeriod] = useState("daily");
//    const navigate = useNavigate();

//   return (
//     <div className="p-6 space-y-6 bg-gray-50">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Restaurant Dashboard Layout
//         </h1>
//         <button
//           onClick={() => navigate("/AllOutletdata")}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Show all outlet data
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <StatCard
//             key={stat.label}
//             label={stat.label}
//             value={stat.value}
//             changeText={`${stat.change} from last month`}
//             changeClass="text-gray-500"
//             icon={stat.icon}
//           />
//         ))}
//       </div>

//       {/* Charts Row */}
//       <div className=" gap-6">
//         <ComparisonChart
//           initialTimePeriod={comparisonTimePeriod}
//           onTimePeriodChange={setComparisonTimePeriod}
//           data={serviceTimeData}
//         />
//       </div>

//       {/* Recent Reviews */}
//       <RecentReviews reviews={recentReviews} />
//     </div>
//   );
// }




import React, { useState } from "react";
import { Calendar, Layers, Utensils, ShoppingBag } from "lucide-react";
import StatCard from "./StatCard";
import RecentReviews from "./RecentReviews";
import ComparisonChart from "./ComparisonChart";
import { useNavigate } from "react-router-dom";

import { serviceTimeData } from "./data";





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


export default function RestaurantDashboard() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week");
  const [selectedServiceView, setSelectedServiceView] = useState("both");
  const navigate = useNavigate();

  const effectiveTimePeriod = {
    week: "weekly",
    month: "monthly",
    year: "yearly",
  }[selectedTimePeriod];

  // Metric Calculations
  const calculateMetrics = () => {
    const takeawayData = serviceTimeData.takeaway[effectiveTimePeriod];
    const dineinData = serviceTimeData.dinein[effectiveTimePeriod];

    let totalOrders = 0,
      totalCustomers = 0,
      totalReviews = 0,
      totalAccuracy = 0;

    if (effectiveTimePeriod === "yearly") {
      if (selectedServiceView === "dinein") {
        totalOrders = dineinData.reduce(
          (sum, item) => sum + item.dineinOrders,
          0
        );
        totalCustomers = dineinData.reduce(
          (sum, item) => sum + item.customers,
          0
        );
      } else if (selectedServiceView === "takeaway") {
        totalOrders = takeawayData.reduce(
          (sum, item) => sum + item.takeawayOrders,
          0
        );
        totalCustomers = takeawayData.reduce(
          (sum, item) => sum + item.customers,
          0
        );
      } else {
        totalOrders =
          takeawayData.reduce((sum, item) => sum + item.takeawayOrders, 0) +
          dineinData.reduce((sum, item) => sum + item.dineinOrders, 0);
        totalCustomers =
          takeawayData.reduce((sum, item) => sum + item.customers, 0) +
          dineinData.reduce((sum, item) => sum + item.customers, 0);
      }

      totalReviews =
        takeawayData.reduce((sum, item) => sum + item.reviews, 0) +
        dineinData.reduce((sum, item) => sum + item.reviews, 0);

      totalAccuracy =
        (takeawayData.reduce(
          (sum, item) => sum + (item.accuracy || 0) * item.takeawayOrders,
          0
        ) +
          dineinData.reduce(
            (sum, item) => sum + (item.accuracy || 0) * item.dineinOrders,
            0
          )) /
          totalOrders || 0;
    } else {
      if (selectedServiceView === "dinein") {
        totalOrders = dineinData.reduce((sum, item) => sum + item.orders, 0);
        totalCustomers = dineinData.reduce(
          (sum, item) => sum + item.customers,
          0
        );
        totalReviews = dineinData.reduce((sum, item) => sum + item.reviews, 0);
        totalAccuracy =
          dineinData.reduce(
            (sum, item) => sum + item.accuracy * item.orders,
            0
          ) / totalOrders || 0;
      } else if (selectedServiceView === "takeaway") {
        totalOrders = takeawayData.reduce((sum, item) => sum + item.orders, 0);
        totalCustomers = takeawayData.reduce(
          (sum, item) => sum + item.customers,
          0
        );
        totalReviews = takeawayData.reduce(
          (sum, item) => sum + item.reviews,
          0
        );
        totalAccuracy =
          takeawayData.reduce(
            (sum, item) => sum + item.accuracy * item.orders,
            0
          ) / totalOrders || 0;
      } else {
        const takeawayOrders = takeawayData.reduce(
          (sum, item) => sum + item.orders,
          0
        );
        const dineinOrders = dineinData.reduce(
          (sum, item) => sum + item.orders,
          0
        );
        totalOrders = takeawayOrders + dineinOrders;
        totalCustomers =
          takeawayData.reduce((sum, item) => sum + item.customers, 0) +
          dineinData.reduce((sum, item) => sum + item.customers, 0);
        totalReviews =
          takeawayData.reduce((sum, item) => sum + item.reviews, 0) +
          dineinData.reduce((sum, item) => sum + item.reviews, 0);
        totalAccuracy =
          (takeawayData.reduce(
            (sum, item) => sum + item.accuracy * item.orders,
            0
          ) +
            dineinData.reduce(
              (sum, item) => sum + item.accuracy * item.orders,
              0
            )) /
            totalOrders || 0;
      }
    }

    return {
      totalOrders,
      totalCustomers,
      totalReviews,
      orderAccuracyRate: (totalAccuracy * 100).toFixed(1) + "%",
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {["week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimePeriod(period)}
              className={`px-3 py-1 rounded-md flex items-center ${
                selectedTimePeriod === period
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar className="w-4 h-4 mr-1" />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {["dinein", "takeaway", "both"].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedServiceView(view)}
              className={`px-3 py-1 rounded-md flex items-center ${
                selectedServiceView === view
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {view === "dinein" && <Utensils className="w-4 h-4 mr-1" />}
              {view === "takeaway" && <ShoppingBag className="w-4 h-4 mr-1" />}
              {view === "both" && <Layers className="w-4 h-4 mr-1" />}
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("/AllOutletdata")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Show all outlet data
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Orders"
          value={metrics.totalOrders.toString()}
          icon={ShoppingBag}
        />
        <StatCard
          label="Total Customers"
          value={metrics.totalCustomers.toString()}
          icon={Layers}
        />
        <StatCard
          label="Total Reviews"
          value={metrics.totalReviews.toString()}
          icon={Utensils}
        />
        <StatCard
          label="Order Accuracy Rate"
          value={metrics.orderAccuracyRate}
          icon={Calendar}
        />
      </div>

      {/* Chart */}
      <div>
        <ComparisonChart
          timePeriod={effectiveTimePeriod}
          serviceView={selectedServiceView}
          data={serviceTimeData}
        />
      </div>

      {/* Recent Reviews */}
      <div>
        <RecentReviews reviews={recentReviews} />
      </div>
    </div>
  );
}
