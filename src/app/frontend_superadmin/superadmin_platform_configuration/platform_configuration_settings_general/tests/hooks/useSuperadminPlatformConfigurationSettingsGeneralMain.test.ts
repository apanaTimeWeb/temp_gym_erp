import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationSettingsGeneralMain } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralMain';



const updateSetting = vi.fn();
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralPage', () => ({
  useSuperadminPlatformConfigurationSettingsGeneralPage: () => ({
    query: { data: { data: [{ id: 'one', key: 'one', description: 'First setting', category: 'billing', dataType: 'string', value: 'A' }, { id: 'two', key: 'two', description: 'Second setting', category: 'billing', dataType: 'string', value: 'B' }, { id: 'three', key: 'three', description: 'Third setting', category: 'general', dataType: 'string', value: 'C' }] } },
    updateSetting,
  }),
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminPlatformConfigurationSettingsGeneralMain', () => {
  it('groups settings by category and clears a saved draft', async () => {
    updateSetting.mockResolvedValue({ success: true, message: 'Saved', data: { id: 'one', key: 'one', description: 'First setting', category: 'billing', dataType: 'string', value: 'Updated' } });
    const { result } = renderHook(() => useSuperadminPlatformConfigurationSettingsGeneralMain());
    expect(result.current.groupedSettings.billing).toHaveLength(2);
    expect(result.current.groupedSettings.general).toHaveLength(1);
    act(() => result.current.setEditedValues({ one: 'Updated' }));
    await act(async () => { await result.current.handleSave('one'); });
    expect(updateSetting).toHaveBeenCalledWith({ id: 'one', value: 'Updated' });
    expect(result.current.editedValues).toEqual({});
  });
});
