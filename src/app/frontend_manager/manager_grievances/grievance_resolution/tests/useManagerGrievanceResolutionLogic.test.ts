import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerGrievanceResolutionLogic } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionLogic';

const createAsync=vi.fn().mockResolvedValue({ success: true }); const resolveAsync=vi.fn().mockResolvedValue({ success: true });
vi.mock('@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionQueries', () => ({ useManagerGrievanceResolutionTickets: vi.fn(() => ({ data: [{ id:'g1', memberName: 'Test', issue: 'Issue' }], isPending: true, isError: false, error: null, refetch: vi.fn() })) }));
vi.mock('@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionMutations', () => ({ useManagerGrievanceResolutionMutations: vi.fn(() => ({ createGrievanceTicket: { mutateAsync: createAsync, isPending: true }, resolveGrievanceTicket: { mutateAsync: resolveAsync, isPending: false } })) }));

describe('useManagerGrievanceResolutionLogic', () => { it('exposes query state and completes create/resolve handlers', async () => { const { result }=renderHook(()=>useManagerGrievanceResolutionLogic()); expect(result.current.isPending).toBe(true); await expect(result.current.createTicket({ memberName:'A', category:'OTHER', issue:'Issue' })).resolves.toBe(true); await expect(result.current.resolveTicket('g1','Done')).resolves.toBe(true); expect(createAsync).toHaveBeenCalled(); expect(resolveAsync).toHaveBeenCalledWith(expect.objectContaining({ id:'g1', resolutionNote:'Done' })); }); });
