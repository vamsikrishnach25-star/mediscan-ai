import React, { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
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
    if (!file) return alert("Please upload a file first");

    try {
      setLoading(true);

      const uploadRes = await uploadReport(file);
      const reportId = uploadRes.report_id;

      const analysisRes = await getReportAnalysis(reportId);
      setResult(analysisRes);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FileText /> AI Report Analyzer
        </h1>

        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          {!file ? (
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload size={36} />
              <p>Upload a medical report</p>
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="space-y-4">
              <p>{file.name}</p>

              {preview && (
                <img src={preview} className="h-64 mx-auto object-contain" />
              )}

              <button
                onClick={handleAnalyze}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "Analyzing..." : "Analyze with AI"}
              </button>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl space-y-4">

          <h2 className="text-xl font-semibold">AI Analysis</h2>

          <p>{result.summary}</p>

          <p>
            Risk Level: <b>{result.risk_level}</b>
          </p>

          <ul>
            {result.findings?.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>

        </div>
      )}
    </div>
  );
};

export default AIScan;