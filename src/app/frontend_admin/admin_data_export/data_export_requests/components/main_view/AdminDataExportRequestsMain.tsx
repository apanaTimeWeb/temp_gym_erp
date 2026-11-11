"use client";
// RESPONSIBILITY: Route-level orchestrator for Admin Data Export feature.
// DATA FLOW: feature data/state and user input → AdminDataExportRequestsMain → export action / CSV generator.

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, CheckCircle, Database } from 'lucide-react';

export default function AdminDataExportRequestsMain() {
  const t = useTranslations('data-export.AdminDataExportPage');
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = (dataset: string) => {
    setDownloading(dataset);
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
    setTimeout(() => setDownloading(null), 1000);
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
              onClick={() => handleExport(ds.id)}
              disabled={downloading === ds.id}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
            >
              {downloading === ds.id ? <CheckCircle size={16} /> : <Download size={16} />}
              {downloading === ds.id ? 'Generating...' : 'Export to CSV'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
