// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_staff_dues_management/mocks/fixtures/AdminFinanceStaffDuesManagementMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin Finance StaffDuesManagement feature.
import { PAYROLL_STATUS } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin Finance module.
import type { Staff, Payroll, LedgerEntry } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';

// --- Shared Constants for Generators ---
export const MOCK_ADMIN_STAFF: Staff[] = [
  {
    id: 's1',
    employeeId: 'EMP-001',
    name: 'Rahul Sharma',
    email: 'rahul.s@gym.com',
    phone: '9876543210',
    role: 'Manager',
    salary: 50000,
    branch: 'Downtown Main',
    gender: 'MALE',
    joinDate: '2026-01-15T10:00:00Z',
    isActive: true,
  },
  {
    id: 's2',
    employeeId: 'EMP-002',
    name: 'Priya Singh',
    email: 'priya.s@gym.com',
    phone: '9876543211',
    role: 'Trainer',
    salary: 30000,
    branch: 'Westside Gym',
    gender: 'FEMALE',
    joinDate: '2026-05-20T10:00:00Z',
    isActive: true,
    currentDue: 3500,
  }
];

export const MOCK_ADMIN_STAFF_EXPANDED: Staff[] = [
  ...MOCK_ADMIN_STAFF,
  ...Array.from({ length: 12 }, (_, index) => {
    const n = index + 3;
    return {
      id: `s${n}`,
      employeeId: `EMP-${String(n).padStart(3, '0')}`,
      name: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]! + ` ${n}`,
      email: `staff${n}@gym.com`,
      phone: `998877${(1000 + n).toString().slice(-4)}`,
      role: ['Trainer', 'Receptionist', 'Accountant', 'Manager'][index % 4]!,
      salary: 28000 + (index % 5) * 6500,
      branch: ['Downtown Main', 'Westside Gym', 'Northside Arena', 'Eastside Fitness'][index % 4]!,
      gender: ['MALE', 'FEMALE'][index % 2]!,
      joinDate: `2026-0${(index % 8) + 1}-${String((index % 25) + 1).padStart(2, '0')}T10:00:00Z`,
      isActive: index % 5 !== 0,
    };
  }),
];

export const MOCK_ADMIN_PAYROLLS: Payroll[] = [
  {
    id: 'pr1', staffId: 's1', month: '2026-10', amount: 50000,
    paidAmount: 50000, pendingAmount: 0, status: PAYROLL_STATUS.PAID, paidAt: '2026-10-01T10:00:00Z',
    staff: { name: 'Rahul Sharma', role: 'Manager' }
  },
  {
    id: 'pr2', staffId: 's2', month: '2026-10', amount: 30000,
    paidAmount: 0, pendingAmount: 30000, status: PAYROLL_STATUS.PENDING,
    staff: { name: 'Priya Singh', role: 'Trainer' }
  }
];

export const MOCK_ADMIN_PAYROLLS_EXPANDED: Payroll[] = [
  ...MOCK_ADMIN_PAYROLLS,
  ...Array.from({ length: 12 }, (_, index) => {
    const n = index + 3;
    const amount = 28000 + (index % 5) * 6500;
    const paid = index % 3 === 0 ? amount : index % 3 === 1 ? 0 : Math.round(amount / 2);
    return {
      id: `pr${n}`,
      staffId: `s${n}`,
      month: '2026-10',
      amount,
      paidAmount: paid,
      pendingAmount: amount - paid,
      status: (paid === amount ? PAYROLL_STATUS.PAID : paid === 0 ? PAYROLL_STATUS.PENDING : PAYROLL_STATUS.PARTIAL) as Payroll['status'],
      ...(paid > 0 ? { paidAt: '2026-10-01T10:00:00Z' } : {}),
      staff: { name: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]! + ` ${n}`, role: ['Trainer', 'Receptionist', 'Accountant'][index % 3]! },
    };
  }),
];

export const MOCK_ADMIN_LEDGER: LedgerEntry[] = [
  { id: 'l1', staffId: 's1', date: '2026-10-01T10:00:00Z', type: 'Salary Paid', credit: 0, debit: 50000, balance: 0 },
  { id: 'l2', staffId: 's2', date: '2026-10-01T10:00:00Z', type: 'Salary Generated', credit: 30000, debit: 0, balance: 30000 },
];


// --- From AdminMembersMockData.ts ---
