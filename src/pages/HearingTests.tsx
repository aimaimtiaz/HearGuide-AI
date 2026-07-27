import { useState } from 'react';
import {
  AudioLines,
  Waves,
  MessageSquare,
  Ear,
  Brain,
  Clock,
  UserCheck,
  FlaskConical,
  ClipboardList,
  ChevronDown,
  Lightbulb,
  Stethoscope,
  Activity,
  Gauge,
  Users,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal } from '@/components/Reveal';

type Test = {
  icon: typeof AudioLines;
  name: string;
  abbr: string;
  accent: string;
  shortDesc: string;
  duration: string;
  difficulty: string;
  recommended: string;
  purpose: string;
  howItWorks: string;
  whoShouldTake: string;
  preparation: string;
  whatToExpect: string;
  results: string;
  tip: string;
};

const tests: Test[] = [
  {
    icon: AudioLines,
    name: 'Pure Tone Audiometry',
    abbr: 'PTA',
    accent: 'blue',
    shortDesc: 'Maps the softest tones you can hear across different pitches to chart your hearing threshold.',
    duration: '20–30 min',
    difficulty: 'Easy',
    recommended: 'Adults & teens',
    purpose: 'Measures the softest tones you can hear across different pitches to map your hearing threshold.',
    howItWorks:
      'You wear headphones and press a button each time you hear a beep, even if very faint. Tones are played at various frequencies and volumes in each ear.',
    whoShouldTake: 'Anyone noticing hearing changes, ringing, or difficulty following conversations.',
    preparation: 'Avoid loud noise for 24 hours before the test and come well-rested.',
    whatToExpect:
      'You sit in a soundproof booth and respond to sounds by pressing a button. It is painless and requires your active attention.',
    results: 'An audiogram chart showing your hearing thresholds for each ear and frequency.',
    tip: 'Bring a list of any medications you take, as some can affect hearing.',
  },
  {
    icon: Waves,
    name: 'Tympanometry',
    abbr: 'TYMP',
    accent: 'teal',
    shortDesc: 'Checks how the eardrum and middle ear move to detect fluid, infection, or blockages.',
    duration: '5–10 min',
    difficulty: 'Easy',
    recommended: 'All ages',
    purpose: 'Checks how the eardrum and middle ear move, helping detect fluid, infection, or blockages.',
    howItWorks:
      'A soft probe is placed in the ear canal. It changes air pressure and plays a tone to measure how the eardrum responds.',
    whoShouldTake: 'People with ear fullness, pressure, recurrent infections, or suspected fluid.',
    preparation: 'No special preparation needed.',
    whatToExpect:
      'You may feel a slight pressure change or a popping sensation, similar to descending in an airplane. It lasts only seconds per ear.',
    results: 'A tympanogram showing middle-ear pressure and mobility (type A is normal).',
    tip: 'Let the clinician know if you have a cold or recent ear infection, as it can affect results.',
  },
  {
    icon: MessageSquare,
    name: 'Speech Audiometry',
    abbr: 'SA',
    accent: 'sky',
    shortDesc: 'Evaluates how clearly you understand speech, not just how softly you can hear tones.',
    duration: '15–25 min',
    difficulty: 'Easy',
    recommended: 'Adults & children',
    purpose: 'Evaluates how clearly you understand speech, not just how softly you can hear tones.',
    howItWorks:
      'You listen to words or sentences through headphones and repeat them back. The volume and clarity levels are adjusted throughout.',
    whoShouldTake: 'Anyone who hears but struggles to understand speech, especially in noisy places.',
    preparation: 'Bring a companion if you use a hearing aid so it can be tested too.',
    whatToExpect:
      'You will hear words at different volumes and be asked to repeat them. Guessing is encouraged—there are no wrong answers.',
    results: 'Speech reception threshold and word recognition scores for each ear.',
    tip: 'If you wear hearing aids, bring them so the clinician can test how well they help you understand speech.',
  },
  {
    icon: Ear,
    name: 'Otoacoustic Emissions',
    abbr: 'OAE',
    accent: 'emerald',
    shortDesc: 'Detects tiny sounds produced by healthy inner-ear cells to assess cochlear function.',
    duration: '5–15 min',
    difficulty: 'Very Easy',
    recommended: 'Newborns & kids',
    purpose: 'Detects tiny sounds produced by healthy inner-ear cells to assess cochlear function.',
    howItWorks:
      'A small probe in the ear canal plays clicks and listens for the faint echo your inner ear produces in response.',
    whoShouldTake: 'Newborns, young children, and anyone with suspected inner-ear (cochlear) damage.',
    preparation: 'The ear canal should be clear of wax for an accurate reading.',
    whatToExpect:
      'The test is passive—you simply sit still or, for infants, sleep naturally. No response is needed from you.',
    results: 'A pass/refer result showing whether outer hair cells are functioning.',
    tip: 'For babies, schedule the test during naptime so they sleep through it for the clearest reading.',
  },
  {
    icon: Brain,
    name: 'Auditory Brainstem Response',
    abbr: 'ABR',
    accent: 'indigo',
    shortDesc: 'Measures how the hearing nerve and brainstem respond to sound—no active response needed.',
    duration: '45–90 min',
    difficulty: 'Moderate',
    recommended: 'Infants & adults',
    purpose: 'Measures how the hearing nerve and brainstem respond to sound, without needing a response from you.',
    howItWorks:
      'Electrodes are placed on the head and ear. Clicking sounds are played while the electrical activity of the hearing pathway is recorded.',
    whoShouldTake: 'Infants, people who cannot take standard tests, or those with suspected nerve issues.',
    preparation: 'You may be asked to relax or sleep during the test; sedation is sometimes used for children.',
    whatToExpect:
      'You lie still with small sensors on your head and neck. You will hear clicking sounds through earphones but do not need to respond.',
    results: 'A waveform showing the hearing nerve and brainstem response at each intensity.',
    tip: 'Wear comfortable clothing and avoid caffeine before the test so you can relax fully.',
  },
];

