import { describe, expect, it } from 'vitest';
import { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_staff_hr/staff_directory/schemas/manager_staff_payroll_and_attendance_staff_form.schemas';

describe('Manager HR staff form schema input/output parity', () => {
  it('supplies the schema defaults for omitted output fields', () => {
    const result = managerHrStaffFormSchema.safeParse({ name: 'Anuj', email: 'manager@example.com', phone: '1234567890', role: 'Manager', salary: 0, gender: 'MALE', address: '', joinDate: '2026-10-19' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.isActive).toBe(true); expect(result.data.advanceSalary).toBe(0); }
  });

  it('accepts Unicode names and common name punctuation without relaxing phone or gender contracts', () => {
    const result = managerHrStaffFormSchema.safeParse({
      name: 'अनन्या शर्मा',
      email: 'ananya@example.com',
      phone: '9876543210',
      role: 'General Trainer',
      salary: 2500000,
      gender: 'FEMALE',
      address: '',
      joinDate: '2026-10-19',
    });
    expect(result.success).toBe(true);

    const invalidPhone = managerHrStaffFormSchema.safeParse({
      name: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '+919876543210',
      role: 'General Trainer',
      salary: 2500000,
      gender: 'FEMALE',
      address: '',
      joinDate: '2026-10-19',
    });
    expect(invalidPhone.success).toBe(false);
  });
});
