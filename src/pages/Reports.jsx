import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { AlertTriangle, CheckCircle, XCircle, Apple, Stethoscope, X, TrendingUp, TrendingDown, Minus } from "lucide-react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("timeline");

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

  // ✅ Read from both ai_analysis and direct fields
  const getAnalysis = (report) => report.ai_analysis || report;
  const getRiskLevel = (report) => report.ai_analysis?.risk_level || report.risk_level || "Unknown";
  const getHealthScore = (report) => report.ai_analysis?.health_score ?? report.health_score ?? null;
  const getReportType = (report) => report.ai_analysis?.report_type || report.file_name || "Medical Report";

  const getRiskColor = (risk) => {
    if (risk === "Low") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (risk === "Moderate") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    if (risk === "High") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (risk === "Critical") return "bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300";
    return "bg-gray-100 text-gray-700";
  };

  const getRiskDotColor = (risk) => {
    if (risk === "Low") return "#22c55e";
    if (risk === "Moderate") return "#f59e0b";
    if (risk === "High") return "#ef4444";
    if (risk === "Critical") return "#dc2626";
    return "#94a3b8";
  };

  const getRiskScore = (risk) => {
    if (risk === "Low") return 1;
    if (risk === "Moderate") return 2;
    if (risk === "High") return 3;
    if (risk === "Critical") return 4;
    return 0;
  };

  const healthScoreData = [...reports].reverse().map((r) => ({
    date: new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    score: getHealthScore(r) ?? getRiskScore(getRiskLevel(r)) * 20,
    riskLabel: getRiskLevel(r),
  }));

  const getTrend = () => {
    if (reports.length < 2) return null;
    const latest = getRiskScore(getRiskLevel(reports[0]));
    const previous = getRiskScore(getRiskLevel(reports[1]));
    if (latest < previous) return "improving";
    if (latest > previous) return "worsening";
    return "stable";
  };

  const trend = getTrend();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-gray-500 mt-1">Your complete health report history</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${
            trend === "improving" ? "bg-green-100 text-green-700"
            : trend === "worsening" ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700"
          }`}>
            {trend === "improving" ? <TrendingDown size={16} />
            : trend === "worsening" ? <TrendingUp size={16} />
            : <Minus size={16} />}
            Health is {trend === "improving" ? "Improving 🎉" : trend === "worsening" ? "Worsening ⚠️" : "Stable"}
          </div>
        )}
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📋</div>
          <h2 className="text-xl font-semibold mb-2">No Reports Yet</h2>
          <p className="text-gray-500 mb-6">Upload your first medical report to see history</p>
          <a href="/ai-scan" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            🔬 Analyze a Report
          </a>
        </div>
      ) : (
        <>
          {/* Health Score Tracker */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="font-bold text-lg mb-1">📈 Health Score Tracker</h2>
            <p className="text-gray-500 text-sm mb-4">
              Lower score = healthier. Track your health trend over time.
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={healthScoreData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}`, "Health Score"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
                <p className="text-xs text-gray-500">Total Reports</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter(r => getRiskLevel(r) === "Low").length}
                </p>
                <p className="text-xs text-gray-500">Low Risk</p>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <p className="text-2xl font-bold text-red-500">
                  {reports.filter(r => ["High", "Critical"].includes(getRiskLevel(r))).length}
                </p>
                <p className="text-xs text-gray-500">High Risk</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {["timeline", "table"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow"
                }`}>
                {tab === "timeline" ? "🕐 Timeline" : "📋 Table"}
              </button>
            ))}
          </div>

          {/* Timeline View */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              {reports.map((report, i) => {
                const risk = getRiskLevel(report);
                const score = getHealthScore(report);
                const a = getAnalysis(report);

                return (
                  <div key={report.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        background: getRiskDotColor(risk),
                        border: "3px solid white",
                        boxShadow: `0 0 0 2px ${getRiskDotColor(risk)}`,
                        flexShrink: 0, marginTop: "20px"
                      }} />
                      {i < reports.length - 1 && (
                        <div style={{ width: "2px", flex: 1, background: "#e2e8f0", minHeight: "20px" }} />
                      )}
                    </div>

                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-2 hover:shadow-md transition cursor-pointer"
                      onClick={() => setSelectedReport(report)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-base">{getReportType(report)}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(report.created_at).toLocaleDateString("en-IN", {
                              day: "numeric", month: "long", year: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {score !== null && (
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Health Score</p>
                              <p className="text-lg font-bold text-blue-600">{score}</p>
                            </div>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk)}`}>
                            {risk}
                          </span>
                        </div>
                      </div>

                      {a?.summary && (
                        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{a.summary}</p>
                      )}

                      {(a?.abnormal_markers?.length > 0 || a?.findings?.length > 0) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {(a?.abnormal_markers || a?.findings || []).slice(0, 3).map((m, j) => (
                            <span key={j} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 px-2 py-1 rounded-lg">
                              ⚠️ {m}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-blue-500 mt-3 font-medium">Click to view full details →</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table View */}
          {activeTab === "table" && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left">Report Type</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Health Score</th>
                    <th className="px-6 py-4 text-left">Risk</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => {
                    const risk = getRiskLevel(report);
                    const score = getHealthScore(report);
                    return (
                      <tr key={report.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td className="px-6 py-4 font-medium">{getReportType(report)}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-blue-600">{score ?? "—"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskColor(risk)}`}>
                            {risk}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => setSelectedReport(report)}
                            className="text-blue-600 hover:underline text-sm font-medium">
                            View Details →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Full Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedReport(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}>

            <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold">{getReportType(selectedReport)}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(selectedReport.created_at).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </p>
              </div>
              <button onClick={() => setSelectedReport(null)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {(() => {
                // ✅ Read from both ai_analysis and direct fields
                const a = selectedReport.ai_analysis || selectedReport;
                const risk = getRiskLevel(selectedReport);

                return (
                  <>
                    {/* Summary + Risk */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{a.summary || "No summary available"}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <h3 className="font-semibold mb-2">Risk Level</h3>
                        <p className={`text-2xl font-bold ${
                          risk === "Low" ? "text-green-500"
                          : risk === "Moderate" ? "text-yellow-500"
                          : "text-red-500"
                        }`}>{risk}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {a.severity_score || 0} abnormal marker(s)
                        </p>
                      </div>
                    </div>

                    {/* Biomarkers */}
                    {a.highlighted_biomarkers?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Biomarker Status</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {a.highlighted_biomarkers.map((b, i) => (
                            <div key={i} className={`p-3 rounded-xl text-sm ${
                              b.status === "HIGH" ? "bg-red-50 text-red-600 dark:bg-red-900/20"
                              : b.status === "LOW" ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20"
                              : "bg-green-50 text-green-600 dark:bg-green-900/20"
                            }`}>
                              <p className="font-medium text-xs">{b.name}</p>
                              <p className="text-lg font-bold">{b.value}</p>
                              <p className="text-xs">{b.status}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Biomarkers from direct field */}
                    {!a.highlighted_biomarkers && a.biomarkers && Object.keys(a.biomarkers).length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Biomarkers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(a.biomarkers).map(([name, value], i) => (
                            <div key={i} className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-sm">
                              <p className="font-medium text-xs text-gray-600">{name}</p>
                              <p className="text-lg font-bold text-blue-600">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Findings + Conditions */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {a.findings?.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-yellow-500" /> Findings
                          </h3>
                          <ul className="space-y-1">
                            {a.findings.map((f, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-yellow-500 mt-0.5">•</span>{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {a.possible_conditions?.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <XCircle size={16} className="text-red-400" /> Possible Conditions
                          </h3>
                          <ul className="space-y-1">
                            {a.possible_conditions.map((c, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">•</span>{c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Food Suggestions */}
                    {a.food_suggestions && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Apple size={16} className="text-green-500" /> Food Suggestions
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                            <p className="font-medium text-green-700 dark:text-green-400 mb-2 text-sm">✅ Foods to Eat</p>
                            <ul className="space-y-1">
                              {a.food_suggestions.foods_to_eat?.map((f, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✓ {f}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                            <p className="font-medium text-red-600 mb-2 text-sm">❌ Foods to Avoid</p>
                            <ul className="space-y-1">
                              {a.food_suggestions.foods_to_avoid?.map((f, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✗ {f}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Doctor Advice */}
                    {a.doctor_advice && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Stethoscope size={16} className="text-blue-500" /> Doctor Advice
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                            <p className="text-xs text-gray-500">Specialist</p>
                            <p className="font-bold text-blue-700 dark:text-blue-300">{a.doctor_advice.specialist_to_see}</p>
                            <p className="text-xs text-gray-500 mt-2">Urgency</p>
                            <p className={`font-bold ${
                              a.doctor_advice.urgency === "Emergency" ? "text-red-600"
                              : a.doctor_advice.urgency === "Urgent" ? "text-yellow-600"
                              : "text-green-600"
                            }`}>{a.doctor_advice.urgency}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Lifestyle Tips</p>
                            <ul className="space-y-1">
                              {a.doctor_advice.lifestyle_tips?.map((t, i) => (
                                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                  <CheckCircle size={12} className="text-blue-500 mt-0.5 shrink-0" />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {a.doctor_advice.warning_signs?.length > 0 && (
                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl mt-3">
                            <p className="font-medium text-red-600 mb-2 flex items-center gap-2">
                              <AlertTriangle size={14} /> Warning Signs
                            </p>
                            <ul className="grid md:grid-cols-2 gap-1">
                              {a.doctor_advice.warning_signs.map((s, i) => (
                                <li key={i} className="text-sm text-red-700 dark:text-red-300">⚠️ {s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Recommendations */}
                    {a.recommendations?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">💡 Recommendations</h3>
                        <ul className="space-y-1">
                          {a.recommendations.map((r, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                              <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />{r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;