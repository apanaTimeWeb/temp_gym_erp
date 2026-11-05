import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useManagerMembersDirectoryMutations } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryMutations';


// Mock dependencies
const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  useMutation: (opts: unknown) => ({
    mutateAsync: vi.fn(),
    mutate: vi.fn() }) }));

vi.mock('@/components/ui/manager_confirm_provider/ManagerConfirmProvider', () => ({
  useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));

describe('useManagerMembersDirectoryMutations', () => {
  it('should return mutation functions', () => {
    const showToast = vi.fn();
    const setSelectedMember = vi.fn();
    const setShowAddModal = vi.fn();
    const setShowRenewModal = vi.fn();
    const setShowPaymentModal = vi.fn();

    const { result } = renderHook(() => useManagerMembersDirectoryMutations(
      showToast, null, setSelectedMember, null, setShowAddModal, setShowRenewModal, setShowPaymentModal
    ));

    expect(typeof result.current.saveMember).toBe('function');
    expect(typeof result.current.deleteMember).toBe('function');
    expect(typeof result.current.renewMember).toBe('function');
    expect(typeof result.current.recordPayment).toBe('function');
  });
});
