import { ManagerInfrastructureDomainError } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureDomainError';
import { MANAGER_PROFILE_AND_SECURITY_API } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerProfileDataSchema, managerPasswordUpdateResponseSchema } from '@/app/frontend_manager/manager_dashboard/profile_and_security/schemas/manager_profile_and_security.schemas';
import type { ManagerProfileAndSecurityData, UpdateManagerProfileAndSecurityPayload, UpdateManagerPasswordPayload } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';


/**
 * @description Provides the ManagerProfileAndSecurityApi implementation for the profile module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_dashboard/manager_profile_schemas/ManagerProfileAndSecuritySchema; @/app/frontend_manager/manager_dashboard/manager_profile_url_config; @/app/frontend_manager/manager_dashboard/manager_profile_types/ManagerProfileAndSecurityTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerProfileAndSecurityApi = {
  fetchProfile: async (): Promise<ApiResponse<ManagerProfileAndSecurityData>> => { const response = await apiFetch<ManagerProfileAndSecurityData>(MANAGER_PROFILE_AND_SECURITY_API.BASE, { dataSchema: managerProfileDataSchema }); if (!response.success || !response.data) throw new ManagerInfrastructureDomainError(response.message || 'Unable to load profile'); return response; },
  updateProfile: async (body: UpdateManagerProfileAndSecurityPayload, idempotencyKey: string): Promise<ApiResponse<ManagerProfileAndSecurityData>> => { const response = await apiFetch<ManagerProfileAndSecurityData>(MANAGER_PROFILE_AND_SECURITY_API.BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerProfileDataSchema }); if (!response.success || !response.data) throw new ManagerInfrastructureDomainError(response.message || 'Unable to update profile'); return response; },
  updatePassword: async (body: UpdateManagerPasswordPayload, idempotencyKey: string): Promise<ApiResponse<Record<string, unknown>>> => { const response = await apiFetch<Record<string, unknown>>(MANAGER_PROFILE_AND_SECURITY_API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerPasswordUpdateResponseSchema }); if (!response.success || !response.data) throw new ManagerInfrastructureDomainError(response.message || 'Unable to update password'); return response; } };
