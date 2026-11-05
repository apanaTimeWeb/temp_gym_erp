// RESPONSIBILITY: Defines Trainer Attendance type contracts for URL state, sorting, and calendar rendering.
import { TRAINER_ATTENDANCE_RECORD_TYPES, TRAINER_ATTENDANCE_VIEW_MODES, TRAINER_ATTENDANCE_CALENDAR_STATUSES, TRAINER_ATTENDANCE_SORT_FIELDS, TRAINER_ATTENDANCE_SORT_DIRECTIONS, TRAINER_ATTENDANCE_TABS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';
export type TrainerAttendanceRecordType = (typeof TRAINER_ATTENDANCE_RECORD_TYPES)[number];
export type TrainerAttendanceViewMode = (typeof TRAINER_ATTENDANCE_VIEW_MODES)[number];
export type TrainerAttendanceCalendarStatus = (typeof TRAINER_ATTENDANCE_CALENDAR_STATUSES)[number];
export type TrainerAttendanceSortField = (typeof TRAINER_ATTENDANCE_SORT_FIELDS)[number];
export type TrainerAttendanceSortDirection = (typeof TRAINER_ATTENDANCE_SORT_DIRECTIONS)[number];
export type TrainerAttendanceTab = (typeof TRAINER_ATTENDANCE_TABS)[number];
export interface TrainerAttendanceCalendarCell { in?: string; out?: string; status: TrainerAttendanceCalendarStatus; }
export interface TrainerAttendanceCalendarDay {
  day: number;
  status: TrainerAttendanceCalendarStatus;
  checkIn?: string;
  checkOut?: string;
  isToday: boolean;
  isPastOrToday: boolean;
}

export interface TrainerAttendanceFetchParams { page?: number; limit?: number; search?: string; date?: string; type?: TrainerAttendanceRecordType; staffId?: string; sortBy?: TrainerAttendanceSortField; sortDirection?: TrainerAttendanceSortDirection; }
export interface TrainerAttendanceRecordsQueryParams { tab: TrainerAttendanceTab; search: string; filterDate: string; currentPage: number; sortBy: TrainerAttendanceSortField; sortDirection: TrainerAttendanceSortDirection; }
