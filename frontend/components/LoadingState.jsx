'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, FileSearch, CheckCircle2 } from 'lucide-react';

export default function LoadingState() {
  const steps = [
    'Parsing PDF text and extracting document structure...',
    'Comparing skills with target job requirements...',
    'Generating actionable resume recommendations...',
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-xs max-w-lg mx-auto space-y-6 my-8">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mx-auto shadow-xs border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Analyzing Your Resume
        </h3>
        <p className="text-sm text-slate-500">
          Our backend is extracting text and running match analysis. This takes a few seconds.
        </p>
      </div>

      <div className="space-y-3 text-left border-t border-slate-100 pt-6">
        {steps.map((stepText, idx) => (
          <div key={idx} className="flex items-center space-x-3 text-xs">
            {idx < activeStep ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : idx === activeStep ? (
              <Loader2 className="w-4 h-4 text-sky-600 animate-spin shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
            )}
            <span
              className={
                idx <= activeStep ? 'font-medium text-slate-800' : 'text-slate-400'
              }
            >
              {stepText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
