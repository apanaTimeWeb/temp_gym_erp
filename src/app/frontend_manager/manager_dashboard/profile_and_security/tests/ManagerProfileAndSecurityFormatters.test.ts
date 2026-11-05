import { describe, expect, it } from 'vitest';
import { ManagerProfileAndSecurityDisplayValue } from '@/app/frontend_manager/manager_dashboard/profile_and_security/utils/ManagerProfileAndSecurityFormatters';

describe('ManagerProfileAndSecurityDisplayValue', () => {
  it('renders missing values with an en dash and preserves valid falsy values', () => {
    expect(ManagerProfileAndSecurityDisplayValue(null)).toBe('—');
    expect(ManagerProfileAndSecurityDisplayValue(undefined)).toBe('—');
    expect(ManagerProfileAndSecurityDisplayValue('')).toBe('—');
    expect(ManagerProfileAndSecurityDisplayValue(0)).toBe('0');
    expect(ManagerProfileAndSecurityDisplayValue(false)).toBe('false');
    expect(ManagerProfileAndSecurityDisplayValue('Available')).toBe('Available');
  });
});
