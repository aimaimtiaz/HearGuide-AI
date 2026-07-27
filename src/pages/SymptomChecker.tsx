import { useMemo, useState } from 'react';
import {
  Stethoscope,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Clock,
  Ear,
  BookOpen,
  Sparkles,
  RotateCcw,
  Siren,
  Bell,
  User,
  HeartPulse,
  Building2,
  Loader2,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field, TextInput, TextArea, Select, CheckboxOption, RadioOption } from '@/components/FormControls';
import { analyzeSymptoms, isGeminiConfigured, type SymptomInput } from '@/lib/gemini';
import { parseSections, getSection, splitList } from '@/lib/parseMarkdown';

type SymptomKey =
  | 'ringing'
  | 'hearing_loss'
  | 'ear_pain'
  | 'dizziness'
  | 'fullness'
  | 'discharge'
  | 'noise_sensitivity';

const symptomOptions: { key: SymptomKey; label: string }[] = [
  { key: 'ringing', label: 'Ringing in ears' },
  { key: 'hearing_loss', label: 'Hearing loss' },
  { key: 'ear_pain', label: 'Ear pain' },
  { key: 'dizziness', label: 'Dizziness' },
  { key: 'fullness', label: 'Ear fullness' },
  { key: 'discharge', label: 'Discharge from ear' },
  { key: 'noise_sensitivity', label: 'Noise sensitivity' },
];

const durationOptions = [
  'Less than 1 day',
  '1–3 days',
  '4–7 days',
  'More than 1 week',
  'More than 1 month',
];

const earOptions = ['One ear', 'Both ears'];
const severityOptions = ['Mild', 'Moderate', 'Severe'];

type Analysis = {
  explanation: string;
  specialist: { label: string; icon: typeof User; tone: string };
  urgency: { label: string; tone: string };
  tests: string[];
  safety: string[];
  protectionAdvice: string;
  disclaimer: string;
  source: 'gemini' | 'local';
};

function specialistFromText(text: string): Analysis['specialist'] {
  const t = text.toLowerCase();
  if (t.includes('urgent')) return { label: text.split('\n')[0].trim() || 'Urgent care', icon: Siren, tone: 'rose' };
  if (t.includes('ent')) return { label: text.split('\n')[0].trim() || 'ENT', icon: Building2, tone: 'blue' };
  if (t.includes('audiologist')) return { label: text.split('\n')[0].trim() || 'Audiologist', icon: Ear, tone: 'teal' };
  return { label: text.split('\n')[0].trim() || 'Audiologist or ENT', icon: Stethoscope, tone: 'blue' };
}

function urgencyFromText(text: string): Analysis['urgency'] {
  const t = text.toLowerCase();
  if (t.includes('high')) return { label: 'High', tone: 'rose' };
  if (t.includes('moderate')) return { label: 'Moderate', tone: 'amber' };
  if (t.includes('low')) return { label: 'Low', tone: 'emerald' };
  return { label: text.split('\n')[0].trim() || 'Moderate', tone: 'amber' };
}

function parseGeminiResult(markdown: string): Analysis {
  const sections = parseSections(markdown);
  const explanation =
    getSection(sections, ['Possible Explanation', 'Explanation']) ||
    'Based on what you described, your symptoms may relate to common hearing or middle-ear conditions. A professional evaluation can give you a clear answer.';
  const specialistText = getSection(sections, ['Recommended Specialist', 'Suggested Specialist', 'Specialist']);
  const specialist = specialistText ? specialistFromText(specialistText) : { label: 'Audiologist or ENT', icon: Stethoscope, tone: 'blue' };
  const urgencyText = getSection(sections, ['Urgency Level', 'Urgency']);
  const urgency = urgencyText ? urgencyFromText(urgencyText) : { label: 'Moderate', tone: 'amber' };
  const testsText = getSection(sections, ['Suggested Hearing Tests', 'Hearing Tests', 'Recommended Hearing Tests']);
  const tests = testsText ? splitList(testsText) : ['PTA', 'Tympanometry'];
  const safetyText = getSection(sections, ['Hearing Protection Advice', 'Safety Advice', 'Protection Advice']);
  const safety = safetyText ? splitList(safetyText) : ['If symptoms persist or worsen, consult a healthcare professional.'];
  const protectionAdvice = getSection(sections, ['Hearing Protection Advice', 'Protection Advice']) || '';
  const disclaimer =
    getSection(sections, ['Medical Disclaimer', 'Disclaimer']) ||
    'This summary is for educational awareness only and is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation.';
  return { explanation, specialist, urgency, tests, safety, protectionAdvice, disclaimer, source: 'gemini' };
}

