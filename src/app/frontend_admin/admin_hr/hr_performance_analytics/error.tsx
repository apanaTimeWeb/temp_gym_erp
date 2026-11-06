"use client";
// RESPONSIBILITY: Handles and displays errors encountered while loading the Staff Performance Dashboard.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_hr/hr_performance_analytics/error.tsx)

import { useTranslations } from 'next-intl';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { AdminHrPerformanceErrorProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsErrorPropsTypes';

/**
 * Error is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Error({
  error,
  reset,
}: AdminHrPerformanceErrorProps) {
  const t = useTranslations();

  return (
    <div className="p-6 w-full mt-10">
      <div className="bg-danger-bg border border-border rounded-2xl p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-danger-bg rounded-full flex items-center justify-center mb-4" data-testid="admin_hr-error-status-1">
          <AlertTriangle size={18} strokeWidth={2} className="text-danger" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">{t('hr.Error.text_3f5701190c')}</h2>
        <p className="text-secondary text-sm mb-6 max-w-md">
          {t('hr.Error.text_f10af425f9')}</p>
        <button type="button"
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-danger text-on-danger font-semibold rounded-xl hover:bg-danger-bg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
         data-testid="admin_hr-admin_hr-performance-error-state">
          <RefreshCw size={18} strokeWidth={2} />
          {t('hr.Error.text_cef2fe093b')}</button>
      </div>
    </div>
  );
}
