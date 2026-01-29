// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const reportsOverTime = [
  { month: "Jan", reports: 12 },
  { month: "Feb", reports: 18 },
  { month: "Mar", reports: 25 },
  { month: "Apr", reports: 32 },
  { month: "May", reports: 41 },
  { month: "Jun", reports: 50 },
];

const reportStatusData = [
  { name: "Normal", value: 105 },
  { name: "Abnormal", value: 23 },
];

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">
          Welcome back, Mr. VK! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your AI-powered medical insights are ready. 3 new reports analyzed today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Reports Analyzed",
            value: "128",
            color: "text-gray-900 dark:text-white",
          },
          {
            title: "Abnormal Results",
            value: "23",
            color: "text-red-600 dark:text-red-400",
          },
          {
            title: "AI Accuracy",
            value: "96%",
            color: "text-green-600 dark:text-green-400",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6
              border border-gray-100 dark:border-gray-700
              transition-all duration-300
              hover:shadow-md hover:-translate-y-0.5"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </h3>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Reports Analyzed Over Time
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={reportsOverTime}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Report Status Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={reportStatusData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Scan New Report
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            View History
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
