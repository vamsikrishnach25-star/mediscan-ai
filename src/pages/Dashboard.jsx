import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API_BASE_URL from "../config/api";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/medical_reports`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  // Stats — risk_level lives inside ai_analysis, not on the report itself,
  // and the AI only ever outputs Low/Moderate/High/Critical (never "Medium").
  const getRisk = (r) => r.ai_analysis?.risk_level;
  const totalReports = reports.length;
  const highRisk = reports.filter((r) => ["High", "Critical"].includes(getRisk(r))).length;
  const lowRisk = reports.filter((r) => getRisk(r) === "Low").length;
  const moderateRisk = reports.filter((r) => getRisk(r) === "Moderate").length;

  const RISK_SCORE = { Low: 1, Moderate: 2, High: 3, Critical: 4 };

  // Chart data — oldest first, so the trend line reads left-to-right
  const chartData = [...reports]
    .reverse()
    .map((r) => ({
      date: new Date(r.created_at).toLocaleDateString(),
      risk: RISK_SCORE[getRisk(r)] ?? 0,
    }));

  const riskData = [
    { name: "Low", value: lowRisk, color: "#22c55e" },
    { name: "Moderate", value: moderateRisk, color: "#f59e0b" },
    { name: "High", value: highRisk, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No reports yet. Upload one to get started 🚀
        </div>
      )}

      {/* Stats Cards */}
      {reports.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95}}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl cursor-pointer"
            >
              <p className="text-sm text-gray-500">Total Reports</p>
              <h2 className="text-2xl font-bold">{totalReports}</h2>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
            >
              <p className="text-sm text-gray-500">High Risk Cases</p>
              <h2 className="text-2xl font-bold text-red-500">{highRisk}</h2>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow"
            >
              <p className="text-sm text-gray-500">Low Risk Cases</p>
              <h2 className="text-2xl font-bold text-green-500">{lowRisk}</h2>
            </motion.div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="p-6 rounded-2xl shadow-sm backdrop-blur bg-white/70 dark:bg-gray-800/70 border border-white/20">
              <h2 className="mb-4 font-semibold">Reports Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="risk" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-6 rounded-2xl shadow-sm backdrop-blur bg-white/70 dark:bg-gray-800/70 border border-white/20">
              <h2 className="mb-4 font-semibold">Risk Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={riskData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {riskData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;