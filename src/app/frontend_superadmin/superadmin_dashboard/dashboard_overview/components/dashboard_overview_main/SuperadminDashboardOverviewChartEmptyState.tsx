// RESPONSIBILITY: Renders Superadmin Dashboard Overview Chart Empty State using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
/**
 * @description Renders the Superadmin dashboard chart empty state interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminDashboardOverviewChartEmptyState() {
  const t = useTranslations('superadmin_dashboard');
  return <div className="flex h-full min-h-40 items-center justify-center rounded-lg border border-border bg-page px-4 py-8 text-center text-sm text-secondary" role="status">{t('ui.dashboard_chart_empty')}</div>;
}
