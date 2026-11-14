"use client";

import { useState } from 'react';
import { Database, CheckCircle, Download } from 'lucide-react';
import { triggerDownload } from '../../utils/AdminDataExportDownloadUtils';

interface DatasetItem {
  id: string;
  label: string;
  desc: string;
}

const EXPORT_DATASETS: DatasetItem[] = [
  { id: 'members', label: 'Members Directory Dataset', desc: 'Full member profiles, phone, email, join date, status, plan' },
  { id: 'payments', label: 'Payments & Revenue Transactions', desc: 'Financial transaction ledger, receipts, amount, payment mode' },
  { id: 'attendance', label: 'Attendance & Check-in Records', desc: 'Member and staff check-in/check-out timestamps and branch tracking' },
  { id: 'expenses', label: 'Branch Expense Ledger', desc: 'All logged operational and branch repair expenses' },
];

export function AdminDataExportPresets() {
  const [downloadingPreset, setDownloadingPreset] = useState<string | null>(null);

  const handlePresetExport = (dataset: string) => {
    setDownloadingPreset(dataset);
    const dateStr = new Date().toISOString().slice(0, 10);
    const dummyHeaders = ['ID', 'Date', 'Type', 'Status', 'Notes'];
    const dummyRows = [
      ['1', dateStr, dataset, 'COMPLETED', `Exported on ${dateStr}`],
    ];
    const csv = [dummyHeaders.join(','), ...dummyRows.map((r) => r.join(','))].join('\n');
    triggerDownload(csv, `smart_gym_${dataset.toLowerCase()}_${dateStr}.csv`, 'text/csv;charset=utf-8;');
    setTimeout(() => setDownloadingPreset(null), 1000);
  };

  return (
    <section className="space-y-3" aria-labelledby="quick-presets-heading">
      <h2 id="quick-presets-heading" className="text-sm font-bold uppercase tracking-wider text-secondary">
        Quick Preset Datasets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EXPORT_DATASETS.map((ds) => (
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
  );
}
