// RESPONSIBILITY: Defines feature-local TypeScript contracts for data_export_requests; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_data_export/data_export_requests/types/AdminDataExportRequestsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminDataExportErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
