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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)", top: "-10%", left: "-10%", animation: "pulse 4s infinite" }} />
        <div className="absolute w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", bottom: "-5%", right: "-5%", animation: "pulse 6s infinite" }} />
        <div className="absolute w-48 h-48 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", top: "40%", right: "20%", animation: "pulse 5s infinite" }} />

        {/* Medical Icons floating */}
        {["🫀", "🧬", "💊", "🩺", "🔬", "🩻", "⚕️", "🏥"].map((icon, i) => (
          <div key={i} className="absolute text-2xl opacity-10"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`
            }}>
            {icon}
          </div>
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />

        {/* Heartbeat line */}
        <svg className="absolute bottom-20 left-0 w-full opacity-10" height="60" viewBox="0 0 1200 60">
          <polyline
            points="0,30 100,30 150,30 200,10 250,50 300,30 350,30 400,30 450,5 500,55 550,30 600,30 650,30 700,10 750,50 800,30 900,30 1000,30 1050,5 1100,55 1150,30 1200,30"
            fill="none" stroke="#3b82f6" strokeWidth="2" />
        </svg>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
            <span className="text-3xl">🩺</span>
          </div>
          <h1 className="text-3xl font-bold text-white">MediScan AI</h1>
          <p className="text-blue-300 mt-1 text-sm">AI Powered Health Report Analysis</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>

          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm mb-6">Sign in to access your health reports</p>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => e.target.style.border = "1px solid #3b82f6"}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-gray-500 outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={e => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 mt-2"
              style={{
                background: loading ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(59,130,246,0.4)"
              }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
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

export default Login;