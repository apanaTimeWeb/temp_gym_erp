// RESPONSIBILITY: Renders Superadmin Billing Usage Meters Dashboard Route Loading Skeleton using its declared props and feature-local hooks.
"use client";

import { useTranslations } from 'next-intl';

/**
 * @description Renders the localized loading skeleton owned by this autonomous leaf.
 * @remarks This component contains presentation only; it performs no business/API work.
 */
export function SuperadminBillingUsageMetersDashboardRouteLoadingSkeleton() {
  const t = useTranslations('superadmin_billing_usage_meters.ui');
  return (
    <div className="mx-auto max-w-7xl space-y-6" aria-busy="true" aria-label={t('loading_view')}><div className="h-8 w-56 rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{['one','two','three','four','five','six'].map((key)=><section key={key} className="space-y-5 rounded-xl border border-border bg-card p-6"><div className="h-5 w-2/3 rounded bg-skeleton-base motion-safe:animate-pulse"/>{['a','b','c','d'].map((rowKey)=><div key={rowKey} className="space-y-2"><div className="h-3 w-1/2 rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-2 rounded-full bg-skeleton-highlight motion-safe:animate-pulse"/></div>)}</section>)}</div></div>
  );
}
