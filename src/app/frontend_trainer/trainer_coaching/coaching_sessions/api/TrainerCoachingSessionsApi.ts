import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsTrainerInfrastructureApiResponseSchema';
import { TRAINER_SESSIONS_ALL_SESSION_FILTER } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { TrainerSessionsTrainerSessionSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/schemas/TrainerCoachingSessionsDomainSchemas';
import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';
import type { TrainerSessionsTrainerSession, TrainerSessionsTrainerSessionMember, TrainerSessionsCreateSessionDto, TrainerSessionsSessionFilter } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';
import type { ApiResponse } from '@/lib/api';

class TrainerSessionsApiError extends Error {
  constructor(message: string, readonly errorCode: string, readonly statusCode: number) {
    super(message);
    this.name = 'TrainerSessionsApiError';
  }
}

/**
 * @description Fetches session members using the canonical Sessions response envelope.
 * @dependencies Module-owned URL config, response schema and domain schemas.
 * @edge-case Preserves server error identity instead of parsing a failure's null data as a domain list.
 */
export async function fetchTrainerSessionsTrainerSessionMembers(): Promise<TrainerSessionsTrainerSessionMember[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MEMBERS);
  const response = TrainerInfrastructureApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string() }))).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return z.array(z.object({ id: z.string(), name: z.string() })).parse(response.data);
}

/** @description Fetches filtered sessions and preserves canonical API failures for query retry UI. */
export async function fetchTrainerSessions(date: string, filter: TrainerSessionsSessionFilter = TRAINER_SESSIONS_ALL_SESSION_FILTER): Promise<TrainerSessionsTrainerSession[]> {
  const params = new URLSearchParams({ date });
  if (filter !== TRAINER_SESSIONS_ALL_SESSION_FILTER) params.set('filter', filter);
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_SESSIONS_URLS.API.LIST}?${params.toString()}`);
  const response = TrainerInfrastructureApiResponseSchema(z.array(TrainerSessionsTrainerSessionSchema)).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return z.array(TrainerSessionsTrainerSessionSchema).parse(response.data);
}

/** @description Creates a session; only a successful envelope returns domain data. */
export async function createTrainerSessionsTrainerSession(dto: TrainerSessionsCreateSessionDto, idempotencyKey: string): Promise<{ data: TrainerSessionsTrainerSession; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.CREATE, {
    method: 'POST', body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(TrainerSessionsTrainerSessionSchema).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return { data: response.data, message: response.message };
}

/** @description Updates a session; only a successful envelope returns domain data. */
export async function updateTrainerSessionsTrainerSession(id: string, dto: Partial<TrainerSessionsCreateSessionDto>, idempotencyKey: string): Promise<{ data: TrainerSessionsTrainerSession; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.UPDATE(id), {
    method: 'PATCH', body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(TrainerSessionsTrainerSessionSchema).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return { data: response.data, message: response.message };
}

/** @description Cancels a session and rejects a valid unsuccessful envelope. */
export async function cancelTrainerSessionsTrainerSession(id: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.CANCEL(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey } });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return { message: response.message };
}

/** @description Marks a session no-show and rejects a valid unsuccessful envelope. */
export async function markTrainerSessionsTrainerSessionNoShow(id: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MARK_NO_SHOW(id), { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey } });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return { message: response.message };
}

/** @description Marks attendance and rejects a valid unsuccessful envelope. */
export async function markTrainerSessionsTrainerSessionAttendance(id: string, memberIds: string[], idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_SESSIONS_URLS.API.MARK_ATTENDANCE(id), { method: 'POST', body: JSON.stringify({ memberIds }), headers: { 'Idempotency-Key': idempotencyKey } });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  if (!response.success) throw new TrainerSessionsApiError(response.message, response.errorCode, response.statusCode);
  return { message: response.message };
}
