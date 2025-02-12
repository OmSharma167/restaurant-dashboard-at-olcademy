import React from "react";
import { Clock, User, MapPin } from "lucide-react";

const DiningOrders = ({ orders, onUpdateStatus }) => {
  // Calculate dining stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (order) => order.status === "pending" || order.status === "preparing"
    ).length,
    avgTime: "20 min",
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "preparing":
        return "bg-black text-white";
      case "ready":
        return "bg-gray-100 text-black";
      case "served":
        return "bg-gray-200 text-black";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-black";
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    onUpdateStatus(orderId, newStatus);
  };

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
                Table
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
                <td className="py-4 px-6">{order.table}</td>
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
                  {order.status !== "served" && (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border rounded px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="served">Served</option>
                    </select>
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

export default DiningOrders;
