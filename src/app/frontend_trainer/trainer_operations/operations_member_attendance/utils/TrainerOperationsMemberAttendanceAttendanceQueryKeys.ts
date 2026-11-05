// RESPONSIBILITY: Canonical TanStack Query key registry for Trainer Attendance server state.
import type { TrainerAttendanceQueryParams } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceQueryTypes';
export const TRAINER_ATTENDANCE_QUERY_KEYS = {
  all: ['trainer_attendance'] as const,
  recordsAll: () => [...TRAINER_ATTENDANCE_QUERY_KEYS.all, 'records'] as const,
  records: (params: TrainerAttendanceQueryParams) => [...TRAINER_ATTENDANCE_QUERY_KEYS.recordsAll(), params] as const,
  stats: () => [...TRAINER_ATTENDANCE_QUERY_KEYS.all, 'stats'] as const,
  myHistoryAll: () => [...TRAINER_ATTENDANCE_QUERY_KEYS.all, 'my-history'] as const,
  myHistory: (staffId: string) => [...TRAINER_ATTENDANCE_QUERY_KEYS.myHistoryAll(), staffId] as const,
  members: () => [...TRAINER_ATTENDANCE_QUERY_KEYS.all, 'members'] as const,
} as const;
