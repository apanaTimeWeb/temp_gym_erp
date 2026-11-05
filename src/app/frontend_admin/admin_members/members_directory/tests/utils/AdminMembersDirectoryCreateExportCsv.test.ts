// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryCreateExportCsv.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/utils/AdminMembersDirectoryCreateExportCsv.test.ts)

import { MEMBER_STATUS_VALUES } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
import { describe, expect, it } from 'vitest';
import { AdminMembersCreateExportCsv } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryCreateExportCsv';
import type { AdminMember } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';

const createMember = (overrides: Partial<AdminMember>): AdminMember => ({
  id: 'member-1',
  name: 'Riya Sharma',
  email: 'riya@example.com',
  phone: '9876543210',
  branchId: 'branch-1',
  branchName: 'Main Branch',
  planName: 'Premium',
  status: MEMBER_STATUS_VALUES.ACTIVE,
  gender: 'Female',
  joinDate: '2026-08-01',
  expiryDate: '2027-08-01',
  pendingAmount: 1250,
  ...overrides,
});

describe('AdminMembersCreateExportCsv', () => {
  it('contains the actual filtered member records rather than placeholder export rows', () => {
    const csv = AdminMembersCreateExportCsv([
      createMember({ id: 'member-1', name: 'Riya Sharma' }),
      createMember({ id: 'member-2', name: 'Amit Kumar', branchName: 'City Branch' }),
    ]);

    expect(csv).toContain('"member-1","Riya Sharma"');
    expect(csv).toContain('"member-2","Amit Kumar"');
    expect(csv).toContain('"City Branch"');
    expect(csv.split('\n')).toHaveLength(3);
  });

  it('excludes confidential contact fields and per-member financial amounts from bulk export', () => {
    const csv = AdminMembersCreateExportCsv([createMember({ email: 'private@example.com', phone: '9876543210', pendingAmount: 1250 })]);
    expect(csv.split('\n')[0]).toBe('\"ID\",\"Name\",\"Branch\",\"Plan\",\"Status\",\"Join Date\",\"Expiry Date\"');
    expect(csv).not.toContain('private@example.com');
    expect(csv).not.toContain('9876543210');
    expect(csv).not.toContain('1250');
  });

  it('escapes quotes in values without dropping the record', () => {
    const csv = AdminMembersCreateExportCsv([createMember({ name: 'A"B' })]);
    expect(csv).toContain('"A""B"');
  });
});

describe('spreadsheet formula injection safety', () => {
  it('neutralizes formula-like bulk fields even when CSV fields are quoted', () => {
    const csv = AdminMembersCreateExportCsv([
      createMember({ name: '=HYPERLINK("https://example.test", "open")', branchName: '+SUM(1,2)', planName: '@cmd' }),
    ]);
    expect(csv).toContain(`"'=HYPERLINK(""https://example.test"", ""open"")"`);
    expect(csv).toContain(`"'+SUM(1,2)"`);
    expect(csv).toContain(`"'@cmd"`);
  });
  it('handles leading whitespace, line feeds and BOM without rewriting benign rows', () => {
    const csv = AdminMembersCreateExportCsv([
      createMember({ name: '\t=SUM(1,1)', branchName: '\n@HYPERLINK', planName: '\uFEFF-2+2' }),
      createMember({ name: 'Normal member', branchName: 'North Zone' }),
    ]);
    expect(csv).toContain(`"'\t=SUM(1,1)"`);
    expect(csv).toContain(`"'\n@HYPERLINK"`);
    expect(csv).toContain(`"'\uFEFF-2+2"`);
    expect(csv).toContain(`"Normal member","North Zone"`);
  });
});