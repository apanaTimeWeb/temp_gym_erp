// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutMaskSensitiveData.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutMaskSensitiveData.test.ts)

import { describe, expect, it } from 'vitest';
import { maskSensitiveData } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMaskSensitiveData';

describe('maskSensitiveData', () => {
  it('masks a standard phone number while retaining safe portions', () => {
    expect(maskSensitiveData('9876543210')).toBe('98****3210');
  });

  it('normalizes formatted phone numbers before masking', () => {
    expect(maskSensitiveData('+91 98765 43210')).toBe('91****3210');
  });

  it('uses the canonical empty fallback', () => {
    expect(maskSensitiveData(null)).toBe('—');
    expect(maskSensitiveData('')).toBe('—');
  });
});
