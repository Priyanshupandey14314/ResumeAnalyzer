'use client';

import React from 'react';
import { Loader2, ArrowRight, Sparkles } from 'lucide-react';

export default function AnalyzeButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-sky-400" />
          <span>Analyzing Resume & Requirements...</span>
        </>
      ) : (
        <>
          <span>Analyze Resume Match</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
