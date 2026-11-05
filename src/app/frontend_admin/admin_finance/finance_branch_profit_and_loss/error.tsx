"use client";
// RESPONSIBILITY: Error boundary for the P&L page (Rule 9 — error.tsx).
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_branch_profit_and_loss/error.tsx)

import { useTranslations } from 'next-intl';
// Branded fallback with Retry button. Never exposes raw stack traces.
import { AlertTriangle, RefreshCw } from 'lucide-react';

import type { AdminFinancePnlErrorProps } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossErrorPropsTypes';


/**
 * AdminFinancePnlError renders the admin finance pnl error UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminFinancePnlError({ error, reset }: AdminFinancePnlErrorProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-6">
      <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center space-y-5 shadow-dialog">
        <div className="w-14 h-14 rounded-2xl bg-danger-bg border border-border flex items-center justify-center mx-auto">
          <AlertTriangle size={18} strokeWidth={2} className="text-danger" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">{t('finance.AdminFinancePnlError.text_5a61f899b6')}</h2>
          <p className="text-sm text-secondary mt-2">
            {t('finance.AdminFinancePnlError.text_83752884ab')}</p>
          <p className="text-xs text-secondary mt-3">{t('finance.AdminFinancePnlError.text_f10af425f9')}</p>
        </div>
        <button type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
         data-testid="admin_finance-admin_finance-pnl-error-state">
          <RefreshCw size={18} strokeWidth={2} />
          {t('finance.AdminFinancePnlError.text_cef2fe093b')}</button>
      </div>
    </div>
  );
}
