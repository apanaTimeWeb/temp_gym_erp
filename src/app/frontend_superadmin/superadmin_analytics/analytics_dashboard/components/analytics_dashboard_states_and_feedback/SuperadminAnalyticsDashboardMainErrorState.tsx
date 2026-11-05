// RESPONSIBILITY: Renders/orchestrates SuperadminAnalyticsDashboardMainErrorState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the analytics route error state with a recoverable retry action.
import { useTranslations } from 'next-intl';

import type { SuperadminAnalyticsMainErrorStateProps } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_main_error_state.types';



/**
 * @description Renders a feature-branded error message and delegates retry to the owning query hook.
 * @dependencies Receives only a backend/system message and retry callback.
 * @edge-case Never exposes raw error objects or stack traces to the user.
 */
export function SuperadminAnalyticsDashboardMainErrorState({ message, onRetry }: SuperadminAnalyticsMainErrorStateProps) {
  const t = useTranslations('superadmin_analytics');
  return (
    <section className="space-y-4 rounded-xl border border-border bg-danger-bg p-6 text-center" role="alert" data-testid="superadmin_analytics-superadmin-analytics-main-error-state-superadmin_analytics-main-error-state">
      <h1 className="text-lg font-semibold text-danger" data-testid="superadmin_analytics-superadmin-analytics-main-error-state-main-error-state-error">{t('ui.unable_to_load_analytics')}</h1>
      <p className="text-sm text-secondary" data-testid="superadmin_analytics-analyticsmainerrorstate-state">{message}</p>
      <button type="button" onClick={onRetry} className="min-h-11 min-w-32 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_analytics-superadmin-analytics-main-error-state-superadmin_analytics-main-error-retry">{t('ui.try_again_cd71e9f')}</button>
    </section>
  );
}
