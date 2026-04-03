import { useState } from "react";
import { uploadReport, getReportAnalysis } from "../services/reportService";
function Upload() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setLoading(true);

      const uploadRes = await uploadReport(file);
      const reportId = uploadRes.report_id;

      const analysisRes = await getReportAnalysis(reportId);
      setAnalysis(analysisRes);

    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Medical Report</h1>

      {/* Upload Section */}
      <div className="flex items-center gap-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Upload & Analyze
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Analyzing...</p>}

      {/* RESULT SECTION */}
      {analysis && (
        <div className="mt-8 space-y-6">

          {/* Findings */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Findings:</h2>
            <ul className="list-disc ml-6 space-y-1">
              {analysis.findings?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Possible Conditions */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Possible Conditions:</h2>
            <ul className="list-disc ml-6 space-y-1">
              {analysis.possible_conditions?.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Biomarkers */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Biomarkers:</h2>
            <div className="space-y-1">
              {Object.entries(analysis.biomarkers || {}).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </div>
          </div>

          {/* Risk Level */}
          <div>
            <h2 className="text-lg font-semibold">
              Risk Level:
              <span className="ml-2 text-red-500 font-bold">
                {analysis.risk_level}
              </span>
            </h2>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Summary:</h2>
            <p className="text-gray-700 leading-relaxed">
              {analysis.summary}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
export default Upload;