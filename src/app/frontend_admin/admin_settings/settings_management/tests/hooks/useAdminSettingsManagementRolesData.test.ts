// RESPONSIBILITY: Defines regression tests for useAdminSettingsManagementRolesData.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/hooks/useAdminSettingsManagementRolesData.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminSettingsRolesData } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementRolesData';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));

describe('useAdminSettingsRolesData', () => {
  it('maps role defaults from the validated settings-role response', () => {
    vi.mocked(useQuery).mockReturnValue({ data: { data: { roleDefaults: [{ role: 'ADMIN' }] } }, status: 'success' } as never);
    const { result } = renderHook(() => useAdminSettingsRolesData());
    expect(result.current.roles).toEqual([{ role: 'ADMIN' }]);
    expect(result.current.status).toBe('success');
  });

  it('returns an empty role list when the server has no role data', () => {
    vi.mocked(useQuery).mockReturnValue({ data: undefined, status: 'pending' } as never);
    const { result } = renderHook(() => useAdminSettingsRolesData());
    expect(result.current.roles).toEqual([]);
    expect(result.current.status).toBe('pending');
  });
});
