import { z } from 'zod';

import { MANAGER_ATTENDANCE_TRACKING_CHECK_IN_METHOD_VALUES, MANAGER_ATTENDANCE_TRACKING_RECORD_TYPE_VALUES, MANAGER_ATTENDANCE_TRACKING_RECORD_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';

/**
 * @description Provides the ManagerAttendanceTrackingSchema implementation for the attendance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const attendanceSchema = z.object({
  id: z.string(),
  memberId: z.number().optional(),
  staffId: z.number().optional(),
  date: z.string().date(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  checkOutTime: z.string().optional(),
  trainerId: z.string().optional(),
  trainerName: z.string().optional(),
  type: z.enum(MANAGER_ATTENDANCE_TRACKING_RECORD_TYPE_VALUES),
  status: z.enum(MANAGER_ATTENDANCE_TRACKING_RECORD_STATUS_VALUES).optional(),
  member: z.object({ name: z.string() }).optional(),
  staff: z.object({ name: z.string() }).optional(),
  durationMinutes: z.number().int().nonnegative().optional(),
  lateMinutes: z.number().int().nonnegative().optional(),
  checkInMethod: z.enum(MANAGER_ATTENDANCE_TRACKING_CHECK_IN_METHOD_VALUES).optional() });

export const attendanceStatsSchema = z.object({
  totalCheckIns: z.number().int().nonnegative(),
  memberCheckIns: z.number().int().nonnegative(),
  staffCheckIns: z.number().int().nonnegative() });

export const attendanceResponseSchema = z.object({
  attendances: z.array(attendanceSchema),
  total: z.number().int().nonnegative() });

export const attendanceHistoryResponseSchema = z.array(attendanceSchema);
