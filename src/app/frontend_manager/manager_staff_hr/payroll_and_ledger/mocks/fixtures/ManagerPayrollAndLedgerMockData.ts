import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';

/** Stable reference month for this process; all default payroll and attendance fixtures share it. */
export const MOCK_PAYROLL_AND_LEDGER_MONTH = new Date().toISOString().slice(0, 7);
const PREVIOUS_MONTH_DATE = new Date(`${MOCK_PAYROLL_AND_LEDGER_MONTH}-01T00:00:00.000Z`);
PREVIOUS_MONTH_DATE.setUTCMonth(PREVIOUS_MONTH_DATE.getUTCMonth() - 1);
export const MOCK_PAYROLL_AND_LEDGER_PREVIOUS_MONTH = PREVIOUS_MONTH_DATE.toISOString().slice(0, 7);

export const MANAGER_PAYROLL_AND_LEDGER_FIXTURE_TIERS = {
  SMALL: 10,
  STANDARD: 120,
  STRESS: 520,
} as const;

export interface ManagerPayrollAndLedgerFixtureSet {
  staff: Staff[];
  payrolls: Payroll[];
  ledger: LedgerEntry[];
  summary: HrSummary;
}

function deriveSummary(staff: Staff[], payrolls: Payroll[], ledger: LedgerEntry[], month: string): HrSummary {
  const currentPayrolls = payrolls.filter((payroll) => payroll.month === month);
  return {
    totalSalaryThisMonth: currentPayrolls.reduce((total, payroll) => total + payroll.netPayable, 0),
    totalSalaryPaid: currentPayrolls.reduce((total, payroll) => total + payroll.paidAmount, 0),
    totalSalaryDue: currentPayrolls.reduce((total, payroll) => total + payroll.pendingAmount, 0),
    totalAdvanceGiven: ledger.filter((entry) => entry.type === 'Advance Given').reduce((total, entry) => total + entry.debit, 0),
    pendingPaymentsCount: currentPayrolls.filter((payroll) => payroll.pendingAmount > 0).length,
    totalStaff: staff.length,
    activeStaff: staff.filter((member) => member.isActive).length,
    totalPayrollThisMonth: currentPayrolls.length,
    paidCount: currentPayrolls.filter((payroll) => payroll.pendingAmount === 0 && payroll.paidAmount > 0).length,
  };
}

/**
 * Creates deterministic, internally reconciled datasets for pagination and stress scenarios.
 * Money values are represented in the same minor-unit integers used by the leaf API.
 */
