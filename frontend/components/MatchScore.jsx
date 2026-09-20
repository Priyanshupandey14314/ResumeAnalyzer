'use client';

import React from 'react';
import { getScoreCategory } from '../lib/utils';
import { Award, CheckCircle } from 'lucide-react';

export default function MatchScore({ score = 0 }) {
  const category = getScoreCategory(score);
  const normalizedScore = Math.min(100, Math.max(0, score));

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center space-x-6">
        {/* SVG Circular Gauge */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-slate-100"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={category.strokeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {normalizedScore}%
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Match Score
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-semibold ${category.badgeClass}">
            <Award className="w-3.5 h-3.5" />
            <span>{category.label}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Overall Qualification Alignment
          </h3>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            {normalizedScore >= 80
              ? 'Your resume shows exceptional alignment with the key qualifications and experience required.'
              : normalizedScore >= 60
              ? 'Your resume covers the primary requirements well. Address the highlighted missing skills to increase impact.'
              : 'Several key technical or domain skills are missing from your resume. Review the recommendations below.'}
          </p>
        </div>
      </div>
    </div>
  );
}
