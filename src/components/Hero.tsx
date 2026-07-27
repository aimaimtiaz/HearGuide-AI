import { Stethoscope, BookOpen, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
      <div className="absolute top-24 -right-32 w-[28rem] h-[28rem] bg-blue-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-48 -left-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              Intelligent Hearing Health Assistant
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              Understand Your{' '}
              <span className="relative whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Hearing
                </span>
              </span>{' '}
              with AI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              HearGuide AI helps you understand hearing symptoms, learn about hearing tests, and
              know when to seek professional care—all through an intelligent educational assistant.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#/symptom-checker"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-600/40"
              >
                <Stethoscope className="w-5 h-5" />
                Start Free Assessment
              </a>
              <a
                href="#/tests"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5" />
                Explore Hearing Tests
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                Private & secure
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Evidence-based info
              </div>
            </div>
          </div>

          {/* Abstract SVG illustration */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 p-6 sm:p-8">
              <svg viewBox="0 0 400 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DBEAFE" />
                    <stop offset="100%" stopColor="#CCFBF1" />
                  </linearGradient>
                </defs>
                {/* Sound waves */}
                <g fill="none" strokeWidth="3" opacity="0.7">
                  <circle cx="200" cy="200" r="60" stroke="url(#g1)" className="animate-pulse-ring" />
                  <circle cx="200" cy="200" r="100" stroke="#2563EB" opacity="0.35" />
                  <circle cx="200" cy="200" r="140" stroke="#14B8A6" opacity="0.25" />
                  <circle cx="200" cy="200" r="180" stroke="#2563EB" opacity="0.15" />
                </g>
                {/* Center ear mark */}
                <circle cx="200" cy="200" r="44" fill="url(#g1)" />
                <path
                  d="M188 186 a14 14 0 1 1 0 28 q-10 0 -10 -10 q0 -8 8 -8"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Floating cards */}
                <g className="animate-float">
                  <rect x="40" y="60" width="120" height="56" rx="14" fill="white" stroke="#E2E8F0" />
                  <rect x="56" y="76" width="40" height="8" rx="4" fill="#2563EB" />
                  <rect x="56" y="92" width="80" height="6" rx="3" fill="#CBD5E1" />
                </g>
                <g className="animate-float" style={{ animationDelay: '1.5s' }}>
                  <rect x="250" y="280" width="120" height="56" rx="14" fill="white" stroke="#E2E8F0" />
                  <circle cx="266" cy="308" r="8" fill="#14B8A6" />
                  <rect x="282" y="302" width="70" height="6" rx="3" fill="#CBD5E1" />
                  <rect x="282" y="316" width="50" height="6" rx="3" fill="#E2E8F0" />
                </g>
                {/* Waveform */}
                <g transform="translate(70,340)" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round">
                  <line x1="0" y1="0" x2="0" y2="0" />
                  <path d="M0 0 L10 -14 L20 10 L30 -20 L40 16 L50 -8 L60 4 L70 0 L80 -6 L90 12 L100 -16 L110 8 L120 0"
                    fill="none" />
                </g>
                <rect x="0" y="0" width="400" height="400" fill="url(#g2)" opacity="0.0" />
              </svg>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-xl border border-slate-100">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 text-teal-600">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">Educational Use</div>
                <div className="text-xs text-slate-500">Not a medical diagnosis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
