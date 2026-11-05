// RESPONSIBILITY: Prop contract for the trainer's monthly attendance calendar.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

export interface TrainerAttendanceMyAttendanceCalendarProps {
  records: TrainerAttendanceRecord[];
}
