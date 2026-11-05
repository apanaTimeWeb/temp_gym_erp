"use client";
// RESPONSIBILITY: Coordinates Gym Health Alerts query state, 60-second refresh, severity/search filters, and pessimistic dismiss behavior.
// DATA FLOW: module API / client state → useAdminGymHealthAlertsLogic → consuming Admin feature component.

import { ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringQueryKeys';
import { useCallback } from 'react';
import { useAdminGymHealthAlertsDebounce } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringDebounce';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringConfirm';
import { AdminGymHealthAlertsApi } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/api/admin_gyms_health_alerts_monitoring_api';
import { useAdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/state/useAdminGymsHealthAlertsMonitoringStore';
import { useAdminGymHealthAlertsMutations } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringMutations';
/** @description useAdminGymHealthAlertsLogic: Coordinates Gym Health Alerts query state, 60-second refresh, severity/search filters, and pessimistic dismiss behavior. @dependencies Consumes AdminGymHealthAlertsQueryKeys, useAdminNavigationLayoutConfirm, AdminGymHealthAlertsApi, useAdminGymHealthAlertsStore, useAdminGymHealthAlertsMutations. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminGymHealthAlertsLogic() {
  const t = useTranslations();
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { severityFilter, search, setSeverityFilter, setSearch } = useAdminGymHealthAlertsStore();

  const debouncedSearch = useAdminGymHealthAlertsDebounce(search, 300);
  const queryParams = { severity: severityFilter === 'all' ? undefined : severityFilter, search: debouncedSearch.trim() || undefined };
  const alertsQuery = useQuery({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('list', queryParams), queryFn: () => AdminGymHealthAlertsApi.fetchAlerts(queryParams), refetchInterval: 60_000, staleTime: 30_000 });
  const summaryQuery = useQuery({ queryKey: ADMIN_GYM_HEALTH_ALERTS_QUERY_KEYS.key('summary'), queryFn: () => AdminGymHealthAlertsApi.fetchSummary(), staleTime: 60_000 });

  const { dismissMutation, getIntentKey, clearIntentKey } = useAdminGymHealthAlertsMutations();

  const dismissAlert = useCallback(async (id: string, title: string) => {
    const intentId = `dismiss:${id}`;
    const confirmed = await confirm({ title: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissTitle'), message: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissMessage', { title }), confirmText: t('gym-health-alerts.AdminGymHealthAlertsConfirm.dismissConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return; }
    dismissMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, dismissMutation, getIntentKey, t]);

  return {
    alerts: alertsQuery.data?.data ?? [],
    kpis: summaryQuery.data?.data ?? null,
    status: alertsQuery.status,
    hasActiveFilters: severityFilter !== 'all' || Boolean(search.trim()),
    retryAlerts: alertsQuery.refetch,
    retrySummary: summaryQuery.refetch,
    summaryStatus: summaryQuery.status,
    severityFilter,
    search,
    setSeverityFilter,
    setSearch,
    dismissAlert,
  };
}
