"use client";
// RESPONSIBILITY: Provides the implementation for error.tsx functionality within its module.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_payments/error.tsx)

import { useTranslations } from 'next-intl';
import { ADMIN_FINANCE_ROUTES } from '@/app/frontend_admin/admin_finance/finance_payments/config/admin_finance_payments.url_config';

import { useEffect } from "react";
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsMonitoring';
import type { AdminFinanceErrorProps } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsErrorPropsTypes';

/**
 * FinanceError is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function FinanceError({
  error,
  reset,
}: AdminFinanceErrorProps) {
  const t = useTranslations();

// EFFECT: Synchronizes this component effect with its declared React dependencies in finance/error.tsx.
  useEffect(() => {
    // Log the route-level error once while keeping internal error details out of the UI.
    logErrorToMonitoring(error, { module: 'finance' });
  }, [error]);

  if ((error as unknown as { status?: number }).status === StatusCodes.FORBIDDEN) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-danger">{t('finance.FinanceError.text_1647b9db6c')}</h2>
        <p className="text-secondary mb-6">{t('finance.FinanceError.text_1879a51e18')}</p>
        <Link data-testid="admin_finance-error-state" href={ADMIN_FINANCE_ROUTES.dashboard} className="inline-flex min-h-11 items-center justify-center px-4 py-2 rounded-md bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
          {t('finance.FinanceError.text_cdac261089')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center justify-center finance-module">
      <div className="text-center">
        <p className="font-medium text-danger">{t('finance.FinanceError.text_2dc9d37464')}</p>        <p className="text-sm mt-1 text-secondary">{t('finance.FinanceError.text_22b2c820bf')}</p>
        <button type="button"
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded-md font-medium text-on-primary bg-primary hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
         data-testid="admin_finance-error-state-2">
          {t('finance.FinanceError.text_042c862e44')}</button>
      </div>
    </div>
  );
}
