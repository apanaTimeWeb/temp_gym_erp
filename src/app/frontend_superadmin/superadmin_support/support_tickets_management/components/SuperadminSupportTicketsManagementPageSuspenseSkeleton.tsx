// RESPONSIBILITY: Feature-local route loading skeleton for support_tickets_management, with no sibling-module dependencies.
'use client';
import { useTranslations } from 'next-intl';

/** Accessible, layout-stable loading indicator scoped to its owning submodule. */
export default function SuperadminSupportTicketsManagementPageSuspenseSkeleton() {
  const t = useTranslations('superadmin_support_tickets');
  return (
    <section role="status" aria-busy="true" aria-label={t('ui.route_loading')} className="space-y-6 p-6" data-testid="support_tickets_management-route-loading">
      <div aria-hidden="true" className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} aria-hidden="true" className="h-24 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
      <div aria-hidden="true" className="h-80 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </section>
  );
}
