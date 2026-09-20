'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, FileText, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { analysisService } from '../../services/api';
import ResumeUpload from '../../components/ResumeUpload';
import JobDescription from '../../components/JobDescription';
import AnalyzeButton from '../../components/AnalyzeButton';
import LoadingState from '../../components/LoadingState';
import ErrorMessage from '../../components/ErrorMessage';

export default function AnalyzePage() {
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [fileError, setFileError] = useState(null);
  const [jobError, setJobError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAnalyze = async () => {
    setFileError(null);
    setJobError(null);
    setApiError(null);

    let hasError = false;

    if (!file) {
      setFileError('Please upload your resume PDF document.');
      hasError = true;
    }

    if (!jobDescription || !jobDescription.trim()) {
      setJobError('Please enter or paste the target job description.');
      hasError = true;
    } else if (jobDescription.trim().length < 20) {
      setJobError('Job description should be at least 20 characters long.');
      hasError = true;
    }

    if (hasError) return;

    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    setLoading(true);

    try {
      // Execute REAL Spring Boot API call POST /api/analysis
      const resultData = await analysisService.analyzeResume(file, jobDescription);
      
      // Store result in sessionStorage for the results view
      sessionStorage.setItem('rm_latest_result', JSON.stringify(resultData));
      
      // Navigate to results page
      router.push('/results');
    } catch (err) {
      setApiError(err.message || 'Failed to complete resume analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-8">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left border-b border-slate-200/80 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyze Resume Match
        </h1>
        <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
          Upload your resume PDF and paste the job description to get a comprehensive match score, missing skills breakdown, and improvement suggestions.
        </p>
      </div>

      {apiError && <ErrorMessage message={apiError} onRetry={handleAnalyze} />}

      {/* Main Workstation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Resume Upload */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <ResumeUpload
            file={file}
            setFile={setFile}
            error={fileError}
            setError={setFileError}
          />
          <p className="text-xs text-slate-400 leading-relaxed">
            Note: Text will be parsed automatically from your PDF file using Apache PDFBox.
          </p>
        </div>

        {/* Column 2: Job Description */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <JobDescription
            value={jobDescription}
            setValue={setJobDescription}
            error={jobError}
          />
        </div>
      </div>

      {!isAuthenticated && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Sign in or create a free account to run your analysis and save history.</span>
          </div>
          <button
            onClick={() => openAuthModal('login')}
            className="px-3 py-1.5 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors shrink-0 ml-2"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Submit Action */}
      <div className="pt-2">
        <AnalyzeButton
          onClick={handleAnalyze}
          loading={loading}
          disabled={!file || !jobDescription.trim()}
        />
      </div>
    </div>
  );
}
