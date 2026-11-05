import { describe, expect, it } from 'vitest';
import { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_staff_form.schemas';

describe('Manager HR staff form schema input/output parity', () => {
  it('supplies the schema defaults for omitted output fields', () => {
    const result = managerHrStaffFormSchema.safeParse({ name: 'Anuj', email: 'manager@example.com', phone: '1234567890', role: 'Manager', salary: 0, gender: 'MALE', address: '', joinDate: '2026-10-19' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.isActive).toBe(true); expect(result.data.advanceSalary).toBe(0); }
  });
});
