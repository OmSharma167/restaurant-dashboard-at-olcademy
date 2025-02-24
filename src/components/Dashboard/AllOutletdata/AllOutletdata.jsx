import React, { useState } from "react";
import {
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  Users,
  Star,
  ShoppingBag,
  Repeat,
  Target,
  Calendar,
  Layers,
  UtensilsCrossed,
  ShoppingBasket,
} from "lucide-react";

// MetricCard Component
const MetricCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
    </div>
    <div className="mt-4 flex items-center">
      <span
        className={`text-sm ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
      </span>
      <span className="text-gray-500 text-sm ml-2">vs last period</span>
    </div>
  </div>
);

const AllOutletData = () => {
  const [activeService, setActiveService] = useState("diningIn");
  const [timePeriod, setTimePeriod] = useState("all");

  // Sample outlet data - replace with your actual data
  const outletData = [
  {
    name: "Outlet 1",
    services: {
      diningIn: {
        orders: 1200,
        averageRating: 4.5,
        orderAccuracyRate: 98,
      },
      takeaway: {
        orders: 800,
        averageRating: 4.3,
        orderAccuracyRate: 97,
      },
    },
    totalCustomers: 2000,
  },
  {
    name: "Outlet 2",
    services: {
      diningIn: {
        orders: 1500,
        averageRating: 4.7,
        orderAccuracyRate: 99,
      },
      takeaway: {
        orders: 1000,
        averageRating: 4.4,
        orderAccuracyRate: 96,
      },
    },
    totalCustomers: 2500,
  },
  {
    name: "Outlet 3",
    services: {
      diningIn: {
        orders: 1800,
        averageRating: 4.6,
        orderAccuracyRate: 97,
      },
      takeaway: {
        orders: 1100,
        averageRating: 4.2,
        orderAccuracyRate: 95,
      },
    },
    totalCustomers: 2900,
  },
  {
    name: "Outlet 4",
    services: {
      diningIn: {
        orders: 1300,
        averageRating: 4.4,
        orderAccuracyRate: 96,
      },
      takeaway: {
        orders: 900,
        averageRating: 4.1,
        orderAccuracyRate: 94,
      },
    },
    totalCustomers: 2200,
  },
  {
    name: "Outlet 5",
    services: {
      diningIn: {
        orders: 1700,
        averageRating: 4.8,
        orderAccuracyRate: 99,
      },
      takeaway: {
        orders: 1300,
        averageRating: 4.5,
        orderAccuracyRate: 98,
      },
    },
    totalCustomers: 3000,
  },
  {
    name: "Outlet 6",
    services: {
      diningIn: {
        orders: 1400,
        averageRating: 4.3,
        orderAccuracyRate: 97,
      },
      takeaway: {
        orders: 950,
        averageRating: 4.0,
        orderAccuracyRate: 95,
      },
    },
    totalCustomers: 2350,
  },
  {
    name: "Outlet 7",
    services: {
      diningIn: {
        orders: 1600,
        averageRating: 4.5,
        orderAccuracyRate: 98,
      },
      takeaway: {
        orders: 1050,
        averageRating: 4.2,
        orderAccuracyRate: 96,
      },
    },
    totalCustomers: 2650,
  },
  {
    name: "Outlet 8",
    services: {
      diningIn: {
        orders: 1900,
        averageRating: 4.9,
        orderAccuracyRate: 99,
      },
      takeaway: {
        orders: 1400,
        averageRating: 4.6,
        orderAccuracyRate: 98,
      },
    },
    totalCustomers: 3300,
  },
];



  const getFilterMultiplier = () => {
    switch (timePeriod) {
      case "week":
        return 0.2;
      case "month":
        return 0.5;
      case "year":
        return 0.8;
      default:
        return 1;
    }
  };

  const multiplier = getFilterMultiplier();

  const calculateMetrics = (service) => {
    const metrics = outletData.reduce(
      (acc, outlet) => {
        const serviceData = outlet.services[service];
        return {
          totalOrders: acc.totalOrders + serviceData.orders * multiplier,
          avgRating: acc.avgRating + serviceData.averageRating,
          avgRepeatRate:
            acc.avgRepeatRate + serviceData.repeatCustomerPercentage,
          avgAccuracyRate: acc.avgAccuracyRate + serviceData.orderAccuracyRate,
        };
      },
      { totalOrders: 0, avgRating: 0, avgRepeatRate: 0, avgAccuracyRate: 0 }
    );

    const outletCount = outletData.length;
    return {
      totalOrders: Math.round(metrics.totalOrders),
      avgRating: metrics.avgRating / outletCount,
      avgRepeatRate: metrics.avgRepeatRate / outletCount,
      avgAccuracyRate: metrics.avgAccuracyRate / outletCount,
    };
  };

  const metrics =
    activeService === "both"
      ? (() => {
          const diningMetrics = calculateMetrics("diningIn");
          const takeawayMetrics = calculateMetrics("takeaway");
          return [
            {
              title: "Total Customers",
              value: Math.round(
                outletData.reduce(
                  (sum, outlet) => sum + outlet.totalCustomers * multiplier,
                  0
                )
              ).toLocaleString(),
              icon: <Users className="text-blue-500" />,
              trend: 12.5,
            },
            {
              title: "Total Orders",
              value: (
                diningMetrics.totalOrders + takeawayMetrics.totalOrders
              ).toLocaleString(),
              icon: <ShoppingBag className="text-green-500" />,
              trend: 15.3,
            },
            // {
            //   title: "Average Rating",
            //   value: (
            //     (diningMetrics.avgRating + takeawayMetrics.avgRating) /
            //     2
            //   ).toFixed(1),
            //   icon: <Star className="text-yellow-500" />,
            //   trend: 8.2,
            // },
            // {
            //   title: "Repeat Customers",
            //   value: `${(
            //     (diningMetrics.avgRepeatRate + takeawayMetrics.avgRepeatRate) /
            //     2
            //   ).toFixed(1)}%`,
            //   icon: <Repeat className="text-purple-500" />,
            //   trend: 5.7,
            // },
            {
              title: "Order Accuracy",
              value: `${(
                (diningMetrics.avgAccuracyRate +
                  takeawayMetrics.avgAccuracyRate) /
                2
              ).toFixed(1)}%`,
              icon: <Target className="text-red-500" />,
              trend: 2.1,
            },
          ];
        })()
      : (() => {
          const serviceMetrics = calculateMetrics(activeService);
          return [
            {
              title: "Total Customers",
              value: Math.round(
                outletData.reduce(
                  (sum, outlet) => sum + outlet.totalCustomers * multiplier,
                  0
                )
              ).toLocaleString(),
              icon: <Users className="text-blue-500" />,
              trend: 12.5,
            },
            {
              title: "Total Orders",
              value: serviceMetrics.totalOrders.toLocaleString(),
              icon: <ShoppingBag className="text-green-500" />,
              trend: 15.3,
            },
            {
              title: "Average Rating",
              value: serviceMetrics.avgRating.toFixed(1),
              icon: <Star className="text-yellow-500" />,
              trend: 8.2,
            },
            // {
            //   title: "Repeat Customers",
            //   value: `${serviceMetrics.avgRepeatRate.toFixed(1)}%`,
            //   icon: <Repeat className="text-purple-500" />,
            //   trend: 5.7,
            // },
            {
              title: "Order Accuracy",
              value: `${serviceMetrics.avgAccuracyRate.toFixed(1)}%`,
              icon: <Target className="text-red-500" />,
              trend: 2.1,
            },
          ];
        })();

  const chartData = outletData.map((outlet) => ({
    name: outlet.name,
    diningOrders: Math.round(outlet.services.diningIn.orders * multiplier),
    takeawayOrders: Math.round(outlet.services.takeaway.orders * multiplier),
    diningRating: outlet.services.diningIn.averageRating,
    takeawayRating: outlet.services.takeaway.averageRating,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            All Outlet Report
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
              {["week", "month", "year", "all"].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    timePeriod === period
                      ? "bg-indigo-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveService("diningIn")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeService === "diningIn"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UtensilsCrossed className="w-5 h-5" />
                Dining In
              </button>
              <button
                onClick={() => setActiveService("takeaway")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeService === "takeaway"
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingBasket className="w-5 h-5" />
                Takeaway
              </button>
              <button
                onClick={() => setActiveService("both")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeService === "both"
                    ? "bg-purple-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Layers className="w-5 h-5" />
                Both
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Orders by Outlet</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {activeService === "both" ? (
                    <>
                      <Bar
                        dataKey="diningOrders"
                        name="Dining Orders"
                        fill="rgba(59, 130, 246, 0.5)"
                        stroke="rgb(59, 130, 246)"
                      />
                      <Bar
                        dataKey="takeawayOrders"
                        name="Takeaway Orders"
                        fill="rgba(34, 197, 94, 0.5)"
                        stroke="rgb(34, 197, 94)"
                      />
                    </>
                  ) : (
                    <Bar
                      dataKey={
                        activeService === "diningIn"
                          ? "diningOrders"
                          : "takeawayOrders"
                      }
                      name={`${
                        activeService === "diningIn" ? "Dining" : "Takeaway"
                      } Orders`}
                      fill={
                        activeService === "diningIn"
                          ? "rgba(59, 130, 246, 0.5)"
                          : "rgba(34, 197, 94, 0.5)"
                      }
                      stroke={
                        activeService === "diningIn"
                          ? "rgb(59, 130, 246)"
                          : "rgb(34, 197, 94)"
                      }
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOutletData;
