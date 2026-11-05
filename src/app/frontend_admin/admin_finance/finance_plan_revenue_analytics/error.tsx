"use client";
// RESPONSIBILITY: Handles and displays errors encountered while loading the Plan Revenue Dashboard.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_plan_revenue_analytics/error.tsx)

import { useTranslations } from 'next-intl';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { AdminPlansRevenueErrorProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsErrorPropsTypes';

/**
 * Error is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function Error({
  error,
  reset,
}: AdminPlansRevenueErrorProps) {
  const t = useTranslations();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="bg-danger-bg p-4 rounded-full mb-4" data-testid="admin_plans-error-status-1">
        <AlertTriangle size={18} className="text-danger"  strokeWidth={2}/>
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">{t('plans.Error.text_2dc9d37464')}</h2>
      <p className="text-secondary text-center max-w-md mb-6">
        {t('plans.Error.text_f10af425f9')}</p>
      <button type="button"
        onClick={() => reset()}
        className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
       data-testid="admin_plans-admin_plans-revenue-error-state">
        <RefreshCw size={18}  strokeWidth={2}/>
        {t('plans.Error.text_cef2fe093b')}</button>
    </div>
  );
}
