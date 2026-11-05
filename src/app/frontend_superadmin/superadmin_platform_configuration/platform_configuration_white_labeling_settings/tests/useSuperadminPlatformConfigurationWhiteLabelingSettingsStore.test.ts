import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminPlatformConfigurationWhiteLabelingSettingsStore } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/state/useSuperadminPlatformConfigurationWhiteLabelingSettingsStore';



describe('useSuperadminPlatformConfigurationWhiteLabelingSettingsStore', () => {
  it('starts without a selected domain and can select/clear one', () => {
    const { result } = renderHook(() => useSuperadminPlatformConfigurationWhiteLabelingSettingsStore());
    act(() => result.current.setSelectedDomainId('domain-1'));
    expect(result.current.selectedDomainId).toBe('domain-1');
    act(() => result.current.setSelectedDomainId(null));
    expect(result.current.selectedDomainId).toBeNull();
  });
});
