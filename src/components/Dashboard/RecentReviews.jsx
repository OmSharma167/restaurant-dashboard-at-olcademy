import React, { useState } from "react";
import { Star } from "lucide-react";

export default function RecentReviews({ reviews }) {
  const [reviewFilter, setReviewFilter] = useState("all");

  const getReviewFilterStyle = (filter) => {
    return `px-4 py-2 text-sm font-medium ${
      reviewFilter === filter
        ? "bg-blue-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    } rounded-md transition-colors duration-200`;
  };

  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter((review) => review.status === reviewFilter);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header with Filter Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Recent Reviews Section (Top 5 reviews)
        </h2>
        <div className="flex space-x-2">
          <button
            className={getReviewFilterStyle("all")}
            onClick={() => setReviewFilter("all")}
          >
            All
          </button>
          <button
            className={getReviewFilterStyle("Positive")}
            onClick={() => setReviewFilter("Positive")}
          >
            Positive
          </button>
          <button
            className={getReviewFilterStyle("Neutral")}
            onClick={() => setReviewFilter("Neutral")}
          >
            Neutral
          </button>
          <button
            className={getReviewFilterStyle("Negative")}
            onClick={() => setReviewFilter("Negative")}
          >
            Negative
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.slice(0, 5).map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {review.customer}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
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
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{review.comment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs text-gray-400">{review.time}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
