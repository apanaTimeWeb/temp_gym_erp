// RESPONSIBILITY: Defines regression tests for AdminMembersBlacklistManagementSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/schemas/AdminMembersBlacklistManagementSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { blacklistFormSchema, blacklistedMemberSchema } from '@/app/frontend_admin/admin_members/members_blacklist_management/schemas/AdminMembersBlacklistManagementSchemas';

const validForm = {
  memberId: 'MEM-123',
  memberName: 'Test Member',
  memberPhone: '9876543210',
  memberEmail: 'member@example.com',
  reason: 'Repeated policy violations',
  scope: 'global' as const,
  assignedGyms: ['all'],
};

describe('blacklistFormSchema', () => {
  it('accepts a valid global entry with the all-gyms sentinel', () => {
    expect(blacklistFormSchema.safeParse(validForm).success).toBe(true);
  });

  it('rejects non-ten-digit phone input', () => {
    expect(blacklistFormSchema.safeParse({ ...validForm, memberPhone: '+919876543210' }).success).toBe(false);
    expect(blacklistFormSchema.safeParse({ ...validForm, memberPhone: '12345' }).success).toBe(false);
  });

  it('rejects a specific scope with the all-gyms sentinel or no selected gym', () => {
    expect(blacklistFormSchema.safeParse({ ...validForm, scope: 'specific', assignedGyms: ['all'] }).success).toBe(false);
    expect(blacklistFormSchema.safeParse({ ...validForm, scope: 'specific', assignedGyms: [] }).success).toBe(false);
  });

  it('accepts a specific scope with one or more explicit gym IDs', () => {
    expect(blacklistFormSchema.safeParse({ ...validForm, scope: 'specific', assignedGyms: ['g1', 'g2'] }).success).toBe(true);
  });
});


describe('blacklistedMemberSchema response contract', () => {
  const baseRecord = {
    id: 'bl1', memberId: 'MEM-123', memberName: 'Test Member', memberPhone: '***-***-3210',
    memberEmail: 'masked@example.com', reason: 'Repeated policy violations', blacklistedBy: 'Admin',
    blacklistedAt: '2026-05-12T10:00:00.000Z', scope: 'global' as const,
    assignedGyms: ['all'], assignedGymNames: ['All Gyms'], isActive: true,
  };

  it('accepts valid global response scope', () => {
    expect(blacklistedMemberSchema.safeParse(baseRecord).success).toBe(true);
  });

  it('rejects a specific-scope response with zero assigned gyms', () => {
    expect(blacklistedMemberSchema.safeParse({ ...baseRecord, scope: 'specific', assignedGyms: [], assignedGymNames: [] }).success).toBe(false);
  });

  it('accepts valid specific gym assignments', () => {
    expect(blacklistedMemberSchema.safeParse({ ...baseRecord, scope: 'specific', assignedGyms: ['g1'], assignedGymNames: ['Gym One'] }).success).toBe(true);
  });

  it('rejects a specific-scope response containing the all-gyms sentinel', () => {
    expect(blacklistedMemberSchema.safeParse({ ...baseRecord, scope: 'specific', assignedGyms: ['all'] }).success).toBe(false);
  });

  it('rejects global scope unless the all-gyms sentinel is the only assignment', () => {
    expect(blacklistedMemberSchema.safeParse({ ...baseRecord, assignedGyms: ['all', 'g1'] }).success).toBe(false);
  });
});
