import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/constants/manager_staff_payroll_and_attendance.constants';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_hr_staff_attendance.types';

/**
 * @description Provides the ManagerStaffAttendanceMockData implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_hr/manager_hr_types/ManagerStaffPayrollAndAttendanceTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_HR_SUMMARY: HrSummary = {
  totalSalaryThisMonth: 12000000,
  totalSalaryPaid: 9000000,
  totalSalaryDue: 3000000,
  totalAdvanceGiven: 500000,
  pendingPaymentsCount: 3,
  totalStaff: 15,
  activeStaff: 12,
  totalPayrollThisMonth: 15,
  paidCount: 12 };

export const MOCK_STAFF: Staff[] = [
  {
    id: 'staff-0001',
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '+919876543201',
    role: 'Senior Trainer',
    salary: 4500000,
    branch: 'Main Branch',
    gender: 'Male',
    joinDate: '2022-03-01T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 0,
    advanceSalary: 0,
    bankAccountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    panNumber: 'ABCDE1234F',
    department: 'Training'
  },
  {
    id: 'staff-0002',
    name: 'Anjali Desai',
    email: 'anjali.d@example.com',
    phone: '+919876543202',
    role: 'Receptionist',
    salary: 2500000,
    branch: 'Main Branch',
    gender: 'Female',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 500000,
    advanceSalary: 200000,
    department: 'Front Desk'
  },
  {
    id: 's1',
    name: 'Rahul Verma (Trainer)',
    email: 'rahul.v@example.com',
    phone: '+919876543201',
    role: 'Senior Trainer',
    salary: 4500000,
    branch: 'Main Branch',
    gender: 'Male',
    joinDate: '2022-03-01T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 0,
    advanceSalary: 0,
    bankAccountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    panNumber: 'ABCDE1234F',
    department: 'Training' },
  {
    id: 's2',
    name: 'Anjali Desai (Reception)',
    email: 'anjali.d@example.com',
    phone: '+919876543202',
    role: 'Receptionist',
    salary: 2500000,
    branch: 'Main Branch',
    gender: 'Female',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 500000,
    advanceSalary: 200000,
    department: 'Front Desk' }
];

export const MOCK_PAYROLLS: Payroll[] = [
  {
    id: 'pr1',
    staffId: 's1',
    month: new Date().toISOString().slice(0, 7),
    amount: 4500000,
    netPayable: 4200000,
    paidAmount: 4200000,
    pendingAmount: 0,
    status: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID,
    paidAt: new Date().toISOString(),
    deductions: { tds: 100000, pf: 180000, esi: 20000, other: 0 },
    staff: { name: 'Rahul Verma', role: 'Senior Trainer' }
  }
];

export const MOCK_LEDGER: LedgerEntry[] = [
  {
    id: 'l1',
    staffId: 's1',
    date: new Date().toISOString(),
    type: 'Salary Paid',
    credit: 0,
    debit: 4200000,
    balance: 0,
    notes: 'May Salary',
    paymentMode: 'Bank Transfer'
  }
];
