import { z } from 'zod';

import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { MANAGER_ATTENDANCE_TRACKING_RECORD_TYPE_VALUES, MANAGER_ATTENDANCE_TRACKING_RECORD_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';

/**
 * @description Provides the ManagerAttendanceTrackingFormSchema implementation for the attendance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerAttendanceFormSchema = z.object({
  type: z.enum(MANAGER_ATTENDANCE_TRACKING_RECORD_TYPE_VALUES),
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  status: z.enum(MANAGER_ATTENDANCE_TRACKING_RECORD_STATUS_VALUES),
  checkIn: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'MEMBER' && !data.memberId) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Member is required', path: ['memberId'] });
  if (data.type === 'STAFF' && !data.staffId) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Staff is required', path: ['staffId'] });
  if (data.status === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT && (!data.checkIn || data.checkIn.trim() === '')) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Time is required for Present status', path: ['checkIn'] });
  if (data.endDate && new Date(data.endDate) < new Date(data.date)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'End date must be on or after start date', path: ['endDate'] });
});
