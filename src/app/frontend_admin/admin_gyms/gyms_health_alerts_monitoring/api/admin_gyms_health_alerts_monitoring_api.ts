// RESPONSIBILITY: Owns the documented Admin Gym Health Alerts HTTP contract.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_gym_health_alerts/gym_health_alerts_monitoring/api/admin_gyms_health_alerts_monitoring_api.ts)

import { z } from 'zod';
import { adminGymHealthAlertsMonitoringApiFetch as apiFetch } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/utils/AdminGymsHealthAlertsMonitoringApiResponse';
import { ADMIN_GYM_HEALTH_ALERTS_API } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/config/admin_gyms_health_alerts_monitoring.url_config';
import type { AdminGymHealthAlertsQueryParams, GymHealthAlert, GymHealthKPIData } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringTypes';
import { gymHealthAlertSchema, gymHealthKpiDataSchema } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/schemas/AdminGymsHealthAlertsMonitoringSchemas';

function buildQuery(params?: AdminGymHealthAlertsQueryParams): string {
  const query = new URLSearchParams();
  if (params?.severity) query.set('severity', params.severity);
  if (params?.search) query.set('search', params.search);
  const value = query.toString();
  return value ? `?${value}` : '';
}

export const AdminGymHealthAlertsApi = {
  fetchAlerts: async (params?: AdminGymHealthAlertsQueryParams) => apiFetch<GymHealthAlert[]>(`${ADMIN_GYM_HEALTH_ALERTS_API.alerts}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(gymHealthAlertSchema) }),
  fetchSummary: async () => apiFetch<GymHealthKPIData>(ADMIN_GYM_HEALTH_ALERTS_API.summary, { method: 'GET', dataSchema: gymHealthKpiDataSchema }),
  dismissAlert: async (id: string, idempotencyKey: string) => apiFetch<null>(ADMIN_GYM_HEALTH_ALERTS_API.dismiss(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
};
