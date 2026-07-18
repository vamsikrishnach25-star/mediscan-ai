import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Signup = () => {
  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Fill all fields");
    setLoading(true);

    // Generate 6 digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);

    // Send OTP via EmailJS (free email service)
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
        setOtpSent(true);
        alert(`OTP sent to ${email}`);
      } else {
        // For now skip OTP if EmailJS not configured
        setStep(2);
        setOtpSent(true);
        alert(`Demo OTP: ${code}`); // Remove this in production
      }
    } catch {
      setStep(2);
      alert(`Demo OTP: ${code}`); // Remove in production
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

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", top: "-10%", right: "-10%", animation: "pulse 4s infinite" }} />
        <div className="absolute w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)", bottom: "-5%", left: "-5%", animation: "pulse 6s infinite" }} />

        {["🧬", "💊", "🩺", "🔬", "🩻", "⚕️", "🫀", "🏥"].map((icon, i) => (
          <div key={i} className="absolute text-2xl opacity-10"
            style={{
              left: `${8 + i * 12}%`,
              top: `${20 + (i % 3) * 22}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.4}s`
            }}>
            {icon}
          </div>
        ))}

        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)" }}>
            <span className="text-3xl">🩺</span>
          </div>
          <h1 className="text-3xl font-bold text-white">MediScan AI</h1>
          <p className="text-blue-300 mt-1 text-sm">AI Powered Health Report Analysis</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === 1 ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}>
            {step > 1 ? "✓" : "1"} Account Details
          </div>
          <div className="w-8 h-px bg-gray-600" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"}`}>
            2 Verify Email
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>

          {step === 1 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400 text-sm mb-6">Join MediScan AI for free</p>

              <form onSubmit={sendOtp} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                      onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                      onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                      onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300"
                  style={{
                    background: loading ? "rgba(6,182,212,0.5)" : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(6,182,212,0.4)"
                  }}>
                  {loading ? "Sending OTP..." : "Send OTP →"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">📬</div>
                <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
                <p className="text-gray-400 text-sm">
                  We sent a 6-digit OTP to<br />
                  <span className="text-blue-400 font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={verifyOtpAndRegister} className="space-y-5">

                {/* OTP Input */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    maxLength={6}
                    required
                    className="w-full px-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none text-center text-2xl font-bold tracking-widest"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      letterSpacing: "0.5rem"
                    }}
                    onFocus={e => e.target.style.border = "1px solid #06b6d4"}
                    onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300"
                  style={{
                    background: loading ? "rgba(6,182,212,0.5)" : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(6,182,212,0.4)"
                  }}>
                  {loading ? "Creating Account..." : "Verify & Create Account ✓"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors">
                  ← Go back
                </button>
              </form>
            </>
          )}

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign In
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          🔒 Your medical data is encrypted and secure
        </p>
      </div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default Signup;