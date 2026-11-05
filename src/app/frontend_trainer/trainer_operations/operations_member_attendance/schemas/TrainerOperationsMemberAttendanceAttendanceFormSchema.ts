// RESPONSIBILITY: Defines the RHF/Zod contract and safe defaults for Attendance form submissions.
import { z } from 'zod';

import {
  TRAINER_ATTENDANCE_RECORD_TYPE,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';




export const TrainerAttendanceFormType = z.literal(TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER);

export const TrainerAttendanceFormSchema = z.object({
  type: TrainerAttendanceFormType,
  memberId: z.string().optional(),
  date: z.string().min(1, 'ERR_DATE_REQUIRED'),
  checkIn: z.string().min(1, 'ERR_TIME_REQUIRED'),
  checkOut: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.memberId?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'ERR_MEMBER_REQUIRED', path: ['memberId'] });
  }
});
