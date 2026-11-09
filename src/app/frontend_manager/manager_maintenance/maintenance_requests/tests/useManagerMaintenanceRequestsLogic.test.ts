import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerMaintenanceRequestsLogic } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsLogic';

const createAsync = vi.fn().mockResolvedValue({ success: true });
const resolveAsync = vi.fn().mockResolvedValue({ success: true });

vi.mock('@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsQueries', () => ({
  useManagerMaintenanceRequestsTickets: vi.fn(() => ({ data: [{ id: 'm1' }], isPending: true, isError: false, error: null, refetch: vi.fn() }))
}));
vi.mock('@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsMutations', () => ({
  useManagerMaintenanceRequestsMutations: vi.fn(() => ({
    createMaintenanceTicket: { mutateAsync: createAsync, isPending: true },
    resolveMaintenanceTicket: { mutateAsync: resolveAsync, isPending: false }
  }))
}));

describe('useManagerMaintenanceRequestsLogic', () => {
  it('exposes query state and completes create/resolve handlers', async () => {
    const { result } = renderHook(() => useManagerMaintenanceRequestsLogic());
    expect(result.current.isPending).toBe(true);
    await expect(result.current.createTicket({ title: 'x', equipment: 'y', priority: 'HIGH' })).resolves.toBe(true);
    await expect(result.current.resolveTicket('m1')).resolves.toBe(true);
    expect(createAsync).toHaveBeenCalled();
    expect(resolveAsync).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }));
  });
});
