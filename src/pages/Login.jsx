import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        alert("No token received");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
    }}>

      {/* Animated Background Elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, #3b82f6, transparent)",
          opacity: 0.1, top: "-10%", left: "-10%", animation: "pulse 4s infinite"
        }} />
        <div style={{
          position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, #06b6d4, transparent)",
          opacity: 0.1, bottom: "-5%", right: "-5%", animation: "pulse 6s infinite"
        }} />
        <div style={{
          position: "absolute", width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf6, transparent)",
          opacity: 0.08, top: "40%", right: "20%", animation: "pulse 5s infinite"
        }} />

        {/* Floating Medical Icons */}
        {["🫀", "🧬", "💊", "🩺", "🔬", "🩻", "⚕️", "🏥"].map((icon, i) => (
          <div key={i} style={{
            position: "absolute",
            fontSize: "24px",
            opacity: 0.08,
            left: `${8 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`
          }}>
            {icon}
          </div>
        ))}

        {/* Grid Pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />

        {/* Heartbeat Line */}
        <svg style={{ position: "absolute", bottom: "60px", left: 0, width: "100%", opacity: 0.08 }}
          height="60" viewBox="0 0 1200 60">
          <polyline
            points="0,30 100,30 150,30 200,10 250,50 300,30 350,30 400,30 450,5 500,55 550,30 600,30 650,30 700,10 750,50 800,30 900,30 1000,30 1050,5 1100,55 1150,30 1200,30"
            fill="none" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "420px", margin: "0 16px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "64px", height: "64px", borderRadius: "16px", marginBottom: "16px",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)"
          }}>
            <span style={{ fontSize: "32px" }}>🩺</span>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "white", margin: 0 }}>
            MediScan AI
          </h1>
          <p style={{ color: "#93c5fd", marginTop: "4px", fontSize: "14px" }}>
            AI Powered Health Report Analysis
          </p>
        </div>

        {/* Card */}
        <div style={{
          borderRadius: "20px", padding: "32px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", margin: "0 0 8px 0" }}>
            Welcome Back
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", margin: "0 0 24px 0" }}>
            Sign in to access your health reports
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Email */}
            <div>
              <label style={{ color: "#d1d5db", fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>📧</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "12px 16px 12px 40px",
                    borderRadius: "12px", color: "white",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    outline: "none", fontSize: "15px",
                    boxSizing: "border-box",
                    transition: "border 0.2s"
                  }}
                  onFocus={e => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ color: "#d1d5db", fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "12px 48px 12px 40px",
                    borderRadius: "12px", color: "white",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    outline: "none", fontSize: "15px",
                    boxSizing: "border-box",
                    transition: "border 0.2s"
                  }}
                  onFocus={e => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", fontSize: "16px"
                  }}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                borderRadius: "12px", border: "none",
                fontWeight: "600", fontSize: "16px", color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                background: loading
                  ? "rgba(59,130,246,0.5)"
                  : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(59,130,246,0.4)",
                transition: "all 0.3s"
              }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "14px", marginTop: "24px" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#60a5fa", fontWeight: "500", textDecoration: "none" }}>
              Create Account
            </Link>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "#4b5563", fontSize: "12px", marginTop: "24px" }}>
          🔒 Your medical data is encrypted and secure
        </p>
      </div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-20px) rotate(10deg); }
        }
        input::placeholder { color: #6b7280; }
      `}</style>
    </div>
  );
};

export default Login;