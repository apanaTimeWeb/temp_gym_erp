// RESPONSIBILITY: Defines regression tests for useAdminSettingsManagementForms.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/hooks/useAdminSettingsManagementForms.test.tsx)

import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAdminSettingsGeneralForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';
import type { GeneralSettingsType } from '@/app/frontend_admin/admin_settings/settings_management/types/AdminSettingsManagementTypes';
import { AdminSettingsApi } from '@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api';

vi.mock('@/app/frontend_admin/admin_settings/settings_management/api/admin_settings_management_api', () => ({
  AdminSettingsApi: { updateSettings: vi.fn().mockResolvedValue({ data: { general: {} } }) },
}));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard', () => ({ useAdminSettingsUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation', () => ({
  useAdminSettingsMutation: (submit: unknown) => ({ mutateAsync: (variables: { data: unknown; idempotencyKey: string }) => Promise.resolve((submit as (data: unknown, key: string) => unknown)(variables.data, variables.idempotencyKey)) }),
}));

describe('useAdminSettingsGeneralForm', () => {
  it('rebases dirty form state after the successful save', async () => {
    const initial = { timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 30, dataRetentionMonths: 12, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false } as GeneralSettingsType;
    const { result } = renderHook(() => useAdminSettingsGeneralForm(initial));
    act(() => { result.current.form.setValue('sessionTimeoutMinutes', 60, { shouldDirty: true }); });
    expect(result.current.form.formState.isDirty).toBe(true);
    await act(async () => { await result.current.submitForm({ timezone: initial.timezone, language: initial.language, dateFormat: initial.dateFormat, sessionTimeoutMinutes: 60, dataRetentionMonths: initial.dataRetentionMonths, autoBackup: initial.autoBackup, backupFrequency: initial.backupFrequency, maintenanceMode: initial.maintenanceMode }); });
    await waitFor(() => expect(result.current.form.formState.isDirty).toBe(false));
    expect(AdminSettingsApi.updateSettings).toHaveBeenCalled();
    expect(JSON.stringify(vi.mocked(AdminSettingsApi.updateSettings).mock.calls[0]?.[0])).not.toContain('twoFactorAuth');
  });
});
