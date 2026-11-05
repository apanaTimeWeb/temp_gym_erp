// RESPONSIBILITY: Defines feature-local TypeScript contracts for settings_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminSettingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
