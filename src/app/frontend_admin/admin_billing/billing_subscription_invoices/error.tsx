"use client";
// RESPONSIBILITY: Renders/orchestrates error for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_finance/finance_subscription_invoices/error.tsx)

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { logErrorToMonitoring } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesMonitoring';
import { CreditCard } from 'lucide-react';
import type { AdminSubscriptionsErrorProps } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesErrorPropsTypes';

/**
 * AdminSubscriptionsError renders the admin subscriptions error UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminSubscriptionsError({ error, reset }: AdminSubscriptionsErrorProps) {
  const t = useTranslations();
// EFFECT: Reports this route-segment error through the approved monitoring adapter and re-runs only when the error instance changes.
  useEffect(() => { logErrorToMonitoring(error, { module: 'subscriptions' }); }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CreditCard size={18} className="text-danger opacity-60"  strokeWidth={2}/>
      <p className="text-primary font-semibold">{t('subscriptions.AdminSubscriptionsError.text_6d251ad405')}</p>
      <button type="button" onClick={reset} className="px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_subscriptions-error-state">
        {t('subscriptions.AdminSubscriptionsError.text_cef2fe093b')}</button>
    </div>
  );
}
