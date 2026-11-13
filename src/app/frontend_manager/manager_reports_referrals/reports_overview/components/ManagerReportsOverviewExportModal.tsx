'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Download, RotateCcw, CheckCircle2, FileSpreadsheet, FileText, Database } from 'lucide-react';

interface ManagerReportsOverviewExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManagerReportsOverviewExportModal({ isOpen, onClose }: ManagerReportsOverviewExportModalProps) {
  const [dataType, setDataType] = useState<'Members' | 'Payments' | 'Attendance' | 'Staff' | 'Full Report'>('Full Report');
  const [format, setFormat] = useState<'CSV' | 'Excel (.xlsx)' | 'PDF'>('CSV');
  const [targetGym, setTargetGym] = useState<string>('All Gyms');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClear = () => {
    setDataType('Full Report');
    setFormat('CSV');
    setTargetGym('All Gyms');
    setFromDate('');
    setToDate('');
    setExportSuccess(false);
  };

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    setTimeout(() => {
      let downloadUrl = '/__mocks__/manager/reports_export.csv';
      let fileName = 'reports_export.csv';

      if (dataType === 'Members') {
        downloadUrl = '/__mocks__/manager/members_export.csv';
        fileName = 'members_export.csv';
      } else if (dataType === 'Payments') {
        if (format === 'PDF') {
          downloadUrl = '/__mocks__/manager/finance_export.pdf';
          fileName = 'payments_export.pdf';
        } else {
          downloadUrl = '/__mocks__/manager/finance_export.csv';
          fileName = 'payments_export.csv';
        }
      } else if (dataType === 'Attendance') {
        downloadUrl = '/__mocks__/manager/attendance_export.csv';
        fileName = 'attendance_export.csv';
      } else if (dataType === 'Staff') {
        downloadUrl = '/__mocks__/manager/staff_export.csv';
        fileName = 'staff_export.csv';
      } else if (format === 'PDF') {
        downloadUrl = '/__mocks__/manager/finance_export.pdf';
        fileName = 'full_report_export.pdf';
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportSuccess(true);
    }, 600);
  };

  const dataTypes: Array<'Members' | 'Payments' | 'Attendance' | 'Staff' | 'Full Report'> = [
    'Members',
    'Payments',
    'Attendance',
    'Staff',
    'Full Report',
  ];

  const formats: Array<'CSV' | 'Excel (.xlsx)' | 'PDF'> = ['CSV', 'Excel (.xlsx)', 'PDF'];

  const gyms = ['All Gyms', 'Andheri East', 'Bandra West', 'Powai', 'Thane'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manager-export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-dialog max-h-dialog-desktop overflow-y-auto outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
              <Database size={20} />
            </div>
            <div>
              <h2 id="manager-export-modal-title" className="text-lg font-bold text-text-primary">
                New Export
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Select data type, format, gyms, and date range
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-text-secondary rounded-lg hover:bg-input hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Close export modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Data Type */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Data Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dataTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDataType(type)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                    dataType === type
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-input text-text-primary border-border hover:border-primary/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Export Format *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                    format === fmt
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-input text-text-primary border-border hover:border-primary/50'
                  }`}
                >
                  {fmt === 'PDF' ? <FileText size={14} /> : <FileSpreadsheet size={14} />}
                  <span>{fmt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Gyms */}
          <div>
            <label htmlFor="manager-export-target-gyms" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Target Gyms *
            </label>
            <select
              id="manager-export-target-gyms"
              value={targetGym}
              onChange={(e) => setTargetGym(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {gyms.map((gym) => (
                <option key={gym} value={gym}>
                  {gym}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="manager-export-from-date" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                From Date *
              </label>
              <input
                id="manager-export-from-date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
            <div>
              <label htmlFor="manager-export-to-date" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                To Date *
              </label>
              <input
                id="manager-export-to-date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              />
            </div>
          </div>

          {/* Success Notification */}
          {exportSuccess && (
            <div className="flex items-center gap-2 p-3 bg-success-bg border border-success/30 rounded-xl text-xs text-success-text font-medium">
              <CheckCircle2 size={16} />
              <span>Export generated successfully! Download started.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-input/40">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg"
          >
            <RotateCcw size={14} />
            <span>Clear</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-text-secondary border border-border rounded-lg hover:bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold bg-primary text-on-primary rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Download size={14} />
              <span>{isExporting ? 'Generating...' : 'Export'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