function analyze(input: {
  symptoms: SymptomKey[];
  duration: string;
  ear: string;
  severity: string;
}): Analysis {
  const s = new Set(input.symptoms);
  const severe = input.severity === 'Severe';
  const long = ['More than 1 week', 'More than 1 month'].includes(input.duration);
  const oneEar = input.ear === 'One ear';

  const tests: string[] = [];
  if (s.has('hearing_loss') || s.has('ringing') || s.has('noise_sensitivity')) tests.push('PTA');
  if (s.has('fullness') || s.has('ear_pain')) tests.push('Tympanometry');
  if (s.has('ringing') || s.has('noise_sensitivity')) tests.push('OAE');
  if (s.has('dizziness') || (s.has('hearing_loss') && oneEar)) tests.push('BERA/ABR');
  if (tests.length === 0) tests.push('PTA', 'Tympanometry');

  let urgency: Analysis['urgency'];
  if (s.has('discharge') || (severe && s.has('ear_pain')) || (s.has('dizziness') && severe)) {
    urgency = { label: 'High', tone: 'rose' };
  } else if (severe || long || s.size >= 4) {
    urgency = { label: 'Moderate', tone: 'amber' };
  } else {
    urgency = { label: 'Low', tone: 'emerald' };
  }

  let specialist: Analysis['specialist'];
  if (urgency.label === 'High') {
    specialist = { label: 'Urgent care', icon: Siren, tone: 'rose' };
  } else if (s.has('ear_pain') || s.has('discharge') || s.has('fullness')) {
    specialist = { label: 'ENT', icon: Building2, tone: 'blue' };
  } else {
    specialist = { label: 'Audiologist', icon: Ear, tone: 'teal' };
  }

  const parts: string[] = [];
  if (s.has('ringing')) parts.push('ringing or noise in the ear (tinnitus)');
  if (s.has('hearing_loss')) parts.push('reduced hearing clarity');
  if (s.has('ear_pain')) parts.push('pain or pressure that may suggest inflammation or infection');
  if (s.has('dizziness')) parts.push('balance issues that can be linked to inner-ear function');
  if (s.has('fullness')) parts.push('a feeling of fullness, often related to fluid or Eustachian tube changes');
  if (s.has('discharge')) parts.push('discharge, which may indicate infection and should be assessed promptly');
  if (s.has('noise_sensitivity')) parts.push('sensitivity to sound (hyperacusis)');
  const explanation = parts.length
    ? `Based on what you described, your symptoms point to ${parts.join(', ')}. These patterns are commonly evaluated with hearing and middle-ear assessments.`
    : 'No specific symptoms were selected. A baseline hearing evaluation can help establish a reference for future comparison.';

  const safety: string[] = [];
  if (urgency.label === 'High') {
    safety.push('Seek prompt professional evaluation—do not wait to see if symptoms resolve on their own.');
    safety.push('Avoid inserting anything into the ear canal and keep the ear dry.');
  } else {
    safety.push('If symptoms persist beyond a few days or worsen, consult a healthcare professional.');
    safety.push('Protect your ears from loud noise exposure in the meantime.');
  }
  if (s.has('dizziness')) safety.push('If you feel unsteady, sit down and avoid driving until evaluated.');
  safety.push('Remember: this guidance is educational and not a medical diagnosis.');

  return {
    explanation,
    specialist,
    urgency,
    tests,
    safety,
    protectionAdvice: 'Protect your ears from loud noise and avoid inserting anything into the ear canal.',
    disclaimer: 'This summary is for educational awareness only and is not a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation.',
    source: 'local',
  };
}

const toneMap: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' },
};

