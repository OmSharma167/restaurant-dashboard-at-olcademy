import React from "react";

const OrderHistory = ({ orderHistory }) => {
  // Calculate dining and takeaway counts
  const diningOrders = orderHistory.filter((order) => order.table).length;
  const takeawayOrders = orderHistory.filter((order) => !order.table).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {/* Order summary stats */}
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

      {/* Order history table */}
      {orderHistory.length === 0 ? (
        <p className="text-gray-600">No order history available.</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Type
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Details
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Items
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-4 px-6">
                  {order.table ? "Dining" : "Takeaway"}
                </td>
                <td className="py-4 px-6">
                  {order.table ? (
                    <span>Table: {order.table}</span> // Show table number for dining
                  ) : (
                    <div>
                      <div>ID: {order.id}</div> {/* Show ID for takeaway */}
                      <div>Name: {order.customerName}</div>{" "}
                      {/* Show customer name */}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">{order.items}</td>
                <td className="py-4 px-6 text-gray-500">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
