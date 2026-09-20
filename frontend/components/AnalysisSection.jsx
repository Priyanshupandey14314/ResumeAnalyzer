'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export default function AnalysisSection({ restext, jobDescription }) {
  const [showResumeText, setShowResumeText] = useState(false);
  const [showJobDesc, setShowJobDesc] = useState(false);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Submitted Data Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Review the extracted resume text and submitted job description used for evaluation.
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {/* Toggle 1: Extracted Resume Text */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowResumeText(!showResumeText)}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Extracted Resume Text</span>
            </span>
            {showResumeText ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          {showResumeText && (
            <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
              {restext || 'No extracted text available.'}
            </div>
          )}
        </div>

        {/* Toggle 2: Submitted Job Description */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowJobDesc(!showJobDesc)}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Target Job Description</span>
            </span>
            {showJobDesc ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          {showJobDesc && (
            <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
              {jobDescription || 'No job description text available.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
