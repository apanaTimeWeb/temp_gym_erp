'use client';
// RESPONSIBILITY: Generates user-triggered HR exports from query-owned staff data.
/**
 * @description Provides the ManagerStaffPayrollAndAttendanceExportUtils implementation for the hr module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
function escapeManagerCsv(value: unknown): string {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

/** Downloads the currently query-backed staff rows as a CSV file. */
/**
 * @description Transforms or formats hr data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function downloadManagerStaffPayrollAndAttendanceStaffCsv(staff: Array<{ id: string; name: string; email: string; phone: string; role: string; salary: number; branch: string; isActive: boolean }>): void {
  const header = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Salary', 'Branch', 'Status'];
  const rows = staff.map((item) => [item.id, item.name, item.email, item.phone, item.role, item.salary, item.branch, item.isActive ? 'Active' : 'Suspended']);
  const csv = [header, ...rows].map((row) => row.map(escapeManagerCsv).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = 'manager-hr-staff.csv';
  anchor.click();
  URL.revokeObjectURL(href);
}

/** Opens a printable payslip from query-backed payroll data. */
/**
 * @description Transforms or formats hr data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function printManagerStaffPayrollAndAttendancePayslip(payroll: { id: string; month: string; amount: number; netPayable: number; paidAmount: number; pendingAmount: number; status: string; deductions: { tds: number; pf: number; esi: number; other: number }; staff?: { name: string; role: string } }): void {
  const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);
  const windowRef = window.open('', '_blank', 'noopener,noreferrer,width=800,height=900');
  if (!windowRef) return;
  windowRef.document.write(`<!doctype html><html><head><title>Payslip ${escapeHtml(payroll.id)}</title></head><body><h1>GymSmart Payslip</h1><p><strong>Employee:</strong> ${escapeHtml(payroll.staff?.name ?? payroll.staff?.role ?? payroll.id)}</p><p><strong>Month:</strong> ${escapeHtml(payroll.month)}</p><table><tr><td>Gross</td><td>${payroll.amount}</td></tr><tr><td>TDS</td><td>${payroll.deductions.tds}</td></tr><tr><td>PF</td><td>${payroll.deductions.pf}</td></tr><tr><td>ESI</td><td>${payroll.deductions.esi}</td></tr><tr><td>Other</td><td>${payroll.deductions.other}</td></tr><tr><td>Net Payable</td><td>${payroll.netPayable}</td></tr><tr><td>Paid</td><td>${payroll.paidAmount}</td></tr><tr><td>Pending</td><td>${payroll.pendingAmount}</td></tr><tr><td>Status</td><td>${escapeHtml(payroll.status)}</td></tr></table><script>window.print();</script></body></html>`);
  windowRef.document.close();
}
