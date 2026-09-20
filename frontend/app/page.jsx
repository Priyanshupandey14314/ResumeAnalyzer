import React from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Target,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileText,
  PieChart,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 py-6 sm:py-10">
      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
          <span>Professional Resume Evaluation</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
          Know how well your resume matches the job.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Compare your resume with a job description and identify the skills, keywords, and areas that can strengthen your application.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/analyze"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Analyze Your Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors text-center"
          >
            How It Works
          </a>
        </div>

        {/* Feature Highlights Banner */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-200/80 mt-12">
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="text-2xl font-bold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Detailed Analysis</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="text-2xl font-bold text-slate-900">PDF</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Format Extraction</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="text-2xl font-bold text-slate-900">Skill</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Gap Detection</div>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-xs">
            <div className="text-2xl font-bold text-slate-900">Instant</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Actionable Results</div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Designed for serious job seekers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to evaluate job alignment and optimize your resume before submitting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Resume & Job Comparison
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Directly cross-reference your resume content against specific job requirements to evaluate overall match percentage.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Skill Match Analysis
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clear evaluation of mandatory qualifications, technical stack items, and core competencies present in your document.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Missing Skill Identification
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pinpoint exact skills, tools, or domain experience mentioned in the job description that are missing from your resume.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-colors space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Actionable Recommendations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Specific, practical advice on how to rephrase experience points, highlight keywords, and present qualifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="space-y-12 max-w-5xl mx-auto pt-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How it works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Four simple steps to benchmark and improve your job application.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 01 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="text-xs font-mono font-bold text-slate-400">01</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Upload your resume</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your resume PDF file securely into the workstation.
            </p>
          </div>

          {/* Step 02 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="text-xs font-mono font-bold text-slate-400">02</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Add job description</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste the target job posting text or key requirement summary.
            </p>
          </div>

          {/* Step 03 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="text-xs font-mono font-bold text-slate-400">03</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Review your match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Examine your match score, missing skills list, and alignment gaps.
            </p>
          </div>

          {/* Step 04 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 relative">
            <div className="text-xs font-mono font-bold text-slate-400">04</div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Improve application</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apply tailored suggestions to optimize your resume before submitting.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 max-w-5xl mx-auto shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Ready to test your resume match?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Upload your resume and get immediate insights to make your job application stand out.
        </p>
        <div className="pt-2">
          <Link
            href="/analyze"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all shadow-sm"
          >
            <span>Start Resume Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
