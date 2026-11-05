"use client";
// RESPONSIBILITY: Renders the healthy empty state for gym health alerts.
// DATA FLOW: feature data/state and user input → AdminGymsHealthAlertsMonitoringEmptyState → accessible UI/events routed to owning hooks (admin_gym_health_alerts/gym_health_alerts_monitoring/components/empty_state/AdminGymsHealthAlertsMonitoringEmptyState.tsx)

import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';

/**
 * AdminGymsHealthAlertsMonitoringEmptyState renders the admin gym health alerts empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsHealthAlertsMonitoringEmptyState: Renders the healthy empty state for gym health alerts.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsHealthAlertsMonitoringEmptyState() {
  const t = useTranslations();
  return <div className="flex flex-col items-center justify-center gap-2 py-14 text-center" data-testid="admin_gym_health_alerts-admin_gym_health_alerts-empty-state-state">
    <CheckCircle size={18} aria-hidden="true" className="text-success"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{t('gym-health-alerts.admin_gym_health_alerts_empty_state.text_all_healthy')}</h3>
    <p className="text-sm text-secondary">{t('gym-health-alerts.admin_gym_health_alerts_empty_state.text_no_alerts')}</p>
  </div>;
}