const sidebarItems = [
  {
    icon: BookOpen,
    title: 'Common hearing symptoms',
    tone: 'blue',
    points: ['Ringing or buzzing (tinnitus)', 'Muffled or reduced hearing', 'A feeling of fullness or pressure', 'Mild dizziness or imbalance'],
  },
  {
    icon: AlertTriangle,
    title: 'When to seek urgent help',
    tone: 'rose',
    points: ['Sudden hearing loss in one ear', 'Severe dizziness or vertigo', 'Pain with discharge from the ear', 'Hearing loss after a head injury'],
  },
  {
    icon: HeartPulse,
    title: 'Audiologist vs ENT',
    tone: 'teal',
    points: ['Audiologist: hearing tests & rehabilitation', 'ENT: medical & surgical ear conditions', 'Both may coordinate your care', 'Unsure? Start with a hearing evaluation'],
  },
  {
    icon: ShieldCheck,
    title: 'This app cannot replace a doctor',
    tone: 'amber',
    points: ['Educational guidance only', 'Not a medical diagnosis', 'Always consult a licensed professional', 'Use alongside, not instead of, care'],
  },
];

export default function SymptomChecker() {
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState<SymptomKey[]>([]);
  const [duration, setDuration] = useState(durationOptions[1]);
  const [ear, setEar] = useState(earOptions[1]);
  const [severity, setSeverity] = useState(severityOptions[0]);
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<Analysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSymptom = (key: SymptomKey) =>
    setSymptoms((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const canSubmit = age.trim() !== '' && symptoms.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    const input: SymptomInput = {
      age,
      symptoms: symptoms.map((k) => symptomOptions.find((o) => o.key === k)?.label ?? k),
      duration,
      ear,
      severity,
      notes,
    };
    try {
      const markdown = await analyzeSymptoms(input);
      setResult(parseGeminiResult(markdown));
      setSubmitted(true);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } catch (err) {
      console.error('[Symptom Checker] Gemini failed, using local fallback:', err);
      setResult(analyze({ symptoms, duration, ear, severity }));
      setSubmitted(true);
      setError(
        err instanceof Error
          ? err.message
          : 'AI is unavailable right now. Showing a basic educational summary instead.',
      );
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSubmitted(false);
    setError(null);
    setAge('');
    setSymptoms([]);
    setDuration(durationOptions[1]);
    setEar(earOptions[1]);
    setSeverity(severityOptions[0]);
    setNotes('');
    document.getElementById('symptom-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formCard = useMemo(
    () => (
      <form
        id="symptom-form"
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white border border-slate-100 shadow-sm p-7 sm:p-8"
      >
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600">
            <Stethoscope className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Tell us about your symptoms</h2>
            <p className="text-sm text-slate-500">All fields with * are required.</p>
          </div>
        </div>

        {/* Section: About you */}
        <div className="space-y-5">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">About you</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Age" required hint="Used only to contextualize guidance">
              <TextInput
                type="number"
                min={1}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 34"
              />
            </Field>
            <Field label="Duration" required hint="How long symptoms have lasted">
              <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
                {durationOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Select>
            </Field>
          </div>
        </div>

        <div className="my-7 h-px bg-slate-100" />

        {/* Section: Symptoms */}
        <div className="space-y-5">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">Your symptoms</p>
          <Field label="Symptoms" required hint="Select all that apply">
            <div className="grid sm:grid-cols-2 gap-3">
              {symptomOptions.map((o) => (
                <CheckboxOption
                  key={o.key}
                  label={o.label}
                  checked={symptoms.includes(o.key)}
                  onChange={() => toggleSymptom(o.key)}
                />
              ))}
            </div>
          </Field>

          <Field label="One ear or both ears?" required>
            <div className="grid sm:grid-cols-2 gap-3">
              {earOptions.map((o) => (
                <RadioOption
                  key={o}
                  label={o}
                  name="ear"
                  value={o}
                  checked={ear === o}
                  onChange={() => setEar(o)}
                />
              ))}
            </div>
          </Field>

          <Field label="Severity of concern" required>
            <div className="grid grid-cols-3 gap-3">
              {severityOptions.map((o) => (
                <button
                  type="button"
                  key={o}
                  onClick={() => setSeverity(o)}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    severity === o
                      ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Additional notes" hint="Anything else worth mentioning">
            <TextArea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe onset, triggers, or related conditions..."
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-600/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Symptoms
            </>
          )}
        </button>
        {!canSubmit && !loading && (
          <p className="mt-3 text-center text-xs text-slate-500">
            Enter your age and select at least one symptom to continue.
          </p>
        )}
        {!isGeminiConfigured() && (
          <p className="mt-3 text-center text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg py-2">
            Demo mode: Gemini API key not set. Connect a key to enable AI-powered analysis.
          </p>
        )}
      </form>
    ),
    [age, symptoms, duration, ear, severity, notes, canSubmit, loading],
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero band — matches home page hero treatment */}
      <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 -right-32 w-[26rem] h-[26rem] bg-blue-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-32 -left-32 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              Symptom Checker
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              AI Symptom Checker
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Describe your symptoms and get educational guidance about possible causes and next steps.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
              <AlertTriangle className="w-4 h-4" />
              Educational use only, not a medical diagnosis.
            </p>
          </div>
        </div>
      </section>

      {/* Main two-column layout — 55/45 on desktop */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.22fr_1fr] gap-8 items-start">
            {/* Left: form */}
            <div className="animate-fade-up">{formCard}</div>

            {/* Right: educational sidebar */}
            <aside className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:sticky lg:top-24">
              {sidebarItems.map((item) => {
                const tone = toneMap[item.tone];
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-11 h-11 rounded-xl ${tone.bg} ${tone.text}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${tone.dot}`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </aside>
          </div>

          {/* Results — full width below the grid */}
          {submitted && result && (
            <div id="results" className="mt-8 animate-fade-up scroll-mt-24">
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white">
                      <Activity className="w-5 h-5" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Your educational summary</h2>
                      <p className="text-sm text-slate-500">Based on the symptoms you shared</p>
                    </div>
                  </div>
                  <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${result.source === 'gemini' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {result.source === 'gemini' ? 'AI-powered' : 'Basic summary'}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-7">
                  {/* Possible explanation */}
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Possible explanation
                    </p>
                    <p className="mt-2 text-slate-700 leading-relaxed">{result.explanation}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Suggested specialist */}
                    <div className={`rounded-xl border p-5 ${toneMap[result.specialist.tone].border} ${toneMap[result.specialist.tone].bg}`}>
                      <div className="flex items-center gap-2.5">
                        <result.specialist.icon className={`w-5 h-5 ${toneMap[result.specialist.tone].text}`} />
                        <p className="text-sm font-semibold text-slate-700">Suggested specialist</p>
                      </div>
                      <p className={`mt-2 text-xl font-bold ${toneMap[result.specialist.tone].text}`}>
                        {result.specialist.label}
                      </p>
                    </div>
                    {/* Urgency */}
                    <div className={`rounded-xl border p-5 ${toneMap[result.urgency.tone].border} ${toneMap[result.urgency.tone].bg}`}>
                      <div className="flex items-center gap-2.5">
                        <Clock className={`w-5 h-5 ${toneMap[result.urgency.tone].text}`} />
                        <p className="text-sm font-semibold text-slate-700">Urgency level</p>
                      </div>
                      <p className={`mt-2 text-xl font-bold ${toneMap[result.urgency.tone].text}`}>
                        {result.urgency.label}
                      </p>
                    </div>
                  </div>

                  {/* Recommended tests */}
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Recommended hearing tests
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {result.tests.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-teal-700 bg-teal-50 border border-teal-200"
                        >
                          <Ear className="w-4 h-4" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Safety advice */}
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Safety advice
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {result.safety.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">{error}</p>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">{result.disclaimer}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      onClick={handleReset}
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-50"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Start over
                    </button>
                    <a
                      href="#/tests"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-4 h-4" />
                      Explore hearing tests
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="mt-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
            <Bell className="w-4 h-4 text-slate-400" />
            Built for educational awareness and hearing health learning.
          </p>
        </div>
      </section>
    </div>
  );
}
