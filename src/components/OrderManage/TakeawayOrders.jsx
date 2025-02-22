
// TakeawayOrders.jsx
import React from "react";
import { formatTimeAgo } from "../utils";

const TakeawayOrders = ({ orders = [], onUpdateStatus }) => {
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    avgTime: "15 min",
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "preparing":
        return "bg-gray-600 text-white";
      case "ready":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const statusOptions = ["pending", "preparing", "ready", "rejected"];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600">{key.replace(/([A-Z])/g, " $1").trim()}</div>
            <div className="text-3xl font-bold mt-1">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full min-w-[768px]">
          <thead>
            <tr className="border-b">
              {["Customer", "Items", "Status", "Time", "Action"].map((header) => (
                <th key={header} className="text-left py-4 px-6 font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-4 px-6">{order.customerName}</td>
                <td className="py-4 px-6">{order.items}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6">{formatTimeAgo(order.time)}</td>
                <td className="py-4 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="bg-white border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TakeawayOrders;