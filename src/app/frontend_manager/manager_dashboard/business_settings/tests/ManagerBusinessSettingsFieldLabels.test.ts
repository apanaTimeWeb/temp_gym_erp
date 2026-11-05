import { describe, expect, it } from 'vitest';

import { MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS, MANAGER_BUSINESS_SETTINGS_MEMBERSHIP_FIELD_LABELS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/ManagerBusinessSettingsFieldLabels';


describe('ManagerBusinessSettingsFieldLabels', () => {
  it('defines a human-readable label for every editable gym field', () => {
    expect(MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS.gymName).toBe('Gym Name');
    expect(Object.keys(MANAGER_BUSINESS_SETTINGS_GYM_FIELD_LABELS)).toHaveLength(9);
  });
  it('defines labels for membership controls', () => {
    expect(MANAGER_BUSINESS_SETTINGS_MEMBERSHIP_FIELD_LABELS.gracePeriodDays).toContain('Days');
    expect(MANAGER_BUSINESS_SETTINGS_MEMBERSHIP_FIELD_LABELS.allowFreeze).toBe('Allow Membership Freeze');
  });
});
