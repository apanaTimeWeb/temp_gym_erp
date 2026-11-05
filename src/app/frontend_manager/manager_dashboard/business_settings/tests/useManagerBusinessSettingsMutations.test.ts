import * as moduleUnderTest from '@/app/frontend_manager/manager_dashboard/business_settings/hooks/useManagerBusinessSettingsMutations';

describe('useManagerBusinessSettingsMutations contract', () => {
  it('exports the dedicated mutation hook', () => {
    expect(typeof moduleUnderTest.useManagerBusinessSettingsMutations).toBe('function');
  });
});
