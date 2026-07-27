import { useEffect, useState } from 'react';
import { Ear, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Symptom Checker', href: '#/symptom-checker' },
  { label: 'Hearing Tests', href: '#/tests' },
  { label: 'Ask AI', href: '#/ask-ai' },
  { label: 'Protection', href: '#/protection' },
  { label: 'About', href: '#/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(15,23,42,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Ear className="w-5 h-5" />
            </span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              HearGuide <span className="text-blue-600">AI</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center">
            <a
              href="#/symptom-checker"
              className="group relative inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 hover:shadow-teal-500/40"
            >
              Get Started
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-100 ${
          open ? 'max-h-96 shadow-xl' : 'max-h-0'
        }`}
      >
        <ul className="px-4 py-3 space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#/symptom-checker"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
