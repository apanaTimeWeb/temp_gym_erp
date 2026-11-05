// RESPONSIBILITY: Regression coverage for async settings writes, duplicate prevention and edit preservation.
// DATA FLOW: form submit → deferred API outcome → dirty-state and idempotency decisions.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { z } from 'zod';
import { useAdminSettingsSectionForm } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementSectionForm';
const { mutateAsync } = vi.hoisted(() => ({ mutateAsync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard', () => ({ useAdminSettingsUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementMutation', () => ({ useAdminSettingsMutation: () => ({ mutateAsync, isPending: false }) }));
const schema = z.object({ gymName: z.string().min(1) });
const setup = () => renderHook(() => useAdminSettingsSectionForm({ gymName: 'Old' }, schema, vi.fn(), 'settings-profile'));
describe('RBG127 section saves', () => {
  beforeEach(() => mutateAsync.mockReset());
  it('waits for API, ignores duplicate submissions, and preserves newer edits', async () => {
    let resolve!: (value: unknown) => void;
    mutateAsync.mockImplementationOnce(() => new Promise((r) => { resolve = r; }));
    const { result } = setup();
    let first!: Promise<boolean | undefined>;
    await act(async () => { first = result.current.submitForm({ gymName: 'Saved' }); });
    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(await result.current.submitForm({ gymName: 'Duplicate' })).toBe(false);
    act(() => result.current.form.setValue('gymName', 'Newer', { shouldDirty: true }));
    await act(async () => { resolve({ message: 'saved' }); expect(await first).toBe(true); });
    expect(result.current.form.getValues('gymName')).toBe('Newer');
    expect(result.current.form.formState.isDirty).toBe(true);
  });
  it('preserves retry identity after failure and reports rejection', async () => {
    mutateAsync.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ message: 'saved' });
    const { result } = setup();
    await act(async () => { await expect(result.current.submitForm({ gymName: 'Saved' })).rejects.toThrow('offline'); });
    await act(async () => { await result.current.submitForm({ gymName: 'Saved' }); });
    expect(mutateAsync.mock.calls[0][0].idempotencyKey).toBe(mutateAsync.mock.calls[1][0].idempotencyKey);
  });
});
