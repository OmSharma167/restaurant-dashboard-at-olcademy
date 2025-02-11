import React from "react";
import {
  FaClock,
  FaCheckCircle,
  FaCreditCard,
  FaUtensils,
} from "react-icons/fa";
import { ORDER_STATUS } from "./types"; // ✅ Fix: Import ORDER_STATUS

export const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: <FaClock className="w-4 h-4" />,
        };
      case ORDER_STATUS.PREPARING:
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <FaUtensils className="w-4 h-4" />,
        };
      case ORDER_STATUS.SERVED:
        return {
          color: "bg-green-100 text-green-800",
          icon: <FaCheckCircle className="w-4 h-4" />,
        };
      case ORDER_STATUS.PAID:
        return {
          color: "bg-purple-100 text-purple-800",
          icon: <FaCreditCard className="w-4 h-4" />,
        };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: null };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`${config.color} flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium`}
    >
      {config.icon}
      <span className="capitalize">{status}</span>
    </span>
  );
};
