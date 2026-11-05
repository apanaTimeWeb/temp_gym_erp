// RESPONSIBILITY: Renders the manager expenses route-segment error fallback and exposes the documented retry action.
'use client';
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { useEffect } from 'react';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { logger } from '@/lib/logger';

import type { ManagerInfrastructureRouteErrorProps } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureRouteErrorTypes';




/** @description Route-level ManagerExpenseRegisterAndReportingError for the Manager frontend module. */
export default function ManagerExpenseRegisterAndReportingError({ error, reset }: ManagerInfrastructureRouteErrorProps) {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    logger.error('Manager module route error', {
      route: MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES.UI.HOME,
      module: 'manager/expenses',
      errorDigest: error.digest,
      timestamp: new Date().toISOString() });
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-page" data-testid="manager_manager_finance_expenses-expense-register-and-reporting-error-boundary-fallback">
      <div role="alert" aria-live="assertive" className="bg-overlay border border-danger p-8 rounded-2xl shadow-dialog max-w-md w-full text-center space-y-4" data-testid="manager_expenses-error-error">
        <div data-testid="manager_expenses-error-status" className="w-14 h-14 bg-danger-bg rounded-full flex items-center justify-center mx-auto text-danger-text">
          <AlertTriangle size={18} strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-text-primary">{t("COPY_EXPENSES_UNAVAILABLE")}</h2>
        <p data-testid="manager_expenses-error-message" className="text-sm text-text-secondary">{t("COPY_WE_COULDN_T_LOAD_EXPENSES_MODULE_TRY_AGAIN")}</p>
                <button data-testid="manager_expenses-error-retry"
          onClick={reset}
          className="min-h-11 min-w-32 px-6 py-2.5 bg-primary text-on-primary font-medium rounded-xl motion-safe:transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
         type="button">{t("COPY_TRY_AGAIN")}</button>
      </div>
    </div>
  );
}
