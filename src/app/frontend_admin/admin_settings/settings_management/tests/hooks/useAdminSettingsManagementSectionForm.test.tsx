// RESPONSIBILITY: Verifies the settings section form submission and saved-baseline behavior.
// DATA FLOW: hook inputs and mocked mutation callbacks → useAdminSettingsSectionForm → form state/idempotency assertions.

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { useAdminSettingsSectionForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementSectionForm';

const { mutateAsync, useUnsavedGuard } = vi.hoisted(() => ({ mutateAsync: vi.fn(), useUnsavedGuard: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard', () => ({ useAdminSettingsUnsavedChangesGuard: useUnsavedGuard }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation', () => ({ useAdminSettingsMutation: () => ({ mutateAsync, isPending: false, isError: false }) }));

describe('useAdminSettingsSectionForm', () => {
  beforeEach(() => { mutateAsync.mockReset().mockResolvedValue({ message: 'saved' }); useUnsavedGuard.mockReset(); });

  it('submits the validated payload with a non-empty idempotency key', async () => {
    const initial = { gymName: 'Old name' };
    const schema = z.object({ gymName: z.string().min(1) });
    const submit = vi.fn().mockResolvedValue({ message: 'saved' });
    const { result } = renderHook(() => useAdminSettingsSectionForm(initial, schema, submit, 'settings-gym-profile'));

    await act(async () => { await result.current.submitForm({ gymName: 'New name' }); });

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    const variables = mutateAsync.mock.calls[0][0] as { data: { gymName: string }; idempotencyKey: string };
    expect(variables.data).toEqual({ gymName: 'New name' });
    expect(variables.idempotencyKey).toMatch(/^[0-9a-f-]{36}$/i);
  });

  it('resets the clean form baseline only after the server resolves', async () => {
    const initial = { gymName: 'Old name' };
    const schema = z.object({ gymName: z.string().min(1) });
    const submit = vi.fn().mockResolvedValue({ message: 'saved' });
    const { result } = renderHook(() => useAdminSettingsSectionForm(initial, schema, submit, 'settings-gym-profile'));

    await act(async () => { await result.current.submitForm({ gymName: 'New name' }); });
    expect(result.current.form.getValues('gymName')).toBe('New name');
    expect(result.current.form.formState.isDirty).toBe(false);
  });
});
