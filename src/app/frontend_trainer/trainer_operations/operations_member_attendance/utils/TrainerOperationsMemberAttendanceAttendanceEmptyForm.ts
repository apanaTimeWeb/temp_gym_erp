/**
 * @description Creates the module-owned default values for the trainer attendance form without introducing server-side defaults.
 * @dependencies Trainer attendance record-type constants only.
 * @edge-case Always returns a local-date default and an empty member identifier so RHF can validate the selected record type.
 */
import { TRAINER_ATTENDANCE_RECORD_TYPE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

export function TrainerAttendanceEmptyForm() {
  const now = new Date();
  const localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  return {
    type: TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER,
    memberId: '',
    date: localDate,
    checkIn: '06:00',
    checkOut: '',
    notes: '',
  };
}
