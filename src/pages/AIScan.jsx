import React, { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

const mockAIResult = {
  summary:
    "The uploaded medical report has been analyzed. Most parameters are within the normal range.",
  confidence: 94,
  riskLevel: "Low",
  abnormalities: ["Slightly elevated cholesterol level"],
};

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

  const handleAnalyze = () => {
    if (!file) return alert("Please upload a file first");

    setLoading(true);
    setTimeout(() => {
      setResult(mockAIResult);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Upload Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <FileText /> AI Report Analyzer
        </h1>

        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          {!file ? (
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <Upload size={36} className="text-blue-600" />
              <p>Upload a medical report (PDF / Image)</p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-4">
              <p className="font-medium">{file.name}</p>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 mx-auto object-contain border rounded"
                />
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze with AI"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Result */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow border border-gray-100 dark:border-gray-700 space-y-4">

          <h2 className="text-xl font-semibold">AI Analysis Result</h2>

          {/* Summary */}
          <div>
            <h3 className="font-medium">Summary</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {result.summary}
            </p>
          </div>

          {/* Confidence & Risk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500">AI Confidence</p>
              <p className="text-2xl font-bold">{result.confidence}%</p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                result.riskLevel === "Low"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
              }`}
            >
              <p className="text-sm">Health Risk Level</p>
              <p className="text-2xl font-bold">{result.riskLevel}</p>
            </div>
          </div>

          {/* Abnormalities */}
          {result.abnormalities.length > 0 && (
            <div>
              <h3 className="font-medium text-red-600 dark:text-red-400">
                Detected Abnormalities
              </h3>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-400">
                {result.abnormalities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              Download Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Report
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AIScan;
