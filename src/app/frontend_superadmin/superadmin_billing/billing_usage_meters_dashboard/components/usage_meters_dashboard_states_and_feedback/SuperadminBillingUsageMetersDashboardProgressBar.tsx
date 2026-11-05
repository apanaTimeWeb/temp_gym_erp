// RESPONSIBILITY: Renders one bounded usage-meter segment within its owning feature module.
'use client';

import type { SuperadminBillingUsageMetersProgressBarProps } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/types/superadmin_billing_usage_meters_dashboard_progress_bar.types';

/**
 * Renders a data-driven segment using SVG geometry and semantic Tailwind fill tokens.
 * SVG geometry avoids inline styles and avoids CSS Modules in business UI.
 */
export default function SuperadminBillingUsageMetersDashboardProgressBar({ value, limit, fillClassName, title }: SuperadminBillingUsageMetersProgressBarProps) {
  const percentage = Number.isFinite(value) && Number.isFinite(limit) && limit > 0
    ? Math.min(100, Math.max(0, (value / limit) * 100))
    : 0;

  return (
    <svg
      className="block h-full flex-none"
      width={`${percentage}%`}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      role={title ? 'img' : undefined}
      aria-label={title ? `${title}: ${Math.round(percentage)}%` : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect x="0" y="0" width="100" height="1" rx="0.5" className={fillClassName} />
    </svg>
  );
}
