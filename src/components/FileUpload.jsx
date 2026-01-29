import { useState } from "react";
import api from "../api/axiosInstance";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(""); // reset on new file
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("❌ Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus(`✅ ${res.data.message}`);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>🩺 Upload Medical Scan</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
