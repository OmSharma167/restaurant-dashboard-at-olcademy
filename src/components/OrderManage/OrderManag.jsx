// import React, { useState } from "react";
// import DiningOrders from "./DiningOrders";
// import TakeawayOrders from "./TakeawayOrders";
// import OrderHistory from "./OrderHistory";

// const OrderManag = () => {
//   const [activeTab, setActiveTab] = useState("dining");
//   const [orders, setOrders] = useState({
//     dining: [
//       {
//         id: "1",
//         type: "dining",
//         table: "Table 5",
//         customer: "John Doe",
//         items: "Burger:2, Fries:3",
//         status: "preparing",
//         time: "10 min ago",
//       },
//       {
//         id: "2",
//         type: "dining",
//         table: "Table 3",
//         customer: "Jane Smith",
//         items: "Pizza:4, Salad:3",
//         status: "ready",
//         time: "15 min ago",
//       },
//       {
//         id: "3",
//         type: "dining",
//         table: "Table 8",
//         customer: "Bob Johnson",
//         items: "Steak:3, Mashed Potatoes:2",
//         status: "served",
//         time: "30 min ago",
//       },
//     ],
//     takeaway: [
//       {
//         id: "4",
//         type: "takeaway",
//         customer: "Alice Brown",
//         items: "Chicken Wings:1, Coke:2",
//         status: "preparing",
//         time: "5 min ago",
//       },
//       {
//         id: "5",
//         type: "takeaway",
//         customer: "Mike Wilson",
//         items: "Pasta, Garlic Bread",
//         status: "ready",
//         time: "12 min ago",
//       },
//       {
//         id: "6",
//         type: "takeaway",
//         customer: "Sarah Davis",
//         items: "Sushi Set:3, Green Tea:5",
//         status: "pending",
//         time: "2 min ago",
//       },
//     ],
//   });

//   const [orderHistory, setOrderHistory] = useState([]);

//   const updateOrderStatus = (orderId) => {
//     const orderType = activeTab;
//     setOrders({
//       ...orders,
//       [orderType]: orders[orderType].map((order) => {
//         if (order.id === orderId) {
//           const statusMap = {
//             pending: "preparing",
//             preparing: "ready",
//             ready: "served",
//             served: "served",
//           };
//           const updatedOrder = { ...order, status: statusMap[order.status] };

//           // Move to history if served
//           if (
//             statusMap[order.status] === "served" &&
//             !orderHistory.includes(order)
//           ) {
//             setOrderHistory([...orderHistory, updatedOrder]);
//           }

//           return updatedOrder;
//         }
//         return order;
//       }),
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header and Tabs */}
//       <div className="border-b bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex gap-20  px-6 py-4">
//             <h1 className="text-2xl font-bold text-gray-900">
//               Order Management
//             </h1>
//             <div className="flex gap-20 bg-red-200">
//               <button
//                 className={`px-8 py-3 font-medium bg-red-500 rounded ${
//                   activeTab === "dining"
//                     ? "border-b-2 border-black text-black"
//                     : "text-white"
//                 }`}
//                 onClick={() => setActiveTab("dining")}
//               >
//                 Dining
//               </button>
//               <button
//                 className={`px-8 py-3 font-medium bg-red-500 rounded ${
//                   activeTab === "takeaway"
//                     ? "border-b-2 border-black text-black"
//                     : "text-white"
//                 }`}
//                 onClick={() => setActiveTab("takeaway")}
//               >
//                 Takeaway
//               </button>
//               <button
//                 className={`px-8 py-3 font-medium bg-red-500 rounded ${
//                   activeTab === "history"
//                     ? "border-b-2 border-black text-black"
//                     : "text-white"
//                 }`}
//                 onClick={() => setActiveTab("history")}
//               >
//                 Order History
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {/* <div className="max-w-7xl mx-auto">
//         {activeTab === "dining" ? (
//           <DiningOrders
//             orders={orders.dining}
//             onUpdateStatus={updateOrderStatus}
//           />
//         ) : (
//           <TakeawayOrders
//             orders={orders.takeaway}
//             onUpdateStatus={updateOrderStatus}
//           />
//         )}
//       </div> */}

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {activeTab === "dining" && (
//           <DiningOrders
//             orders={orders.dining}
//             onUpdateStatus={updateOrderStatus}
//           />
//         )}
//         {activeTab === "takeaway" && (
//           <TakeawayOrders
//             orders={orders.takeaway}
//             onUpdateStatus={updateOrderStatus}
//           />
//         )}
//         {activeTab === "history" && (
//           <OrderHistory orderHistory={orderHistory} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderManag;










import React, { useState } from "react";
import DiningReservations from "./DiningReservations"; // Ensure this is a valid component
import TakeawayOrders from "./TakeawayOrders"; // Ensure this is a valid component
import OrderHistory from "./OrderHistory"; // Ensure this is a valid component

const OrderManag = () => {
  const [activeTab, setActiveTab] = useState("dining");
  const [reservations, setReservations] = useState({
    dining: [
      {
        id: "1",
        name: "John Doe",
        guestCount: 2,
        timeSlot: new Date().toISOString(),
        offers: ["fixed"],
        status: "pending",
        phone: "+1234567890",
      },
      {
        id: "2",
        name: "Jane Smith",
        guestCount: 4,
        timeSlot: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
        offers: ["buyXgetY"],
        status: "accepted",
        phone: "+1234567891",
      },
      {
        id: "3",
        name: "Bob Johnson",
        guestCount: 3,
        timeSlot: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
        offers: ["bundle"],
        status: "accepted",
        phone: "+1234567892",
      },
    ],
    takeaway: [
      {
        id: "4",
        type: "takeaway",
        customer: "Alice Brown",
        items: "Chicken Wings:1, Coke:2",
        status: "preparing",
        time: "5 min ago",
      },
      {
        id: "5",
        type: "takeaway",
        customer: "Mike Wilson",
        items: "Pasta, Garlic Bread",
        status: "ready",
        time: "12 min ago",
      },
      {
        id: "6",
        type: "takeaway",
        customer: "Sarah Davis",
        items: "Sushi Set:3, Green Tea:5",
        status: "pending",
        time: "2 min ago",
      },
    ],
  });

  const [orderHistory, setOrderHistory] = useState([]);

  const updateOrderStatus = (orderId, newStatus) => {
    const orderType = activeTab;
    setReservations((prevReservations) => ({
      ...prevReservations,
      [orderType]: prevReservations[orderType].map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus };
          // Move to history if rejected or completed
          if (newStatus === "rejected" || newStatus === "completed") {
            setOrderHistory((prevHistory) => [...prevHistory, updatedOrder]);
          }
          return updatedOrder;
        }
        return order;
      }),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              
            </h1>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "dining"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("dining")}
              >
                Dining
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "takeaway"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("takeaway")}
              >
                Takeaway
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("history")}
              >
                Order History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === "dining" && (
          <DiningReservations
            reservations={reservations.dining}
            onUpdateStatus={updateOrderStatus}
          />
        )}
        {activeTab === "takeaway" && (
          <TakeawayOrders
            orders={reservations.takeaway} // Fixed reference
            onUpdateStatus={updateOrderStatus}
          />
        )}
        {activeTab === "history" && (
          <OrderHistory orderHistory={orderHistory} />
        )}
      </div>
    </div>
  );
};

export default OrderManag;
