import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionQueries';

const queryConfigs: unknown[] = [];
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn((config: unknown) => { queryConfigs.push(config); return { data: [], isPending: false, isError: false, error: null, refetch: vi.fn() }; }) }));
vi.mock('@/app/frontend_manager/manager_grievances/manager_grievance_api/ManagerGrievanceResolutionApi', () => ({ ManagerGrievanceResolutionApi: { fetchGrievanceTickets: vi.fn() } }));
describe('useManagerGrievanceResolutionQueries', () => { it('registers the owning list query', () => { const { result } = renderHook(() => moduleUnderTest.useManagerGrievanceResolutionTickets()); expect(result.current.data).toEqual([]); expect(queryConfigs).toHaveLength(1); expect((queryConfigs[0] as { queryKey: readonly string[] }).queryKey).toEqual(['manager_grievance','list']); }); });
