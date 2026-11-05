import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerMaintenanceRequestsLogic } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsLogic';

const createAsync=vi.fn().mockResolvedValue({}); const resolveAsync=vi.fn().mockResolvedValue({});
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceRequestsQueries',()=>({useManagerMaintenanceRequestsTickets:vi.fn(()=>({data:[{id:'m1'}],isPending:true,isError:false,error:null,refetch:vi.fn()}))}));
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceRequestsMutations',()=>({useManagerMaintenanceRequestsMutations:vi.fn(()=>({createTicket:{mutateAsync:createAsync,isPending:true},resolveTicket:{mutateAsync:resolveAsync,isPending:false}}))}));

describe('useManagerMaintenanceRequestsLogic',()=>{it('exposes query state and completes create/resolve handlers',async()=>{const{result}=renderHook(()=>useManagerMaintenanceRequestsLogic());expect(result.current.isPending).toBe(true);await expect(result.current.createTicket({title:'x',equipment:'y',priority:'HIGH'})).resolves.toBe(true);await expect(result.current.resolveTicket('m1')).resolves.toBe(true);expect(createAsync).toHaveBeenCalled();expect(resolveAsync).toHaveBeenCalledWith('m1');});});
