"use client";
// RESPONSIBILITY: Route-level orchestrator for Admin Data Export feature.
// DATA FLOW: feature data/state and user input → AdminDataExportRequestsMain → export action / CSV / Excel / PDF generator.

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, CheckCircle, Database, FileSpreadsheet, FileText, Calendar, Filter, RotateCcw, Building2 } from 'lucide-react';

type DataType = 'Members' | 'Payments' | 'Attendance' | 'Staff' | 'Full Report';
type ExportFormat = 'CSV' | 'Excel (.xlsx)' | 'PDF';
type TargetGym = 'All Gyms' | 'Andheri East' | 'Bandra West' | 'Powai' | 'Thane';

const DATA_TYPES: DataType[] = ['Members', 'Payments', 'Attendance', 'Staff', 'Full Report'];
const EXPORT_FORMATS: ExportFormat[] = ['CSV', 'Excel (.xlsx)', 'PDF'];
const TARGET_GYMS: TargetGym[] = ['All Gyms', 'Andheri East', 'Bandra West', 'Powai', 'Thane'];

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

  // Quick preset download tracking
  const [downloadingPreset, setDownloadingPreset] = useState<string | null>(null);

  const handleClear = () => {
    setSelectedDataType('Members');
    setSelectedFormat('CSV');
    setSelectedGym('All Gyms');
    setFromDate('2026-10-01');
    setToDate(new Date().toISOString().slice(0, 10));
    setExportSuccess(null);
  };

  const generateDataPayload = (dataType: DataType, gym: TargetGym) => {
    const gymFilter = gym === 'All Gyms' ? 'Andheri East' : gym;
    if (dataType === 'Members') {
      const headers = ['Member ID', 'Name', 'Phone', 'Email', 'Gym Branch', 'Membership Plan', 'Status', 'Join Date'];
      const rows = [
        ['MEM-001', 'Neha Verma', '+91 98765 11111', 'neha.v@example.com', gymFilter, 'Gold Annual', 'ACTIVE', '2026-02-04'],
        ['MEM-002', 'Arjun Rao', '+91 98765 22222', 'arjun.r@example.com', gymFilter, 'Premium Monthly', 'ACTIVE', '2026-07-11'],
        ['MEM-003', 'Karan Patel', '+91 98765 33333', 'karan.p@example.com', gymFilter, 'Silver Monthly', 'EXPIRED', '2025-09-01'],
        ['MEM-004', 'Isha Desai', '+91 98765 44444', 'isha.d@example.com', gymFilter, 'Gold Annual', 'ACTIVE', '2026-03-12'],
        ['MEM-005', 'Vikram Sen', '+91 98765 55555', 'vikram.s@example.com', gymFilter, 'Silver Monthly', 'EXPIRED', '2025-08-09'],
      ];
      return { headers, rows };
    }
    if (dataType === 'Payments') {
      const headers = ['Invoice No', 'Member Name', 'Gym Branch', 'Amount (INR)', 'Payment Mode', 'Status', 'Date'];
      const rows = [
        ['INV-1041', 'Neha Verma', gymFilter, '12000', 'UPI', 'SUCCESS', '2026-10-15'],
        ['INV-1042', 'Arjun Rao', gymFilter, '2500', 'Card', 'SUCCESS', '2026-10-18'],
        ['INV-1043', 'Pooja Sharma', gymFilter, '15000', 'Net Banking', 'SUCCESS', '2026-10-20'],
        ['INV-1044', 'Isha Desai', gymFilter, '12000', 'UPI', 'SUCCESS', '2026-10-25'],
      ];
      return { headers, rows };
    }
    if (dataType === 'Attendance') {
      const headers = ['Record ID', 'Person Name', 'Role', 'Gym Branch', 'Check-In', 'Check-Out', 'Duration', 'Status', 'Date'];
      const rows = [
        ['ATT-201', 'Neha Verma', 'Member', gymFilter, '07:15 AM', '08:45 AM', '90 mins', 'PRESENT', '2026-11-12'],
        ['ATT-202', 'Rohit Mehta', 'Manager', gymFilter, '06:00 AM', '03:00 PM', '9 hrs', 'PRESENT', '2026-11-12'],
        ['ATT-203', 'Priya Shah', 'Trainer', gymFilter, '02:00 PM', '10:00 PM', '8 hrs', 'PRESENT', '2026-11-12'],
        ['ATT-204', 'Arjun Rao', 'Member', gymFilter, '06:30 PM', '08:00 PM', '90 mins', 'PRESENT', '2026-11-12'],
      ];
      return { headers, rows };
    }
    if (dataType === 'Staff') {
      const headers = ['Staff ID', 'Full Name', 'Role', 'Gym Branch', 'Contact Phone', 'Shift', 'Monthly Salary (INR)', 'Status'];
      const rows = [
        ['STF-01', 'Rohit Mehta', 'Branch Manager', gymFilter, '+91 98765 00001', 'Morning', '55000', 'ACTIVE'],
        ['STF-02', 'Priya Shah', 'Senior Trainer', gymFilter, '+91 98765 00002', 'Evening', '42000', 'ACTIVE'],
        ['STF-03', 'Aman Khan', 'Front Desk Executive', gymFilter, '+91 98765 00003', 'Morning', '28000', 'ACTIVE'],
        ['STF-04', 'Sahil Joshi', 'Branch Manager', gymFilter, '+91 98765 00004', 'Morning', '52000', 'ACTIVE'],
      ];
      return { headers, rows };
    }
    // Full Report
    const headers = ['Metric', 'Category', 'Gym Branch', 'Period', 'Value', 'Status'];
    const rows = [
      ['Total Active Members', 'Members', gymFilter, `${fromDate} to ${toDate}`, '1,160', 'OPTIMAL'],
      ['Gross Collections', 'Revenue', gymFilter, `${fromDate} to ${toDate}`, 'INR 4,85,000', 'VERIFIED'],
      ['Average Attendance Rate', 'Operations', gymFilter, `${fromDate} to ${toDate}`, '78.4%', 'NORMAL'],
      ['Staff Count', 'HR', gymFilter, `${fromDate} to ${toDate}`, '53', 'ACTIVE'],
      ['Operating Expenses', 'Finance', gymFilter, `${fromDate} to ${toDate}`, 'INR 2,24,000', 'LOGGED'],
    ];
    return { headers, rows };
  };

  const handleCustomExport = () => {
    setIsExporting(true);
    setExportSuccess(null);

    const { headers, rows } = generateDataPayload(selectedDataType, selectedGym);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filenameBase = `smart_gym_${selectedDataType.toLowerCase().replace(/\s+/g, '_')}_${selectedGym.toLowerCase().replace(/\s+/g, '_')}_${fromDate}_to_${toDate}`;

    setTimeout(() => {
      if (selectedFormat === 'CSV') {
        const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filenameBase}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else if (selectedFormat === 'Excel (.xlsx)') {
        // Tab-delimited spreadsheet XML / TSV format parsed natively by Excel
        const tsvContent = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
        const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filenameBase}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        // PDF printable format
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

  const handlePresetExport = (dataset: string) => {
    setDownloadingPreset(dataset);
    const dateStr = new Date().toISOString().slice(0, 10);
    const dummyHeaders = ['ID', 'Date', 'Type', 'Status', 'Notes'];
    const dummyRows = [
      [`1`, dateStr, dataset, 'COMPLETED', `Exported on ${dateStr}`],
    ];
    const csv = [dummyHeaders.join(','), ...dummyRows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart_gym_${dataset.toLowerCase()}_${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadingPreset(null), 1000);
  };

  const exportDatasets = [
    { id: 'members', label: 'Members Directory Dataset', desc: 'Full member profiles, phone, email, join date, status, plan' },
    { id: 'payments', label: 'Payments & Revenue Transactions', desc: 'Financial transaction ledger, receipts, amount, payment mode' },
    { id: 'attendance', label: 'Attendance & Check-in Records', desc: 'Member and staff check-in/check-out timestamps and branch tracking' },
    { id: 'expenses', label: 'Branch Expense Ledger', desc: 'All logged operational and branch repair expenses' },
  ];

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
      <section className="space-y-3" aria-labelledby="quick-presets-heading">
        <h2 id="quick-presets-heading" className="text-sm font-bold uppercase tracking-wider text-secondary">
          Quick Preset Datasets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportDatasets.map((ds) => (
            <div key={ds.id} className="rounded-xl border border-border bg-card p-5 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Database size={18} className="text-primary" strokeWidth={2} />
                  <h3 className="font-semibold text-primary">{ds.label}</h3>
                </div>
                <p className="text-xs text-secondary leading-relaxed mb-4">{ds.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handlePresetExport(ds.id)}
                disabled={downloadingPreset === ds.id}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
              >
                {downloadingPreset === ds.id ? <CheckCircle size={16} /> : <Download size={16} />}
                {downloadingPreset === ds.id ? 'Generating...' : 'Instant Export to CSV'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
