// import React from "react";
// import { Clock, User, MapPin } from "lucide-react";

// const DiningOrders = ({ orders, onUpdateStatus }) => {
//   // Calculate dining stats
//   const stats = {
//     totalOrders: orders.length,
//     pendingOrders: orders.filter(
//       (order) => order.status === "pending" || order.status === "preparing"
//     ).length,
//     avgTime: "20 min",
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "preparing":
//         return "bg-black text-white";
//       case "ready":
//         return "bg-gray-100 text-black";
//       case "served":
//         return "bg-gray-200 text-black";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       default:
//         return "bg-gray-100 text-black";
//     }
//   };

//   const handleStatusChange = (orderId, newStatus) => {
//     onUpdateStatus(orderId, newStatus);
//   };

//   return (
//     <div className="p-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <div className="text-gray-600">Total Orders</div>
//           <div className="text-3xl font-bold mt-1">{stats.totalOrders}</div>
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <div className="text-gray-600">Pending Orders</div>
//           <div className="text-3xl font-bold mt-1">{stats.pendingOrders}</div>
//         </div>
//         <div className="bg-white rounded-lg p-6 shadow-sm">
//           <div className="text-gray-600">Avg. Preparation Time</div>
//           <div className="text-3xl font-bold mt-1">{stats.avgTime}</div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-4 px-6 font-medium text-gray-600">
//                 Table
//               </th>
//               <th className="text-left py-4 px-6 font-medium text-gray-600">
//                 Items
//               </th>
//               <th className="text-left py-4 px-6 font-medium text-gray-600">
//                 Status
//               </th>
//               <th className="text-left py-4 px-6 font-medium text-gray-600">
//                 Time
//               </th>
//               <th className="text-left py-4 px-6 font-medium text-gray-600">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b">
//                 <td className="py-4 px-6">{order.table}</td>
//                 <td className="py-4 px-6">{order.items}</td>
//                 <td className="py-4 px-6">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
//                       order.status
//                     )}`}
//                   >
//                     {order.status.charAt(0).toUpperCase() +
//                       order.status.slice(1)}
//                   </span>
//                 </td>
//                 <td className="py-4 px-6 text-gray-500">{order.time}</td>
//                 <td className="py-4 px-6">
//                   {order.status !== "served" && (
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order.id, e.target.value)
//                       }
//                       className="border rounded px-3 py-1 text-sm"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="preparing">Preparing</option>
//                       <option value="ready">Ready</option>
//                       <option value="served">Served</option>
//                     </select>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DiningOrders;




import React, { useState } from "react";
import {
  FaClock,
  FaUser,
  FaPhone,
  FaCheck,
  FaTimes,
  FaCaretDown,
} from "react-icons/fa";

const DiningReservations = ({ reservations = [], onUpdateStatus }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track open dropdown by reservation ID

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };


  const formatOfferLabel = (offer) => {
    switch (offer) {
      case "percentage":
        return "Percentage Discount";
      case "fixed":
        return "Fixed Discount";
      case "bogo":
        return "Buy One Get One";
      case "buyXgetY":
        return "Buy X Get Y Free";
      case "bundle":
        return "Bundled Offer";
      default:
        return offer;
    }
  };


  const stats = {
    totalReservations: reservations?.length || 0,
    pendingReservations:
      reservations?.filter((res) => res.status === "pending")?.length || 0,
    totalGuests:
      reservations?.reduce((sum, res) => sum + res.guestCount, 0) || 0,
  };

  const handleAction = (id, action) => {
    onUpdateStatus?.(id, action);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id); // Toggle dropdown
  };

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Total Reservations</div>
          <div className="text-3xl font-bold mt-1">
            {stats.totalReservations}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Pending Reservations</div>
          <div className="text-3xl font-bold mt-1">
            {stats.pendingReservations}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600">Total Guests</div>
          <div className="text-3xl font-bold mt-1">{stats.totalGuests}</div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Name
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Guests
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Time Slot
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Offers
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((reservation) => (
              <tr key={reservation.id} className="border-b">
                <td className="py-4 px-6">{reservation.name}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <FaUser className="w-4 h-4 mr-2" />
                    {reservation.guestCount}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-2" />
                    {new Date(reservation.timeSlot).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {reservation.offers?.map((offer, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {formatOfferLabel(offer)}
                    </span>
                  ))}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                      reservation.status
                    )}`}
                  >
                    {reservation.status || "Pending"}
                  </span>
                </td>
                <td className="py-4 px-6 relative">
                  <button
                    className="border rounded px-3 py-1 text-sm flex items-center space-x-1"
                    onClick={() => toggleDropdown(reservation.id)}
                  >
                    <span>Actions</span>
                    <FaCaretDown className="w-4 h-4" />
                  </button>
                  {dropdownOpen === reservation.id && (
                    <div className="absolute mt-2 bg-white border rounded shadow-md z-10 w-32">
                      {reservation.status === "pending" && (
                        <>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() =>
                              handleAction(reservation.id, "accepted")
                            }
                          >
                            <FaCheck className="inline-block mr-2" />
                            Accept
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() =>
                              handleAction(reservation.id, "rejected")
                            }
                          >
                            <FaTimes className="inline-block mr-2" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() =>
                          (window.location.href = `tel:${reservation.phone}`)
                        }
                      >
                        <FaPhone className="inline-block mr-2" />
                        Contact
                      </button>
                    </div>
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

export default DiningReservations;
