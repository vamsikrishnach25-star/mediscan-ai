import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Fill all fields");
    setLoading(true);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID",
          template_id: "YOUR_TEMPLATE_ID",
          user_id: "YOUR_PUBLIC_KEY",
          template_params: {
            to_email: email,
            to_name: name,
            otp_code: code,
          }
        })
      });

      if (res.ok) {
        setStep(2);
        alert(`OTP sent to ${email}`);
      } else {
        setStep(2);
        alert(`Your OTP is: ${code}`);
      }
    } catch {
      setStep(2);
      alert(`Your OTP is: ${code}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndRegister = async (e) => {
    e.preventDefault();
    if (otp !== generatedOtp) return alert("Invalid OTP! Please try again.");

    setLoading(true);
    try {
      await registerUser(name, email, password);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px 12px 40px",
    borderRadius: "12px", color: "white",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    outline: "none", fontSize: "15px",
    boxSizing: "border-box", transition: "border 0.2s"
  };

  return (
    <div style={{
      minHeight: "100vh", width: "100vw",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)"
    }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, #06b6d4, transparent)",
          opacity: 0.1, top: "-10%", right: "-10%", animation: "pulse 4s infinite"
        }} />
        <div style={{
          position: "absolute", width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, #3b82f6, transparent)",
          opacity: 0.1, bottom: "-5%", left: "-5%", animation: "pulse 6s infinite"
        }} />

        {["🧬", "💊", "🩺", "🔬", "🩻", "⚕️", "🫀", "🏥"].map((icon, i) => (
          <div key={i} style={{
            position: "absolute", fontSize: "24px", opacity: 0.08,
            left: `${8 + i * 12}%`, top: `${20 + (i % 3) * 22}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`
          }}>
            {icon}
          </div>
        ))}

        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "420px", margin: "0 16px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "64px", height: "64px", borderRadius: "16px", marginBottom: "12px",
            background: "linear-gradient(135deg, #06b6d4, #3b82f6)"
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

        {/* Progress Steps */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", gap: "12px" }}>
          <div style={{
            padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600",
            background: step === 1 ? "linear-gradient(135deg, #3b82f6, #06b6d4)" : "#22c55e",
            color: "white"
          }}>
            {step > 1 ? "✓" : "1"} Account Details
          </div>
          <div style={{ width: "32px", height: "1px", background: "#374151" }} />
          <div style={{
            padding: "8px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "600",
            background: step === 2 ? "linear-gradient(135deg, #3b82f6, #06b6d4)" : "rgba(255,255,255,0.1)",
            color: step === 2 ? "white" : "#6b7280"
          }}>
            2 Verify Email
          </div>
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

          {step === 1 ? (
            <>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", margin: "0 0 8px 0" }}>
                Create Account
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "14px", margin: "0 0 24px 0" }}>
                Join MediScan AI for free
              </p>

              <form onSubmit={sendOtp} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Name */}
                <div>
                  <label style={{ color: "#d1d5db", fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                    Full Name
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>👤</span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={inputStyle}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                      onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>

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
                      style={inputStyle}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
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
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ ...inputStyle, paddingRight: "48px" }}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                      onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute", right: "12px", top: "50%",
                        transform: "translateY(-50%)", background: "none",
                        border: "none", cursor: "pointer", fontSize: "16px"
                      }}>
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "12px",
                    border: "none", fontWeight: "600", fontSize: "16px",
                    color: "white", cursor: loading ? "not-allowed" : "pointer",
                    background: loading ? "rgba(6,182,212,0.5)" : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(6,182,212,0.4)",
                    transition: "all 0.3s"
                  }}>
                  {loading ? "Sending OTP..." : "Send OTP →"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📬</div>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white", margin: "0 0 8px 0" }}>
                  Verify Your Email
                </h2>
                <p style={{ color: "#9ca3af", fontSize: "14px", margin: 0 }}>
                  We sent a 6-digit OTP to<br />
                  <span style={{ color: "#60a5fa", fontWeight: "600" }}>{email}</span>
                </p>
              </div>

              <form onSubmit={verifyOtpAndRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ color: "#d1d5db", fontSize: "14px", fontWeight: "500", display: "block", marginBottom: "8px" }}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    required
                    style={{
                      width: "100%", padding: "16px",
                      borderRadius: "12px", color: "white",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      outline: "none", fontSize: "28px",
                      boxSizing: "border-box",
                      textAlign: "center", letterSpacing: "0.5rem",
                      fontWeight: "bold"
                    }}
                    onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                    onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px", borderRadius: "12px",
                    border: "none", fontWeight: "600", fontSize: "16px",
                    color: "white", cursor: loading ? "not-allowed" : "pointer",
                    background: loading ? "rgba(6,182,212,0.5)" : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(6,182,212,0.4)",
                    transition: "all 0.3s"
                  }}>
                  {loading ? "Creating Account..." : "Verify & Create Account ✓"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    width: "100%", padding: "10px", background: "none",
                    border: "none", color: "#9ca3af", fontSize: "14px",
                    cursor: "pointer", transition: "color 0.2s"
                  }}
                  onMouseOver={e => e.target.style.color = "white"}
                  onMouseOut={e => e.target.style.color = "#9ca3af"}>
                  ← Go back
                </button>
              </form>
            </>
          )}

          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: "14px", marginTop: "24px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#60a5fa", fontWeight: "500", textDecoration: "none" }}>
              Sign In
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

export default Signup;