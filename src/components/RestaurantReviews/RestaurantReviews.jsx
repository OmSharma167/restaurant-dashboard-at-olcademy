import React, { useState } from "react";
import {
  AlertTriangle,
  MessageSquare,
  Users,
  Star,
  Reply,
  Save,
  Edit,
  X,
} from "lucide-react";

const RestaurantReviews = () => {
  const initialReviews = [
    {
      id: "CUST001",
      customer: "John Doe",
      dish: "Spaghetti Carbonara",
      rating: 4.5,
      date: "2024-03-10",
      comment: "The pasta was excellent! Very authentic taste.",
      reply: "",
    },
    {
      id: "CUST002",
      customer: "Lisa Anderson",
      dish: "Caesar Salad",
      rating: 1,
      date: "2024-03-10",
      comment: "very bad service",
      reply: "",
    },
    {
      id: "CUST003",
      customer: "Sarah Smith",
      dish: "Margherita Pizza",
      rating: 5,
      date: "2024-03-09",
      comment: "Best pizza in town! Perfectly crispy crust.",
      reply: "",
    },
  ];

  const [timeFilter, setTimeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [reviews, setReviews] = useState(initialReviews);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingReply, setEditingReply] = useState(null);

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

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
    const starColor = () => {
      if (rating <= 1) return "text-red-500";
      if (rating <= 2) return "text-orange-500";
      if (rating <= 3) return "text-yellow-500";
      if (rating <= 4) return "text-lime-500";
      return "text-green-500";
    };

    return (
      <div className="flex items-center">
        <Star className={`w-6 h-6 ${starColor()}`} />
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

  const handleReply = (reviewId) => {
    setReplyingTo(reviewId);
    setReplyText("");
  };

  const startEditingReply = (reviewId) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      setEditingReply(reviewId);
      setReplyText(review.reply);
    }
  };

  const submitReply = (reviewId) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, reply: replyText } : review
    );
    setReviews(updatedReviews);
    setReplyText("");
    setReplyingTo(null);
    setEditingReply(null);
  };

  const cancelEdit = () => {
    setReplyingTo(null);
    setEditingReply(null);
    setReplyText("");
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
              <th className="text-left p-4 text-gray-600">REPLY</th>
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
                <td className="p-4">
                  {review.reply && editingReply !== review.id ? (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <div className="text-xs font-medium text-blue-700 mb-1">
                        Reply from Manager:
                      </div>
                      <div className="text-sm text-gray-800">
                        {review.reply}
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => startEditingReply(review.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ) : editingReply === review.id ? (
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <div className="text-xs font-medium text-blue-700 mb-1">
                        Reply from Manager:
                      </div>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={cancelEdit}
                          className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </button>
                        <button
                          onClick={() => submitReply(review.id)}
                          className="text-xs text-green-600 hover:text-green-800 flex items-center"
                        >
                          <Save className="w-3 h-3 mr-1" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleReply(review.id)}
                      className="flex items-center text-blue-500 hover:text-blue-700"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </button>
                  )}
                  {replyingTo === review.id && !review.reply && (
                    <div className="mt-2">
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        rows={3}
                      />
                      <div className="flex justify-between mt-2">
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => submitReply(review.id)}
                          className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantReviews;
