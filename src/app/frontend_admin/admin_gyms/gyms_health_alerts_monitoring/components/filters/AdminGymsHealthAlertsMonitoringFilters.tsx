"use client";
// RESPONSIBILITY: Renders the severity filter chips and search control for the alert feed.
// DATA FLOW: feature data/state and user input → AdminGymsHealthAlertsMonitoringFilters → accessible UI/events routed to owning hooks (admin_gym_health_alerts/gym_health_alerts_monitoring/components/filters/AdminGymsHealthAlertsMonitoringFilters.tsx)

/**
 * @description AdminGymsHealthAlertsMonitoringFilters: Renders the severity filter chips and search control for the alert feed.
 * @dependencies Consumes useAdminGymHealthAlertsLogic, AdminGymHealthAlertsConstants.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic';
import { ALERT_SEVERITY_OPTIONS } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringConstants';

/** Renders severity/search controls and delegates state changes to the module hook.
 */
/**
 * @description Renders the / GymHealthAlertsFilters UI section using feature-owned data and semantic design tokens.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminGymsHealthAlertsMonitoringFilters() {
  const t = useTranslations();

  const { severityFilter, setSeverityFilter, search, setSearch } = useAdminGymHealthAlertsLogic();
  return <div className="flex flex-col sm:flex-row gap-3">
    <div className="flex flex-wrap gap-2" role="group" aria-label={t('gym-health-alerts.admin_gym_health_alerts_filters.text_dfa05e15fa')} data-testid="admin_gym_health_alerts-admin_gym_health_alerts-filters-filter">
      {ALERT_SEVERITY_OPTIONS.map((option , __testIdIndex26) => <button key={option.value} type="button" onClick={() => setSeverityFilter(option.value)} aria-pressed={severityFilter === option.value} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95 min-h-11 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out ${severityFilter === option.value ? 'bg-primary text-on-primary border-focus' : 'bg-input text-secondary border-border hover:bg-surface-hover hover:text-primary'}`} data-testid={`admin_gym_health_alerts-admin_gym_health_alerts-filters-filter-2-map26-${__testIdIndex26}-1`}>{t(option.labelKey)}</button>)}
    </div>
    <label className="relative w-full sm:ml-auto sm:max-w-sm">
      <Search size={18} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
      <input data-testid="admin_gym_health_alerts-admin_gym_health_alerts-filters-filter-3" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('gym-health-alerts.admin_gym_health_alerts_filters.text_85dc44cf4f')} aria-label={t('gym-health-alerts.admin_gym_health_alerts_filters.text_85dc44cf4f')} className="min-h-11 w-full rounded-lg border border-border bg-input pl-10 pr-3 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out" />
    </label>
  </div>;
}
