// RESPONSIBILITY: Defines regression tests for useAdminHrManagementStaffMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/hooks/useAdminHrManagementStaffMutations.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminHrStaffMutations } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffMutations';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

const confirm = vi.fn();
const createMutation = { mutateAsync: vi.fn(), isPending: false };
const updateMutation = { mutateAsync: vi.fn(), isPending: false };
const deleteMutation = { mutateAsync: vi.fn(), isPending: false };
const queryClient = { invalidateQueries: vi.fn() };
const setShowModal = vi.fn();
const showToast = vi.fn();

vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn(), useQueryClient: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));

const staff: Staff = {
  id: 's1', name: 'Riya', email: 'riya@example.com', phone: '9876543210', role: 'Trainer', salary: 25000,
  branch: 'b1', gender: 'FEMALE', joinDate: '2026-01-01', isActive: true,
};

describe('useAdminHrStaffMutations', () => {
  beforeEach(() => {
    vi.mocked(useMutation).mockReset();
    vi.mocked(useMutation).mockReturnValueOnce(createMutation as never).mockReturnValueOnce(updateMutation as never).mockReturnValueOnce(deleteMutation as never);
    vi.mocked(useQueryClient).mockReturnValue(queryClient as never);
    confirm.mockReset();
    confirm.mockResolvedValue(true);
    createMutation.mutateAsync.mockReset().mockResolvedValue({ message: 'Staff created' });
    updateMutation.mutateAsync.mockReset().mockResolvedValue({ message: 'Staff updated' });
    deleteMutation.mutateAsync.mockReset().mockResolvedValue({ message: 'Staff deleted' });
    setShowModal.mockReset();
    showToast.mockReset();
  });

  it('normalizes create payload values, preserves backend feedback, and closes the modal', async () => {
    const { result } = renderHook(() => useAdminHrStaffMutations(null, setShowModal, showToast));
    await act(async () => {
      await result.current.saveStaff({ ...staff, salary: 25000, joinDate: '2026-10-05' });
    });
    expect(createMutation.mutateAsync).toHaveBeenCalledWith(expect.objectContaining({
      payload: expect.objectContaining({ salary: 2500000, isActive: true, joinDate: expect.stringContaining('2026-10-05') }),
    }));
    expect(showToast).toHaveBeenCalledWith('Staff created', 'success', 'hr-staff-create-success');
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('blocks a destructive delete when confirmation is declined', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useAdminHrStaffMutations(null, setShowModal, showToast));
    await result.current.deleteStaff('s1');
    expect(deleteMutation.mutateAsync).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });
});
