import React from "react";
import { FaUtensils, FaPaperPlane, FaCreditCard } from "react-icons/fa";
import { StatusBadge } from "./StatusBadge";
import { ORDER_STATUS } from "./types";

const CurrentOrders = ({ orders, onUpdateStatus }) => {
  return (
    <div className="overflow-x-auto">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No current orders</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Table {order.tableNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className={`flex items-center px-3 py-2 rounded text-sm
                        ${
                          order.status !== ORDER_STATUS.PENDING
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                      onClick={() =>
                        onUpdateStatus(order.id, ORDER_STATUS.PREPARING)
                      }
                      disabled={order.status !== ORDER_STATUS.PENDING}
                    >
                      <FaUtensils className="w-4 h-4 mr-2" />
                      Prepare
                    </button>
                    <button
                      className={`flex items-center px-3 py-2 rounded text-sm
                        ${
                          order.status !== ORDER_STATUS.PREPARING
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      onClick={() =>
                        onUpdateStatus(order.id, ORDER_STATUS.SERVED)
                      }
                      disabled={order.status !== ORDER_STATUS.PREPARING}
                    >
                      <FaPaperPlane className="w-4 h-4 mr-2" />
                      Serve
                    </button>
                    <button
                      className={`flex items-center px-3 py-2 rounded text-sm
                        ${
                          order.status !== ORDER_STATUS.SERVED
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                        }`}
                      onClick={() =>
                        onUpdateStatus(order.id, ORDER_STATUS.PAID)
                      }
                      disabled={order.status !== ORDER_STATUS.SERVED}
                    >
                      <FaCreditCard className="w-4 h-4 mr-2" />
                      Mark Paid
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrentOrders;
