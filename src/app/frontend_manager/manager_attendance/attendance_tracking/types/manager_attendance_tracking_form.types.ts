import type { z } from 'zod';

import type { managerAttendanceFormSchema } from '@/app/frontend_manager/manager_attendance/attendance_tracking/schemas/manager_attendance_tracking_form.schemas';


export type AttendanceFormValues = z.infer<typeof managerAttendanceFormSchema>;
/**
 * @description Provides the ManagerAttendanceTrackingFormTypes implementation for the attendance module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceTrackingFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
