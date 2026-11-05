import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerGrievanceResolutionResolution } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionResolution';

const confirmAndClose = vi.fn((onConfirm: () => void) => {
  onConfirm();
});

vi.mock('@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard', () => ({
  useManagerInfrastructureUnsavedChangesGuard: () => ({ confirmAndClose }),
}));

describe('useManagerGrievanceResolutionResolution', () => {
  it('starts a resolution draft and clears it after a successful resolution', async () => {
    const resolveTicket = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useManagerGrievanceResolutionResolution({ resolveTicket, isResolving: false }));

    act(() => result.current.startResolution('grievance-1'));
    act(() => result.current.setResolutionNote('Issue fixed'));
    expect(result.current.resolvingTicketId).toBe('grievance-1');
    expect(result.current.resolutionNote).toBe('Issue fixed');

    await act(async () => {
      await result.current.submitResolution();
    });

    expect(resolveTicket).toHaveBeenCalledWith('grievance-1', 'Issue fixed');
    expect(result.current.resolvingTicketId).toBeNull();
    expect(result.current.resolutionNote).toBe('');
  });

  it('cancels a dirty resolution through the unsaved-change confirmation guard', () => {
    const resolveTicket = vi.fn();
    const { result } = renderHook(() => useManagerGrievanceResolutionResolution({ resolveTicket, isResolving: false }));

    act(() => result.current.startResolution('grievance-2'));
    act(() => result.current.setResolutionNote('Draft note'));
    act(() => result.current.cancelResolution());

    expect(confirmAndClose).toHaveBeenCalled();
    expect(result.current.resolvingTicketId).toBeNull();
    expect(result.current.resolutionNote).toBe('');
  });
});
