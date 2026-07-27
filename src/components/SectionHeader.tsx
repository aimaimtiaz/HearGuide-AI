import type { ReactNode } from 'react';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      {eyebrow && (
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{eyebrow}</span>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-slate-600">{subtitle}</p>}
      {children}
    </div>
  );
}
