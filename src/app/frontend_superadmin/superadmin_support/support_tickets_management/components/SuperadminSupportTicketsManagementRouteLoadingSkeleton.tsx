// RESPONSIBILITY: Renders Superadmin Support Tickets Management Route Loading Skeleton using its declared props and feature-local hooks.
"use client";

import { useTranslations } from 'next-intl';

/**
 * @description Renders the localized loading skeleton owned by this autonomous leaf.
 * @remarks This component contains presentation only; it performs no business/API work.
 */
export function SuperadminSupportTicketsManagementRouteLoadingSkeleton() {
  const t = useTranslations('superadmin_support_tickets.state');
  return (
    <div className="space-y-6" aria-busy="true" aria-label={t('loading_tickets')}><div className="flex flex-wrap items-center justify-between gap-4"><div className="h-8 w-52 rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-11 w-64 rounded bg-skeleton-highlight motion-safe:animate-pulse"/></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{['one','two','three','four'].map((key)=><div key={key} className="h-24 rounded-xl border border-border bg-card motion-safe:animate-pulse"/>)}</div><div className="space-y-3 rounded-xl border border-border bg-card p-4">{['a','b','c','d','e','f','g'].map((key)=><div key={key} className="h-12 rounded bg-skeleton-base motion-safe:animate-pulse"/>)}</div></div>
  );
}
