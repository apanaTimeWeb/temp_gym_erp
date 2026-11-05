// RESPONSIBILITY: Defines the TypeScript types and interfaces for the HR module.
// Includes Indian payroll compliance: TDS/PF/ESI deductions, bank details, PAN, department, emergencyContact.

export type SalaryType = 'Monthly' | 'Daily';
export type PaymentCycle = 'Monthly' | 'Bi-Weekly' | 'Weekly';
export type ManagerStaffPayrollAndAttendanceGender = 'MALE' | 'FEMALE' | 'OTHER';
export type ManagerStaffPayrollAndAttendanceLedgerEntryType = 'Salary Generated' | 'Salary Paid' | 'Advance Given' | 'Due Paid';

export interface HrInitialData {
  staff: Staff[];
  payrolls: Payroll[];
  summary: HrSummary | null;
}


// ─── Staff ────────────────────────────────────────────────────────────────────
/** CRITICAL: bankAccountNumber, ifscCode, panNumber, department, emergencyContact, documents
 * are DB columns that must exist before backend is built. */
export interface StaffDocument {
  type: string;          // e.g. 'Aadhaar', 'PAN', 'Address Proof'
  url: string;
  uploadedAt: string;
}

export interface StaffEmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  branch: string;
  gender: string;
  address?: string;
  aadhaar?: string;
  upiId?: string;
  advanceSalary?: number;
  joinDate: string;
  isActive: boolean;
  salaryType?: SalaryType;
  paymentCycle?: PaymentCycle;
  currentDue?: number;
  // CRITICAL Indian payroll & KYC fields (DB columns)
  bankAccountNumber?: string;
  ifscCode?: string;
  panNumber?: string;
  department?: string;
  emergencyContact?: StaffEmergencyContact;
  documents?: StaffDocument[];
}

// ─── Payroll ──────────────────────────────────────────────────────────────────
/** CRITICAL: deductions (TDS/PF/ESI) are required for Indian payroll compliance. */
export interface PayrollDeductions {
  tds: number;   // Tax Deducted at Source
  pf: number;    // Provident Fund
  esi: number;   // Employee State Insurance
  other: number;
}

export interface Payroll {
  id: string;
  staffId: string;
  month: string;
  amount: number;     // gross amount
  netPayable: number; // after deductions
  paidAmount: number;
  pendingAmount: number;
  status: string;
  paidAt?: string;
  notes?: string;
  // CRITICAL Indian payroll compliance (DB columns)
  deductions: PayrollDeductions;
  staff?: { name: string; role: string };
}

// ─── HR Summary ───────────────────────────────────────────────────────────────
export interface HrSummaryStats {
  totalSalaryThisMonth: number;
  totalSalaryPaid: number;
  totalSalaryDue: number;
  totalAdvanceGiven: number;
  pendingPaymentsCount: number;
  totalStaff: number;
  activeStaff: number;
  totalPayrollThisMonth: number;
  paidCount: number;
}

export type HrSummary = HrSummaryStats;

// ─── Ledger ───────────────────────────────────────────────────────────────────
export interface LedgerEntry {
  id: string;
  staffId: string;
  date: string;
  type: ManagerStaffPayrollAndAttendanceLedgerEntryType;
  credit: number;
  debit: number;
  balance: number;
  notes?: string;
  referenceNo?: string;
  paymentMode?: string;
}

export type ManagerStaffPayrollAndAttendanceViewId = 'trainer-list' | 'trainer-attendance' | 'salary-payments' | 'staff-ledger' | 'give-advance' | 'pay-due';
