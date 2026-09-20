'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-800 space-y-4 max-w-xl mx-auto my-6 shadow-xs">
      <div className="flex items-start space-x-3">
        <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-rose-900">Analysis Failed</h4>
          <p className="text-xs text-rose-700 leading-relaxed">
            {message || 'An error occurred while processing your request. Please verify your connection or inputs.'}
          </p>
        </div>
      </div>

      {onRetry && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onRetry}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-rose-100/50 text-rose-800 text-xs font-semibold rounded-xl border border-rose-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
