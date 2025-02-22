



// DiningReservations.jsx
import React from "react";
import { FaClock, FaUser, FaPhone, FaCheck, FaTimes, FaCheckCircle } from "react-icons/fa";

const DiningReservations = ({ reservations = [], onUpdateStatus }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-green-200 text-green-900";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatOfferLabel = (offer) => {
    const offerLabels = {
      percentage: "Percentage Discount",
      fixed: "Fixed Discount",
      bogo: "Buy One Get One",
      buyXgetY: "Buy X Get Y Free",
      bundle: "Bundled Offer",
    };
    return offerLabels[offer] || offer;
  };

  const stats = {
    totalReservations: reservations.length,
    pendingReservations: reservations.filter((res) => res.status === "pending").length,
    totalGuests: reservations.reduce((sum, res) => sum + (res.guestCount || 0), 0),
  };

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
              {["Name", "Guests", "Time Slot", "Offers", "Status", "Actions"].map((header) => (
                <th key={header} className="text-left py-4 px-6 font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
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
                    {new Date(reservation.timeSlot).toLocaleString([], {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {reservation.offers?.map((offer) => (
                    <span
                      key={offer}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {formatOfferLabel(offer)}
                    </span>
                  ))}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(reservation.status)}`}
                  >
                    {reservation.status || "Pending"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    {reservation.status === "pending" && (
                      <>
                        <button
                          className="p-2 rounded bg-green-100 hover:bg-green-200"
                          onClick={() => onUpdateStatus(reservation.id, "accepted")}
                          title="Accept"
                        >
                          <FaCheck className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          className="p-2 rounded bg-red-100 hover:bg-red-200"
                          onClick={() => onUpdateStatus(reservation.id, "rejected")}
                          title="Reject"
                        >
                          <FaTimes className="w-4 h-4 text-red-600" />
                        </button>
                      </>
                    )}
                    {reservation.status === "accepted" && (
                      <button
                        className="p-2 rounded bg-blue-100 hover:bg-blue-200"
                        onClick={() => onUpdateStatus(reservation.id, "completed")}
                        title="Complete"
                      >
                        <FaCheckCircle className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                    <a
                      href={`tel:${reservation.phone}`}
                      className="p-2 rounded bg-blue-100 hover:bg-blue-200"
                      title="Contact"
                    >
                      <FaPhone className="w-4 h-4 text-blue-600" />
                    </a>
                  </div>
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