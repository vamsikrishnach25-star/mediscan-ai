import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope, Microscope, BrainCircuit, HeartPulse, Salad, BarChart3, AlertTriangle,
  Upload, Zap, Lightbulb, ShieldCheck, Droplet, Wind, TestTube2, Candy, Pill,
  Bolt, FlaskConical, Bone, Activity, Star, Menu, X, Mail, MapPin, Phone
} from "lucide-react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: Microscope, title: "OCR Text Extraction", desc: "Automatically reads and extracts text from any medical report image using advanced OCR technology." },
    { icon: BrainCircuit, title: "AI-Powered Analysis", desc: "Advanced AI models analyze your biomarkers and generate clear, medically-grounded health insights." },
    { icon: Stethoscope, title: "Doctor Recommendations", desc: "Get specialist recommendations, urgency levels, and lifestyle tips based on your report findings." },
    { icon: Salad, title: "Food Suggestions", desc: "Personalized guidance on what to eat and avoid, based on your specific abnormal biomarker levels." },
    { icon: BarChart3, title: "Biomarker Status", desc: "Color-coded biomarker status shows which values are normal, high, or low at a glance." },
    { icon: AlertTriangle, title: "Warning Signs", desc: "Critical warning signs that need attention are surfaced clearly, so nothing gets missed." },
  ];

  const steps = [
    { step: "01", icon: Upload, title: "Upload your report", desc: "Upload any medical report image — blood, thyroid, liver, kidney, lipid, urine, or any other test." },
    { step: "02", icon: Zap, title: "AI analyzes it", desc: "Our AI reads the report using OCR, identifies biomarkers, and runs a full medical analysis." },
    { step: "03", icon: Lightbulb, title: "Get full insights", desc: "Receive a complete breakdown with findings, food suggestions, doctor advice, and warning signs." },
  ];

  const reportTypes = [
    { icon: Droplet, label: "Complete Blood Count" },
    { icon: Activity, label: "Thyroid Function" },
    { icon: HeartPulse, label: "Lipid Profile" },
    { icon: Wind, label: "Liver Function" },
    { icon: TestTube2, label: "Kidney Function" },
    { icon: FlaskConical, label: "Urine Analysis" },
    { icon: Candy, label: "Diabetes Panel" },
    { icon: Pill, label: "Vitamin Panel" },
    { icon: Bolt, label: "Electrolytes" },
    { icon: Microscope, label: "Hormone Panel" },
    { icon: Bone, label: "X-Ray Reports" },
    { icon: HeartPulse, label: "ECG Reports" },
  ];

  const testimonials = [
    { name: "Ananya R.", role: "Patient", quote: "I finally understood my thyroid report without googling every term. The food suggestions were a nice touch." },
    { name: "Dr. Karthik S.", role: "General Physician", quote: "A useful first pass for patients before their appointment — it helps them ask better questions." },
    { name: "Meera P.", role: "Caregiver", quote: "Uploading my father's reports and getting a plain-language summary has made managing his care much easier." },
  ];

  const faqs = [
    { q: "Is my medical data secure?", a: "Yes. Reports are encrypted in transit and at rest, and are only ever visible to your account." },
    { q: "What report types are supported?", a: "Blood, thyroid, liver, kidney, lipid, urine, diabetes, vitamin, hormone panels, X-rays, ECGs, and more." },
    { q: "Does this replace a doctor?", a: "No — MediScan AI helps you understand your reports and prepare questions, but always consult a licensed physician for diagnosis and treatment." },
    { q: "Is it free to use?", a: "Yes, creating an account and analyzing reports is free to get started." },
  ];

  const navLink = "text-sm font-medium text-slate-600 hover:text-blue-600 transition";

  return (
    <div className="bg-white text-slate-900" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Stethoscope size={18} />
            </div>
            <span className="font-bold text-lg">MediScan AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={navLink}>Features</a>
            <a href="#how-it-works" className={navLink}>How it works</a>
            <a href="#testimonials" className={navLink}>Reviews</a>
            <a href="#faq" className={navLink}>FAQ</a>
            <Link to="/about" className={navLink}>About</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition">
              Log in
            </Link>
            <Link to="/signup" className="text-sm font-semibold px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition">
              Get started
            </Link>
          </div>

          <button className="md:hidden text-slate-700" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 flex flex-col gap-4">
            <a href="#features" className={navLink} onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className={navLink} onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#testimonials" className={navLink} onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#faq" className={navLink} onClick={() => setMenuOpen(false)}>FAQ</a>
            <Link to="/about" className={navLink} onClick={() => setMenuOpen(false)}>About</Link>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 text-center text-sm font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700">Log in</Link>
              <Link to="/signup" className="flex-1 text-center text-sm font-semibold px-4 py-2 rounded-lg text-white bg-blue-600">Get started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-40 pb-24 px-6">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Zap size={14} /> AI-powered health report analysis
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Understand your{" "}
            <span className="text-blue-600">medical reports</span>{" "}
            in plain language
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload any medical report and get instant AI-powered analysis — with food suggestions,
            doctor recommendations, and warning signs — all in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup" className="px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition">
              Start for free
            </Link>
            <Link to="/login" className="px-8 py-3.5 rounded-xl font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50 transition">
              Sign in
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-16">
            {[
              { value: "12+", label: "Report types" },
              { value: "30+", label: "Biomarkers tracked" },
              { value: "~10s", label: "Analysis time" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-extrabold text-blue-600">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report types */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Works with any medical report</h2>
          <p className="text-slate-500 mb-12">Our AI understands all common types of medical tests and reports.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {reportTypes.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left">
                <Icon size={18} className="text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">How it works</h2>
          <p className="text-slate-500 mb-14">Get your medical report analyzed in three simple steps.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ step, icon: Icon, title, desc }, i) => (
              <div key={i} className="relative text-left bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:border-blue-200 transition">
                <span className="absolute top-5 right-6 text-4xl font-extrabold text-blue-50">{step}</span>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
          <p className="text-slate-500 mb-14">Comprehensive health insights from a single report upload.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-left p-7 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Trusted by patients and clinicians</h2>
          <p className="text-slate-500 mb-14">A few words from people who use MediScan AI.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="text-left bg-white p-7 rounded-2xl border border-slate-200">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Frequently asked questions</h2>
          <p className="text-slate-500 mb-12 text-center">Everything you need to know before you get started.</p>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group border border-slate-200 rounded-xl p-5 open:border-blue-200 open:bg-blue-50/40">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-blue-600 group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-700 to-cyan-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
            <Stethoscope size={26} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to understand your health?</h2>
          <p className="text-blue-100 mb-9 leading-relaxed">
            Join MediScan AI today and get instant AI-powered insights from your medical reports. It's free to get started.
          </p>
          <Link to="/signup" className="inline-block px-9 py-3.5 rounded-xl font-semibold text-blue-700 bg-white hover:bg-blue-50 shadow-lg transition">
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Stethoscope size={16} />
              </div>
              <span className="font-bold text-white">MediScan AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered analysis that turns medical reports into insights anyone can understand.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How it works</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><Link to="/signup" className="hover:text-white transition">Get started</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About us</Link></li>
              <li><a href="#testimonials" className="hover:text-white transition">Reviews</a></li>
              <li><Link to="/login" className="hover:text-white transition">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> support@mediscan.ai</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +91 00000 00000</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Hyderabad, India</li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MediScan AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} /> Your medical data is encrypted and secure
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
