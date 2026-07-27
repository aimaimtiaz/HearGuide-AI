import { AudioLines, Bot, Clock, GraduationCap } from 'lucide-react';

const stats = [
  { icon: AudioLines, value: '5', label: 'Common Hearing Tests', accent: 'blue' },
  { icon: Bot, value: 'AI', label: 'Educational Assistant', accent: 'teal' },
  { icon: Clock, value: '24/7', label: 'Information Access', accent: 'sky' },
  { icon: GraduationCap, value: '100%', label: 'Educational Use Only', accent: 'indigo' },
];

const accentMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
};

export default function Statistics() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((s) => {
            const a = accentMap[s.accent];
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${a.bg} ${a.text} transition-transform group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </span>
                <div className={`mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight ${a.text}`}>
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-600">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
