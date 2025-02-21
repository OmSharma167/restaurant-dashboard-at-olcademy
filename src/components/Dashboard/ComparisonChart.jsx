// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function ComparisonChart({ timePeriod, data }) {
//   const comparisonData = data.takeaway[timePeriod].map((item, index) => ({
//     name: item.name,
//     takeawayOrders: item.orders,
//     dineinOrders: data.dinein[timePeriod][index].orders,
//   }));

//   return (
//     <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">
//         Service Comparison -{" "}
//         {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
//       </h2>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={comparisonData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="takeawayOrders"
//               name="Takeaway Orders"
//               stroke="#10b981"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="dineinOrders"
//               name="Dine-in Orders"
//               stroke="#8884d8"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ComparisonChart({
  initialTimePeriod,
  data,
  onTimePeriodChange,
}) {
  const [timePeriod, setTimePeriod] = useState(initialTimePeriod || "daily");

  const getTabStyle = (tab) => {
    return tab === timePeriod
      ? "px-3 py-1 bg-white rounded-md shadow-sm text-indigo-600 font-medium"
      : "px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md";
  };

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    if (onTimePeriodChange) {
      onTimePeriodChange(period);
    }
  };

  const comparisonData = data.takeaway[timePeriod].map((item, index) => ({
    name: item.name,
    takeawayOrders: item.orders,
    dineinOrders: data.dinein[timePeriod][index].orders,
  }));

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Service Comparison -{" "}
          {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
        </h2>
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            className={getTabStyle("daily")}
            onClick={() => handleTimePeriodChange("daily")}
          >
            Daily
          </button>
          <button
            className={getTabStyle("weekly")}
            onClick={() => handleTimePeriodChange("weekly")}
          >
            Weekly
          </button>
          <button
            className={getTabStyle("monthly")}
            onClick={() => handleTimePeriodChange("monthly")}
          >
            Monthly
          </button>
          <button
            className={getTabStyle("yearly")}
            onClick={() => handleTimePeriodChange("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="takeawayOrders"
              name="Takeaway Orders"
              stroke="#10b981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="dineinOrders"
              name="Dine-in Orders"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}