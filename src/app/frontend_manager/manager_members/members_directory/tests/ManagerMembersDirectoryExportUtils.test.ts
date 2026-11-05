import { describe, expect, it } from 'vitest';

import { buildManagerMembersDirectoryCsv, downloadManagerMembersDirectoryCsv, printManagerMembersDirectoryPdf } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryExportUtils';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

const sampleMember: Member = {
  id: 'member-1', name: '=SUM(1,2)', phone: '9876543210', email: 'member@example.test', gender: 'OTHER',
  branch: 'branch-1', planId: 'plan-1', billingCycle: 'ONE_MONTH', status: 'ACTIVE',
  joinDate: '2026-01-01', expiryDate: '2026-02-01', paidAmount: 12345, pendingAmount: 500,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('ManagerMembersDirectoryExportUtils behavioral contract', () => {
  it('formats monetary minor units in CSV and neutralizes spreadsheet formulas', () => {
    const csv = buildManagerMembersDirectoryCsv([sampleMember], 'en-IN');
    expect(csv).toContain("'=SUM(1");
    expect(csv).toContain('₹123.45');
    expect(csv).toContain('₹5.00');
  });

  it('exposes explicit browser export actions', () => {
    expect(typeof downloadManagerMembersDirectoryCsv).toBe('function');
    expect(typeof printManagerMembersDirectoryPdf).toBe('function');
  });
});
