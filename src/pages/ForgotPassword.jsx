import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Stethoscope, ShieldCheck, KeyRound } from "lucide-react";
import { forgotPassword, resetPassword } from "../services/authService";

const RESEND_COOLDOWN = 30;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

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

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setStep(2);
      setInfo(`If an account exists for ${email}, we've sent a reset code.`);
      startCooldown();
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
      await forgotPassword(email);
      setInfo(`A new code was sent to ${email}, if that account exists.`);
      startCooldown();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) return setError("Enter the 6-digit code.");
    if (password.length < 6) return setError("Password should be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords don't match.");

    setLoading(true);
    try {
      await resetPassword(email, otp, password);
      navigate("/login", { state: { passwordReset: true, email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-[920px] grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">

        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-10">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Stethoscope size={20} />
              </div>
              <span className="text-lg font-bold">MediScan AI</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-4">Reset your password.</h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              We'll email you a 6-digit code to confirm it's really you before letting you set a new password.
            </p>
          </div>
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <ShieldCheck size={18} />
            Your medical data is encrypted and never shared.
          </div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Stethoscope size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900">MediScan AI</span>
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
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Forgot your password?</h1>
              <p className="text-slate-500 text-sm mb-7">Enter your email and we'll send you a reset code.</p>

              <form onSubmit={handleRequestCode} className="flex flex-col gap-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition shadow-sm"
                >
                  {loading ? "Sending code..." : "Send reset code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                <KeyRound size={22} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-4 mb-1">Set a new password</h1>
              <p className="text-slate-500 text-sm mb-7">
                Enter the code sent to <span className="font-medium text-slate-700">{email}</span> and choose a new password.
              </p>

              <form onSubmit={handleReset} className="flex flex-col gap-5">
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New password</label>
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

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm new password</label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition shadow-sm"
                >
                  {loading ? "Updating..." : "Reset password"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-700">
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

          <p className="text-center text-sm text-slate-500 mt-6">
            Remembered it?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:text-blue-700">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
