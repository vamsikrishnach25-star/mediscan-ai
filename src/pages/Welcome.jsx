import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: "📊",
      title: "Dashboard",
      description: "View your health overview at a glance. See total reports, risk trends over time, risk distribution charts, and your recent report history all in one place.",
      path: "/dashboard",
      color: "#3b82f6",
      tags: ["Health Overview", "Charts", "Risk Trends"]
    },
    {
      icon: "🔬",
      title: "AI Scan",
      description: "Upload any medical report image and let our AI analyze it instantly. Supports Blood, Thyroid, Liver, Kidney, Lipid, Urine reports and more.",
      path: "/ai-scan",
      color: "#06b6d4",
      tags: ["OCR", "AI Analysis", "Instant Results"]
    },
    {
      icon: "📋",
      title: "Reports",
      description: "Access all your past medical reports in one place. View detailed analysis, biomarker status, food suggestions, and doctor advice for each report.",
      path: "/reports",
      color: "#8b5cf6",
      tags: ["History", "Biomarkers", "Doctor Advice"]
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Customize your MediScan AI experience. Manage your profile, notification preferences, and account security settings.",
      path: "/settings",
      color: "#f59e0b",
      tags: ["Profile", "Security", "Preferences"]
    }
  ];

  const quickStats = [
    { icon: "🤖", label: "AI Model", value: "LLaMA 3.3 70B" },
    { icon: "📊", label: "Report Types", value: "12+" },
    { icon: "🔬", label: "Biomarkers", value: "30+" },
    { icon: "⚡", label: "Analysis Time", value: "~10 sec" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* Welcome Header */}
      <div style={{
        padding: "40px",
        borderRadius: "24px",
        background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
        border: "1px solid rgba(59,130,246,0.2)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", right: "-50px", top: "-50px",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.2), transparent)"
        }} />
        <div style={{
          position: "absolute", right: "40px", bottom: "-30px",
          width: "150px", height: "150px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent)"
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>👋</div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", color: "white", margin: "0 0 8px 0" }}>
            Welcome to MediScan AI{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: "0 0 24px 0", maxWidth: "600px", lineHeight: "1.6" }}>
            Your AI-powered health report analysis platform. Upload any medical report and get instant insights, food suggestions, and doctor recommendations.
          </p>

          {/* Quick Stats */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {quickStats.map((stat, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 16px", borderRadius: "10px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <span style={{ fontSize: "18px" }}>{stat.icon}</span>
                <div>
                  <p style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>{stat.label}</p>
                  <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 }}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => navigate("/ai-scan")}
          style={{
            padding: "14px 40px", borderRadius: "14px",
            fontSize: "16px", fontWeight: "700",
            color: "white", border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 8px 30px rgba(59,130,246,0.4)",
            transition: "transform 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
          🔬 Analyze a Report Now
        </button>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">What would you like to do?</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {features.map((feature, i) => (
            <div
              key={i}
              onClick={() => navigate(feature.path)}
              style={{
                padding: "28px", borderRadius: "20px",
                background: "white",
                border: `1px solid rgba(0,0,0,0.08)`,
                cursor: "pointer", transition: "all 0.3s",
                position: "relative", overflow: "hidden"
              }}
              className="dark:bg-gray-800 dark:border-gray-700"
              onMouseOver={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}25`;
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
              }}>

              {/* Top color bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${feature.color}, ${feature.color}88)`
              }} />

              {/* Icon */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "16px",
                background: `${feature.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", marginBottom: "16px"
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: "20px", fontWeight: "700",
                color: feature.color, marginBottom: "10px"
              }}>
                {feature.title}
              </h3>

              <p style={{
                color: "#64748b", fontSize: "14px",
                lineHeight: "1.6", marginBottom: "16px"
              }}>
                {feature.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {feature.tags.map((tag, j) => (
                  <span key={j} style={{
                    padding: "3px 10px", borderRadius: "999px",
                    fontSize: "11px", fontWeight: "600",
                    color: feature.color,
                    background: `${feature.color}12`
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div style={{
                position: "absolute", bottom: "20px", right: "20px",
                width: "32px", height: "32px", borderRadius: "50%",
                background: `${feature.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: feature.color, fontSize: "16px", fontWeight: "bold"
              }}>
                →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow">
        <h2 className="text-xl font-bold mb-6 dark:text-white">How MediScan AI Works</h2>
        <div style={{ display: "flex", gap: "0", position: "relative" }}>

          {/* Connection line */}
          <div style={{
            position: "absolute", top: "24px", left: "48px", right: "48px",
            height: "2px", background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            zIndex: 0
          }} />

          {[
            { step: "1", icon: "📤", title: "Upload Report", desc: "Any medical report image" },
            { step: "2", icon: "🔍", title: "OCR Reads It", desc: "Extracts all text & values" },
            { step: "3", icon: "🤖", title: "AI Analyzes", desc: "LLaMA 3.3 70B processes it" },
            { step: "4", icon: "💡", title: "Get Insights", desc: "Full analysis & advice" },
          ].map((step, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", position: "relative", zIndex: 1
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", fontSize: "20px",
                boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
              }}>
                {step.icon}
              </div>
              <p style={{ fontWeight: "700", fontSize: "13px", marginBottom: "4px" }}
                className="dark:text-white">
                {step.title}
              </p>
              <p style={{ color: "#64748b", fontSize: "12px" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Welcome;