// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/utils/AdminMembersDirectoryFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatCurrency';

describe('AdminMembersFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminMembersFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminMembersFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminMembersFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminMembersFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminMembersFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});
