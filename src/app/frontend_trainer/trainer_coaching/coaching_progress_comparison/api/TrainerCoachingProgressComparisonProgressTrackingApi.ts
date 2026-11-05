import { z } from 'zod';

import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/schemas/TrainerCoachingProgressComparisonTrainerInfrastructureApiResponseSchema';

import { TrainerProgressTrackingProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/schemas/TrainerCoachingProgressComparisonProgressTrackingDomainSchemas';

import { TrainerProgressTrackingProgressMemberBasicSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/schemas/TrainerCoachingProgressComparisonProgressTrackingDomainSchemas';

import { TrainerProgressTrackingProgressSummarySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/schemas/TrainerCoachingProgressComparisonProgressTrackingDomainSchemas';

import { TrainerProgressTrackingEntriesResponseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/schemas/TrainerCoachingProgressComparisonProgressTrackingEntriesResponseSchema';

import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/config/trainer_coaching_progress_comparison.url_config';

import type { TrainerProgressTrackingEntriesResponse } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingEntriesResponse';

import type { TrainerProgressTrackingEntriesQueryParams } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingQueryTypes';

import type { 
  TrainerProgressTrackingProgressEntry, 
  TrainerProgressTrackingProgressSummary, 
  TrainerProgressTrackingCreateProgressEntryDto, 
  TrainerProgressTrackingProgressMemberBasic,
} from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

import type { ApiResponse } from '@/lib/api';

class TrainerProgressComparisonApiError extends Error {
  constructor(message: string, readonly errorCode: string, readonly statusCode: number) {
    super(message);
    this.name = 'TrainerProgressComparisonApiError';
  }
}

/**
 * @description Owns fetchTrainerProgressTrackingProgressMembers behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerProgressTrackingProgressMembers(): Promise<TrainerProgressTrackingProgressMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROGRESS_TRACKING_URLS.API.MEMBERS);
  const response = TrainerInfrastructureApiResponseSchema(z.array(TrainerProgressTrackingProgressMemberBasicSchema)).parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return z.array(TrainerProgressTrackingProgressMemberBasicSchema).parse(response.data);
}

/**
 * @description Owns fetchTrainerProgressTrackingProgressEntries behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerProgressTrackingProgressEntries({ memberId, page, limit, sortBy, sortDirection }: TrainerProgressTrackingEntriesQueryParams): Promise<TrainerProgressTrackingEntriesResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit), sortBy, sortDirection });
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(memberId)}?${params.toString()}`);
  const schema = TrainerInfrastructureApiResponseSchema(TrainerProgressTrackingEntriesResponseSchema);
  const response = schema.parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return { entries: response.data.entries, total: response.data.total, page: response.data.page, limit: response.data.limit };
}

/**
 * @description Owns fetchTrainerProgressTrackingProgressSummary behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerProgressTrackingProgressSummary(memberId: string): Promise<TrainerProgressTrackingProgressSummary> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROGRESS_TRACKING_URLS.API.SUMMARY(memberId));
  const response = TrainerInfrastructureApiResponseSchema(TrainerProgressTrackingProgressSummarySchema).parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return TrainerProgressTrackingProgressSummarySchema.parse(response.data);
}

/**
 * @description Owns createTrainerProgressTrackingProgressEntry behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function createTrainerProgressTrackingProgressEntry(memberId: string, dto: TrainerProgressTrackingCreateProgressEntryDto, idempotencyKey: string): Promise<{ data: TrainerProgressTrackingProgressEntry; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROGRESS_TRACKING_URLS.API.ENTRIES(memberId), {
    method: 'POST',
    body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(TrainerProgressTrackingProgressEntrySchema).parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return { data: response.data, message: response.message };
}

/**
 * @description Owns updateTrainerProgressTrackingProgressEntry behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function updateTrainerProgressTrackingProgressEntry(memberId: string, entryId: string, dto: Partial<TrainerProgressTrackingCreateProgressEntryDto>, idempotencyKey: string): Promise<{ data: TrainerProgressTrackingProgressEntry; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(memberId, entryId), {
    method: 'PATCH',
    body: JSON.stringify(dto), headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(TrainerProgressTrackingProgressEntrySchema).parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return { data: response.data, message: response.message };
}

/**
 * @description Owns deleteTrainerProgressTrackingProgressEntry behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function deleteTrainerProgressTrackingProgressEntry(memberId: string, entryId: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROGRESS_TRACKING_URLS.API.ENTRY_DETAIL(memberId, entryId), {
    method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }
});
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  if (!response.success) throw new TrainerProgressComparisonApiError(response.message, response.errorCode, response.statusCode);
  return { message: response.message };
}
