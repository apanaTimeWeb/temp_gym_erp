// RESPONSIBILITY: Verify HR mock validation and reset invariants.
import { describe, expect, it } from 'vitest';
import { staffFormSchema } from '@/app/frontend_admin/admin_hr/hr_staff_management/schemas/AdminHrStaffManagementSchemas';
import { resetAdminHrStaffMockState } from '@/app/frontend_admin/admin_hr/hr_staff_management/mocks/handlers/AdminHrStaffManagementMockHandlers';

describe('HR Staff mock input safety', () => {
  it('does not allow fabricated required business fields', () => {
    expect(staffFormSchema.safeParse({}).success).toBe(false);
    expect(staffFormSchema.safeParse({ name: 'X' }).success).toBe(false);
  });
  it('exposes deterministic fixture reset for the harness', () => {
    expect(() => resetAdminHrStaffMockState()).not.toThrow();
  });
});
