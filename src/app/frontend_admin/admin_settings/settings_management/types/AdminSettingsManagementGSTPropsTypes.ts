// RESPONSIBILITY: Defines feature-local TypeScript contracts for settings_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementGSTPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { AppIntegrationSettingsType, GeneralSettingsType, GstTaxSettingsType, GymProfileType, NotificationsSettingsType, PaymentGatewaySettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';

export interface AdminSettingsGSTProps {
  initialData: GstTaxSettingsType;
}
