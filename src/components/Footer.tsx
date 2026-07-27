import { Ear, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

const columns = [
  {
    title: 'Tools',
    links: [
      { label: 'Symptom Checker', href: '#/symptom-checker' },
      { label: 'Hearing Tests', href: '#/tests' },
      { label: 'Ask AI', href: '#/ask-ai' },
      { label: 'Protection Tips', href: '#/protection' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Emergency Signs', href: '#/about' },
      { label: 'Learning Resources', href: '#/about' },
      { label: 'About HearGuide', href: '#/about' },
      { label: 'Medical Disclaimer', href: '#/about' },
    ],
  },
];

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <Ear className="w-5 h-5" />
              </span>
              <span className="text-lg font-bold text-white">
                HearGuide <span className="text-blue-400">AI</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
              An intelligent hearing health assistant helping you understand symptoms, explore
              hearing tests, and know when to seek professional care.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:hello@hearguide.ai" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" /> hello@hearguide.ai
              </a>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> +1 (800) 555-0199
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> 100 Wellness Ave, Suite 200
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} HearGuide AI. For educational purposes only.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
