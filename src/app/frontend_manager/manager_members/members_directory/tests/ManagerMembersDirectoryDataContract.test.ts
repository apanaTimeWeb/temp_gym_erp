import { describe, expect, it } from 'vitest';

import { MOCK_MEMBER_STATS, MOCK_MEMBERS } from '@/app/frontend_manager/manager_members/members_directory/mocks/fixtures/ManagerMembersDirectoryMockData';
import { memberStatsSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_entity.schemas';
import { populatedMemberSchema, paymentSnapshotSchema, planSnapshotSchema, attendanceSnapshotSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory.schemas';

describe('Manager Members API/UI data requirements', () => {
  it('accepts the canonical stats fixture consumed by the four KPI cards', () => {
    expect(memberStatsSchema.parse(MOCK_MEMBER_STATS)).toEqual(MOCK_MEMBER_STATS);
    expect(memberStatsSchema.safeParse({ total: 12, active: 6, expired: 2 }).success).toBe(false);
  });

  it('validates member rows and optional nested plan snapshots used by the table/profile', () => {
    expect(MOCK_MEMBERS.length).toBeGreaterThan(0);
    for (const member of MOCK_MEMBERS) {
      expect(populatedMemberSchema.safeParse(member).success).toBe(true);
    }
    expect(populatedMemberSchema.safeParse({ ...MOCK_MEMBERS[0], paidAmount: 1.5 }).success).toBe(false);
  });

  it('enforces integer minor units in both plan and payment response snapshots', () => {
    const plan = { id: 'plan-1', name: 'Annual', price1Month: 10000, price3Month: 27000, price6Month: 50000, price12Month: 90000 };
    const payment = { id: 'payment-1', amount: 1250, paidAt: '2026-01-01T00:00:00.000Z', method: 'UPI', status: 'PAID', invoiceNumber: 'INV-1' };
    expect(planSnapshotSchema.safeParse(plan).success).toBe(true);
    expect(planSnapshotSchema.safeParse({ ...plan, price1Month: 10000.5 }).success).toBe(false);
    expect(paymentSnapshotSchema.safeParse(payment).success).toBe(true);
    expect(paymentSnapshotSchema.safeParse({ ...payment, amount: 1250.5 }).success).toBe(false);
  });

  it('validates attendance response fields used by the profile calendar/history', () => {
    const row = { id: 'attendance-1', date: '2026-01-01', checkIn: '09:00', type: 'MEMBER' };
    expect(attendanceSnapshotSchema.safeParse(row).success).toBe(true);
    expect(attendanceSnapshotSchema.safeParse({ ...row, type: 'UNKNOWN' }).success).toBe(false);
  });
});
