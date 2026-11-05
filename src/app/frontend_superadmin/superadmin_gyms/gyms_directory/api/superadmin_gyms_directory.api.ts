import { z } from 'zod';

import { apiFetch } from '@/lib/api';

import { SUPERADMIN_GYMS_DIRECTORY_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import {
  SuperadminGymsEmptyResponseSchema,
  SuperadminGymsDownloadResponseSchema,
  SuperadminGymsImpersonateTokenSchema,
  SuperadminGymsNullResponseSchema,
} from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_api.schemas';
import { GymStatsSchema, TenantSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_contract.schemas';
import { SuperadminGymsPlanOptionSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory_plan_contract.schemas';

import type { SuperadminGymsPlanOption } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_plan.types';
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';


/** All Gym business HTTP operations use the approved global transport and this module's URL contract. */
export const gymsApi = {
  fetchGyms: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<Tenant[]>(`${SUPERADMIN_GYMS_MANAGEMENT_API.BASE}${query}`, { dataSchema: z.array(TenantSchema) });
  },
  fetchGymById: (gymId: string) => apiFetch<Tenant>(SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId), { dataSchema: TenantSchema }),
  fetchSubscriptionPlans: () => apiFetch<SuperadminGymsPlanOption[]>(SUPERADMIN_GYMS_MANAGEMENT_API.SUBSCRIPTION_PLANS, { dataSchema: z.array(SuperadminGymsPlanOptionSchema) }),
  fetchGymStats: () => apiFetch<z.infer<typeof GymStatsSchema>>(SUPERADMIN_GYMS_MANAGEMENT_API.STATS, { dataSchema: GymStatsSchema }),
  createGym: (body: Partial<Tenant>, idempotencyKey: string) => apiFetch<Tenant>(SUPERADMIN_GYMS_MANAGEMENT_API.BASE, {
    method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: TenantSchema,
  }),
  updateGym: (gymId: string, body: Partial<Tenant>, idempotencyKey: string) => apiFetch<Tenant>(SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId), {
    method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: TenantSchema,
  }),
  updateGymStatus: (gymId: string, status: Tenant['status'], idempotencyKey: string) => apiFetch<Tenant>(SUPERADMIN_GYMS_MANAGEMENT_API.STATUS(gymId), {
    method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: TenantSchema,
  }),
  impersonateTenant: (gymId: string, idempotencyKey: string) => apiFetch<{ token: string }>(SUPERADMIN_GYMS_MANAGEMENT_API.IMPERSONATE_GYM(gymId), {
    method: 'POST', dataSchema: SuperadminGymsImpersonateTokenSchema, headers: { 'Idempotency-Key': idempotencyKey },
  }),
  deleteGym: (gymId: string, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_GYMS_MANAGEMENT_API.BY_ID(gymId), {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: SuperadminGymsEmptyResponseSchema,
  }),
  emailGymOwner: (gymId: string, body: { subject: string; message: string; [key: string]: unknown }, idempotencyKey: string) => apiFetch<void>(SUPERADMIN_GYMS_MANAGEMENT_API.EMAIL_OWNER(gymId), {
    method: 'POST', body: JSON.stringify(body), dataSchema: SuperadminGymsEmptyResponseSchema, headers: { 'Idempotency-Key': idempotencyKey },
  }),
  exportGymsReport: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiFetch<{ downloadUrl: string }>(`${SUPERADMIN_GYMS_MANAGEMENT_API.EXPORT}${query}`, { dataSchema: SuperadminGymsDownloadResponseSchema });
  },
  provisionGym: (body: Record<string, unknown>, idempotencyKey: string) => apiFetch<Tenant>(SUPERADMIN_GYMS_MANAGEMENT_API.PROVISION, {
    method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: TenantSchema,
  }),
  exitGhostLogin: (idempotencyKey: string) => apiFetch<null>(SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY, {
    method: 'POST', dataSchema: SuperadminGymsNullResponseSchema, headers: { 'Idempotency-Key': idempotencyKey },
  }),
  setGhostLoginCookie: (token: string, idempotencyKey: string) => apiFetch<null>(SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.SET_COOKIE_PROXY, {
    method: 'POST', body: JSON.stringify({ token }), dataSchema: SuperadminGymsNullResponseSchema, headers: { 'Idempotency-Key': idempotencyKey },
  }),
};
