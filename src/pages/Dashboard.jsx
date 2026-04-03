import React, { useEffect, useState } from "react";
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
import API_BASE_URL from "../config/api";

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/v1/medical_reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setReports(data);
    };

    fetchReports();
  }, []);

  const chartData = reports.map((r) => ({
    date: new Date(r.created_at).toLocaleDateString(),
    risk:
      r.risk_level === "Low"
        ? 1
        : r.risk_level === "Medium"
        ? 2
        : 3,
  }));

  const riskData = [
    { name: "Low", value: reports.filter(r => r.risk_level === "Low").length },
    { name: "Medium", value: reports.filter(r => r.risk_level === "Medium").length },
    { name: "High", value: reports.filter(r => r.risk_level === "High").length },
  ];

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2>Reports Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="risk" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2>Risk Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Dashboard;