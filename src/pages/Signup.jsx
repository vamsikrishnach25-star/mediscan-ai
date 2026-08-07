import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Stethoscope, ShieldCheck, MailCheck, Check } from "lucide-react";
import { registerUser, verifyOtp, resendOtp } from "../services/authService";

const RESEND_COOLDOWN = 30;

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(location.state?.step === 2 ? 2 : 1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState(location.state?.step === 2 ? "Enter the code we already sent you, or resend a new one." : "");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    timerRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) return setError("Please fill in all fields.");
    if (password.length < 6) return setError("Password should be at least 6 characters.");

    setLoading(true);
    try {
      await registerUser(name, email, password);
      setStep(2);
      setInfo(`We sent a 6-digit code to ${email}.`);
      startCooldown();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) return setError("Enter the 6-digit code.");

    setLoading(true);
    try {
      await verifyOtp(email, otp);
      // Verification also returns a token, but we deliberately don't use it
      // to auto-sign the user in — send them to the login page instead.
      localStorage.removeItem("token");
      navigate("/login", { state: { justVerified: true, email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    try {
      await resendOtp(email);
      setInfo(`A new code was sent to ${email}.`);
      startCooldown();
    } catch (err) {
      setError(err.message);
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
              Create your free account.
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              We verify every email with a one-time code, so your health reports
              stay tied to an account only you control.
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

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${step > 1 ? "bg-emerald-100 text-emerald-700" : "bg-blue-600 text-white"}`}>
              {step > 1 ? <Check size={13} /> : "1"} Account
            </div>
            <div className="w-6 h-px bg-slate-300" />
            <div className={`text-xs font-semibold px-3 py-1 rounded-full ${step === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
              2 Verify email
            </div>
          </div>

          {error && (
            <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}
          {!error && info && (
            <div className="mb-5 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
              {info}
            </div>
          )}

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Create account</h1>
              <p className="text-slate-500 text-sm mb-7">Join MediScan AI — it's free.</p>

              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                  <div className="relative">
                    <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

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
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
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
                  {loading ? "Sending code..." : "Send verification code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                <MailCheck size={22} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-4 mb-1">Verify your email</h1>
              <p className="text-slate-500 text-sm mb-7">
                Enter the 6-digit code sent to <span className="font-medium text-slate-700">{email}</span>
              </p>

              <form onSubmit={handleVerify} className="flex flex-col gap-5">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  className="w-full py-3.5 rounded-lg border border-slate-300 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-center text-2xl font-bold tracking-[0.5em]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition shadow-sm"
                >
                  {loading ? "Verifying..." : "Verify & create account"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    ← Go back
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={cooldown > 0}
                    className="text-blue-600 hover:text-blue-700 disabled:text-slate-400 font-medium"
                  >
                    {cooldown > 0 ? `Resend code (${cooldown}s)` : "Resend code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 1 && (
            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
