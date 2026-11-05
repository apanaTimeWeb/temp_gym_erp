'use client';

import type { Staff } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';
// RESPONSIBILITY: Generates user-triggered HR exports from query-owned staff data.
/**
 * @description Provides the ManagerStaffPayrollAndAttendanceExportUtils implementation for the hr module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

function escapeManagerCsv(value: unknown): string {
  const raw = String(value ?? '');
  const safe = /^[=+@\-\t\r\n]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** Utility-only CSV formatter retained for its isolated unit contract; no payroll mutation/view-model action exposes it. */
export function downloadManagerStaffPayrollAndAttendanceStaffCsv(staff: Staff[]): void {
  const columns = ['Name', 'Email', 'Phone', 'Role', 'Salary', 'Branch', 'Join Date'];
  const rows = staff.map((member) => [member.name, member.email, member.phone, member.role, member.salary, member.branch, member.joinDate]);
  const csv = [columns, ...rows].map((row) => row.map(escapeManagerCsv).join(',')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'manager-staff.csv';
  anchor.click();
  URL.revokeObjectURL(url);
}

/** Opens a printable payslip from query-backed payroll data. */
/**
 * @description Transforms or formats hr data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function printManagerStaffPayrollAndAttendancePayslip(payroll: { id: string; month: string; amount: number; netPayable: number; paidAmount: number; pendingAmount: number; status: string; deductions: { tds: number; pf: number; esi: number; other: number }; staff?: { name: string; role: string } }): void {
  const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);
  const windowRef = window.open('', '_blank', 'width=800,height=900');
  if (!windowRef) return;
  windowRef.opener = null;
  windowRef.document.write(`<!doctype html><html><head><title>Payslip ${escapeHtml(payroll.id)}</title></head><body><h1>GymSmart Payslip</h1><p><strong>Employee:</strong> ${escapeHtml(payroll.staff?.name ?? payroll.staff?.role ?? payroll.id)}</p><p><strong>Month:</strong> ${escapeHtml(payroll.month)}</p><table><tr><td>Gross</td><td>${payroll.amount}</td></tr><tr><td>TDS</td><td>${payroll.deductions.tds}</td></tr><tr><td>PF</td><td>${payroll.deductions.pf}</td></tr><tr><td>ESI</td><td>${payroll.deductions.esi}</td></tr><tr><td>Other</td><td>${payroll.deductions.other}</td></tr><tr><td>Net Payable</td><td>${payroll.netPayable}</td></tr><tr><td>Paid</td><td>${payroll.paidAmount}</td></tr><tr><td>Pending</td><td>${payroll.pendingAmount}</td></tr><tr><td>Status</td><td>${escapeHtml(payroll.status)}</td></tr></table><script>window.print();</script></body></html>`);
  windowRef.document.close();
}
