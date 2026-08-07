import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Stethoscope, ShieldCheck, CheckCircle2 } from "lucide-react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success] = useState(
    location.state?.passwordReset
      ? "Password updated — sign in with your new password."
      : location.state?.justVerified
      ? "Account verified — sign in to continue."
      : ""
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await loginUser(email, password);
      if (res?.token) {
        login({ name: res.name || email.split("@")[0], email });
        navigate("/welcome");
      } else {
        setError("No token received. Please try again.");
      }
    } catch (err) {
      if (err.unverified) {
        navigate("/signup", { state: { email: err.email || email, step: 2 } });
        return;
      }
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-[920px] grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">

        {/* Left — brand panel */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-10">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Stethoscope size={20} />
              </div>
              <span className="text-lg font-bold">MediScan AI</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">
              Understand your medical reports in seconds.
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              Upload a report, get instant AI-backed analysis, biomarker breakdowns,
              and clear next steps — trusted by patients who want clarity, not jargon.
            </p>
          </div>

          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <ShieldCheck size={18} />
            Your medical data is encrypted and never shared.
          </div>
        </div>

        {/* Right — form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Stethoscope size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900">MediScan AI</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-7">Sign in to access your health reports.</p>

          {error && (
            <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}
          {!error && success && (
            <div className="mb-5 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition shadow-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
