import React, { useState } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
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
      const analysisRes = await getReportAnalysis(uploadRes.report_id);
      setResult(analysisRes);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold">AI Report Analysis</h1>

      {/* 🔥 Upload Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow text-center border border-dashed">

        {!file ? (
          <label className="cursor-pointer flex flex-col items-center gap-4">
            <UploadCloud size={40} className="text-blue-500" />
            <p className="text-gray-600">Click to upload medical report</p>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="space-y-4">
            <p className="font-medium">{file.name}</p>

            {preview && (
              <img
                src={preview}
                className="h-60 mx-auto rounded-lg object-contain"
              />
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

      {/* 🔥 RESULT */}
      {result && (
        <div className="grid md:grid-cols-2 gap-6">

          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">Summary</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {result.summary}
            </p>
          </div>

          {/* Risk */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-2">Risk Level</h2>
            <p className={`text-lg font-bold ${
              result.risk_level === "High"
                ? "text-red-500"
                : result.risk_level === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}>
              {result.risk_level}
            </p>
          </div>

          {/* Findings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow md:col-span-2">
            <h2 className="font-semibold mb-2">Findings</h2>
            <ul className="list-disc ml-6 space-y-1">
              {result.findings?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

export default AIScan;