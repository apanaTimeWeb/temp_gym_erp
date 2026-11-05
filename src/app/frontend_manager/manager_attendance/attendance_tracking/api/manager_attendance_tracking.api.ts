import { MANAGER_ATTENDANCE_TRACKING_API } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { attendanceSchema, attendanceResponseSchema, attendanceStatsSchema, attendanceHistoryResponseSchema } from '@/app/frontend_manager/manager_attendance/attendance_tracking/schemas/manager_attendance_tracking.schemas';
import { managerAttendanceMemberSnapshotResponseSchema, managerAttendanceStaffSnapshotResponseSchema } from '@/app/frontend_manager/manager_attendance/attendance_tracking/schemas/manager_attendance_tracking_snapshot.schemas';
import type { ManagerMarkAttendanceRequest } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_request.types';
import type { MemberSnapshot, StaffSnapshot } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types';
import type { Attendance, AttendanceResponse, AttendanceStatsResponse, ManagerAttendanceTrackingPersonType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';


/**
 * @description Provides the ManagerAttendanceTrackingApi implementation for the attendance module.
 * @dependencies @/lib/api; attendance_tracking schemas, snapshot schemas, URL config, request types, and approved infrastructure.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerAttendanceTrackingApi = {
  markAttendance: async (body: ManagerMarkAttendanceRequest, idempotencyKey: string): Promise<ApiResponse<Attendance>> => {
    const serializedBody = { ...body, ...(body.checkIn instanceof Date ? { checkIn: body.checkIn.toISOString() } : {}) };
    return apiFetch(MANAGER_ATTENDANCE_TRACKING_API.BASE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: attendanceSchema });
  },
  fetchAttendanceRecords: async (params?: Record<string, string>): Promise<ApiResponse<AttendanceResponse>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_ATTENDANCE_TRACKING_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: attendanceResponseSchema });
  },
  fetchAttendanceStats: async (): Promise<ApiResponse<AttendanceStatsResponse>> => {
    return apiFetch(MANAGER_ATTENDANCE_TRACKING_API.STATS, { dataSchema: attendanceStatsSchema });
  },
  fetchAttendanceHistory: async (userId: string, type: ManagerAttendanceTrackingPersonType, month: string): Promise<ApiResponse<Attendance[]>> => {
    const query = new URLSearchParams({ userId, type, month }).toString();
    return apiFetch(`${MANAGER_ATTENDANCE_TRACKING_API.HISTORY}?${query}`, { dataSchema: attendanceHistoryResponseSchema });
  },
  fetchAttendanceMembers: async (params?: Record<string, string>): Promise<ApiResponse<{ members: MemberSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_ATTENDANCE_TRACKING_API.MEMBERS}${query ? `?${query}` : ''}`, { dataSchema: managerAttendanceMemberSnapshotResponseSchema });
  },
  fetchAttendanceStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: StaffSnapshot[] }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_ATTENDANCE_TRACKING_API.STAFF}${query ? `?${query}` : ''}`, { dataSchema: managerAttendanceStaffSnapshotResponseSchema });
  } };
