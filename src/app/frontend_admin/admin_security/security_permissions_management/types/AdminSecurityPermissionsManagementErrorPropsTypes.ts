// RESPONSIBILITY: Defines feature-local TypeScript contracts for permissions_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_permissions/permissions_management/types/AdminSecurityPermissionsManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminPermissionsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
