import React, { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2, Apple, Stethoscope, AlertTriangle, CheckCircle, XCircle, Volume2, VolumeX, Download, Share2 } from "lucide-react";
import { uploadReport } from "../services/reportService";

const AIScan = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const resultRef = useRef(null);

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
      setResult(uploadRes.analysis || uploadRes.ai_analysis || uploadRes);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔊 Voice Summary
  const handleVoice = () => {
    if (!result) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text = `
      Medical Report Analysis Summary.
      Report Type: ${result.report_type || "Medical Report"}.
      Risk Level: ${result.risk_level}.
      Summary: ${result.summary}.
      ${result.findings?.length > 0 ? `Key Findings: ${result.findings.join(". ")}.` : ""}
      ${result.possible_conditions?.length > 0 ? `Possible Conditions: ${result.possible_conditions.join(", ")}.` : ""}
      ${result.doctor_advice?.specialist_to_see ? `You should consult a ${result.doctor_advice.specialist_to_see}.` : ""}
      ${result.doctor_advice?.urgency ? `Urgency level is ${result.doctor_advice.urgency}.` : ""}
      ${result.food_suggestions?.foods_to_eat?.length > 0 ? `Foods to eat: ${result.food_suggestions.foods_to_eat.join(", ")}.` : ""}
      ${result.food_suggestions?.foods_to_avoid?.length > 0 ? `Foods to avoid: ${result.food_suggestions.foods_to_avoid.join(", ")}.` : ""}
      ${result.doctor_advice?.warning_signs?.length > 0 ? `Warning signs to watch for: ${result.doctor_advice.warning_signs.join(". ")}.` : ""}
    `;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  // 📄 PDF Download
  const handleDownloadPdf = async () => {
    if (!result) return;
    setDownloadingPdf(true);

    try {
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>MediScan AI Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
            .badge { display: inline-block; background: #eff6ff; color: #3b82f6; padding: 4px 12px; border-radius: 999px; font-size: 13px; margin-top: 8px; }
            .section { margin-bottom: 24px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; }
            .section h2 { font-size: 16px; font-weight: bold; margin: 0 0 12px 0; color: #1e40af; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
            .risk-low { color: #16a34a; font-size: 24px; font-weight: bold; }
            .risk-moderate { color: #d97706; font-size: 24px; font-weight: bold; }
            .risk-high { color: #dc2626; font-size: 24px; font-weight: bold; }
            .risk-critical { color: #7f1d1d; font-size: 24px; font-weight: bold; }
            ul { padding-left: 20px; }
            li { margin-bottom: 6px; font-size: 14px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .green { background: #f0fdf4; padding: 12px; border-radius: 8px; }
            .red { background: #fef2f2; padding: 12px; border-radius: 8px; }
            .blue { background: #eff6ff; padding: 12px; border-radius: 8px; }
            .warning { background: #fef2f2; border: 1px solid #fca5a5; padding: 12px; border-radius: 8px; }
            .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            .biomarker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .biomarker-card { padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0; }
            .normal { background: #f0fdf4; color: #16a34a; }
            .high-marker { background: #fef2f2; color: #dc2626; }
            .low-marker { background: #fffbeb; color: #d97706; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🩺 MediScan AI</div>
            <p style="color:#64748b; margin:8px 0 0 0;">AI Powered Health Report Analysis</p>
            <div class="badge">${result.report_type || "Medical Report"}</div>
            <p style="color:#94a3b8; font-size:12px; margin-top:8px;">Generated on ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>

          <div class="grid">
            <div class="section">
              <h2>📋 Summary</h2>
              <p style="font-size:14px; line-height:1.6;">${result.summary}</p>
            </div>
            <div class="section">
              <h2>⚠️ Risk Level</h2>
              <p class="risk-${result.risk_level?.toLowerCase()}">${result.risk_level}</p>
              <p style="font-size:13px; color:#64748b;">${result.severity_score || 0} abnormal marker(s) found</p>
            </div>
          </div>

          ${result.highlighted_biomarkers?.length > 0 ? `
          <div class="section">
            <h2>🔬 Biomarker Status</h2>
            <div class="biomarker-grid">
              ${result.highlighted_biomarkers.map(b => `
                <div class="biomarker-card ${b.status === "HIGH" ? "high-marker" : b.status === "LOW" ? "low-marker" : "normal"}">
                  <p style="font-size:12px; margin:0;">${b.name}</p>
                  <p style="font-size:18px; font-weight:bold; margin:4px 0;">${b.value}</p>
                  <p style="font-size:11px; margin:0;">${b.status}</p>
                </div>
              `).join("")}
            </div>
          </div>` : ""}

          <div class="grid">
            ${result.findings?.length > 0 ? `
            <div class="section">
              <h2>🔍 Findings</h2>
              <ul>${result.findings.map(f => `<li>${f}</li>`).join("")}</ul>
            </div>` : ""}

            ${result.possible_conditions?.length > 0 ? `
            <div class="section">
              <h2>🏥 Possible Conditions</h2>
              <ul>${result.possible_conditions.map(c => `<li>${c}</li>`).join("")}</ul>
            </div>` : ""}
          </div>

          ${result.food_suggestions ? `
          <div class="section">
            <h2>🥗 Food Suggestions</h2>
            <div class="grid">
              <div class="green">
                <p style="font-weight:bold; color:#16a34a; margin:0 0 8px 0;">✅ Foods to Eat</p>
                <ul>${result.food_suggestions.foods_to_eat?.map(f => `<li>${f}</li>`).join("") || ""}</ul>
              </div>
              <div class="red">
                <p style="font-weight:bold; color:#dc2626; margin:0 0 8px 0;">❌ Foods to Avoid</p>
                <ul>${result.food_suggestions.foods_to_avoid?.map(f => `<li>${f}</li>`).join("") || ""}</ul>
              </div>
            </div>
          </div>` : ""}

          ${result.doctor_advice ? `
          <div class="section">
            <h2>👨‍⚕️ Doctor Advice</h2>
            <div class="grid">
              <div class="blue">
                <p style="font-size:12px; color:#64748b; margin:0;">Specialist to See</p>
                <p style="font-weight:bold; color:#1e40af; margin:4px 0;">${result.doctor_advice.specialist_to_see}</p>
                <p style="font-size:12px; color:#64748b; margin:8px 0 0 0;">Urgency</p>
                <p style="font-weight:bold; margin:4px 0;">${result.doctor_advice.urgency}</p>
              </div>
              <div>
                <p style="font-weight:bold; margin:0 0 8px 0;">Lifestyle Tips</p>
                <ul>${result.doctor_advice.lifestyle_tips?.map(t => `<li>${t}</li>`).join("") || ""}</ul>
              </div>
            </div>
            ${result.doctor_advice.warning_signs?.length > 0 ? `
            <div class="warning" style="margin-top:12px;">
              <p style="font-weight:bold; color:#dc2626; margin:0 0 8px 0;">⚠️ Warning Signs — See Doctor Immediately If:</p>
              <ul>${result.doctor_advice.warning_signs.map(s => `<li>${s}</li>`).join("")}</ul>
            </div>` : ""}
          </div>` : ""}

          ${result.recommendations?.length > 0 ? `
          <div class="section">
            <h2>💡 Recommendations</h2>
            <ul>${result.recommendations.map(r => `<li>${r}</li>`).join("")}</ul>
          </div>` : ""}

          <div class="footer">
            <p>🔒 Generated by MediScan AI — For informational purposes only</p>
            <p>This report is not a substitute for professional medical advice</p>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob([printContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `MediScan-Report-${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("PDF download failed");
    } finally {
      setDownloadingPdf(false);
    }
  };

  // 🔗 Share Report
  const handleShare = async () => {
    if (!result) return;

    const shareText = `
MediScan AI Report 🩺
Report Type: ${result.report_type || "Medical Report"}
Risk Level: ${result.risk_level}
Summary: ${result.summary}
Specialist: ${result.doctor_advice?.specialist_to_see || "General Physician"}
Urgency: ${result.doctor_advice?.urgency || "Routine"}

Analyzed by MediScan AI — mediscan-ai-bay.vercel.app
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "MediScan AI Report",
          text: shareText,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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
        <div className="space-y-6" ref={resultRef}>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={handleVoice}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                speaking
                  ? "bg-red-100 text-red-600 dark:bg-red-900/20"
                  : "bg-purple-100 text-purple-600 dark:bg-purple-900/20 hover:bg-purple-200"
              }`}>
              {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {speaking ? "Stop Voice" : "🔊 Listen"}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-100 text-green-600 dark:bg-green-900/20 hover:bg-green-200 transition">
              <Download size={16} />
              {downloadingPdf ? "Preparing..." : "📄 Download PDF"}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/20 hover:bg-blue-200 transition">
              <Share2 size={16} />
              {copied ? "✅ Copied!" : "🔗 Share Report"}
            </button>
          </div>

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
                        <span className="text-green-500">✓</span>{food}
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
                        <span className="text-red-500">✗</span>{food}
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
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Specialist to See</p>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">
                      {result.doctor_advice.specialist_to_see}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    result.doctor_advice.urgency === "Emergency" ? "bg-red-50 dark:bg-red-900/20"
                    : result.doctor_advice.urgency === "Urgent" ? "bg-yellow-50 dark:bg-yellow-900/20"
                    : "bg-green-50 dark:bg-green-900/20"
                  }`}>
                    <p className="text-sm text-gray-500">Urgency</p>
                    <p className={`font-bold text-lg ${
                      result.doctor_advice.urgency === "Emergency" ? "text-red-600"
                      : result.doctor_advice.urgency === "Urgent" ? "text-yellow-600"
                      : "text-green-600"
                    }`}>
                      {result.doctor_advice.urgency}
                    </p>
                  </div>
                </div>
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