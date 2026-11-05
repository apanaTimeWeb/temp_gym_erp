// RESPONSIBILITY: Defines the Admin Settings mutation input contract used by the module mutation hook.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementMutationTypes.ts)

import type { FieldValues } from 'react-hook-form';
import type { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';

export type AdminSettingsMutationSubmit<TFormValues extends FieldValues> = (
  data: TFormValues,
  idempotencyKey: string,
) => ReturnType<typeof AdminSettingsApi.updateSettings>;

export interface AdminSettingsMutationVariables<TFormValues extends FieldValues> {
  data: TFormValues;
  idempotencyKey: string;
}
