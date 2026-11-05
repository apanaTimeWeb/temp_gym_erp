// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_gym_health_alerts/gym_health_alerts_monitoring/constants/AdminGymsHealthAlertsMonitoringConstants.ts)

import type { AlertSeverity } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringTypes';


export const ALERT_SEVERITY_OPTIONS = [
  { value: 'all', labelKey: 'gym-health-alerts.AdminGymHealthAlertsFilters.allSeverities' },
  { value: 'critical', labelKey: 'gym-health-alerts.AdminGymHealthAlertsFilters.critical' },
  { value: 'warning', labelKey: 'gym-health-alerts.AdminGymHealthAlertsFilters.warning' },
  { value: 'info', labelKey: 'gym-health-alerts.AdminGymHealthAlertsFilters.info' },
] as const;

export const GYM_HEALTH_ALERT_SEVERITY_LABEL_KEYS: Record<AlertSeverity, string> = {
  critical: 'gym-health-alerts.AdminGymHealthAlertsSeverity.critical',
  warning: 'gym-health-alerts.AdminGymHealthAlertsSeverity.warning',
  info: 'gym-health-alerts.AdminGymHealthAlertsSeverity.info',
};

export const GYM_HEALTH_ALERT_SEVERITY_STYLES: Record<AlertSeverity, string> = {
  critical: 'text-danger bg-danger-bg border-border',
  warning: 'text-warning bg-warning-bg border-border',
  info: 'text-info bg-info-bg border-border',
};

export const GYM_HEALTH_ITEMS_PER_PAGE = 10;
export const GYM_HEALTH_ACTION_URLS = {
  members: 'members',
  finance: 'finance',
  hr: 'hr',
  attendance: 'attendance',
} as const;
