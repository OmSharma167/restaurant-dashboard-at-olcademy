import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ComparisonChart({ timePeriod, serviceView, data }) {
  // Get all unique years from both takeaway and dinein data for the given timePeriod
  const allYears = [
    ...new Set([
      ...data.takeaway[timePeriod].map((item) => item.name),
      ...data.dinein[timePeriod].map((item) => item.name),
    ]),
  ].sort();

  const comparisonData = allYears.map((year) => {
    // Handle different data structures between time periods
    const getOrders = (item, serviceType) => {
      if (timePeriod === "yearly") {
        return serviceType === "takeaway"
          ? item.takeawayOrders
          : item.dineinOrders;
      }
      return item.orders;
    };

    const takeawayItem =
      data.takeaway[timePeriod].find((item) => item.name === year) || {};

    const dineinItem =
      data.dinein[timePeriod].find((item) => item.name === year) || {};

    return {
      name: year,
      takeawayOrders: getOrders(takeawayItem, "takeaway") || 0,
      dineinOrders: getOrders(dineinItem, "dinein") || 0,
      totalOrders:
        (takeawayItem.totalOrders || 0) + (dineinItem.totalOrders || 0),
    };
  });

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Comparison</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {serviceView === "both" && (
              <>
                <Bar
                  dataKey="takeawayOrders"
                  name="Takeaway Orders"
                  fill="#10b981"
                  barSize={30}
                />
                <Bar
                  dataKey="dineinOrders"
                  name="Dine-in Orders"
                  fill="#8884d8"
                  barSize={30}
                />
              </>
            )}
            {serviceView === "dinein" && (
              <Bar
                dataKey="dineinOrders"
                name="Dine-in Orders"
                fill="#8884d8"
                barSize={30}
              />
            )}
            {serviceView === "takeaway" && (
              <Bar
                dataKey="takeawayOrders"
                name="Takeaway Orders"
                fill="#10b981"
                barSize={30}
              />
            )}
            {serviceView === "all" && (
              <Bar
                dataKey="totalOrders"
                name="Total Orders"
                fill="#ff7300"
                barSize={30}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
