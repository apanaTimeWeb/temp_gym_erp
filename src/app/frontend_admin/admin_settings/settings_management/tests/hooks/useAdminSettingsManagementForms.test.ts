// RESPONSIBILITY: Defines regression tests for useAdminSettingsManagementForms.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/hooks/useAdminSettingsManagementForms.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminSettingsGeneralForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementForms';

const { mutateAsync } = vi.hoisted(() => ({ mutateAsync: vi.fn().mockResolvedValue({ message: "saved" }) }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation', () => ({ useAdminSettingsMutation: () => ({ mutateAsync }) }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard', () => ({ useAdminSettingsUnsavedChangesGuard: vi.fn() }));

describe('useAdminSettingsForms', () => {
  it('submits the validated section data with a stable idempotency payload', async () => {
    const initial = { timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: false, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false };
    const { result } = renderHook(() => useAdminSettingsGeneralForm(initial));
    await act(async () => { await result.current.submitForm(initial); });
    expect(mutateAsync).toHaveBeenCalledWith(expect.objectContaining({ idempotencyKey: expect.any(String) }));
    const submittedData = mutateAsync.mock.calls[0]?.[0]?.data as Record<string, unknown>;
    expect(submittedData).not.toHaveProperty('twoFactorAuth');
  });
});
