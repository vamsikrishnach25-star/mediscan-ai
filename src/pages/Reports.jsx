import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
/* ---------------- COMPONENT ---------------- */

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/v1/medical_reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchReports();
}, []);

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your AI-generated medical reports
        </p>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="text-left text-sm text-gray-600 dark:text-gray-300">
              <th className="px-6 py-3">Report</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Confidence</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t border-gray-100 dark:border-gray-700 text-sm"
              >
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  {report.file_name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {new Date(report.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        report.risk_level === "Low"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                  >
                    {report.risk_level}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                      N/A
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-lg relative">

            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {selectedReport.file_name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Date: {new Date(selectedReport.created_at).toLocaleString()}
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedReport.summary}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  Confidence
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  N/A
                </p>
              </div>

              {selectedReport.findings?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-600 dark:text-red-400">
                    Abnormalities
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400">
                        {selectedReport.findings?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                Download
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
