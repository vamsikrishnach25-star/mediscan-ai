import React, { useState } from "react";
import { UploadCloud, FileText, Loader2, Apple, Stethoscope, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { uploadReport, getReportAnalysis } from "../services/reportService";

const AIScan = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setFile(uploaded);
    if (uploaded.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(uploaded));
    } else {
      setPreview("");
    }
  };

const handleAnalyze = async () => {
  if (!file) return alert("Upload file first");
  try {
    setLoading(true);
    const uploadRes = await uploadReport(file);
    // Use analysis directly from upload response
    setResult(uploadRes.analysis || uploadRes.ai_analysis || uploadRes);
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  const getRiskColor = (level) => {
    if (level === "Critical") return "text-red-600";
    if (level === "High") return "text-red-500";
    if (level === "Moderate") return "text-yellow-500";
    return "text-green-500";
  };

  const getStatusColor = (status) => {
    if (status === "HIGH") return "text-red-500 bg-red-50 dark:bg-red-900/20";
    if (status === "LOW") return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-green-500 bg-green-50 dark:bg-green-900/20";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold">AI Report Analysis</h1>

      {/* Upload Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow text-center border border-dashed">
        {!file ? (
          <label className="cursor-pointer flex flex-col items-center gap-4">
            <UploadCloud size={40} className="text-blue-500" />
            <p className="text-gray-600">Click to upload any medical report</p>
            <p className="text-sm text-gray-400">Blood, Thyroid, Liver, Kidney, Lipid, Urine, X-Ray and more</p>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <p className="font-medium">{file.name}</p>
            {preview && (
              <img src={preview} className="h-60 mx-auto rounded-lg object-contain" />
            )}
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
            >
              {loading ? <Loader2 className="animate-spin" /> : <FileText />}
              {loading ? "Analyzing..." : "Analyze Report"}
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Report Type Badge */}
          {result.report_type && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                📋 Report Type: {result.report_type}
              </p>
            </div>
          )}

          {/* Summary + Risk */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-2 text-lg">Summary</h2>
              <p className="text-gray-600 dark:text-gray-300">{result.summary}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-2 text-lg">Risk Level</h2>
              <p className={`text-2xl font-bold ${getRiskColor(result.risk_level)}`}>
                {result.risk_level}
              </p>
              {result.severity_score !== undefined && (
                <p className="text-sm text-gray-500 mt-1">
                  {result.severity_score} abnormal marker(s) found
                </p>
              )}
            </div>
          </div>

          {/* Highlighted Biomarkers */}
          {result.highlighted_biomarkers?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-4 text-lg">Biomarker Status</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {result.highlighted_biomarkers.map((b, i) => (
                  <div key={i} className={`p-3 rounded-xl ${getStatusColor(b.status)}`}>
                    <p className="font-medium text-sm">{b.name}</p>
                    <p className="text-lg font-bold">{b.value}</p>
                    <p className="text-xs font-semibold">{b.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings + Conditions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-3 text-lg">Findings</h2>
              <ul className="space-y-2">
                {result.findings?.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-yellow-500 mt-1 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-3 text-lg">Possible Conditions</h2>
              <ul className="space-y-2">
                {result.possible_conditions?.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle size={16} className="text-red-400 mt-1 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Food Suggestions */}
          {result.food_suggestions && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <Apple size={20} className="text-green-500" />
                Food Suggestions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle size={16} /> Foods to Eat
                  </h3>
                  <ul className="space-y-2">
                    {result.food_suggestions.foods_to_eat?.map((food, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                        <span className="text-green-500">✓</span>
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-red-500 mb-3 flex items-center gap-2">
                    <XCircle size={16} /> Foods to Avoid
                  </h3>
                  <ul className="space-y-2">
                    {result.food_suggestions.foods_to_avoid?.map((food, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                        <span className="text-red-500">✗</span>
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Advice */}
          {result.doctor_advice && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <Stethoscope size={20} className="text-blue-500" />
                Doctor Advice
              </h2>
              <div className="grid md:grid-cols-2 gap-6">

                {/* Specialist + Urgency */}
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Specialist to See</p>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">
                      {result.doctor_advice.specialist_to_see}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    result.doctor_advice.urgency === "Emergency"
                      ? "bg-red-50 dark:bg-red-900/20"
                      : result.doctor_advice.urgency === "Urgent"
                      ? "bg-yellow-50 dark:bg-yellow-900/20"
                      : "bg-green-50 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-gray-500">Urgency</p>
                    <p className={`font-bold text-lg ${
                      result.doctor_advice.urgency === "Emergency"
                        ? "text-red-600"
                        : result.doctor_advice.urgency === "Urgent"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}>
                      {result.doctor_advice.urgency}
                    </p>
                  </div>
                </div>

                {/* Lifestyle Tips */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-700 dark:text-gray-300">Lifestyle Tips</h3>
                  <ul className="space-y-2">
                    {result.doctor_advice.lifestyle_tips?.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={14} className="text-blue-500 mt-1 shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning Signs */}
                {result.doctor_advice.warning_signs?.length > 0 && (
                  <div className="md:col-span-2 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                    <h3 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} /> Warning Signs — See a Doctor Immediately If:
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {result.doctor_advice.warning_signs?.map((sign, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                          <span>⚠️</span> {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-3 text-lg">Recommendations</h2>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-500 mt-1 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AIScan;