import React from "react";
import { Link } from "react-router-dom";
import { Stethoscope, ShieldCheck, BrainCircuit, HeartPulse, ArrowLeft } from "lucide-react";

const About = () => {
  const values = [
    { icon: BrainCircuit, title: "AI you can trust", desc: "Every analysis is grounded in the biomarkers actually present in your report — no generic advice." },
    { icon: ShieldCheck, title: "Privacy first", desc: "Your reports are encrypted and only ever visible to your account. We never sell health data." },
    { icon: HeartPulse, title: "Built for clarity", desc: "We translate lab jargon into plain language, so you walk into your next appointment informed." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-10 transition">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6">
          <Stethoscope size={22} />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">About MediScan AI</h1>
        <p className="text-slate-600 leading-relaxed text-lg mb-12 max-w-2xl">
          MediScan AI helps you make sense of medical reports the moment you get them. Upload a blood panel,
          thyroid test, or any other report, and our AI reads it, flags what matters, and explains it in
          plain language — with food suggestions, doctor recommendations, and warning signs along the way.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8">
          <h2 className="text-xl font-bold mb-3">A note on medical advice</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            MediScan AI is a tool to help you understand your own reports and prepare for conversations with
            your doctor. It does not replace professional medical diagnosis or treatment — always consult a
            licensed physician about any health concern.
          </p>
        </div>

        <div className="mt-14 text-center">
          <Link to="/signup" className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition">
            Create your free account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
