"use client";
// RESPONSIBILITY: Shared error fallback renderer used by all admin module error.tsx boundaries.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutErrorFallback.tsx)

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ADMIN_DASHBOARD_URL } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/config/finance_profit_and_loss_report.url_config';
// Distinguishes between 403 Forbidden (permission denied) and generic errors.
// Never expose raw error messages or stack traces to the user.

import { ShieldOff, RefreshCw, LayoutDashboard } from 'lucide-react';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportMonitoring';
import Link from 'next/link';

import type { AdminErrorFallbackProps } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportErrorFallbackTypes';

/**
 * is403 is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function isAdminForbiddenError(error: Error & { status?: number; statusCode?: number; response?: { status?: number }; code?: string }): boolean {
  return error.status === StatusCodes.FORBIDDEN
    || error.statusCode === StatusCodes.FORBIDDEN
    || error.response?.status === StatusCodes.FORBIDDEN
    || error.code === 'FORBIDDEN';
}

/**
 * AdminNavigationLayoutErrorFallback renders the admin error fallback UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutErrorFallback({ error, reset, moduleName }: AdminErrorFallbackProps) {
  const t = useTranslations();

// EFFECT: Reports the sanitized route/module error through the approved monitoring adapter when the fallback receives a new error instance.
  useEffect(() => {
    // Route-level fallback reports the sanitized module context once while hiding internals from the user.
    logErrorToMonitoring(error, { module: moduleName });
  }, [error, moduleName]);

  if (isAdminForbiddenError(error as Error & { status?: number; statusCode?: number; response?: { status?: number }; code?: string })) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-warning-bg flex items-center justify-center" data-testid="admin_navigation-adminshared-status-1">
          <ShieldOff size={18} className="text-warning"  strokeWidth={2}/>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold text-primary">{t('admin_layout.AdminNavigationLayoutErrorFallback.text_1647b9db6c')}</p>
          <p className="text-sm text-secondary max-w-sm" data-testid={`admin_navigation-admin-error-fallback-${moduleName}-forbidden-error`} role="alert">
            {t('admin_layout.AdminNavigationLayoutErrorFallback.text_f329d9bd73')} {t('admin_layout.AdminNavigationLayoutErrorFallback.text_1807102ea0')}</p>
        </div>
        <Link data-testid="admin_navigation-admin-error-fallback-back"
          href={ADMIN_DASHBOARD_URL}
          className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          <LayoutDashboard size={18}  strokeWidth={2}/> {t('admin_layout.AdminNavigationLayoutErrorFallback.text_8fb719081e')}</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center">
      <p className="text-base font-semibold text-primary" data-testid={`admin_navigation-admin-error-fallback-${moduleName}-generic-error`} role="alert">{t('admin_layout.AdminNavigationLayoutErrorFallback.text_af14db2628')}</p>
      <p className="text-sm text-secondary max-w-sm">
        {t('admin_layout.AdminNavigationLayoutErrorFallback.text_5440beb3f9')}</p>
      <button type="button"
        onClick={reset}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-semibold rounded-xl text-sm hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
       data-testid="admin_navigation-admin-error-fallback-back-2">
        <RefreshCw size={18}  strokeWidth={2}/> {t('admin_layout.AdminNavigationLayoutErrorFallback.text_cef2fe093b')}</button>
    </div>
  );
}
