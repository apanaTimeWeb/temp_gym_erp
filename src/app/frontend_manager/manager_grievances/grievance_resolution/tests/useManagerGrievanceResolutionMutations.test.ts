import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerGrievanceResolutionMutations } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionMutations';

const mutations: unknown[] = [];
vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn((config: unknown) => { mutations.push(config); return { mutateAsync: vi.fn().mockResolvedValue({ success: true, message: 'ok', data: { id: 'g1' } }), isPending: false }; }), useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })) }));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast', () => ({ ManagerInfrastructureShowSuccessToast: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast', () => ({ ManagerInfrastructureShowErrorToast: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_grievances/manager_grievance_api/ManagerGrievanceResolutionApi', () => ({ ManagerGrievanceResolutionApi: { createGrievanceTicket: vi.fn(), resolveGrievanceTicket: vi.fn() } }));

describe('useManagerGrievanceResolutionMutations', () => { it('registers create and resolve mutations', () => { const { result } = renderHook(() => useManagerGrievanceResolutionMutations()); expect(result.current.createGrievanceTicket).toBeDefined(); expect(result.current.resolveGrievanceTicket).toBeDefined(); expect(mutations).toHaveLength(2); }); });
