import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerMaintenanceRequestsMutations } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/hooks/useManagerMaintenanceRequestsMutations';

const mutations: unknown[]=[];
vi.mock('@tanstack/react-query',()=>({useMutation:vi.fn((config:unknown)=>{mutations.push(config);return{mutateAsync:vi.fn().mockResolvedValue({success:true,message:'ok',data:{id:'m1'}}),isPending:false};}),useQueryClient:vi.fn(()=>({invalidateQueries:vi.fn()}))}));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast', () => ({ ManagerInfrastructureShowSuccessToast: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast', () => ({ ManagerInfrastructureShowErrorToast: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceRequestsApi',()=>({ManagerMaintenanceRequestsApi:{createMaintenanceTicket:vi.fn(),resolveMaintenanceTicket:vi.fn()}}));

describe('useManagerMaintenanceRequestsMutations',()=>{it('registers create and resolve mutations',()=>{const{result}=renderHook(()=>useManagerMaintenanceRequestsMutations());expect(result.current.createMaintenanceTicket).toBeDefined();expect(result.current.resolveMaintenanceTicket).toBeDefined();expect(mutations).toHaveLength(2);});});