const accentMap: Record<string, { bg: string; text: string; ring: string; glow: string; chip: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:ring-blue-200', glow: 'group-hover:shadow-blue-500/10', chip: 'bg-blue-50 text-blue-700 border-blue-100', gradient: 'from-blue-500 to-blue-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'group-hover:ring-teal-200', glow: 'group-hover:shadow-teal-500/10', chip: 'bg-teal-50 text-teal-700 border-teal-100', gradient: 'from-teal-500 to-teal-600' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'group-hover:ring-sky-200', glow: 'group-hover:shadow-sky-500/10', chip: 'bg-sky-50 text-sky-700 border-sky-100', gradient: 'from-sky-500 to-sky-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'group-hover:ring-emerald-200', glow: 'group-hover:shadow-emerald-500/10', chip: 'bg-emerald-50 text-emerald-700 border-emerald-100', gradient: 'from-emerald-500 to-emerald-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'group-hover:ring-indigo-200', glow: 'group-hover:shadow-indigo-500/10', chip: 'bg-indigo-50 text-indigo-700 border-indigo-100', gradient: 'from-indigo-500 to-indigo-600' },
};

const difficultyTone: Record<string, string> = {
  'Very Easy': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Easy: 'bg-blue-50 text-blue-700 border-blue-100',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-100',
};

const comparisonRows = [
  { test: 'Pure Tone Audiometry (PTA)', duration: '20–30 min', age: 'Adults & teens', detects: 'Hearing threshold levels', response: 'Yes', pain: 'None' },
  { test: 'Tympanometry', duration: '5–10 min', age: 'All ages', detects: 'Middle-ear function', response: 'No', pain: 'Mild pressure' },
  { test: 'Speech Audiometry', duration: '15–25 min', age: 'Adults & children', detects: 'Speech understanding', response: 'Yes', pain: 'None' },
  { test: 'Otoacoustic Emissions (OAE)', duration: '5–15 min', age: 'Newborns & kids', detects: 'Cochlear (inner-ear) function', response: 'No', pain: 'None' },
  { test: 'Auditory Brainstem Response (ABR)', duration: '45–90 min', age: 'Infants & adults', detects: 'Hearing nerve & brainstem', response: 'No', pain: 'None' },
];

