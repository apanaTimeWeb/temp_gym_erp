// RESPONSIBILITY: Defines feature-local TypeScript contracts for gym_health_alerts_monitoring; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_gym_health_alerts/gym_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminGymHealthAlertsStore {
  severityFilter: 'all' | 'critical' | 'warning' | 'info';
  search: string;
  setSeverityFilter: (value: AdminGymHealthAlertsStore['severityFilter']) => void;
  setSearch: (value: string) => void;
}
