import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { SUPERADMIN_GYMS_DETAIL_API as SUPERADMIN_GYMS_MANAGEMENT_API } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/config/superadmin_gyms_detail.url_config';

/** Feature-local tenant impersonation API; each user intent supplies its own idempotency key. */
export const gymsApi = {
  impersonateTenant: (gymId: string, idempotencyKey: string) => apiFetch<{ token: string }>(
    SUPERADMIN_GYMS_MANAGEMENT_API.IMPERSONATE_GYM(gymId),
    { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ token: z.string().min(1) }) },
  ),
  setGhostLoginCookie: (token: string, idempotencyKey: string) => apiFetch<null>(
    SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.SET_COOKIE_PROXY,
    { method: 'POST', body: JSON.stringify({ token }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() },
  ),
  exitGhostLogin: (idempotencyKey: string) => apiFetch<null>(
    SUPERADMIN_GYMS_MANAGEMENT_API.GHOST_LOGIN.EXIT_GHOST_LOGIN_PROXY,
    { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() },
  ),
};
