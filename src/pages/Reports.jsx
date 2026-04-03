import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

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

  const getRiskColor = (risk) => {
    if (risk === "Low") return "bg-green-100 text-green-700";
    if (risk === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-gray-500">All your AI analyzed reports</p>
      </div>

      {/* Modern Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left">Report</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Risk</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {report.file_name}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(report.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(
                      report.risk_level
                    )}`}
                  >
                    {report.risk_level}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* 🔥 MODAL UPGRADE */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-xl space-y-4 shadow-lg">

            <h2 className="text-xl font-bold">
              {selectedReport.file_name}
            </h2>

            <p className="text-sm text-gray-500">
              {new Date(selectedReport.created_at).toLocaleString()}
            </p>

            <div>
              <h3 className="font-semibold">Summary</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedReport.summary}
              </p>
            </div>

            {selectedReport.findings?.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-500">Findings</h3>
                <ul className="list-disc ml-6">
                  {selectedReport.findings.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Reports;