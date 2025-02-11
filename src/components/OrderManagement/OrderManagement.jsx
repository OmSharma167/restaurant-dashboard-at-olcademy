// "use client";

// import { useState } from "react";

// // Dummy data
// const initialOrders = [
//   {
//     id: 1,
//     tableNumber: 3,
//     items: ["Burger", "Fries", "Coke"],
//     status: "preparing",
//     timestamp: new Date("2023-05-10T12:00:00"),
//   },
//   {
//     id: 2,
//     tableNumber: 5,
//     items: ["Pizza", "Salad", "Water"],
//     status: "served",
//     timestamp: new Date("2023-05-10T12:30:00"),
//   },
// ];

// const initialInventory = [
//   { id: 1, name: "Burger", quantity: 50 },
//   { id: 2, name: "Fries", quantity: 100 },
//   { id: 3, name: "Coke", quantity: 200 },
//   { id: 4, name: "Pizza", quantity: 30 },
//   { id: 5, name: "Salad", quantity: 40 },
//   { id: 6, name: "Water", quantity: 500 },
// ];

// const initialOrderHistory = [
//   {
//     id: 101,
//     tableNumber: 1,
//     items: ["Burger", "Fries"],
//     status: "paid",
//     timestamp: new Date("2023-05-09T18:00:00"),
//   },
//   {
//     id: 102,
//     tableNumber: 2,
//     items: ["Pizza", "Coke"],
//     status: "paid",
//     timestamp: new Date("2023-05-09T19:00:00"),
//   },
// ];

// // Main OrderManagement component
// function OrderManagement() {
//   const [orders, setOrders] = useState(initialOrders);
//   const [inventory, setInventory] = useState(initialInventory);
//   const [orderHistory, setOrderHistory] = useState(initialOrderHistory);
//   const [activeTab, setActiveTab] = useState("orders");

//   const addOrder = (newOrder) => {
//     const order = {
//       ...newOrder,
//       id: Date.now(),
//       status: "pending",
//       timestamp: new Date(),
//     };
//     setOrders([...orders, order]);
//     updateInventory(order.items);
//   };

//   const updateOrderStatus = (id, newStatus) => {
//     setOrders(
//       orders.map((order) =>
//         order.id === id ? { ...order, status: newStatus } : order
//       )
//     );
//     if (newStatus === "paid") {
//       const paidOrder = orders.find((order) => order.id === id);
//       if (paidOrder) {
//         setOrderHistory([...orderHistory, paidOrder]);
//         setOrders(orders.filter((order) => order.id !== id));
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Restaurant Management System</h1>
//       <div className="mb-4">
//         <button
//           onClick={() => setActiveTab("orders")}
//           className={`mr-2 ${activeTab === "orders" ? "font-bold" : ""}`}
//         >
//           Current Orders
//         </button>
//         <button
//           onClick={() => setActiveTab("history")}
//           className={`mr-2 ${activeTab === "history" ? "font-bold" : ""}`}
//         >
//           Order History
//         </button>
//       </div>
//       {activeTab === "orders" && (
//         <OrderList orders={orders} onUpdateStatus={updateOrderStatus} />
//       )}
//       {activeTab === "history" && <OrderHistory orders={orderHistory} />}
//     </div>
//   );
// }

// // OrderList component
// function OrderList({ orders, onUpdateStatus }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
//       {orders.map((order) => (
//         <div key={order.id} className="mb-4 p-4 border rounded">
//           <p>Table: {order.tableNumber}</p>
//           <p>Items: {order.items.join(", ")}</p>
//           <p>Status: {order.status}</p>
//           <button
//             onClick={() => onUpdateStatus(order.id, "preparing")}
//             className="mr-2"
//           >
//             Prepare
//           </button>
//           <button
//             onClick={() => onUpdateStatus(order.id, "served")}
//             className="mr-2"
//           >
//             Serve
//           </button>
//           <button
//             onClick={() => onUpdateStatus(order.id, "paid")}
//             className="mr-2"
//           >
//             Mark Paid
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// // OrderHistory component
// function OrderHistory({ orders }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Order History</h2>
//       {orders.map((order) => (
//         <div key={order.id} className="mb-4 p-4 border rounded">
//           <p>Table: {order.tableNumber}</p>
//           <p>Items: {order.items.join(", ")}</p>
//           <p>Status: {order.status}</p>
//           <p>Timestamp: {order.timestamp.toLocaleString()}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default OrderManagement;


