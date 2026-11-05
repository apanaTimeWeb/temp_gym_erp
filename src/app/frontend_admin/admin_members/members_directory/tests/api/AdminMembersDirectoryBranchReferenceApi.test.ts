// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryBranchReferenceApi.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/api/AdminMembersDirectoryBranchReferenceApi.test.ts)

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminMembersBranchReferenceApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_branch_reference_api';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminMembersBranchReferenceApi', () => {
  beforeEach(() => vi.clearAllMocks());

  it('uses the centralized branch-reference URL and runtime response schema', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: { items: [] } });
    await AdminMembersBranchReferenceApi.fetchMemberBranchReferences();
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('consumer=members'), expect.objectContaining({ method: 'GET', dataSchema: expect.anything() }));
  });
});
