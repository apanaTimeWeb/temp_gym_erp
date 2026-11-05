// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { StaffFormValues, PayrollFormValues, ManagerStaffPayrollAndAttendanceAdvanceFormValues, ManagerStaffPayrollAndAttendanceDueFormValues } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_payroll_and_attendance_form.types';

export const EMPTY_STAFF: StaffFormValues = { name: '', email: '', phone: '', role: '', salary: 0, gender: 'MALE', address: '', joinDate: new Date().toISOString().split('T')[0] || '', temporaryPassword: '', isActive: true, aadhaar: '', upiId: '', advanceSalary: 0 };

export const EMPTY_PAYROLL_FORM: PayrollFormValues = { staffId: '', month: new Date().toISOString().slice(0, 7), amount: 0, paidAmount: 0, notes: '' };

export const EMPTY_HR_ADVANCE_FORM: ManagerStaffPayrollAndAttendanceAdvanceFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };

export const EMPTY_HR_DUE_FORM: ManagerStaffPayrollAndAttendanceDueFormValues = { staffId: '', amount: 0, paymentMode: 'Bank Transfer', notes: '' };
