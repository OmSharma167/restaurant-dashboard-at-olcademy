


// OrderHistory.jsx
import React from "react";
import { formatTimeAgo } from "../utils";

const OrderHistory = ({ orderHistory = [] }) => {
  const diningOrders = orderHistory.filter((order) => order.type === "dining").length;
  const takeawayOrders = orderHistory.filter((order) => order.type === "takeaway").length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Dining Orders</div>
          <div className="text-3xl font-bold mt-1">{diningOrders}</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Takeaway Orders</div>
          <div className="text-3xl font-bold mt-1">{takeawayOrders}</div>
        </div>
      </div>

      {orderHistory.length === 0 ? (
        <p className="text-gray-600">No order history available.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead>
              <tr className="border-b">
                {["Type", "Details", "Items/Guests", "Time", "Status"].map((header) => (
                  <th key={header} className="text-left py-4 px-6 font-medium text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-4 px-6">{order.type}</td>
                  <td className="py-4 px-6">
                    {order.type === "dining" ? (
                      <span>Name: {order.name}</span>
                    ) : (
                      <span>Customer: {order.customerName}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {order.type === "dining" ? order.guestCount : order.items}
                  </td>
                  <td className="py-4 px-6">
                    {order.type === "dining"
                      ? new Date(order.timeSlot).toLocaleString([], {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : formatTimeAgo(order.time)}
                  </td>
                  <td className="py-4 px-6">
                    {order.status === "completed" || order.status === "ready" ? "Done" : order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;