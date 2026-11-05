// RESPONSIBILITY: Renders one bounded report-health progress segment in its owning feature module.
'use client';

import type { SuperadminAnalyticsReportsProgressBarProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_health/types/superadmin_analytics_reports_health_progress_bar.types';

/** Uses SVG geometry so dynamic percentage width requires neither inline styles nor CSS Modules. */
export default function SuperadminAnalyticsReportsHealthProgressBar({ value, fillClassName }: SuperadminAnalyticsReportsProgressBarProps) {
  const bounded = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

  return (
    <svg className="block h-full flex-none" width={`${bounded}%`} viewBox="0 0 100 1" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="100" height="1" rx="0.5" className={fillClassName} />
    </svg>
  );
}
