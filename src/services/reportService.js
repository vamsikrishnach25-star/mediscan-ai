import API_BASE_URL from "../config/api";

export const uploadReport = async (file, language = "English") => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

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

// 🔥 GET ANALYSIS - reads directly from upload response
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

  // ai_analysis contains all the data
  return data.ai_analysis || data;
};