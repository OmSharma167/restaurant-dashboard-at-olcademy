import React, { useState } from "react";
import { AlertTriangle, MessageSquare, Users, Star } from "lucide-react";

const RestaurantReviews = () => {
  const initialReviews = [
    {
      id: "CUST001",
      customer: "John Doe",
      dish: "Spaghetti Carbonara",
      rating: 4.5,
      date: "2024-03-10",
      comment: "The pasta was excellent! Very authentic taste.",
    },
    {
      id: "CUST002",
      customer: "Lisa Anderson",
      dish: "Caesar Salad",
      rating: 0,
      date: "2024-03-10",
      comment: "very bad service",
    },
    {
      id: "CUST001",
      customer: "John Doe",
      dish: "Spaghetti Carbonara",
      rating: 4.5,
      date: "2024-03-10",
      comment: "The pasta was excellent! Very authentic taste.",
    },
    {
      id: "CUST002",
      customer: "Lisa Anderson",
      dish: "Caesar Salad",
      rating: 1,
      date: "2024-03-10",
      comment: "bad service",
    },
    {
      id: "CUST003",
      customer: "Sarah Smith",
      dish: "Margherita Pizza",
      rating: 5,
      date: "2024-03-09",
      comment: "Best pizza in town! Perfectly crispy crust.",
    },
  ];

  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [reviews, setReviews] = useState(initialReviews);

  const getFilteredAndSortedReviews = () => {
    let filtered = [...initialReviews];

    if (timeFilter !== "all") {
      const now = new Date();
      const cutoffDate = new Date();

      switch (timeFilter) {
        case "week":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter(
        (review) => new Date(review.date) >= cutoffDate
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : index < rating
                ? "fill-yellow-400 text-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">({rating})</span>
      </div>
    );
  };

  const calculateStats = () => {
    const currentReviews = getFilteredAndSortedReviews();
    const totalReviews = currentReviews.length;
    const uniqueCustomers = new Set(currentReviews.map((r) => r.id)).size;
    const avgRating =
      totalReviews > 0
        ? (
            currentReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          ).toFixed(1)
        : 0;

    return {
      avgRating,
      totalReviews,
      uniqueCustomers,
      attentionNeeded: currentReviews.filter((r) => r.rating <= 2).length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Restaurant Reviews</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-400" />
            <div className="ml-3">
              <div className="text-xl font-bold">{stats.avgRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            <div className="ml-3">
              <div className="text-xl font-bold">{stats.totalReviews}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-green-500" />
            <div className="ml-3">
              <div className="text-xl font-bold">{stats.uniqueCustomers}</div>
              <div className="text-sm text-gray-600">Unique Customers</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200 bg-red-50">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div className="ml-3">
              <div className="text-xl font-bold">{stats.attentionNeeded}</div>
              <div className="text-sm text-gray-600">Attention Needed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="p-2 border border-gray-300 rounded-lg min-w-[150px]"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
        <select
          className="p-2 border border-gray-300 rounded-lg min-w-[150px]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-gray-600">CUSTOMER ID</th>
              <th className="text-left p-4 text-gray-600">CUSTOMER</th>
              <th className="text-left p-4 text-gray-600">DISH</th>
              <th className="text-left p-4 text-gray-600">RATING</th>
              <th className="text-left p-4 text-gray-600">DATE</th>
              <th className="text-left p-4 text-gray-600">COMMENT</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredAndSortedReviews().map((review, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{review.id}</td>
                <td className="p-4">{review.customer}</td>
                <td className="p-4">{review.dish}</td>
                <td className="p-4">{renderStars(review.rating)}</td>
                <td className="p-4">{review.date}</td>
                <td className="p-4">{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantReviews;
