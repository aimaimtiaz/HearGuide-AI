import { useState } from 'react';
import {
  Sun,
  Headphones,
  HardHat,
  Baby,
  Waves,
  Music,
  HeartPulse,
  Volume2,
  CheckCircle2,
  Lightbulb,
  XCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Clock,
  Ear,
  Info,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/Reveal';

type Category = {
  icon: typeof Sun;
  title: string;
  intro: string;
  accent: string;
  tips: string[];
  proTip: string;
  mistakes: string[];
};

const categories: Category[] = [
  {
    icon: Sun,
    title: 'Everyday Protection',
    intro: 'Small daily habits that keep your hearing sharp for the long run.',
    accent: 'blue',
    tips: [
      'Keep TV and music at a comfortable, conversational level.',
      'Take listening breaks after long sound exposure.',
      'Never insert cotton swabs or objects into your ear canal.',
      'Stay aware of background noise in restaurants and cafes.',
    ],
    proTip: 'If someone next to you has to raise their voice, the environment is likely too loud.',
    mistakes: [
      'Ignoring mild ringing after a noisy day—it can signal overexposure.',
      'Using cotton swabs to "clean" the ear canal, which pushes wax deeper.',
    ],
  },
  {
    icon: Headphones,
    title: 'Safe Headphone Use',
    intro: 'Enjoy your music without risking long-term hearing damage.',
    accent: 'sky',
    tips: [
      'Follow the 60/60 rule: 60% volume for no more than 60 minutes.',
      'Choose over-ear or noise-cancelling headphones over earbuds.',
      'Set a volume limit on your devices to prevent overexposure.',
      'Take a 10-minute break every hour of listening.',
    ],
    proTip: 'Noise-cancelling headphones let you listen at lower volumes in noisy places.',
    mistakes: [
      'Cranking volume to drown out background noise on commutes.',
      'Sleeping with earbuds playing all night.',
    ],
  },
  {
    icon: HardHat,
    title: 'Workplace Noise',
    intro: 'Protect your ears on the job, especially in loud environments.',
    accent: 'amber',
    tips: [
      'Wear certified hearing protection above 85 dB.',
      'Limit time in high-noise zones and rotate tasks.',
      'Attend annual workplace hearing screenings.',
      'Keep machinery maintained to reduce noise output.',
    ],
    proTip: 'Custom-molded earplugs are comfortable enough to wear all day and preserve speech clarity.',
    mistakes: [
      'Skipping protection because "it\'s just for a few minutes."',
      'Relying on ordinary cotton balls instead of certified plugs.',
    ],
  },
  {
    icon: Baby,
    title: "Children's Hearing",
    intro: 'Set up healthy hearing habits early and protect young ears.',
    accent: 'emerald',
    tips: [
      'Monitor toy volume—some exceed safe levels close to a child\'s ear.',
      'Teach kids to wear protection at movies, concerts, and fireworks.',
      'Schedule hearing check-ups as part of wellness visits.',
      'Model good habits—kids copy what they see you do.',
    ],
    proTip: 'A simple rule for kids: if you can\'t hear someone talking to you, it\'s too loud.',
    mistakes: [
      'Assuming kids will "tell you" if sound is too loud—they often won\'t.',
      'Letting children use earbuds at max volume on long trips.',
    ],
  },
  {
    icon: Waves,
    title: 'Swimming & Ear Care',
    intro: 'Keep ears healthy in and around water.',
    accent: 'indigo',
    tips: [
      'Use swim plugs if prone to ear infections or surfer\'s ear.',
      'Dry ears gently with a towel—tilt your head to let water escape.',
      'See a professional for wax buildup rather than self-cleaning.',
      'Avoid jumping into cold water without ear protection.',
    ],
    proTip: 'A few drops of rubbing alcohol after swimming can help evaporate trapped moisture.',
    mistakes: [
      'Using hot air dryers directly in the ear canal.',
      'Ignoring recurring fullness or pain after swimming.',
    ],
  },
  {
    icon: Music,
    title: 'Concert & Festival Safety',
    intro: 'Enjoy live music while protecting your ears for the next show.',
    accent: 'rose',
    tips: [
      'Wear high-fidelity earplugs—they preserve sound quality.',
      'Take breaks in quieter zones between sets.',
      'Stand further from speakers when possible.',
      'Give your ears 16–18 hours of quiet recovery after a loud event.',
    ],
    proTip: 'High-fidelity musician earplugs reduce volume evenly, so music still sounds great.',
    mistakes: [
      'Thinking "one night won\'t hurt"—a single loud concert can cause tinnitus.',
      'Using foam plugs meant for power tools, which muffle music quality.',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Healthy Lifestyle for Hearing',
    intro: 'Whole-body health supports inner-ear health.',
    accent: 'teal',
    tips: [
      'Manage diabetes and blood pressure—both can affect hearing.',
      'Exercise regularly—good circulation supports the inner ear.',
      'Avoid smoking, which is linked to higher hearing-loss risk.',
      'Eat a balanced diet rich in omega-3s, folate, and antioxidants.',
    ],
    proTip: 'Cardiovascular exercise improves blood flow to the tiny vessels of the inner ear.',
    mistakes: [
      'Assuming hearing loss is inevitable with age—much of it is preventable.',
      'Ignoring links between heart health and hearing health.',
    ],
  },
];

const accentMap: Record<string, { bg: string; text: string; ring: string; glow: string; dot: string; gradient: string; chip: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:ring-blue-200', glow: 'group-hover:shadow-blue-500/10', dot: 'text-blue-500', gradient: 'from-blue-500 to-blue-600', chip: 'bg-blue-50 text-blue-700 border-blue-100' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'group-hover:ring-teal-200', glow: 'group-hover:shadow-teal-500/10', dot: 'text-teal-500', gradient: 'from-teal-500 to-teal-600', chip: 'bg-teal-50 text-teal-700 border-teal-100' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'group-hover:ring-sky-200', glow: 'group-hover:shadow-sky-500/10', dot: 'text-sky-500', gradient: 'from-sky-500 to-sky-600', chip: 'bg-sky-50 text-sky-700 border-sky-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'group-hover:ring-emerald-200', glow: 'group-hover:shadow-emerald-500/10', dot: 'text-emerald-500', gradient: 'from-emerald-500 to-emerald-600', chip: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'group-hover:ring-amber-200', glow: 'group-hover:shadow-amber-500/10', dot: 'text-amber-500', gradient: 'from-amber-500 to-amber-600', chip: 'bg-amber-50 text-amber-700 border-amber-100' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'group-hover:ring-indigo-200', glow: 'group-hover:shadow-indigo-500/10', dot: 'text-indigo-500', gradient: 'from-indigo-500 to-indigo-600', chip: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'group-hover:ring-rose-200', glow: 'group-hover:shadow-rose-500/10', dot: 'text-rose-500', gradient: 'from-rose-500 to-rose-600', chip: 'bg-rose-50 text-rose-700 border-rose-100' },
};

const noiseLevels = [
  { db: '30 dB', source: 'Quiet Room', safe: 'Unlimited', tone: 'emerald', width: 'w-[15%]' },
  { db: '60 dB', source: 'Conversation', safe: 'Unlimited', tone: 'emerald', width: 'w-[30%]' },
  { db: '85 dB', source: 'Busy Traffic', safe: '8 hours', tone: 'lime', width: 'w-[45%]' },
  { db: '95 dB', source: 'Motorcycle', safe: '~47 min', tone: 'amber', width: 'w-[55%]' },
  { db: '100 dB', source: 'Nightclub', safe: '~15 min', tone: 'orange', width: 'w-[62%]' },
  { db: '110 dB', source: 'Rock Concert', safe: '~2 min', tone: 'rose', width: 'w-[75%]' },
  { db: '120 dB', source: 'Siren', safe: '~9 sec', tone: 'red', width: 'w-[88%]' },
  { db: '140 dB', source: 'Jet Engine', safe: 'Immediate risk', tone: 'red', width: 'w-full' },
];

const toneMap: Record<string, { bar: string; badge: string; text: string }> = {
  emerald: { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'text-emerald-600' },
  lime: { bar: 'bg-lime-500', badge: 'bg-lime-50 text-lime-700 border-lime-200', text: 'text-lime-600' },
  amber: { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-600' },
  orange: { bar: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700 border-orange-200', text: 'text-orange-600' },
  rose: { bar: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200', text: 'text-rose-600' },
  red: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200', text: 'text-red-600' },
};

const checklistItems = [
  'Keep headphone volume below 60%',
  'Wear earplugs in loud environments',
  'Take listening breaks',
  'Get regular hearing checkups',
  'Avoid inserting objects into ears',
  'Dry ears after swimming',
  'Protect children from loud sounds',
];

const facts = [
  { icon: Ear, title: 'Tiny but mighty', text: 'The inner ear contains roughly 15,000 hair cells that help you hear. Once damaged, they do not grow back.' },
  { icon: Clock, title: '15 minutes is enough', text: 'Just 15 minutes at concert volume (100+ dB) can begin to damage hearing without protection.' },
  { icon: Sparkles, title: 'You have two ears for a reason', text: 'Your brain uses input from both ears to locate sound and separate speech from background noise.' },
  { icon: HeartPulse, title: 'Hearing and heart health are linked', text: 'Good cardiovascular circulation supports the tiny blood vessels inside the inner ear.' },
];

const faqs = [
  {
    q: 'Can headphones damage hearing?',
    a: 'Yes. Prolonged listening at high volumes—especially with earbuds—can damage the hair cells in the inner ear. Following the 60/60 rule (60% volume for 60 minutes max) and taking breaks greatly reduces the risk.',
  },
  {
    q: 'How loud is too loud?',
    a: 'Sounds above 85 dB can cause hearing damage with prolonged exposure. As a rule of thumb: if you have to raise your voice to be heard by someone arm\'s length away, the environment is too loud.',
  },
  {
    q: 'Can hearing loss be prevented?',
    a: 'Much noise-induced hearing loss is preventable. Protecting your ears in loud environments, managing overall health, and getting regular checkups can preserve hearing for life.',
  },
  {
    q: 'Are earplugs effective?',
    a: 'Yes. Properly fitted earplugs reduce harmful sound levels while still allowing you to hear speech and music. High-fidelity musician earplugs preserve sound quality better than foam plugs.',
  },
  {
    q: 'When should I see an ENT?',
    a: 'See an ENT or audiologist if you experience sudden hearing loss, persistent ringing, ear pain, discharge, or dizziness. Sudden changes need prompt evaluation.',
  },
];

export default function HearingProtection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero band */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 -right-32 w-[26rem] h-[26rem] bg-blue-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-32 -left-32 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                Hearing Protection
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                Protect Your Hearing Every Day
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Simple, practical habits that help preserve your hearing for life—across work, play,
                and rest. Small choices today keep your hearing sharp for decades.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
                <Info className="w-4 h-4" />
                Educational tips only. For personalized advice, consult a hearing professional.
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Noise level infographic */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Noise & exposure"
              title="Noise Level & Safe Exposure Time"
              subtitle="The louder the sound, the less time your ears can safely handle it. Use this as a quick reference."
            />
          </Reveal>
          <div className="mt-12 space-y-4">
            {noiseLevels.map((n, i) => {
              const t = toneMap[n.tone];
              return (
                <Reveal key={n.db} delay={i * 40}>
                  <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`inline-flex items-center justify-center w-16 h-10 rounded-lg text-sm font-bold ${t.badge} border flex-shrink-0`}>
                          {n.db}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-slate-800 truncate">{n.source}</span>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${t.badge} flex-shrink-0`}>
                        <Clock className="w-3.5 h-3.5" />
                        {n.safe}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full ${t.bar} rounded-full transition-all duration-700 ${n.width}`}
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist + Facts */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <Checklist />
            </Reveal>
            <Reveal delay={100}>
              <Facts />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          </Reveal>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 rounded-[2.5rem] blur-2xl opacity-60" />
      <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-white/60 shadow-xl p-10 flex items-center justify-center animate-float">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-teal-200/40 animate-pulse-ring" />
          <span className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg">
            <ShieldCheck className="w-14 h-14" />
          </span>
        </div>
        <div className="absolute -top-5 -right-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-lg text-sky-600">
          <Headphones className="w-7 h-7" />
        </div>
        <div className="absolute -bottom-5 -left-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-lg text-amber-600">
          <Volume2 className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const a = accentMap[category.accent];
  const Icon = category.icon;
  return (
    <div
      className={`group h-full rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-xl ring-1 ring-transparent ${a.ring} ${a.glow} transition-all duration-300 hover:-translate-y-1`}
    >
      <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${a.gradient} text-white shadow-md transition-transform group-hover:scale-110`}>
        <Icon className="w-7 h-7" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{category.title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{category.intro}</p>

      <ul className="mt-4 space-y-2.5">
        {category.tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${a.dot}`} />
            {tip}
          </li>
        ))}
      </ul>

      <div className={`mt-5 rounded-xl ${a.bg} p-4`}>
        <p className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${a.text}`}>
          <Lightbulb className="w-4 h-4" />
          Pro Tip
        </p>
        <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">{category.proTip}</p>
      </div>

      <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/60 p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600">
          <XCircle className="w-4 h-4" />
          Common Mistakes to Avoid
        </p>
        <ul className="mt-2 space-y-1.5">
          {category.mistakes.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
              <span className="text-rose-400 flex-shrink-0 mt-0.5">•</span>
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(checklistItems.map(() => false));
  const completed = checked.filter(Boolean).length;

  const toggle = (i: number) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8 h-full">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Protect Your Hearing Checklist</h3>
          <p className="text-sm text-slate-500">Tap each item to track your daily habits.</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-slate-600">Progress</span>
          <span className="font-semibold text-blue-600">{completed}/{checklistItems.length}</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${(completed / checklistItems.length) * 100}%` }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-2.5">
        {checklistItems.map((item, i) => (
          <li key={item}>
            <button
              onClick={() => toggle(i)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border transition-all ${
                checked[i]
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all ${
                  checked[i] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {checked[i] && <CheckCircle2 className="w-3.5 h-3.5" />}
              </span>
              <span className={`text-sm ${checked[i] ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Facts() {
  return (
    <div className="h-full">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-md">
          <Sparkles className="w-6 h-6" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Did You Know?</h3>
          <p className="text-sm text-slate-500">Fascinating facts about your hearing.</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {facts.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="group rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 transition-transform group-hover:scale-110">
                <Icon className="w-5 h-5" />
              </span>
              <h4 className="mt-3 text-sm font-bold text-slate-900">{f.title}</h4>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{f.text}</p>
            </div>
          );
        })}
      </div>
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
