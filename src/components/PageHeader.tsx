import { Ear } from 'lucide-react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  disclaimer,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  disclaimer?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100">
          <Ear className="w-3.5 h-3.5" />
          {eyebrow}
        </span>
      )}
      <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">{subtitle}</p>
      )}
      {disclaimer && (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl">
          {disclaimer}
        </p>
      )}
    </div>
  );
}
