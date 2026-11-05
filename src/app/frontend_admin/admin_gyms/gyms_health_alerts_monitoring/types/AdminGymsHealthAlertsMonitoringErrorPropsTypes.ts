// RESPONSIBILITY: Defines feature-local TypeScript contracts for gym_health_alerts_monitoring; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_gym_health_alerts/gym_health_alerts_monitoring/types/AdminGymsHealthAlertsMonitoringErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminGymHealthAlertsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
