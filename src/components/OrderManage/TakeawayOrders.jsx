import React from "react";
import { Clock, User, ShoppingBag } from "lucide-react";

const TakeawayOrders = ({ orders, onUpdateStatus }) => {
  // Calculate takeaway stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (order) => order.status === "pending" || order.status === "preparing"
    ).length,
    avgTime: "15 min",
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "preparing":
        return "bg-black text-white";
      case "ready":
        return "bg-gray-100 text-black";
      case "served":
        return "bg-green-500 text-white"; // Changed for better visibility
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-black";
    }
  };

  // Status options for the dropdown
  const statusOptions = ["pending", "preparing", "ready", "served"];

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Total Orders</div>
          <div className="text-3xl font-bold mt-1">{stats.totalOrders}</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Pending Orders</div>
          <div className="text-3xl font-bold mt-1">{stats.pendingOrders}</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Avg. Preparation Time</div>
          <div className="text-3xl font-bold mt-1">{stats.avgTime}</div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Customer
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Items
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Time
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-4 px-6">{order.customer}</td>
                <td className="py-4 px-6">{order.items}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">{order.time}</td>
                <td className="py-4 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="bg-white border rounded px-3 py-2 text-sm"
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
