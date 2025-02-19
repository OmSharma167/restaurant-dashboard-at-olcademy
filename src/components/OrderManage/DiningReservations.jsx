import React from "react";
import { FaClock, FaUser, FaPhone, FaCheck, FaTimes } from "react-icons/fa";

const DiningReservations = ({ reservations = [], onUpdateStatus }) => {
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
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    {reservation.status === "pending" && (
                      <>
                        <button
                          className="text-green-600 hover:text-green-800 bg-green-100 hover:bg-green-200 p-2 rounded"
                          onClick={() =>
                            handleAction(reservation.id, "accepted")
                          }
                          title="Accept"
                        >
                          <FaCheck className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-2 rounded"
                          onClick={() =>
                            handleAction(reservation.id, "rejected")
                          }
                          title="Reject"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <a
                      href={`tel:${reservation.phone}`}
                      className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 p-2 rounded inline-flex"
                      title="Contact"
                    >
                      <FaPhone className="w-4 h-4" />
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
