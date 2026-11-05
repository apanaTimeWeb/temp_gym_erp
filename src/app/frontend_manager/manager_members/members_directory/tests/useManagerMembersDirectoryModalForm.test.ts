import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerMembersDirectoryModalForm } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryModalForm';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, string>) => values ? `${key}:${Object.values(values).join(',')}` : key }));
vi.mock('@/components/ui/manager_confirm_provider/ManagerConfirmProvider', () => ({
  useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }),
  ManagerConfirmProvider: ({ children }: { children: unknown }) => children,
}));
vi.mock('@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard', () => ({
  useManagerInfrastructureUnsavedChangesGuard: () => ({ confirmAndClose: (callback: () => void) => callback() }),
}));

describe('useManagerMembersDirectoryModalForm', () => {
  it('initializes with the actual six-argument contract and array-valued plans', () => {
    const setShowAddModal = vi.fn();
    const saveMember = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useManagerMembersDirectoryModalForm(null, true, [], setShowAddModal, saveMember, null));
    expect(result.current).toBeDefined();
    expect(result.current.useFormReturn).toBeDefined();
    expect(setShowAddModal).not.toHaveBeenCalled();
    expect(saveMember).not.toHaveBeenCalled();
  });
});
