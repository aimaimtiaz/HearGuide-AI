import { useState } from 'react';
import {
  Target,
  Eye,
  Sparkles,
  Cpu,
  Rocket,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Stethoscope,
  AudioLines,
  MessageSquareHeart,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Bot,
  Zap,
  Code2,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';

const features = [
  { icon: Stethoscope, title: 'AI Symptom Assessment', desc: 'Describe symptoms and get educational guidance about possible causes.', accent: 'blue' },
  { icon: AudioLines, title: 'Hearing Test Guide', desc: 'Understand each hearing test and what to expect during an evaluation.', accent: 'teal' },
  { icon: MessageSquareHeart, title: 'AI Hearing Chat', desc: 'Ask hearing health questions in plain language and get clear answers.', accent: 'sky' },
  { icon: ShieldCheck, title: 'Hearing Protection Tips', desc: 'Practical strategies to protect your hearing every day.', accent: 'emerald' },
];

const accentMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
};

const steps = [
  { icon: Bot, title: 'Describe or ask', desc: 'Share your symptoms or ask a hearing health question in plain language.' },
  { icon: Cpu, title: 'AI analyzes', desc: 'HearGuide AI reviews your input using a hearing-health-focused system.' },
  { icon: Sparkles, title: 'Get guidance', desc: 'Receive educational explanations, suggested tests, and when to seek care.' },
];

const technologies = [
  'React + TypeScript',
  'Vite',
  'Tailwind CSS',
  'Google Gemini AI',
  'Lucide Icons',
  'Supabase',
];

const futureImprovements = [
  'User accounts to save and track conversations',
  'Multilingual support for broader accessibility',
  'Integration with audiologists for remote guidance',
  'Personalized hearing health recommendations over time',
];

const faqs = [
  {
    q: 'Is HearGuide AI a medical diagnosis?',
    a: 'No. HearGuide AI provides educational information only and is not a medical diagnosis or a substitute for professional care. Always consult a qualified healthcare provider.',
  },
  {
    q: 'Can it prescribe medication?',
    a: 'No. HearGuide AI never prescribes medication. It can suggest when to see an Audiologist or ENT specialist, but treatment decisions are always made by a licensed professional.',
  },
  {
    q: 'What should I do for sudden hearing loss?',
    a: 'Sudden hearing loss, severe dizziness, ear bleeding, head injury, or severe ear pain require immediate medical evaluation. Do not wait—visit urgent care or an ENT right away.',
  },
  {
    q: 'Is my conversation data stored?',
    a: 'Chat history is kept only in your current browser session and is not sent to a database. Closing the tab clears your conversation.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero band */}
      <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 -right-32 w-[26rem] h-[26rem] bg-blue-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-32 -left-32 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            eyebrow="About"
            title="About HearGuide AI"
            subtitle="An intelligent hearing health assistant built to educate, guide, and empower—never to replace a doctor."
            disclaimer="Educational use only, not a medical diagnosis."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8 hover:shadow-xl transition-shadow animate-fade-up">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                <Target className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To make hearing health knowledge accessible to everyone. We help people understand
                symptoms, learn about hearing tests, and know when to seek professional care—through
                clear, compassionate, educational guidance.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8 hover:shadow-xl transition-shadow animate-fade-up">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600">
                <Eye className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                A world where no one ignores hearing changes out of confusion or fear. By combining
                AI with hearing-health education, we aim to encourage earlier awareness and timely
                professional care for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Features" title="What HearGuide AI offers" />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const a = accentMap[f.accent];
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${a.bg} ${a.text}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How it works" title="How HearGuide AI Works" subtitle="Three simple steps from question to clarity." />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up">
                  <span className="absolute top-6 right-6 text-5xl font-extrabold text-slate-100 select-none">
                    {i + 1}
                  </span>
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl bg-white border border-amber-200 p-6 sm:p-8 shadow-sm">
            <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Educational Disclaimer</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                HearGuide AI provides educational information only and is not a substitute for
                professional medical diagnosis or treatment. Always seek the advice of a qualified
                healthcare provider with any questions about a medical condition. Never disregard
                professional medical advice or delay seeking it because of something you have read here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies & Future */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600">
                <Code2 className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">Technologies Used</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {technologies.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200">
                    <Zap className="w-3.5 h-3.5 text-indigo-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600">
                <Rocket className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">Future Improvements</h3>
              <ul className="mt-4 space-y-3">
                {futureImprovements.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                    <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Contact" title="Get in touch" subtitle="Questions, feedback, or partnership ideas? We'd love to hear from you." />
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            <a href="mailto:hello@hearguide.ai" className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-blue-600 mx-auto">
                <Mail className="w-5 h-5" />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-500">hello@hearguide.ai</p>
            </a>
            <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm text-center">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-teal-50 text-teal-600 mx-auto">
                <Phone className="w-5 h-5" />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900">Phone</p>
              <p className="mt-1 text-sm text-slate-500">+1 (800) 555-0199</p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm text-center">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 mx-auto">
                <MapPin className="w-5 h-5" />
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-900">Address</p>
              <p className="mt-1 text-sm text-slate-500">100 Wellness Ave, Suite 200</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-5 sm:px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-semibold text-slate-900">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}
