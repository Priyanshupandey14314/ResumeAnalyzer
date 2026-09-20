'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { History, FileText, ArrowRight, Calendar, Loader2, Lock, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { analysisService } from '../../services/api';
import EmptyState from '../../components/EmptyState';
import ErrorMessage from '../../components/ErrorMessage';
import { formatDate, getScoreCategory, parseJsonArray } from '../../lib/utils';

export default function HistoryPage() {
  const router = useRouter();
  const { isAuthenticated, openAuthModal, loading: authLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchHistory = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);

    try {
      // Call REAL Spring Boot API GET /api/analysis/history
      const data = await analysisService.getHistory();
      setHistoryList(data || []);
    } catch (err) {
      setError(err.message || 'Failed to retrieve analysis history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchHistory();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  const handleSelectRecord = (record) => {
    sessionStorage.setItem('rm_latest_result', JSON.stringify(record));
    router.push('/results');
  };

  if (!isAuthenticated && !authLoading) {
    return (
      <div className="max-w-md mx-auto my-12 text-center bg-white border border-slate-200 rounded-3xl p-8 shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Sign in to view history</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Analysis history is saved securely to your account. Sign in to review past match reports.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
            <span>Analysis History</span>
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mt-1">
            Review past resume evaluations and job match scores.
          </p>
        </div>

        <Link
          href="/analyze"
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all flex items-center space-x-1.5 shrink-0 shadow-sm"
        >
          <span>New Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchHistory} />}

      {loading ? (
        <div className="py-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-slate-900 mx-auto" />
          <p className="text-xs font-medium text-slate-500">Loading your evaluation history...</p>
        </div>
      ) : historyList.length === 0 ? (
        <EmptyState
          title="No History Found"
          description="You haven't run any resume analyses yet. Upload a resume to get your first match score."
          actionText="Start Analysis"
          actionHref="/analyze"
        />
      ) : (
        <div className="space-y-4">
          {historyList.map((item) => {
            const category = getScoreCategory(item.matchScore);
            const missingSkills = parseJsonArray(item.mskills);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectRecord(item)}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${category.badgeClass}`}>
                      {item.matchScore}% — {category.label}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.createdAt)}</span>
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-relaxed">
                    {item.jobDescription}
                  </p>

                  {missingSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-medium">Missing:</span>
                      {missingSkills.slice(0, 4).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                      {missingSkills.length > 4 && (
                        <span className="text-[10px] text-slate-400">
                          +{missingSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 shrink-0 pt-2 sm:pt-0">
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                    View Results
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
