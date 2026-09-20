'use client';

import React, { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';

export default function ResumeUpload({ file, setFile, error, setError }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    // Validate PDF type (Apache PDFBox backend constraint)
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Please upload a PDF document (.pdf). Other formats are not supported by the parser.');
      return;
    }

    // Validate size limit (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-900">
        Resume Document <span className="text-rose-500">*</span>
      </label>

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-slate-900 bg-slate-100/80 scale-[0.99]'
              : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50/80'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
            }}
          />

          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-6 h-6" />
          </div>

          <p className="text-sm font-medium text-slate-800">
            <span className="font-semibold text-slate-900 underline underline-offset-2">
              Click to upload
            </span>{' '}
            or drag & drop your resume
          </p>

          <p className="text-xs text-slate-500 mt-1.5">
            Supported format: PDF up to 10MB
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-sky-600" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-slate-900 truncate">
                  {file.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFile(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors ml-2"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-xs text-rose-600 font-medium pt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
