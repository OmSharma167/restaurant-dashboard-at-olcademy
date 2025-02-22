


// OrderManag.jsx
import React, { useState } from "react";
import DiningReservations from "./DiningReservations";
import TakeawayOrders from "./TakeawayOrders";
import OrderHistory from "./OrderHistory";

const OrderManag = () => {
  const [activeTab, setActiveTab] = useState("dining");
  const [reservations, setReservations] = useState({
    dining: [
      {
        id: "1",
        type: "dining",
        name: "John Doe",
        guestCount: 2,
        timeSlot: new Date().toISOString(),
        offers: ["fixed"],
        status: "pending",
        phone: "+1234567890",
        table: "Table 1",
      },
      {
        id: "2",
        type: "dining",
        name: "Jane Smith",
        guestCount: 4,
        timeSlot: new Date(Date.now() - 15 * 60000).toISOString(),
        offers: ["buyXgetY"],
        status: "accepted",
        phone: "+1234567891",
        table: "Table 2",
      },
      {
        id: "3",
        type: "dining",
        name: "Bob Johnson",
        guestCount: 3,
        timeSlot: new Date(Date.now() - 30 * 60000).toISOString(),
        offers: ["bundle"],
        status: "accepted",
        phone: "+1234567892",
        table: "Table 3",
      },
    ],
    takeaway: [
      {
        id: "4",
        type: "takeaway",
        customerName: "Alice Brown",
        items: "Chicken Wings:1, Coke:2",
        status: "preparing",
        time: new Date(Date.now() - 5 * 60000),
      },
      {
        id: "5",
        type: "takeaway",
        customerName: "Mike Wilson",
        items: "Pasta, Garlic Bread",
        status: "ready",
        time: new Date(Date.now() - 12 * 60000),
      },
      {
        id: "6",
        type: "takeaway",
        customerName: "Sarah Davis",
        items: "Sushi Set:3, Green Tea:5",
        status: "pending",
        time: new Date(Date.now() - 2 * 60000),
      },
    ],
  });
  const [orderHistory, setOrderHistory] = useState([]);

  const updateOrderStatus = (orderId, newStatus) => {
    const orderType = activeTab;
    setReservations((prev) => {
      const updatedOrders = prev[orderType].map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus };
          if (
            (orderType === "dining" && (newStatus === "rejected" || newStatus === "completed")) ||
            (orderType === "takeaway" && (newStatus === "rejected" || newStatus === "ready"))
          ) {
            setOrderHistory((prevHistory) => [...prevHistory, updatedOrder]);
            return null; // Remove from active list
          }
          return updatedOrder;
        }
        return order;
      }).filter(Boolean);

      return { ...prev, [orderType]: updatedOrders };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <div className="flex gap-4">
              {["dining", "takeaway", "history"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "dining" && (
          <DiningReservations reservations={reservations.dining} onUpdateStatus={updateOrderStatus} />
        )}
        {activeTab === "takeaway" && (
          <TakeawayOrders orders={reservations.takeaway} onUpdateStatus={updateOrderStatus} />
        )}
        {activeTab === "history" && <OrderHistory orderHistory={orderHistory} />}
      </div>
    </div>
  );
};

export default OrderManag;