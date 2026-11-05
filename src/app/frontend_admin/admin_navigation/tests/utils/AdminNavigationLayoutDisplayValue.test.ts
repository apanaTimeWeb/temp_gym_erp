// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutDisplayValue.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutDisplayValue.test.ts)

import { describe, expect, it } from 'vitest';
import { displayValue } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutDisplayValue';

describe('displayValue', () => {
  it('uses an en dash for nullish and empty values', () => {
    expect(displayValue(null)).toBe('—');
    expect(displayValue(undefined)).toBe('—');
    expect(displayValue('')).toBe('—');
  });

  it('preserves meaningful values', () => {
    expect(displayValue('Active')).toBe('Active');
    expect(displayValue(0)).toBe('0');
  });
});
