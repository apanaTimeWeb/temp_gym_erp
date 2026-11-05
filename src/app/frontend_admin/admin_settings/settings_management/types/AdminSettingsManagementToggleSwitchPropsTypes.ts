// RESPONSIBILITY: Defines feature-local TypeScript contracts for settings_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementToggleSwitchPropsTypes.ts)

export interface AdminSettingsToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
  describedBy?: string;
}