export default function HearingTests() {
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
                <Ear className="w-3.5 h-3.5" />
                Hearing Tests
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                Understanding Hearing Tests
              </h1>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Learn what each hearing test does, how it works, and what to expect—so you feel
                prepared, informed, and confident before your visit.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                Educational information only. Tests are performed by qualified professionals.
              </p>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Test cards */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {tests.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <TestCard test={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="At a glance"
              title="Compare Hearing Tests"
              subtitle="A quick side-by-side look at duration, age group, what each test detects, and comfort level."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-left">
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">Test</th>
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">Duration</th>
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">Age Group</th>
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap">Detects</th>
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap text-center">Patient Response</th>
                    <th className="px-5 py-4 font-semibold text-slate-700 whitespace-nowrap text-center">Pain Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row) => (
                    <tr key={row.test} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{row.test}</td>
                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.duration}</td>
                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{row.age}</td>
                      <td className="px-5 py-4 text-slate-600">{row.detects}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${row.response === 'Yes' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {row.response}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center text-slate-600 whitespace-nowrap">{row.pain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 p-8 sm:p-12 text-center shadow-xl shadow-blue-600/20">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <Stethoscope className="w-7 h-7" />
                </span>
                <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-white">
                  Not sure which hearing test is right for you?
                </h2>
                <p className="mt-3 text-blue-50 max-w-xl mx-auto">
                  An audiologist can recommend the right evaluation based on your symptoms and history.
                </p>
                <a
                  href="#/ask-ai"
                  className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-blue-700 bg-white shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Consult an Audiologist
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-[2.5rem] blur-2xl opacity-60" />
      <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-md border border-white/60 shadow-xl p-10 flex items-center justify-center animate-float">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-blue-200/40 animate-pulse-ring" />
          <span className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white shadow-lg">
            <Ear className="w-14 h-14" />
          </span>
        </div>
        <div className="absolute -top-5 -right-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-lg text-blue-600">
          <AudioLines className="w-7 h-7" />
        </div>
        <div className="absolute -bottom-5 -left-5 flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-lg text-teal-600">
          <Activity className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}

function TestCard({ test }: { test: Test }) {
  const [open, setOpen] = useState(false);
  const a = accentMap[test.accent];
  const Icon = test.icon;

  const details = [
    { icon: FlaskConical, label: 'Purpose', value: test.purpose },
    { icon: ClipboardList, label: 'How the test works', value: test.howItWorks },
    { icon: UserCheck, label: 'Who should take it', value: test.whoShouldTake },
    { icon: ShieldCheck, label: 'Preparation', value: test.preparation },
    { icon: Activity, label: 'What to expect', value: test.whatToExpect },
    { icon: ClipboardList, label: 'Results explained', value: test.results },
  ];

  return (
    <div
      className={`group rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl ring-1 ring-transparent ${a.ring} ${a.glow} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      <div className="p-7">
        <div className="flex items-start gap-4">
          <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${a.gradient} text-white shadow-md transition-transform group-hover:scale-110 flex-shrink-0`}>
            <Icon className="w-7 h-7" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900">{test.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${a.chip}`}>
                {test.abbr}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{test.shortDesc}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100">
            <Clock className="w-3.5 h-3.5" />
            {test.duration}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${difficultyTone[test.difficulty]}`}>
            <Gauge className="w-3.5 h-3.5" />
            {test.difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100">
            <Users className="w-3.5 h-3.5" />
            {test.recommended}
          </span>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          aria-expanded={open}
        >
          {open ? 'Show less' : 'Learn more'}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-7 pb-7 pt-1 border-t border-slate-100">
            <dl className="mt-5 space-y-4">
              {details.map((row) => {
                const RowIcon = row.icon;
                return (
                  <div key={row.label} className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-500">
                      <RowIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{row.label}</dt>
                      <dd className="mt-0.5 text-sm text-slate-700 leading-relaxed">{row.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <div className={`mt-5 flex items-start gap-3 rounded-xl ${a.bg} p-4`}>
              <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${a.text}`} />
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${a.text}`}>Helpful tip</p>
                <p className="mt-0.5 text-sm text-slate-700 leading-relaxed">{test.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
