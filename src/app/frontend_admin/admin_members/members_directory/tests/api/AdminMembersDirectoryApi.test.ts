// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryApi.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/api/AdminMembersDirectoryApi.test.ts)

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_api';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminMembersApi.fetchSummary', () => {
  beforeEach(() => vi.clearAllMocks());

  it('carries branch identity into the summary request', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: { totalMembers: 0 } });

    await AdminMembersApi.fetchSummary('b2');

    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringContaining('/summary?branchId=b2'),
      expect.objectContaining({ dataSchema: expect.anything() }),
    );
  });

  it('omits the branch query for the all-branches summary', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: { totalMembers: 0 } });

    await AdminMembersApi.fetchSummary();

    expect(apiFetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/summary$/),
      expect.objectContaining({ dataSchema: expect.anything() }),
    );
  });

  it('carries typed list filters into the list endpoint', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: [], meta: { total: 0 } });
    await AdminMembersApi.fetchMembers({ search: 'Riya', status: 'active', branchId: 'b2', gender: 'Female', plan: 'pro', page: 2, limit: 10 });
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('/admin/members/list?'), expect.objectContaining({ method: 'GET', dataSchema: expect.anything() }));
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('search=Riya'), expect.objectContaining({ method: 'GET', dataSchema: expect.anything() }));
    expect(String(vi.mocked(apiFetch).mock.calls[0]?.[0])).toContain('branchId=b2');
    expect(String(vi.mocked(apiFetch).mock.calls[0]?.[0])).toContain('gender=Female');
  });

  it('uses the member ID through the module route-config function for details', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: { id: 'm-1' } });
    await AdminMembersApi.fetchMemberById('m-1');
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('m-1'), expect.objectContaining({ method: 'GET', dataSchema: expect.anything() }));
  });

  it('encodes filtered CSV export parameters and validates the string response', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: 'ID,Name' });
    await AdminMembersApi.exportMembers({ search: 'Riya Sharma', status: 'active', branchId: 'b2' });
    expect(apiFetch).toHaveBeenCalledWith(expect.stringContaining('search=Riya+Sharma'), expect.objectContaining({ method: 'GET', dataSchema: expect.anything() }));
  });
});
