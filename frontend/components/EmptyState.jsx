'use client';

import React from 'react';
import Link from 'next/link';
import { FileSearch, ArrowRight } from 'lucide-react';

export default function EmptyState({ title, description, actionText, actionHref }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-xs max-w-md mx-auto my-8 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto border border-slate-200">
        <FileSearch className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">{title || 'No History Available'}</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          {description || 'You have not evaluated any resumes yet. Start by comparing your resume with a job description.'}
        </p>
      </div>

      {actionText && actionHref && (
        <div className="pt-2">
          <Link
            href={actionHref}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
