import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: "🔬",
      title: "OCR Text Extraction",
      desc: "Automatically reads and extracts text from any medical report image using advanced Tesseract OCR technology."
    },
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      desc: "Powered by LLaMA 3.3 70B AI model to analyze biomarkers and generate intelligent health insights."
    },
    {
      icon: "🩺",
      title: "Doctor Recommendations",
      desc: "Get specialist recommendations, urgency levels, and lifestyle tips based on your specific report findings."
    },
    {
      icon: "🥗",
      title: "Food Suggestions",
      desc: "Personalized food suggestions — what to eat and avoid — based on your abnormal biomarker levels."
    },
    {
      icon: "📊",
      title: "Biomarker Status",
      desc: "Visual color-coded biomarker status showing which values are Normal, High, or Low at a glance."
    },
    {
      icon: "⚠️",
      title: "Warning Signs",
      desc: "Critical warning signs to watch for that require immediate medical attention highlighted clearly."
    }
  ];

  const steps = [
    {
      step: "01",
      icon: "📤",
      title: "Upload Your Report",
      desc: "Upload any medical report image — Blood, Thyroid, Liver, Kidney, Lipid, Urine, or any other test."
    },
    {
      step: "02",
      icon: "⚡",
      title: "AI Analyzes It",
      desc: "Our AI reads the report using OCR, identifies biomarkers, and runs intelligent medical analysis."
    },
    {
      step: "03",
      icon: "💡",
      title: "Get Full Insights",
      desc: "Receive complete analysis with findings, food suggestions, doctor advice, and warning signs."
    }
  ];

  const reportTypes = [
    "🩸 Complete Blood Count",
    "🦋 Thyroid Function",
    "🫀 Lipid Profile",
    "🫁 Liver Function",
    "💧 Kidney Function",
    "🧪 Urine Analysis",
    "🍬 Diabetes Panel",
    "💊 Vitamin Panel",
    "⚡ Electrolytes",
    "🔬 Hormone Panel",
    "🩻 X-Ray Reports",
    "📋 ECG Reports"
  ];

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? "rgba(15,23,42,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.1)" : "none",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px"
          }}>🩺</div>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>MediScan AI</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{
            padding: "8px 20px", borderRadius: "8px", fontSize: "14px",
            fontWeight: "600", color: "white", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent", transition: "all 0.2s"
          }}
            onMouseOver={e => e.target.style.background = "rgba(255,255,255,0.1)"}
            onMouseOut={e => e.target.style.background = "transparent"}>
            Login
          </Link>
          <Link to="/signup" style={{
            padding: "8px 20px", borderRadius: "8px", fontSize: "14px",
            fontWeight: "600", color: "white", textDecoration: "none",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative", overflow: "hidden"
      }}>
        {/* Background Effects */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", width: "600px", height: "600px",
            borderRadius: "50%", top: "-200px", left: "-200px",
            background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent)",
          }} />
          <div style={{
            position: "absolute", width: "500px", height: "500px",
            borderRadius: "50%", bottom: "-150px", right: "-150px",
            background: "radial-gradient(circle, rgba(6,182,212,0.15), transparent)",
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />

          {/* Floating icons */}
          {["🫀", "🧬", "💊", "🩺", "🔬", "🩻", "⚕️", "🏥", "💉", "🧪"].map((icon, i) => (
            <div key={i} style={{
              position: "absolute", fontSize: "28px", opacity: 0.06,
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 4) * 22}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`
            }}>{icon}</div>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "999px", marginBottom: "24px",
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            fontSize: "13px", color: "#93c5fd"
          }}>
            <span>⚡</span> Powered by LLaMA 3.3 70B AI
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: "800", lineHeight: "1.1",
            marginBottom: "24px", margin: "0 0 24px 0"
          }}>
            Understand Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Medical Reports
            </span>
            {" "}with AI
          </h1>

          <p style={{
            fontSize: "18px", color: "#94a3b8", lineHeight: "1.7",
            marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px"
          }}>
            Upload any medical report and get instant AI-powered analysis with
            food suggestions, doctor recommendations, and warning signs — all in seconds.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signup" style={{
              padding: "14px 32px", borderRadius: "12px",
              fontSize: "16px", fontWeight: "700",
              color: "white", textDecoration: "none",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              boxShadow: "0 8px 30px rgba(59,130,246,0.4)",
              transition: "transform 0.2s"
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
              🚀 Start for Free
            </Link>
            <Link to="/login" style={{
              padding: "14px 32px", borderRadius: "12px",
              fontSize: "16px", fontWeight: "700",
              color: "white", textDecoration: "none",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "transform 0.2s"
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
              Sign In →
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: "40px", justifyContent: "center",
            marginTop: "60px", flexWrap: "wrap"
          }}>
            {[
              { value: "12+", label: "Report Types" },
              { value: "30+", label: "Biomarkers" },
              { value: "AI", label: "Powered Analysis" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "32px", fontWeight: "800",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>{stat.value}</div>
                <div style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types Section */}
      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "12px" }}>
            Works with Any Medical Report
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Our AI understands all types of medical tests and reports
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px"
          }}>
            {reportTypes.map((type, i) => (
              <div key={i} style={{
                padding: "14px 16px", borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "14px", fontWeight: "500",
                transition: "all 0.2s", cursor: "default"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.border = "1px solid rgba(59,130,246,0.3)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                }}>
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "12px" }}>
            How It Works
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Get your medical report analyzed in 3 simple steps
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                padding: "32px", borderRadius: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "left", position: "relative",
                transition: "all 0.3s"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.08)";
                  e.currentTarget.style.border = "1px solid rgba(59,130,246,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{
                  fontSize: "48px", fontWeight: "900", opacity: 0.1,
                  position: "absolute", top: "16px", right: "20px",
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>{step.step}</div>
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{step.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "15px" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "12px" }}>
            Everything You Need
          </h2>
          <p style={{ color: "#64748b", marginBottom: "48px" }}>
            Comprehensive health insights from a single report upload
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                padding: "28px", borderRadius: "16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "left", transition: "all 0.3s"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.08)";
                  e.currentTarget.style.border = "1px solid rgba(59,130,246,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "14px" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", marginBottom: "24px" }}>🩺</div>
          <h2 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "16px", lineHeight: "1.2" }}>
            Ready to Understand Your Health?
          </h2>
          <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "40px", lineHeight: "1.7" }}>
            Join MediScan AI today and get instant AI-powered insights from your medical reports.
            It's free to get started!
          </p>
          <Link to="/signup" style={{
            display: "inline-block",
            padding: "16px 48px", borderRadius: "14px",
            fontSize: "18px", fontWeight: "700",
            color: "white", textDecoration: "none",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 8px 30px rgba(59,130,246,0.5)",
            transition: "transform 0.2s"
          }}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
            🚀 Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "32px 24px", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        color: "#475569", fontSize: "14px"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <span>🩺</span>
          <span style={{ fontWeight: "700", color: "#94a3b8" }}>MediScan AI</span>
        </div>
        <p>Built with ❤️ for better health understanding</p>
        <p style={{ marginTop: "4px" }}>🔒 Your medical data is encrypted and secure</p>
      </footer>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-25px) rotate(10deg); }
        }
        * { box-sizing: border-box; }
        a { cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Home;