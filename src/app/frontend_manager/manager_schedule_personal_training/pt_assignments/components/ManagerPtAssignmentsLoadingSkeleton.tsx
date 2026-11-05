// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';

import { useTranslations } from 'next-intl';

/**
 * @description Renders the structural PT route loading state using the global skeleton tokens instead of a page-level spinner.
 * @dependencies Uses semantic skeleton classes from the global design system only.
 * @edge-case Preserves layout dimensions while data is pending to minimize cumulative layout shift.
 */
export default function ManagerPtAssignmentsLoadingSkeleton() {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');

  return (
    <div data-testid="manager_pt-manager-pt-main-loading" className="space-y-6" aria-label={t('TEXT_ARIA_LOADING_WORKSPACE')} role="status">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((skeletonId) => <div key={skeletonId} className="h-24 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse lg:col-span-2" />
        <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
