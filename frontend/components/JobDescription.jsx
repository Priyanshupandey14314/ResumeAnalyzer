'use client';

import React from 'react';
import { FileText, Trash2 } from 'lucide-react';

export default function JobDescription({ value, setValue, error }) {
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-slate-900">
          Job Description <span className="text-rose-500">*</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="text-xs text-slate-500 hover:text-rose-600 flex items-center space-x-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste the target job description, qualifications, and core requirements here..."
          className="w-full p-4 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all resize-y min-h-[220px]"
        />

        <div className="flex justify-between items-center px-1 pt-1 text-xs text-slate-400">
          <span>Tip: Include requirements, responsibilities, & preferred skills.</span>
          <div className="space-x-3 font-mono">
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
