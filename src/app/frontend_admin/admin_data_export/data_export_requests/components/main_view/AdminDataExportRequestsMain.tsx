"use client";
// RESPONSIBILITY: Route-level orchestrator for Admin Data Export feature.
// DATA FLOW: feature data/state and user input → AdminDataExportRequestsMain → export action / CSV / Excel / PDF generator.

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, CheckCircle, Database, FileSpreadsheet, FileText, RotateCcw, Building2 } from 'lucide-react';
import {
  DataType,
  ExportFormat,
  TargetGym,
  DATA_TYPES,
  EXPORT_FORMATS,
  TARGET_GYMS,
  generateDataPayload,
  triggerDownload,
} from '../../utils/AdminDataExportDownloadUtils';
import { AdminDataExportRequestsPresets } from '../presets/AdminDataExportRequestsPresets';

export default function AdminDataExportRequestsMain() {
  const t = useTranslations('data-export.AdminDataExportPage');

  // Form states
  const [selectedDataType, setSelectedDataType] = useState<DataType>('Members');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('CSV');
  const [selectedGym, setSelectedGym] = useState<TargetGym>('All Gyms');
  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-11-13');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleClear = () => {
    setSelectedDataType('Members');
    setSelectedFormat('CSV');
    setSelectedGym('All Gyms');
    setFromDate('2026-10-01');
    setToDate(new Date().toISOString().slice(0, 10));
    setExportSuccess(null);
  };

  const handleCustomExport = () => {
    setIsExporting(true);
    setExportSuccess(null);

    const { headers, rows } = generateDataPayload(selectedDataType, selectedGym, fromDate, toDate);
    const filenameBase = `smart_gym_${selectedDataType.toLowerCase().replace(/\s+/g, '_')}_${selectedGym.toLowerCase().replace(/\s+/g, '_')}_${fromDate}_to_${toDate}`;

    setTimeout(() => {
      if (selectedFormat === 'CSV') {
        const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
        triggerDownload(csvContent, `${filenameBase}.csv`, 'text/csv;charset=utf-8;');
      } else if (selectedFormat === 'Excel (.xlsx)') {
        const tsvContent = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
        triggerDownload(tsvContent, `${filenameBase}.xlsx`, 'application/vnd.ms-excel;charset=utf-8;');
      } else {
        const printableWindow = window.open('', '_blank');
        if (printableWindow) {
          printableWindow.document.write(`
            <html>
              <head>
                <title>${selectedDataType} Report - Smart Gym 360</title>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #111; }
                  h1 { margin-bottom: 4px; font-size: 20px; }
                  p { color: #666; font-size: 13px; margin-top: 0; }
                  .meta { background: #f4f4f5; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 12px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
                  th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
                  th { background: #f9fafb; font-weight: 600; }
                  tr:nth-child(even) { background: #fbfbfb; }
                </style>
              </head>
              <body>
                <h1>Smart Gym 360 — ${selectedDataType} Official Export</h1>
                <p>Generated on ${new Date().toLocaleString()} for Branch: <strong>${selectedGym}</strong></p>
                <div class="meta">
                  Date Range: <strong>${fromDate} to ${toDate}</strong> | Scope: <strong>${selectedGym}</strong> | Data Type: <strong>${selectedDataType}</strong>
                </div>
                <table>
                  <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>
              </body>
            </html>
          `);
          printableWindow.document.close();
          printableWindow.focus();
          setTimeout(() => printableWindow.print(), 250);
        }
      }

      setIsExporting(false);
      setExportSuccess(`${selectedDataType} (${selectedFormat}) generated successfully for ${selectedGym}!`);
      setTimeout(() => setExportSuccess(null), 5000);
    }, 600);
  };

  return (
    <main data-testid="admin_data_export-admin_data_export-main-state" className="space-y-6">
      <header>
        <h1 className="text-page-title font-bold text-primary">{t('text_title')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('text_description')}</p>
      </header>

      {/* NEW EXPORT INTERACTIVE FORM */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6" aria-labelledby="new-export-heading">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <FileSpreadsheet size={20} className="text-primary" strokeWidth={2} />
          <div>
            <h2 id="new-export-heading" className="text-lg font-bold text-primary">New Export</h2>
            <p className="text-xs text-secondary">Select data type, format, gyms, and date range</p>
          </div>
        </div>

        {exportSuccess && (
          <div role="status" className="flex items-center gap-2 rounded-xl border border-success bg-success-bg p-3.5 text-sm font-semibold text-success-text">
            <CheckCircle size={18} />
            <span>{exportSuccess}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Data Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
              Data Type <span className="text-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DATA_TYPES.map((dt) => {
                const active = selectedDataType === dt;
                return (
                  <button
                    key={dt}
                    type="button"
                    onClick={() => setSelectedDataType(dt)}
                    className={`inline-flex min-h-11 items-center px-4 py-2 rounded-xl text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      active
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-border bg-surface-highlight text-primary hover:bg-surface-hover'
                    }`}
                  >
                    {dt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
              Export Format <span className="text-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {EXPORT_FORMATS.map((fmt) => {
                const active = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      active
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-border bg-surface-highlight text-primary hover:bg-surface-hover'
                    }`}
                  >
                    {fmt === 'CSV' && <Database size={15} />}
                    {fmt === 'Excel (.xlsx)' && <FileSpreadsheet size={15} />}
                    {fmt === 'PDF' && <FileText size={15} />}
                    <span>{fmt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target Gyms */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
              Target Gyms <span className="text-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TARGET_GYMS.map((gym) => {
                const active = selectedGym === gym;
                return (
                  <button
                    key={gym}
                    type="button"
                    onClick={() => setSelectedGym(gym)}
                    className={`inline-flex min-h-11 items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      active
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-border bg-surface-highlight text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Building2 size={14} />
                    <span>{gym}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="export-from-date" className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                From Date <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input
                  id="export-from-date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full min-h-11 rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
            <div>
              <label htmlFor="export-to-date" className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                To Date <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input
                  id="export-to-date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full min-h-11 rounded-xl border border-border bg-input px-3.5 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface-highlight px-4 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
          >
            <RotateCcw size={16} />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={handleCustomExport}
            disabled={isExporting}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm motion-safe:transition-all motion-safe:active:scale-95"
          >
            {isExporting ? <CheckCircle size={18} className="animate-spin" /> : <Download size={18} />}
            <span>{isExporting ? 'Generating Export...' : `Generate & Download ${selectedFormat}`}</span>
          </button>
        </div>
      </section>

      {/* QUICK PRESET DATASETS */}
      <AdminDataExportRequestsPresets />
    </main>
  );
}
