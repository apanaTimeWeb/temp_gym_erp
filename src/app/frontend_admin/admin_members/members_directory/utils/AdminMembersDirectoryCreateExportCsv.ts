// RESPONSIBILITY: Converts the filtered Admin Members response records into the module's CSV export format.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_members/members_directory/utils/AdminMembersDirectoryCreateExportCsv.ts)

/**
 * @description AdminMembersCreateExportCsv: Converts the filtered Admin Members response records into the module's CSV export format.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */

import type { AdminMember } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';

/** Creates a deterministic privacy-minimized CSV using only approved non-PII, non-financial bulk fields. @description Implements AdminMembersCreateExportCsv for the owning feature’s explicitly typed data. @param members - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function AdminMembersCreateExportCsv(members: AdminMember[]): string {
  // CSV quoting alone does not neutralize spreadsheet formula execution.
  // Prefix formulas (including those after control/whitespace prefixes) with an apostrophe.
  const escapeCsvValue = (value: unknown): string => {
    const raw = String(value ?? '');
    const text = /^[\u0000-\u0020\uFEFF]*[=+@-]/u.test(raw) ? `'${raw}` : raw;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const rows: unknown[][] = [
    ['ID', 'Name', 'Branch', 'Plan', 'Status', 'Join Date', 'Expiry Date'],
    ...members.map((member) => [
      member.id,
      member.name,
      member.branchName,
      member.planName,
      member.status,
      member.joinDate,
      member.expiryDate,
    ]),
  ];

  return rows.map((row) => row.map(escapeCsvValue).join(',')).join('\n');
}
