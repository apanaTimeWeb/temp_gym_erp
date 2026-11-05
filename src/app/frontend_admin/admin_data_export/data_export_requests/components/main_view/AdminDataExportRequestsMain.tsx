"use client";
// RESPONSIBILITY: Route-level orchestrator for the documented scope-blocked Admin Data Export feature.
// DATA FLOW: feature data/state and user input → AdminDataExportRequestsMain → accessible UI/events routed to owning hooks (admin_data_export/data_export_requests/components/main_view/AdminDataExportRequestsMain.tsx)

import { useTranslations } from 'next-intl';
import { AlertTriangle, FileOutput } from 'lucide-react';

/**
 * @description Renders the explicit scope-blocked state for Data Export without fabricating API contracts or controls.
 * @dependencies Uses only module-owned locale content and semantic global design tokens.
 * @edge-case Remains intentionally non-interactive until the missing export contract is supplied.
 */
export default function AdminDataExportRequestsMain() {
  const t = useTranslations('data-export.AdminDataExportPage');
  return (
    <main data-testid="admin_data_export-admin_data_export-main-state" className="space-y-6">
      <header>
        <h1 className="text-page-title font-bold text-primary">{t('text_title')}</h1>
        <p className="mt-1 text-sm text-secondary">{t('text_description')}</p>
      </header>
      <section className="max-w-3xl rounded-xl border border-border bg-card p-6 shadow-card" aria-labelledby="data-export-scope-heading">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-warning-bg text-warning" aria-hidden="true"><AlertTriangle size={18}  strokeWidth={2}/></div>
          <div className="min-w-0">
            <h2 id="data-export-scope-heading" className="text-base font-semibold text-primary">{t('text_blocked')}</h2>
            <p className="mt-2 text-sm leading-6 text-secondary">{t('text_scope_gap')}</p>
            <div className="mt-5 rounded-lg border border-border bg-input p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary"><FileOutput size={18} aria-hidden="true"  strokeWidth={2}/>{t('text_no_invented')}</div>
              <p className="mt-1 text-xs leading-5 text-secondary">{t('text_no_fabrication')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
