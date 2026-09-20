import React from 'react';
import Link from 'next/link';
import { FileCheck, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <FileCheck className="w-4 h-4" />
              </div>
              <span className="font-semibold text-white text-base tracking-tight">
                Resume Matcher
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Understand how effectively your resume targets specific job requirements. Get data-driven match analysis, missing skill highlights, and actionable career insights.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:text-white transition-colors">
                  Analyze Resume
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">
                  Match History
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Security & Privacy
            </h4>
            <div className="flex items-start space-x-2 text-sm text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs leading-normal">
                Your resumes and data are stored securely and never shared with third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Resume Matcher. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Powered by Spring Boot & Next.js</p>
        </div>
      </div>
    </footer>
  );
}
