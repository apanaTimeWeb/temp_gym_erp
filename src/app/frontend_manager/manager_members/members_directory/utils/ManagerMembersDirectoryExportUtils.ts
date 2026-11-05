'use client';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

/**
 * @description Provides the ManagerMembersDirectoryExportUtils implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_types/ManagerMembersDirectoryTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const escapeCsv = (value: string | number) => {
  let text = String(value ?? '');
  // Neutralize spreadsheet formulas in untrusted text fields before CSV quoting.
  if (/^[\s]*[=+@\-]/.test(text) || /^[\t\r]/.test(text)) text = `'${text}`;
  return /[,"\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** Builds and downloads a member CSV from the server-backed rows already rendered by the feature. */
/**
 * @description Transforms or formats members data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function buildManagerMembersDirectoryCsv(members: Member[], locale = 'en-IN'): string {
  const rows = [
    ['Member ID', 'Name', 'Phone', 'Email', 'Plan', 'Status', 'Join Date', 'Expiry Date', 'Paid', 'Pending'],
    ...members.map((member) => [
      member.id, member.name, member.phone, member.email, member.plan?.name || member.planId,
      member.status, member.joinDate, member.expiryDate,
      ManagerMembersDirectoryFormatCurrency(member.paidAmount, ManagerEnvConfig.currencyCode, locale),
      ManagerMembersDirectoryFormatCurrency(member.pendingAmount, ManagerEnvConfig.currencyCode, locale),
    ]),
  ];
  return rows.map((row) => row.map((cell) => escapeCsv(cell)).join(',')).join('\n');
}

export function downloadManagerMembersDirectoryCsv(members: Member[], locale = 'en-IN') {
  const csv = buildManagerMembersDirectoryCsv(members, locale);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `manager_members_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** Opens the current server-backed member rows in a print dialog so the browser can produce a PDF. */
/**
 * @description Transforms or formats members data without owning server state or cross-feature business behavior.
 * @dependencies Uses feature-local utilities/constants and approved platform APIs only.
 * @edge-case Preserves documented nullish, invalid, masked, and timezone-safe fallback behavior.
 */
export function printManagerMembersDirectoryPdf(members: Member[], locale = 'en-IN') {
  const printWindow = window.open('', '_blank', 'width=1200,height=800');
  if (!printWindow) return;

  const printDocument = printWindow.document;
  printDocument.open();
  printDocument.write('<!doctype html><html><head><meta charset="utf-8"><title>Manager Member Export</title><style>body{font-family:sans-serif;padding:24px}table{border-collapse:collapse;width:100%}th,td{border:1px solid currentColor;padding:6px;text-align:left;font-size:12px}</style></head><body><h1></h1><table><thead><tr></tr></thead><tbody></tbody></table></body></html>');
  printDocument.close();

  const heading = printDocument.querySelector('h1');
  if (heading) heading.textContent = 'Member Export';
  const headerRow = printDocument.querySelector('thead tr');
  const body = printDocument.querySelector('tbody');
  const columns = ['ID', 'Name', 'Phone', 'Plan', 'Status', 'Expiry', 'Paid', 'Pending'];
  for (const column of columns) {
    const th = printDocument.createElement('th');
    th.textContent = column;
    headerRow?.appendChild(th);
  }
  for (const member of members) {
    const row = printDocument.createElement('tr');
    const values = [member.id, member.name, member.phone, member.plan?.name || member.planId, member.status, member.expiryDate, ManagerMembersDirectoryFormatCurrency(member.paidAmount, ManagerEnvConfig.currencyCode, locale), ManagerMembersDirectoryFormatCurrency(member.pendingAmount, ManagerEnvConfig.currencyCode, locale)];
    for (const value of values) {
      const cell = printDocument.createElement('td');
      cell.textContent = String(value ?? '');
      row.appendChild(cell);
    }
    body?.appendChild(row);
  }
  printWindow.focus();
  printWindow.print();
}
