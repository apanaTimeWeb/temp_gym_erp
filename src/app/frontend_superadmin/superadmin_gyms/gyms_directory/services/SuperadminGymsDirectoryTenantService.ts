import { mockTenantDb } from '../mocks/SuperadminGymsDirectoryMockTenantDb';
import type {
  Tenant,
  TenantEvent,
  Plan,
  ListParams,
  ListResponse,
  CreateTenantInput,
  UpdateTenantInput,
  ProvisioningStepProgress,
} from '../types/SuperadminGymsDirectoryTenantTypes';

/**
 * Service Layer for Tenants / Gyms
 * Backed by mock server; designed to be easily swapped with real HTTP fetch calls.
 */
export const tenantService = {
  listTenants: (params?: ListParams): Promise<ListResponse<Tenant>> => {
    return mockTenantDb.listTenants(params);
  },

  getTenant: (id: string): Promise<Tenant> => {
    return mockTenantDb.getTenant(id);
  },

  createTenant: (
    payload: CreateTenantInput,
    onProgress?: (step: ProvisioningStepProgress) => void
  ): Promise<Tenant> => {
    return mockTenantDb.createTenant(payload, onProgress);
  },

  updateTenant: (id: string, payload: UpdateTenantInput): Promise<Tenant> => {
    return mockTenantDb.updateTenant(id, payload);
  },

  changeAccessStatus: (
    id: string,
    accessStatus: 'ACTIVE' | 'INACTIVE',
    reason: string,
    note?: string
  ): Promise<Tenant> => {
    return mockTenantDb.changeAccessStatus(id, accessStatus, reason, note);
  },

  getEvents: (tenantId: string, eventType?: string): Promise<TenantEvent[]> => {
    return mockTenantDb.getEvents(tenantId, eventType);
  },

  deleteTenant: (id: string, reason: string, note?: string): Promise<{ success: boolean }> => {
    return mockTenantDb.deleteTenant(id, reason, note);
  },

  checkEmailExists: (email: string): Promise<boolean> => {
    return mockTenantDb.checkEmailExists(email);
  },

  getPlans: (): Promise<Plan[]> => {
    return mockTenantDb.getPlans();
  },
};

export {
  useSafeQueryClient,
  TENANT_QUERY_KEYS,
  useTenants,
  useTenant,
  useTenantEvents,
  usePlans,
  useChangeAccessStatus,
  useUpdateTenant,
  useDeleteTenant,
} from '../hooks/useSuperadminGymsDirectoryTenantQueries';
