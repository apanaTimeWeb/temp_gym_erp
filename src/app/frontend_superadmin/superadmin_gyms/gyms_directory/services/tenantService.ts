import { QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockTenantDb } from '../mocks/mockTenantDb';
import type {
  Tenant,
  TenantEvent,
  Plan,
  ListParams,
  ListResponse,
  CreateTenantInput,
  UpdateTenantInput,
  ProvisioningStepProgress,
} from '../types/tenant';

const fallbackQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export function useSafeQueryClient(): QueryClient {
  try {
    return useQueryClient();
  } catch {
    return fallbackQueryClient;
  }
}

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

/**
 * TanStack Query hooks for consuming tenant services
 */
export const TENANT_QUERY_KEYS = {
  all: ['tenants'] as const,
  lists: () => [...TENANT_QUERY_KEYS.all, 'list'] as const,
  list: (params?: ListParams) => [...TENANT_QUERY_KEYS.lists(), params] as const,
  details: () => [...TENANT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TENANT_QUERY_KEYS.details(), id] as const,
  events: (id: string, eventType?: string) => [...TENANT_QUERY_KEYS.detail(id), 'events', eventType] as const,
  plans: () => ['plans'] as const,
};

export function useTenants(params?: ListParams) {
  const queryClient = useSafeQueryClient();
  return useQuery(
    {
      queryKey: TENANT_QUERY_KEYS.list(params),
      queryFn: () => tenantService.listTenants(params),
    },
    queryClient
  );
}

export function useTenant(id?: string) {
  const queryClient = useSafeQueryClient();
  return useQuery(
    {
      queryKey: TENANT_QUERY_KEYS.detail(id || ''),
      queryFn: () => (id ? tenantService.getTenant(id) : Promise.reject(new Error('Missing id'))),
      enabled: Boolean(id),
    },
    queryClient
  );
}

export function useTenantEvents(tenantId?: string, eventType?: string) {
  const queryClient = useSafeQueryClient();
  return useQuery(
    {
      queryKey: TENANT_QUERY_KEYS.events(tenantId || '', eventType),
      queryFn: () => (tenantId ? tenantService.getEvents(tenantId, eventType) : Promise.resolve([])),
      enabled: Boolean(tenantId),
    },
    queryClient
  );
}

export function usePlans() {
  const queryClient = useSafeQueryClient();
  return useQuery(
    {
      queryKey: TENANT_QUERY_KEYS.plans(),
      queryFn: () => tenantService.getPlans(),
      staleTime: 1000 * 60 * 10, // 10 minutes cache
    },
    queryClient
  );
}

export function useChangeAccessStatus() {
  const queryClient = useSafeQueryClient();
  return useMutation(
    {
      mutationFn: ({
        id,
        accessStatus,
        reason,
        note,
      }: {
        id: string;
        accessStatus: 'ACTIVE' | 'INACTIVE';
        reason: string;
        note?: string;
      }) => tenantService.changeAccessStatus(id, accessStatus, reason, note),
      onSuccess: (updated) => {
        queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.lists() });
        queryClient.setQueryData(TENANT_QUERY_KEYS.detail(updated.id), updated);
        queryClient.invalidateQueries({ queryKey: [...TENANT_QUERY_KEYS.detail(updated.id), 'events'] });
      },
    },
    queryClient
  );
}

export function useUpdateTenant() {
  const queryClient = useSafeQueryClient();
  return useMutation(
    {
      mutationFn: ({ id, payload }: { id: string; payload: UpdateTenantInput }) =>
        tenantService.updateTenant(id, payload),
      onSuccess: (updated) => {
        queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.lists() });
        queryClient.setQueryData(TENANT_QUERY_KEYS.detail(updated.id), updated);
        queryClient.invalidateQueries({ queryKey: [...TENANT_QUERY_KEYS.detail(updated.id), 'events'] });
      },
    },
    queryClient
  );
}

export function useDeleteTenant() {
  const queryClient = useSafeQueryClient();
  return useMutation(
    {
      mutationFn: ({ id, reason, note }: { id: string; reason: string; note?: string }) =>
        tenantService.deleteTenant(id, reason, note),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: TENANT_QUERY_KEYS.lists() });
      },
    },
    queryClient
  );
}