export function createManagerPayrollAndLedgerFixtureSet(count: number, month = MOCK_PAYROLL_AND_LEDGER_MONTH): ManagerPayrollAndLedgerFixtureSet {
  const staffNames = [
    'Rahul Verma', 'Anjali Desai', 'Vikram Malhotra', 'Sneha Kapoor', 'Rohan Mehta',
    'Pooja Sharma', 'Karan Patel', 'Neha Gupta', 'Amit Singh', 'Deepika Rao',
    'Arjun Nair', 'Priya Joshi', 'Manish Reddy', 'Kavita Iyer', 'Sanjay Kumar'
  ];
  const roles = ['Senior Trainer', 'Receptionist', 'Fitness Coach', 'Nutritionist', 'Front Desk'];
  const staff: Staff[] = Array.from({ length: count }, (_, index) => {
    const id = `staff-${String(index + 1).padStart(4, '0')}`;
    return {
      id,
      name: staffNames[index] || `Staff Member ${String(index + 1).padStart(3, '0')}`,
      email: `staff${index + 1}@example.test`,
      phone: `+919900${String(index + 1).padStart(6, '0')}`,
      role: roles[index % roles.length],
      salary: 2500000 + (index % 5) * 250000,
      branch: index % 2 === 0 ? 'Main Branch' : 'North Branch',
      gender: index % 2 === 0 ? 'FEMALE' : 'MALE',
      joinDate: `202${index % 5}-01-15T10:00:00.000Z`,
      isActive: index % 11 !== 0,
      salaryType: 'Monthly',
      paymentCycle: 'Monthly',
      currentDue: 0,
      advanceSalary: 0,
      department: roles[index % roles.length],
    };
  });

  const payrolls: Payroll[] = staff.filter((member) => member.isActive).map((member, index) => {
    const paid = index % 3 !== 0;
    return {
      id: `payroll-${member.id}-${month}`,
      staffId: member.id,
      month,
      amount: member.salary,
      netPayable: member.salary,
      paidAmount: paid ? member.salary : 0,
      pendingAmount: paid ? 0 : member.salary,
      status: paid ? MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PAID : MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PENDING,
      paidAt: paid ? `${month}-28T10:00:00.000Z` : undefined,
      deductions: { tds: 0, pf: 0, esi: 0, other: 0 },
      staff: { name: member.name, role: member.role },
    };
  });

  const ledger: LedgerEntry[] = [];
  for (const [index, payroll] of payrolls.entries()) {
    if (payroll.paidAmount > 0) {
      ledger.push({ id: `ledger-salary-${payroll.staffId}`, staffId: payroll.staffId, date: `${month}-28T10:00:00.000Z`, type: 'Salary Paid', credit: 0, debit: payroll.paidAmount, balance: 0, notes: `${month} salary`, paymentMode: 'Bank Transfer' });
    }
    if (index % 17 === 0) {
      ledger.push({ id: `ledger-advance-${payroll.staffId}`, staffId: payroll.staffId, date: `${month}-15T10:00:00.000Z`, type: 'Advance Given', credit: 0, debit: 25000, balance: -25000, notes: 'Fixture advance', paymentMode: 'Bank Transfer' });
    }
  }

  for (const member of staff) {
    member.currentDue = payrolls.filter((payroll) => payroll.staffId === member.id).reduce((total, payroll) => total + payroll.pendingAmount, 0);
    member.advanceSalary = ledger.filter((entry) => entry.staffId === member.id && entry.type === 'Advance Given').reduce((total, entry) => total + entry.debit, 0);
  }

  return { staff, payrolls, ledger, summary: deriveSummary(staff, payrolls, ledger, month) };
}

export const MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS = {
  SMALL: createManagerPayrollAndLedgerFixtureSet(MANAGER_PAYROLL_AND_LEDGER_FIXTURE_TIERS.SMALL),
  STANDARD: createManagerPayrollAndLedgerFixtureSet(MANAGER_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD),
  STRESS: createManagerPayrollAndLedgerFixtureSet(MANAGER_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STRESS),
} as const;

export const MOCK_STAFF: Staff[] = MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD.staff;
export const MOCK_PAYROLLS: Payroll[] = MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD.payrolls;
export const MOCK_LEDGER: LedgerEntry[] = MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD.ledger;
export const MOCK_HR_SUMMARY: HrSummary = MOCK_PAYROLL_AND_LEDGER_FIXTURE_TIERS.STANDARD.summary;

export interface ManagerPayrollAttendanceFixture {
  staffId: string;
  month: string;
  history: Array<{ date: string; status: string; checkIn?: string; checkOut?: string }>;
}

/** Multiple staff/month combinations plus an intentionally absent month for deterministic empty-state tests. */
export const MOCK_STAFF_ATTENDANCE: ManagerPayrollAttendanceFixture[] = MOCK_STAFF.slice(0, 12).flatMap((member, staffIndex) =>
  [MOCK_PAYROLL_AND_LEDGER_MONTH, MOCK_PAYROLL_AND_LEDGER_PREVIOUS_MONTH].map((month, monthIndex) => ({
    staffId: member.id,
    month,
    history: [
      { date: `${month}-01`, status: 'PRESENT', checkIn: '08:00 AM', checkOut: '05:00 PM' },
      { date: `${month}-02`, status: staffIndex % 2 === 0 ? 'ABSENT' : 'PRESENT', checkIn: staffIndex % 2 === 0 ? undefined : '08:15 AM', checkOut: staffIndex % 2 === 0 ? undefined : '05:05 PM' },
      { date: `${month}-03`, status: monthIndex === 0 ? 'LEAVE' : 'PRESENT', checkIn: monthIndex === 0 ? undefined : '08:10 AM', checkOut: monthIndex === 0 ? undefined : '05:00 PM' },
    ],
  })),
);
