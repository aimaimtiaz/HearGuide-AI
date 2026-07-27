import type { ReactNode } from 'react';

export function Field({
  label,
  hint,
  children,
  required,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="text-blue-600"> *</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const baseInput =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none hover:border-slate-300';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInput} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseInput} resize-none ${props.className ?? ''}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${baseInput} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2364748b%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem] pr-10 ${props.className ?? ''}`}
    />
  );
}

export function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all text-left ${
        checked
          ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all ${
          checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

export function RadioOption({
  label,
  name,
  value,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all text-left ${
        checked
          ? 'border-teal-500 bg-teal-50 text-teal-700 ring-1 ring-teal-200'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <span
        className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
          checked ? 'border-teal-600' : 'border-slate-300 bg-white'
        }`}
      >
        {checked && <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
      </span>
      <input type="radio" name={name} value={value} className="sr-only" readOnly />
      {label}
    </button>
  );
}
