'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import { parseJsonArray } from '../lib/utils';

export default function SkillsList({ mskills, suggestions }) {
  const missingSkillsList = parseJsonArray(mskills);
  const suggestionsList = parseJsonArray(suggestions);

  return (
    <div className="space-y-6">
      {/* MISSING SKILLS SECTION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Missing or Unemphasized Skills
            </h3>
            <p className="text-xs text-slate-500">
              Requirements mentioned in the job description that were not detected in your resume.
            </p>
          </div>
        </div>

        {missingSkillsList.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {missingSkillsList.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            No critical missing skills were identified. Excellent match!
          </p>
        )}
      </div>

      {/* RECOMMENDATIONS SECTION */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Actionable Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              Tailored suggestions to optimize your resume for higher ATS & hiring manager alignment.
            </p>
          </div>
        </div>

        {suggestionsList.length > 0 ? (
          <ul className="space-y-3 pt-1">
            {suggestionsList.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-sm text-slate-800 leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 p-3 rounded-xl bg-slate-50 border border-slate-200">
            No specific recommendations returned.
          </p>
        )}
      </div>
    </div>
  );
}
