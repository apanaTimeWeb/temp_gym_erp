// RESPONSIBILITY: Defines regression tests for useAdminGymsBranchesDirectoryDetailDrawerKeyboard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/hooks/useAdminGymsBranchesDirectoryDetailDrawerKeyboard.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminBranchesDetailDrawerKeyboard } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryDetailDrawerKeyboard';

describe('useAdminBranchesDetailDrawerKeyboard', () => {
  it('closes the detail drawer when Escape is pressed while enabled', () => {
    const closeDetail = vi.fn();
    renderHook(() => useAdminBranchesDetailDrawerKeyboard(true, closeDetail));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeDetail).toHaveBeenCalledTimes(1);
  });

  it('does not attach an Escape handler while disabled', () => {
    const closeDetail = vi.fn();
    const { unmount } = renderHook(() => useAdminBranchesDetailDrawerKeyboard(false, closeDetail));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeDetail).not.toHaveBeenCalled();
    unmount();
  });
});
