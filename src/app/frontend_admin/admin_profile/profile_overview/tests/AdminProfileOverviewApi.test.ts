// RESPONSIBILITY: Defines regression tests for AdminProfileOverviewApi.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/AdminProfileOverviewApi.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/profile_overview/api/admin_profile_overview_api';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('AdminProfileApi password response contract', () => {
  beforeEach(() => vi.clearAllMocks());

  it('validates the null data response declared by the module mock', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'Password updated', data: null } as never);
    await expect(AdminProfileApi.updatePassword({ currentPassword: 'current-password', newPassword: 'new-password-123', confirmPassword: 'new-password-123' }, 'intent-1')).resolves.toMatchObject({ data: null });
    expect(apiFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: 'POST', headers: { 'Idempotency-Key': 'intent-1' }, dataSchema: expect.anything() }));
  });
});
