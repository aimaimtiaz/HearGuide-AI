import { AlertCircle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 rounded-2xl bg-white border border-amber-200 p-6 sm:p-8 shadow-sm">
          <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Medical Disclaimer</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              This application provides educational information only and is not a substitute for
              professional medical diagnosis or treatment. Always seek the advice of a qualified
              healthcare provider with any questions about a medical condition. Never disregard
              professional medical advice or delay seeking it because of something you have read here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
