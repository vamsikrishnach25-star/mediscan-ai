import API_BASE_URL from "../config/api";

// 🔥 UPLOAD REPORT
export const uploadReport = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/v1/upload_report`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
};

// 🔥 GET ANALYSIS
export const getReportAnalysis = async (reportId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE_URL}/api/v1/medical_reports/${reportId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data; // ✅ THIS WAS MISSING
};