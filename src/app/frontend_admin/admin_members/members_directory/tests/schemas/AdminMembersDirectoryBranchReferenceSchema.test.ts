// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryBranchReferenceSchema.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/schemas/AdminMembersDirectoryBranchReferenceSchema.test.ts)

import { describe, expect, it } from 'vitest';
import { adminMembersBranchReferenceSchema } from '@/app/frontend_admin/admin_members/members_directory/schemas/AdminMembersDirectorySchemas';

describe('adminMembersBranchReferenceSchema', () => {
  it('accepts a typed branch reference envelope', () => {
    expect(adminMembersBranchReferenceSchema.safeParse({ items: [{ id: 'b1', name: 'Main Branch' }] }).success).toBe(true);
  });

  it('rejects missing branch identity fields', () => {
    expect(adminMembersBranchReferenceSchema.safeParse({ items: [{ name: 'Main Branch' }] }).success).toBe(false);
  });
});
