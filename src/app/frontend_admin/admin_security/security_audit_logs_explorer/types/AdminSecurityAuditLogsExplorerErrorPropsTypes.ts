// RESPONSIBILITY: Defines feature-local TypeScript contracts for audit_logs_explorer; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_audit_logs/audit_logs_explorer/types/AdminSecurityAuditLogsExplorerErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminAuditLogsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
