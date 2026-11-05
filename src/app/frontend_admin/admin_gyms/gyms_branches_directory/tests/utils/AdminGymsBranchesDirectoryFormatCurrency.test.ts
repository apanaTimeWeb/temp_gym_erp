// RESPONSIBILITY: Defines regression tests for AdminGymsBranchesDirectoryFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/utils/AdminGymsBranchesDirectoryFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminBranchesFormatCurrency } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryFormatCurrency';

describe('AdminBranchesFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminBranchesFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminBranchesFormatCurrency(Number.POSITIVE_INFINITY, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminBranchesFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminBranchesFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminBranchesFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});