import React, { useState } from "react";
import CurrentOrders from "./CurrentOrders";
import OrderHistory from "./OrderHistory";
import { ORDER_STATUS } from "./types"; // ✅ Ensure ORDER_STATUS is imported

// ✅ Correct Initial Orders Data
const initialOrders = [
  {
    id: 1,
    tableNumber: 3,
    items: ["Burger", "Fries", "Coke"],
    status: ORDER_STATUS.PREPARING,
    timestamp: new Date("2023-05-10T12:00:00"),
  },
  {
    id: 2,
    tableNumber: 5,
    items: ["Pizza", "Salad", "Water"],
    status: ORDER_STATUS.SERVED,
    timestamp: new Date("2023-05-10T12:30:00"),
  },
  {
    id: 3,
    tableNumber: 2,
    items: ["Pasta", "Garlic Bread", "Lemonade"],
    status: ORDER_STATUS.PENDING,
    timestamp: new Date("2023-05-10T12:45:00"),
  },
  {
    id: 4,
    tableNumber: 8,
    items: ["Steak", "Mashed Potatoes", "Red Wine"],
    status: ORDER_STATUS.PREPARING,
    timestamp: new Date("2023-05-10T13:00:00"),
  },
  {
    id: 5,
    tableNumber: 1,
    items: ["Tacos", "Guacamole", "Margarita"],
    status: ORDER_STATUS.SERVED,
    timestamp: new Date("2023-05-10T13:15:00"),
  },
  {
    id: 6,
    tableNumber: 7,
    items: ["Sushi", "Miso Soup", "Green Tea"],
    status: ORDER_STATUS.PREPARING,
    timestamp: new Date("2023-05-10T13:30:00"),
  },
  {
    id: 7,
    tableNumber: 4,
    items: ["Chicken Wings", "Nachos", "Beer"],
    status: ORDER_STATUS.PENDING,
    timestamp: new Date("2023-05-10T13:45:00"),
  },
  {
    id: 8,
    tableNumber: 6,
    items: ["Pancakes", "Syrup", "Orange Juice"],
    status: ORDER_STATUS.SERVED,
    timestamp: new Date("2023-05-10T14:00:00"),
  },
  {
    id: 9,
    tableNumber: 9,
    items: ["BBQ Ribs", "Coleslaw", "Iced Tea"],
    status: ORDER_STATUS.PREPARING,
    timestamp: new Date("2023-05-10T14:15:00"),
  },
  {
    id: 10,
    tableNumber: 10,
    items: ["Veggie Burger", "Sweet Potato Fries", "Smoothie"],
    status: ORDER_STATUS.PENDING,
    timestamp: new Date("2023-05-10T14:30:00"),
  },
];


const initialOrderHistory = [
  {
    id: 101,
    tableNumber: 1,
    items: ["Burger", "Fries"],
    status: ORDER_STATUS.PAID,
    timestamp: new Date("2023-05-09T18:00:00"),
  },
  {
    id: 102,
    tableNumber: 2,
    items: ["Pizza", "Coke"],
    status: ORDER_STATUS.PAID,
    timestamp: new Date("2023-05-09T19:00:00"),
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [orderHistory, setOrderHistory] = useState(initialOrderHistory);
  const [activeTab, setActiveTab] = useState("current-orders");

  const updateOrderStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    if (newStatus === ORDER_STATUS.PAID) {
      const paidOrder = orders.find((order) => order.id === id);
      if (paidOrder) {
        setOrderHistory([
          ...orderHistory,
          { ...paidOrder, status: ORDER_STATUS.PAID },
        ]);
        setOrders(orders.filter((order) => order.id !== id));
      }
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Order Management System
          </h1>
        </div>

        <div className="p-6">
          <div className="flex gap-32 border-b mb-6">
            <button
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                activeTab === "current-orders"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("current-orders")}
            >
              Current Orders
            </button>
            <button
              className={`px-4 py-2 -mb-px text-sm font-medium ${
                activeTab === "order-history"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("order-history")}
            >
              Order History
            </button>
          </div>

          {activeTab === "current-orders" && (
            <CurrentOrders orders={orders} onUpdateStatus={updateOrderStatus} />
          )}
          {/* {activeTab === "order-history" && (
            <OrderHistory orders={orderHistory} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
