
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
