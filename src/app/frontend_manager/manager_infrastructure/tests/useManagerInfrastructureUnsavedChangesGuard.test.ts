import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';


const push = vi.fn();
const confirm = vi.fn();

vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('@/components/ui/manager_confirm_provider/ManagerConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));

describe('useManagerInfrastructureUnsavedChangesGuard', () => {
  beforeEach(() => {
    push.mockReset();
    confirm.mockReset();
    confirm.mockResolvedValue(true);
  });

  it('does not register dirty-state browser protection when clean', () => {
    const beforeUnload = vi.spyOn(window, 'addEventListener');
    renderHook(() => useManagerInfrastructureUnsavedChangesGuard(false));
    expect(beforeUnload).not.toHaveBeenCalledWith('beforeunload', expect.any(Function));
    beforeUnload.mockRestore();
  });

  it('uses the shared confirmation service for guarded navigation', async () => {
    const { result } = renderHook(() => useManagerInfrastructureUnsavedChangesGuard(true));
    await act(async () => {
      await result.current.confirmAndNavigate('/manager/dashboard');
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ title: 'Unsaved Changes', confirmText: 'Discard', cancelText: 'Keep Editing' }));
    expect(push).toHaveBeenCalledWith('/manager/dashboard');
  });

  it('does not navigate when the shared confirmation is cancelled', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useManagerInfrastructureUnsavedChangesGuard(true));
    await act(async () => {
      await result.current.confirmAndNavigate('/manager/dashboard');
    });
    expect(push).not.toHaveBeenCalled();
  });

  it('intercepts same-origin anchor navigation while dirty and routes through confirmation', async () => {
    renderHook(() => useManagerInfrastructureUnsavedChangesGuard(true));
    const anchor = document.createElement('a');
    anchor.href = `${window.location.origin}/manager/settings`;
    anchor.textContent = 'Settings';
    document.body.appendChild(anchor);

    await act(async () => {
      anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
    });

    expect(confirm).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/manager/settings');
    anchor.remove();
  });
});
