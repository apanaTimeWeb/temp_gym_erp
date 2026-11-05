// RESPONSIBILITY: Defines regression tests for AdminHrManagementMaskEmail.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/utils/AdminHrManagementMaskEmail.test.ts)

import { describe, expect, it } from 'vitest';
import { maskAdminHrEmail } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementMaskEmail';

describe('maskAdminHrEmail', () => {
  it('masks the email local part while preserving the domain', () => {
    expect(maskAdminHrEmail('shubham.k@example.com')).toBe('sh•••@example.com');
  });
  it('handles invalid or missing values safely', () => {
    expect(maskAdminHrEmail('')).toBe('—');
    expect(maskAdminHrEmail(null)).toBe('—');
    expect(maskAdminHrEmail('not-an-email')).toBe('••••');
  });
});
