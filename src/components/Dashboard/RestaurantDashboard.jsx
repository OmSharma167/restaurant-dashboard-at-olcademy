

import React, { useState } from "react";
import { Utensils, ShoppingBag, Users, Star } from "lucide-react";
import StatCard from "./StatCard";
import OrderAnalyticsChart from "./OrderAnalyticsChart";
import ComparisonChart from "./ComparisonChart";
import RecentReviews from "./RecentReviews";

// Static data (added from your original code)
const stats = [
  { label: "Total Orders", value: "1,250", change: "+12%", icon: ShoppingBag },
  { label: "Total Customers", value: "10000", change: "+8%", icon: Users },
  { label: "New Customers", value: "320", change: "+5%", icon: Users },
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
  const [orderTimePeriod, setOrderTimePeriod] = useState("daily");
  const [comparisonTimePeriod, setComparisonTimePeriod] = useState("daily");

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Restaurant Dashboard Layout
        </h1>
        <Utensils className="w-6 h-6 text-gray-600" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            changeText={`${stat.change} from last month`}
            changeClass="text-gray-500"
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          label="Average Rating"
          value="4.2"
          rating={4.2}
          changeText="+0.3 from last month"
          changeClass="text-gray-500"
        />
        <StatCard
          label="Repeat Customer %"
          value="68%"
          changeText="+5% from last month"
          changeClass="text-green-500"
        />
        <StatCard
          label="Order Accuracy Rate"
          value="96%"
          changeText="+1% from last month"
          changeClass="text-green-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderAnalyticsChart
          timePeriod={orderTimePeriod}
          onTimePeriodChange={setOrderTimePeriod}
          data={orderAnalyticsData}
        />
        <ComparisonChart
          initialTimePeriod={comparisonTimePeriod}
          onTimePeriodChange={setComparisonTimePeriod}
          data={serviceTimeData}
        />
      </div>

      {/* Recent Reviews */}
      <RecentReviews reviews={recentReviews} />
    </div>
  );
}