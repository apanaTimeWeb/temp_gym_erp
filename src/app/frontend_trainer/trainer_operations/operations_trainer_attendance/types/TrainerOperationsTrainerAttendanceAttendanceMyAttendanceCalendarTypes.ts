// RESPONSIBILITY: Prop contract for the trainer's monthly attendance calendar.
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

export interface TrainerAttendanceMyAttendanceCalendarProps {
  records: TrainerAttendanceRecord[];
}
