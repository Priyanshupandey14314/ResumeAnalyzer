'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, History, FileText, Share2, Check } from 'lucide-react';
import MatchScore from '../../components/MatchScore';
import SkillsList from '../../components/SkillsList';
import AnalysisSection from '../../components/AnalysisSection';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../lib/utils';

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = sessionStorage.getItem('rm_latest_result');
    if (raw) {
      try {
        setAnalysis(JSON.parse(raw));
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  if (!mounted) return null;

  if (!analysis) {
    return (
      <div className="py-12">
        <EmptyState
          title="No Analysis Result Found"
          description="Please run a resume evaluation first to view your match score and recommendations."
          actionText="Analyze Resume Now"
          actionHref="/analyze"
        />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium mb-1">
            <Link href="/analyze" className="hover:text-slate-900 flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Workstation</span>
            </Link>
            <span>•</span>
            <span>Evaluated {formatDate(analysis.createdAt)}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Resume Match Results
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Results</span>
              </>
            )}
          </button>

          <Link
            href="/analyze"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>

      {/* 1. MATCH SCORE GAUGE */}
      <MatchScore score={analysis.matchScore} />

      {/* 2. MISSING SKILLS & RECOMMENDATIONS */}
      <SkillsList mskills={analysis.mskills} suggestions={analysis.suggestions} />

      {/* 3. SUBMITTED DATA COMPARISON */}
      <AnalysisSection
        restext={analysis.restext}
        jobDescription={analysis.jobDescription}
      />

      {/* Footer Navigation CTA */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <Link
          href="/history"
          className="text-sm font-semibold text-slate-700 hover:text-slate-900 flex items-center space-x-2"
        >
          <History className="w-4 h-4" />
          <span>View past match evaluations</span>
        </Link>
        <Link
          href="/analyze"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
        >
          Analyze another job description
        </Link>
      </div>
    </div>
  );
}
