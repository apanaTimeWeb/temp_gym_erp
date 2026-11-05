// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellLayoutPageSuspenseSkeleton within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { useTranslations } from 'next-intl';

// RESPONSIBILITY: Renders the shared Superadmin route suspense skeleton used while module content is loading.
/**
 * @description Provides the shared Superadmin route-level Suspense loading skeleton.
 * @dependencies Uses semantic design tokens only; it owns no business state.
 * @edge-case Remains visible at narrow widths and announces busy state to assistive technology.
 */
export default function SuperadminPlatformShellLayoutPageSuspenseSkeleton() {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  return (
    <section role="status" className="space-y-6 p-6" aria-busy="true" aria-label={t('ui.loading_superadmin_page_816efa50')} data-testid="SuperadminPlatformShellLayoutStyles-superadmin-layout-page-suspense-skeleton-suspense-skeleton-loading-state">
      <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-24 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />
        ))}
      </div>
      <div className="h-80 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-hidden="true" />
    </section>
  );
}
