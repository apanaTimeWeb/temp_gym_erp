// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import type { AttendanceFormValues } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_form.types';

export const EMPTY_ATTENDANCE_FORM: AttendanceFormValues = {
  type: 'MEMBER', memberId: '', staffId: '', date: new Date().toISOString().split('T')[0] || '', endDate: '', status: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT, checkIn: '06:00',
};
