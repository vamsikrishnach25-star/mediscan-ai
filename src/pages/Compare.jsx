import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
import { TrendingUp, TrendingDown, Minus, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Compare = () => {
  const [reports, setReports] = useState([]);
  const [report1, setReport1] = useState(null);
  const [report2, setReport2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [language, setLanguage] = useState("English");
  const [analysis1, setAnalysis1] = useState(null);
  const [analysis2, setAnalysis2] = useState(null);
  const navigate = useNavigate();

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

  const getAnalysis = (report) => report.ai_analysis || report;
  const getRiskLevel = (a) => a?.risk_level || "Unknown";
  const getReportType = (report) => report.ai_analysis?.report_type || report.file_name || "Medical Report";

  const getRiskScore = (risk) => {
    if (risk === "Low") return 1;
    if (risk === "Moderate") return 2;
    if (risk === "High") return 3;
    if (risk === "Critical") return 4;
    return 0;
  };

  const getRiskColor = (risk) => {
    if (risk === "Low") return "#22c55e";
    if (risk === "Moderate") return "#f59e0b";
    if (risk === "High") return "#ef4444";
    if (risk === "Critical") return "#dc2626";
    return "#94a3b8";
  };

  const getComparisonIcon = (val1, val2) => {
    if (val1 < val2) return <TrendingUp size={16} className="text-red-500 mx-auto" />;
    if (val1 > val2) return <TrendingDown size={16} className="text-green-500 mx-auto" />;
    return <Minus size={16} className="text-gray-400 mx-auto" />;
  };

  // 🔥 Re-analyze both reports in chosen language
  const handleCompare = async () => {
    if (!report1 || !report2) return alert("Please select both reports!");
    setComparing(true);
    setAnalysis1(null);
    setAnalysis2(null);

    try {
      const token = localStorage.getItem("token");

      // Re-analyze report 1
      const r1 = getAnalysis(report1);
      const text1 = report1.extracted_text || r1?.extracted_text || "";

      // Re-analyze report 2
      const r2 = getAnalysis(report2);
      const text2 = report2.extracted_text || r2?.extracted_text || "";

      // Call backend to re-analyze in chosen language. Uses /reanalyze,
      // which re-runs the AI over text we already have — it deliberately
      // doesn't touch the originally stored report.
      const [res1, res2] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/reanalyze`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            extracted_text: text1,
            language: language,
          }),
        }),
        fetch(`${API_BASE_URL}/api/v1/reanalyze`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            extracted_text: text2,
            language: language,
          }),
        })
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setAnalysis1(data1.analysis || data1.ai_analysis || data1);
      setAnalysis2(data2.analysis || data2.ai_analysis || data2);

    } catch (err) {
      console.error(err);
      alert("Failed to compare. Try again!");
    } finally {
      setComparing(false);
    }
  };

  const r1 = analysis1 || (report1 ? getAnalysis(report1) : null);
  const r2 = analysis2 || (report2 ? getAnalysis(report2) : null);

  const risk1 = r1 ? getRiskLevel(r1) : null;
  const risk2 = r2 ? getRiskLevel(r2) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/reports")}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Compare Reports</h1>
          <p className="text-gray-500 mt-1">Compare two reports in your preferred language</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="font-semibold mb-3">🌍 Choose Comparison Language</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { code: "English", label: "🇬🇧 English" },
            { code: "Telugu", label: "🇮🇳 తెలుగు" },
            { code: "Hindi", label: "🇮🇳 हिंदी" },
            { code: "Tamil", label: "🇮🇳 தமிழ்" },
          ].map(lang => (
            <button key={lang.code} onClick={() => setLanguage(lang.code)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                language === lang.code
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}>
              {lang.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Both reports will be re-analyzed in {language} when you click Compare
        </p>
      </div>

      {/* Report Selectors */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Report 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-3 text-blue-600">📋 Report 1 (Older)</h2>
          <select
            className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 dark:bg-gray-700 dark:text-white outline-none"
            onChange={(e) => {
              const r = reports.find(rep => rep.id === parseInt(e.target.value));
              setReport1(r || null);
              setAnalysis1(null);
            }}
            defaultValue="">
            <option value="">Select a report...</option>
            {reports.map(r => (
              <option key={r.id} value={r.id}>
                {getReportType(r)} — {new Date(r.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>

          {report1 && (
            <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="font-bold">{getReportType(report1)}</p>
              <p className="text-sm text-gray-500">
                {new Date(report1.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </p>
              <p className="font-bold mt-2 text-blue-600">
                Original Risk: {getAnalysis(report1)?.risk_level || report1.risk_level || "Unknown"}
              </p>
            </div>
          )}
        </div>

        {/* Report 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-3 text-purple-600">📋 Report 2 (Newer)</h2>
          <select
            className="w-full border dark:border-gray-600 rounded-xl px-4 py-3 dark:bg-gray-700 dark:text-white outline-none"
            onChange={(e) => {
              const r = reports.find(rep => rep.id === parseInt(e.target.value));
              setReport2(r || null);
              setAnalysis2(null);
            }}
            defaultValue="">
            <option value="">Select a report...</option>
            {reports.map(r => (
              <option key={r.id} value={r.id}>
                {getReportType(r)} — {new Date(r.created_at).toLocaleDateString()}
              </option>
            ))}
          </select>

          {report2 && (
            <div className="mt-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <p className="font-bold">{getReportType(report2)}</p>
              <p className="text-sm text-gray-500">
                {new Date(report2.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </p>
              <p className="font-bold mt-2 text-purple-600">
                Original Risk: {getAnalysis(report2)?.risk_level || report2.risk_level || "Unknown"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compare Button */}
      {report1 && report2 && (
        <div className="text-center">
          <button
            onClick={handleCompare}
            disabled={comparing}
            className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition"
            style={{
              background: comparing ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              boxShadow: comparing ? "none" : "0 8px 30px rgba(59,130,246,0.4)"
            }}>
            {comparing ? (
              <span className="flex items-center gap-3">
                <Loader2 size={20} className="animate-spin" />
                Re-analyzing in {language}... (30-60 sec)
              </span>
            ) : (
              `🔍 Compare in ${language === "English" ? "🇬🇧 English" : language === "Telugu" ? "🇮🇳 తెలుగు" : language === "Hindi" ? "🇮🇳 हिंदी" : "🇮🇳 தமிழ்"}`
            )}
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Both reports will be re-analyzed by AI in {language}
          </p>
        </div>
      )}

      {/* Comparison Results */}
      {r1 && r2 && !comparing && (analysis1 || analysis2) && (
        <div className="space-y-6">

          {/* Language Badge */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
            <p className="text-blue-700 dark:text-blue-300 font-semibold">
              🌍 Comparison in {language} — Both reports re-analyzed by AI
            </p>
          </div>

          {/* Overall Health Change */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="font-bold text-lg mb-4">📊 Overall Health Change</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-500 mb-2">Risk Level</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-bold" style={{ color: getRiskColor(risk1) }}>{risk1}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold" style={{ color: getRiskColor(risk2) }}>{risk2}</span>
                </div>
                <div className="mt-2">
                  {getRiskScore(risk2) < getRiskScore(risk1) ? (
                    <span className="text-green-500 font-semibold text-sm">✅ Improved!</span>
                  ) : getRiskScore(risk2) > getRiskScore(risk1) ? (
                    <span className="text-red-500 font-semibold text-sm">⚠️ Worsened</span>
                  ) : (
                    <span className="text-gray-500 font-semibold text-sm">➡️ No Change</span>
                  )}
                </div>
              </div>

              <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-500 mb-2">Abnormal Markers</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-bold text-red-500">{r1?.severity_score || 0}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-red-500">{r2?.severity_score || 0}</span>
                </div>
                <div className="mt-2">
                  {(r2?.severity_score || 0) < (r1?.severity_score || 0) ? (
                    <span className="text-green-500 font-semibold text-sm">✅ Fewer abnormal!</span>
                  ) : (r2?.severity_score || 0) > (r1?.severity_score || 0) ? (
                    <span className="text-red-500 font-semibold text-sm">⚠️ More abnormal</span>
                  ) : (
                    <span className="text-gray-500 font-semibold text-sm">➡️ Same</span>
                  )}
                </div>
              </div>

              <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-500 mb-2">Health Score</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-bold text-blue-600">{r1?.health_score ?? "—"}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-bold text-blue-600">{r2?.health_score ?? "—"}</span>
                </div>
                <div className="mt-2">
                  {(r2?.health_score ?? 0) < (r1?.health_score ?? 0) ? (
                    <span className="text-green-500 font-semibold text-sm">✅ Better!</span>
                  ) : (r2?.health_score ?? 0) > (r1?.health_score ?? 0) ? (
                    <span className="text-red-500 font-semibold text-sm">⚠️ Worse</span>
                  ) : (
                    <span className="text-gray-500 font-semibold text-sm">➡️ Same</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Side by Side Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-t-4 border-blue-500">
              <h3 className="font-bold mb-3 text-blue-600">📋 Report 1 Summary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{r1?.summary || "No summary"}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border-t-4 border-purple-500">
              <h3 className="font-bold mb-3 text-purple-600">📋 Report 2 Summary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{r2?.summary || "No summary"}</p>
            </div>
          </div>

          {/* Biomarker Comparison */}
          {(r1?.biomarkers || r2?.biomarkers) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="font-bold text-lg mb-4">🔬 Biomarker Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="py-3 text-left text-gray-500">Biomarker</th>
                      <th className="py-3 text-center text-blue-600">Report 1</th>
                      <th className="py-3 text-center text-gray-400">Change</th>
                      <th className="py-3 text-center text-purple-600">Report 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const b1 = r1?.biomarkers || {};
                      const b2 = r2?.biomarkers || {};
                      const allKeys = [...new Set([...Object.keys(b1), ...Object.keys(b2)])];
                      return allKeys.map((key, i) => {
                        const val1 = b1[key] ?? null;
                        const val2 = b2[key] ?? null;
                        const changed = val1 !== null && val2 !== null && val1 !== val2;
                        return (
                          <tr key={i} className={`border-b dark:border-gray-700 ${changed ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}`}>
                            <td className="py-3 font-medium">{key}</td>
                            <td className="py-3 text-center text-blue-600 font-bold">{val1 ?? "—"}</td>
                            <td className="py-3 text-center">
                              {val1 !== null && val2 !== null
                                ? getComparisonIcon(val1, val2)
                                : <Minus size={16} className="text-gray-300 mx-auto" />}
                            </td>
                            <td className="py-3 text-center text-purple-600 font-bold">{val2 ?? "—"}</td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Findings + Conditions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-blue-600">🔍 Report 1 Findings</h3>
              {r1?.findings?.length > 0 ? (
                <ul className="space-y-2">
                  {r1.findings.map((f, i) => (
                    <li key={i} className="text-sm flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-yellow-500">•</span>{f}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-green-500">✅ No abnormal findings</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-purple-600">🔍 Report 2 Findings</h3>
              {r2?.findings?.length > 0 ? (
                <ul className="space-y-2">
                  {r2.findings.map((f, i) => (
                    <li key={i} className="text-sm flex items-start gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-yellow-500">•</span>{f}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-green-500">✅ No abnormal findings</p>}
            </div>
          </div>

          {/* Conditions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-blue-600">🏥 Report 1 Conditions</h3>
              {r1?.possible_conditions?.length > 0 ? (
                <ul className="space-y-1">
                  {r1.possible_conditions.map((c, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="text-red-400">•</span>{c}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-green-500">✅ No conditions</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-purple-600">🏥 Report 2 Conditions</h3>
              {r2?.possible_conditions?.length > 0 ? (
                <ul className="space-y-1">
                  {r2.possible_conditions.map((c, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <span className="text-red-400">•</span>{c}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-green-500">✅ No conditions</p>}
            </div>
          </div>

          {/* Food Suggestions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-blue-600">🥗 Report 1 Food Suggestions</h3>
              {r1?.food_suggestions ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">✅ Eat:</p>
                    <ul className="space-y-1">
                      {r1.food_suggestions.foods_to_eat?.map((f, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✓ {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1">❌ Avoid:</p>
                    <ul className="space-y-1">
                      {r1.food_suggestions.foods_to_avoid?.map((f, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✗ {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : <p className="text-sm text-gray-400">No suggestions available</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-purple-600">🥗 Report 2 Food Suggestions</h3>
              {r2?.food_suggestions ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-green-600 mb-1">✅ Eat:</p>
                    <ul className="space-y-1">
                      {r2.food_suggestions.foods_to_eat?.map((f, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✓ {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1">❌ Avoid:</p>
                    <ul className="space-y-1">
                      {r2.food_suggestions.foods_to_avoid?.map((f, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-300">✗ {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : <p className="text-sm text-gray-400">No suggestions available</p>}
            </div>
          </div>

          {/* Doctor Advice */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-blue-600">👨‍⚕️ Report 1 Doctor Advice</h3>
              {r1?.doctor_advice ? (
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Specialist:</span> <span className="font-medium">{r1.doctor_advice.specialist_to_see}</span></p>
                  <p className="text-sm"><span className="text-gray-500">Urgency:</span> <span className={`font-bold ${r1.doctor_advice.urgency === "Emergency" ? "text-red-600" : r1.doctor_advice.urgency === "Urgent" ? "text-yellow-600" : "text-green-600"}`}>{r1.doctor_advice.urgency}</span></p>
                  {r1.doctor_advice.lifestyle_tips?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mt-2 mb-1">Lifestyle Tips:</p>
                      <ul className="space-y-1">
                        {r1.doctor_advice.lifestyle_tips.map((t, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300">• {t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : <p className="text-sm text-gray-400">No advice available</p>}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="font-bold mb-3 text-purple-600">👨‍⚕️ Report 2 Doctor Advice</h3>
              {r2?.doctor_advice ? (
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Specialist:</span> <span className="font-medium">{r2.doctor_advice.specialist_to_see}</span></p>
                  <p className="text-sm"><span className="text-gray-500">Urgency:</span> <span className={`font-bold ${r2.doctor_advice.urgency === "Emergency" ? "text-red-600" : r2.doctor_advice.urgency === "Urgent" ? "text-yellow-600" : "text-green-600"}`}>{r2.doctor_advice.urgency}</span></p>
                  {r2.doctor_advice.lifestyle_tips?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mt-2 mb-1">Lifestyle Tips:</p>
                      <ul className="space-y-1">
                        {r2.doctor_advice.lifestyle_tips.map((t, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-300">• {t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : <p className="text-sm text-gray-400">No advice available</p>}
            </div>
          </div>

        </div>
      )}

      {/* Empty state */}
      {!report1 && !report2 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📊</div>
          <h2 className="text-xl font-semibold mb-2">Select Two Reports to Compare</h2>
          <p className="text-gray-500">Choose reports and language, then click Compare!</p>
        </div>
      )}

    </div>
  );
};

export default Compare;