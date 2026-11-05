import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerMaintenanceRequestsTickets } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsQueries';

const queryConfigs: unknown[]=[];
vi.mock('@tanstack/react-query',()=>({useQuery:vi.fn((config:unknown)=>{queryConfigs.push(config);return{data:[],isPending:false,isError:false,error:null,refetch:vi.fn()};})}));
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceRequestsApi',()=>({ManagerMaintenanceRequestsApi:{fetchMaintenanceIssues:vi.fn()}}));

describe('useManagerMaintenanceRequestsQueries',()=>{it('registers the owning maintenance list query',()=>{const {result}=renderHook(()=>useManagerMaintenanceRequestsTickets());expect(result.current.data).toEqual([]);expect((queryConfigs[0] as {queryKey:readonly string[]}).queryKey).toEqual(['manager_maintenance','list']);});});
