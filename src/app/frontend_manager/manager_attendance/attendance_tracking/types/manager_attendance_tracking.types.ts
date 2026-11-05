import type { Dispatch, SetStateAction } from 'react';

import type { ManagerToastType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/ManagerAttendanceTrackingLocalToastTypes';

import type { AttendanceFormValues } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_form.types';
import type { MemberSnapshot, StaffSnapshot } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking_snapshot.types';



export type ManagerAttendanceTrackingPersonType = 'MEMBER' | 'STAFF';

// CRITICAL — DB column needed for analytics
export type CheckInMethod = 'QR' | 'Manual' | 'Biometric';

export interface Attendance {
  id: string;
  memberId?: number;
  staffId?: number;
  date: string;
  checkIn?: string;
  checkOut?: string;
  checkOutTime?: string;
  trainerId?: string;
  trainerName?: string;
  type: string;
  status?: string;
  member?: { name: string };
  staff?: { name: string };
  // CRITICAL — time-tracking analytics fields (DB columns)
  durationMinutes?: number;
  lateMinutes?: number;
  checkInMethod?: CheckInMethod;
}

export interface AttendanceStatsResponse {
  totalCheckIns: number;
  memberCheckIns: number;
  staffCheckIns: number;
}

export interface AttendanceResponse {
  attendance?: Attendance[];
  attendances?: Attendance[];
  total: number;
}

export interface ManagerAttendanceTrackingViewModel {
  records: Attendance[];
  todayStats: AttendanceStatsResponse;
  members: MemberSnapshot[];
  staff: StaffSnapshot[];
  totalRecords: number;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  toast: { message: string; type: ManagerToastType } | null;

  tab: AttendanceTab;
  setTab: (t: AttendanceTab) => void;

  search: string;
  setSearch: (s: string) => void;
  dateFilter: string;
  setDateFilter: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showModal: boolean;
  setShowModal: (show: boolean) => void;

  calendarUser: { id: string; name: string; type: ManagerAttendanceTrackingPersonType } | null;
  setCalendarUser: (user: { id: string; name: string; type: ManagerAttendanceTrackingPersonType } | null) => void;

  form: AttendanceFormValues;
  setForm: Dispatch<SetStateAction<AttendanceFormValues>>;

  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

  loadAll: () => Promise<void>;
  markAttendance: (data: AttendanceFormValues) => Promise<void>;
  exportAttendance: () => void;
}

export type AttendanceTab = 'Member Attendance' | 'Trainer Attendance' | 'Staff Attendance' | 'Daily Attendance Report';
export type ManagerAttendanceTrackingViewId = 'attendance' | 'qr-scanner';
