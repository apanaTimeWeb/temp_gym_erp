// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Route Loading Skeleton using its declared props and feature-local hooks.
"use client";

import { useTranslations } from 'next-intl';

/**
 * @description Renders the localized loading skeleton owned by this autonomous leaf.
 * @remarks This component contains presentation only; it performs no business/API work.
 */
export function SuperadminCommunicationBroadcastsCampaignsRouteLoadingSkeleton() {
  const t = useTranslations('superadmin_communication_broadcasts.ui');
  return (
    <div className="space-y-6" aria-busy="true" aria-label={t('loading_view')}><div className="flex items-center justify-between"><div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse"/><div className="h-11 w-36 rounded bg-skeleton-highlight motion-safe:animate-pulse"/></div><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{['primary','secondary','tertiary'].map((key)=><div key={key} className="h-24 rounded-xl border border-border bg-card motion-safe:animate-pulse"/>)}</div><div className="space-y-3 rounded-xl border border-border bg-card p-4">{['row-a','row-b','row-c','row-d','row-e','row-f'].map((key)=><div key={key} className="h-12 rounded bg-skeleton-base motion-safe:animate-pulse"/>)}</div></div>
  );
}
