// 📄 src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // your backend URL
});

export const analyzeReport = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing report:", error);
    throw error;
  }
};

export default api;
