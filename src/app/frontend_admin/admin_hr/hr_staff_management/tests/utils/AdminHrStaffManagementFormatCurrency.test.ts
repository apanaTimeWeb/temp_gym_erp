// RESPONSIBILITY: Defines regression tests for AdminHrManagementFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/utils/AdminHrManagementFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminHrFormatCurrency } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementFormatCurrency';

describe('AdminHrFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminHrFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminHrFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminHrFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminHrFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminHrFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});
