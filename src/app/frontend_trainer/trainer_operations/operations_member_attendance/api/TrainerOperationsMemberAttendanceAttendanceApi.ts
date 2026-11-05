import { z } from 'zod';

import { apiFetch } from '@/lib/api';

import { TRAINER_ATTENDANCE_HISTORY_PAGE_SIZE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import { TrainerAttendanceMemberBasicSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceDomainSchemas';

import { TrainerAttendanceRecordSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceDomainSchemas';

import { TrainerAttendanceStatsSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceDomainSchemas';

import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceTrainerInfrastructureApiResponseSchema';

import type { TrainerAttendanceFetchParams } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceInteractionTypes';

import type { TrainerAttendanceListResult } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceListResult';

import type {
  TrainerAttendanceRecord,
  TrainerAttendanceStats,
  TrainerAttendanceMemberBasic,
  TrainerAttendanceCreateDto,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

import type { ApiResponse } from '@/lib/api';

/**
 * @description Owns fetchTrainerAttendanceRecords behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerAttendanceRecords(params: TrainerAttendanceFetchParams): Promise<TrainerAttendanceListResult> {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) queryParams.set(key, String(value));
  });
  const q = queryParams.toString();
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_ATTENDANCE_URLS.API.BASE}?${q}`);
  const response = TrainerInfrastructureApiResponseSchema(z.object({ attendance: z.array(TrainerAttendanceRecordSchema), total: z.number(), page: z.number(), limit: z.number() })).parse(raw);
  if (!response.data) throw new Error(response.message);
  if (response.data.page !== params.page || response.data.limit !== params.limit) {
    throw new Error('Attendance returned unexpected pagination metadata. Refresh and retry.');
  }
  return { records: response.data.attendance, total: response.data.total, page: response.data.page, limit: response.data.limit };
}

/**
 * @description Owns fetchTrainerAttendanceStats behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * Fetches all pages for an authoritative trainer-scoped history view.
 * Uses only the existing page/limit/total API contract; it does not invent a calendar endpoint.
 */
export async function fetchAllTrainerAttendanceRecords(
  params: Omit<TrainerAttendanceFetchParams, 'page' | 'limit'>,
): Promise<TrainerAttendanceRecord[]> {
  const pageSize = TRAINER_ATTENDANCE_HISTORY_PAGE_SIZE;
  const collected: TrainerAttendanceRecord[] = [];
  let expectedTotal: number | undefined;
  let page = 1;

  while (expectedTotal === undefined || collected.length < expectedTotal) {
    const pageResult = await fetchTrainerAttendanceRecords({ ...params, page, limit: pageSize, sortBy: 'date', sortDirection: 'asc' });
    if (!Number.isInteger(pageResult.total) || pageResult.total < 0) {
      throw new Error('The attendance history response contains an invalid total.');
    }
    if (pageResult.page !== page || pageResult.limit !== pageSize) {
      throw new Error('Attendance history returned unexpected pagination metadata. Refresh and retry.');
    }
    if (expectedTotal !== undefined && pageResult.total !== expectedTotal) {
      throw new Error('Attendance history changed while it was loading. Refresh and retry.');
    }
    expectedTotal = pageResult.total;
    if (pageResult.records.length > pageSize) {
      throw new Error('The attendance history response exceeded the requested page size.');
    }
    collected.push(...pageResult.records);
    if (expectedTotal === 0 || collected.length >= expectedTotal) break;
    if (pageResult.records.length === 0 || pageResult.records.length < pageSize) {
      throw new Error('The attendance history response ended before all records were loaded.');
    }
    page += 1;
  }

  const uniqueRecords = [...new Map(collected.map((record) => [record.id, record])).values()];
  if (expectedTotal === undefined || uniqueRecords.length !== expectedTotal || collected.length !== expectedTotal) {
    throw new Error('Attendance history was incomplete or changed while it was loading. Refresh and retry.');
  }
  return uniqueRecords;
}

export async function fetchTrainerAttendanceStats(date?: string): Promise<TrainerAttendanceStats> {
  const url = date && date !== 'ALL_TIME' ? `${TRAINER_ATTENDANCE_URLS.API.STATS}?date=${encodeURIComponent(date)}` : TRAINER_ATTENDANCE_URLS.API.STATS;
  const raw = await apiFetch<ApiResponse<unknown>>(url);
  const response = TrainerInfrastructureApiResponseSchema(TrainerAttendanceStatsSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

/**
 * @description Owns fetchTrainerAttendanceMembersBasic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function fetchTrainerAttendanceMembersBasic(): Promise<TrainerAttendanceMemberBasic[]> {
  const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_ATTENDANCE_URLS.API.MEMBERS_BASIC);
  const response = TrainerInfrastructureApiResponseSchema(z.array(TrainerAttendanceMemberBasicSchema)).parse(raw);
  if (!response.data) throw new Error(response.message);
  return response.data;
}

/**
 * @description Owns createTrainerAttendanceRecord behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function createTrainerAttendanceRecord(dto: TrainerAttendanceCreateDto, idempotencyKey: string): Promise<{ data: TrainerAttendanceRecord; message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
    method: 'POST',
    body: JSON.stringify(dto),
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(TrainerAttendanceRecordSchema).parse(raw);
  if (!response.data) throw new Error(response.message);
  return { data: response.data, message: response.message };
}

/**
 * @description Owns checkOutTrainerAttendance behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function checkOutTrainerAttendance(staffId: string, checkOutTime: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_ATTENDANCE_URLS.API.CHECKOUT(staffId)}`, {
    method: 'POST',
    body: JSON.stringify({ checkOutTime }),
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

/**
 * @description Owns selfCheckInTrainerAttendance behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export async function selfCheckInTrainerAttendance(staffId: string, idempotencyKey: string): Promise<{ message: string }> {
  const raw = await apiFetch<ApiResponse<unknown>>(`${TRAINER_ATTENDANCE_URLS.API.BASE}`, {
    method: 'POST',
    body: JSON.stringify({ staffId, isSelfCheckIn: true }),
    headers: { 'Idempotency-Key': idempotencyKey },
  });
  const response = TrainerInfrastructureApiResponseSchema(z.null()).parse(raw);
  return { message: response.message };
}

