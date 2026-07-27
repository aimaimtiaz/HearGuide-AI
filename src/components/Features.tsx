import {
  Stethoscope,
  AudioLines,
  MessageSquareHeart,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

type Feature = {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  href: string;
  accent: string;
};

const features: Feature[] = [
  {
    icon: Stethoscope,
    title: 'AI Symptom Assessment',
    description: 'Describe what you are feeling and get a guided breakdown of possible hearing-related symptoms.',
    href: '#/symptom-checker',
    accent: 'blue',
  },
  {
    icon: AudioLines,
    title: 'Hearing Test Guide',
    description: 'Understand the different types of hearing tests and what to expect during an evaluation.',
    href: '#/tests',
    accent: 'teal',
  },
  {
    icon: MessageSquareHeart,
    title: 'AI Hearing Chat',
    description: 'Ask questions about hearing health in plain language and get clear, educational answers.',
    href: '#/ask-ai',
    accent: 'sky',
  },
  {
    icon: ShieldCheck,
    title: 'Hearing Protection Tips',
    description: 'Practical, everyday strategies to protect your hearing at work, at home, and on the go.',
    href: '#/protection',
    accent: 'emerald',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Warning Signs',
    description: 'Know the red-flag symptoms that mean you should seek professional care right away.',
    href: '#/about',
    accent: 'amber',
  },
  {
    icon: GraduationCap,
    title: 'Learning Resources',
    description: 'A curated library of articles, guides, and references to deepen your hearing health knowledge.',
    href: '#/about',
    accent: 'indigo',
  },
];

const accentMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:ring-blue-200', glow: 'group-hover:shadow-blue-500/10' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'group-hover:ring-teal-200', glow: 'group-hover:shadow-teal-500/10' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'group-hover:ring-sky-200', glow: 'group-hover:shadow-sky-500/10' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'group-hover:ring-emerald-200', glow: 'group-hover:shadow-emerald-500/10' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'group-hover:ring-amber-200', glow: 'group-hover:shadow-amber-500/10' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'group-hover:ring-indigo-200', glow: 'group-hover:shadow-indigo-500/10' },
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Everything you need
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            A complete hearing health toolkit
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Understand symptoms, explore hearing tests, and make informed decisions—all in one place.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const a = accentMap[f.accent];
            const Icon = f.icon;
            return (
              <a
                key={f.title}
                href={f.href}
                className={`group relative rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-xl ring-1 ring-transparent ${a.ring} ${a.glow} transition-all duration-300 hover:-translate-y-1`}
              >
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${a.bg} ${a.text} transition-transform group-hover:scale-110`}>
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.description}</p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${a.text} opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all`}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
