import React, { useState } from "react";

export default function UploadSection() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ Please select a file first");
      return;
    }

    // 🧠 For now, just dummy upload simulation
    setStatus("⏳ Uploading...");
    setTimeout(() => {
      setStatus(`✅ File '${file.name}' uploaded successfully!`);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <h2>📤 Upload Your Medical Report</h2>
      <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
      <p>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    background: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "2rem auto"
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
