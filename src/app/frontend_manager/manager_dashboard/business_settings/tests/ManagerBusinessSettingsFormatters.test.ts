import { describe, expect, it } from 'vitest';
import { ManagerBusinessSettingsDisplayValue } from '@/app/frontend_manager/manager_dashboard/business_settings/utils/ManagerBusinessSettingsFormatters';

describe('ManagerBusinessSettingsDisplayValue', () => {
  it('renders missing values with an en dash and preserves valid falsy values', () => {
    expect(ManagerBusinessSettingsDisplayValue(null)).toBe('—');
    expect(ManagerBusinessSettingsDisplayValue(undefined)).toBe('—');
    expect(ManagerBusinessSettingsDisplayValue('')).toBe('—');
    expect(ManagerBusinessSettingsDisplayValue(0)).toBe('0');
    expect(ManagerBusinessSettingsDisplayValue(false)).toBe('false');
    expect(ManagerBusinessSettingsDisplayValue('Available')).toBe('Available');
  });
});
