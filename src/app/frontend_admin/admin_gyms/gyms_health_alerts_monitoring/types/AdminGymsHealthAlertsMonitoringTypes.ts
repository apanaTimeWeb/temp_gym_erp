// RESPONSIBILITY: Defines feature-local TypeScript contracts for gym_health_alerts_monitoring; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_gym_health_alerts/gym_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringTypes.ts)

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface GymHealthAlert {
  id: string;
  gymId: string;
  gymName: string;
  alertType: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric: string;
  threshold: string;
  detectedAt: string;
  actionKey: string;
}

export interface GymHealthKPIData {
  totalAlerts: number;
  criticalAlerts: number;
  warningAlerts: number;
  infoAlerts: number;
}

export interface AdminGymHealthAlertsQueryParams {
  severity?: AlertSeverity;
  search?: string;
}
