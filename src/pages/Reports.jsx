import React, { useState } from "react";

/* ---------------- MOCK REPORT DATA ---------------- */

const mockReports = [
  {
    id: 1,
    name: "Blood Test Report",
    date: "2025-01-10",
    status: "Normal",
    confidence: 98,
    summary: "All blood parameters are within the normal range.",
    abnormalities: [],
  },
  {
    id: 2,
    name: "Liver Function Test",
    date: "2025-01-12",
    status: "Abnormal",
    confidence: 91,
    summary: "Elevated SGPT and SGOT levels detected.",
    abnormalities: ["SGPT high", "SGOT high"],
  },
  {
    id: 3,
    name: "Thyroid Profile",
    date: "2025-01-15",
    status: "Normal",
    confidence: 95,
    summary: "Thyroid hormone levels are normal.",
    abnormalities: [],
  },
];

/* ---------------- COMPONENT ---------------- */

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

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
            {mockReports.map((report) => (
              <tr
                key={report.id}
                className="border-t border-gray-100 dark:border-gray-700 text-sm"
              >
                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                  {report.name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {report.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        report.status === "Normal"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                  {report.confidence}%
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
              {selectedReport.name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Date: {selectedReport.date}
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
                  {selectedReport.confidence}%
                </p>
              </div>

              {selectedReport.abnormalities.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-600 dark:text-red-400">
                    Abnormalities
                  </h3>
                  <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400">
                    {selectedReport.abnormalities.map((item, idx) => (
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
